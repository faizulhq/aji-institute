import sharp from 'sharp';
import { readdir, stat, rename, unlink, copyFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Target max size dalam KB
const MAX_KB = 200;
const QUALITY_JPEG = 80;
const QUALITY_WEBP = 78;
const QUALITY_PNG = 80;

// File yang TIDAK dikompres (sudah kecil / non-image)
const SKIP_EXTENSIONS = ['.ico', '.svg', '.webmanifest', '.json', '.xml', '.txt'];
const SKIP_FILES = ['og-image.png']; // OG image butuh resolusi tinggi

let totalSavedKB = 0;
let processedCount = 0;
let skippedCount = 0;

async function getFilesRecursive(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getFilesRecursive(fullPath);
      files.push(...subFiles);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const relPath = path.relative(PUBLIC_DIR, filePath);

  // Skip non-images
  if (SKIP_EXTENSIONS.includes(ext)) return;
  if (SKIP_FILES.includes(fileName)) return;
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  // Cek ukuran asli
  const statBefore = await stat(filePath);
  const sizeBefore = statBefore.size;

  // Skip jika sudah kecil (< MAX_KB)
  if (sizeBefore < MAX_KB * 1024) {
    console.log(`⏭️  SKIP (sudah kecil ${Math.round(sizeBefore/1024)}KB): ${relPath}`);
    skippedCount++;
    return;
  }

  try {
    let sharpInstance = sharp(filePath);
    const metadata = await sharpInstance.metadata();
    
    // Resize jika terlalu besar (max width 1920px untuk hero, 800px untuk logo)
    const isLogo = fileName.toLowerCase().includes('logo');
    const maxWidth = isLogo ? 400 : 1920;
    
    if (metadata.width > maxWidth) {
      sharpInstance = sharpInstance.resize(maxWidth, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // Kompres berdasarkan format
    let buffer;
    if (ext === '.png') {
      buffer = await sharpInstance.png({ quality: QUALITY_PNG, compressionLevel: 9 }).toBuffer();
    } else if (ext === '.webp') {
      buffer = await sharpInstance.webp({ quality: QUALITY_WEBP }).toBuffer();
    } else {
      // jpg/jpeg
      buffer = await sharpInstance.jpeg({ quality: QUALITY_JPEG, progressive: true }).toBuffer();
    }

    // Hanya simpan jika lebih kecil dari aslinya
    if (buffer.length < sizeBefore) {
      // Tulis ke temp file dulu, lalu replace original
      const tmpPath = path.join(os.tmpdir(), `compress_${Date.now()}_${fileName}`);
      await sharp(buffer).toFile(tmpPath);
      await unlink(filePath);
      await copyFile(tmpPath, filePath);
      await unlink(tmpPath);
      const savedKB = Math.round((sizeBefore - buffer.length) / 1024);
      totalSavedKB += savedKB;
      processedCount++;
      console.log(`✅ ${relPath}: ${Math.round(sizeBefore/1024)}KB → ${Math.round(buffer.length/1024)}KB (hemat ${savedKB}KB)`);
    } else {
      console.log(`⏭️  SKIP (sudah optimal): ${relPath}`);
      skippedCount++;
    }
  } catch (err) {
    console.error(`❌ ERROR ${relPath}:`, err.message);
  }
}

async function main() {
  console.log('🚀 Mulai kompres gambar...\n');
  
  const allFiles = await getFilesRecursive(PUBLIC_DIR);
  
  for (const file of allFiles) {
    await compressImage(file);
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Selesai! ${processedCount} gambar dikompres`);
  console.log(`⏭️  ${skippedCount} gambar di-skip`);
  console.log(`💾 Total hemat: ${Math.round(totalSavedKB/1024*10)/10} MB (${totalSavedKB} KB)`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
}

main().catch(console.error);
