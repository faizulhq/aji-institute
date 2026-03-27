const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper: read JSON data file
function readData(filename) {
  const filepath = path.join(__dirname, 'data', filename);
  const raw = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(raw);
}

// Helper: write JSON data file
function writeData(filename, data) {
  const filepath = path.join(__dirname, 'data', filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

// ─── API ROUTES ────────────────────────────────────────────────────────────────

// GET /api/programs — all programs, optional ?type=bootcamp|short-class
app.get('/api/programs', (req, res) => {
  try {
    let programs = readData('programs.json');
    const { type, search } = req.query;
    if (type) {
      programs = programs.filter(p => p.type === type);
    }
    if (search) {
      const q = search.toLowerCase();
      programs = programs.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    res.json({ success: true, data: programs, total: programs.length });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/programs/:id — single program
app.get('/api/programs/:id', (req, res) => {
  try {
    const programs = readData('programs.json');
    const id = parseInt(req.params.id);
    const program = programs.find(p => p.id === id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program tidak ditemukan' });
    }
    res.json({ success: true, data: program });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// GET /api/testimonials — all testimonials
app.get('/api/testimonials', (req, res) => {
  try {
    const testimonials = readData('testimonials.json');
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// POST /api/inquiry — save inquiry
app.post('/api/inquiry', (req, res) => {
  try {
    const { name, email, service, topic, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Nama, email, dan pesan wajib diisi.' });
    }
    const inquiries = readData('inquiries.json');
    const newInquiry = {
      id: Date.now(),
      name,
      email,
      service: service || '',
      topic: topic || '',
      message,
      createdAt: new Date().toISOString()
    };
    inquiries.push(newInquiry);
    writeData('inquiries.json', inquiries);
    res.json({ success: true, message: 'Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── SPA FALLBACK ──────────────────────────────────────────────────────────────
// Serve program-detail.html for /program/* routes
app.get('/program/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'program-detail.html'));
});

// ─── START SERVER ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Aji Mitra Statistika server running at http://localhost:${PORT}`);
  console.log(`📁 Static files served from /public`);
  console.log(`🔌 API available at http://localhost:${PORT}/api`);
});
