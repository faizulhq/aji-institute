'use client';

import type { Program } from '@/lib/types';

interface Props {
  program: Program;
  /** Override accent color. Default: '#F0A500' */
  accentColor?: string;
}

/**
 * Template banner dinamis — ditampilkan di atas card jika program belum punya gambar.
 * Tampilan mengikuti referensi: label type | judul besar | bullet kurikulum.
 */
export function ProgramCardBanner({ program, accentColor = '#F0A500' }: Props) {
  // Ambil 3 item kurikulum pertama sebagai bullet
  const bullets: string[] = (() => {
    try {
      const raw = program.curriculum;
      if (Array.isArray(raw)) return raw.slice(0, 3);
      if (typeof raw === 'string') {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.slice(0, 3);
      }
    } catch {}
    return [];
  })();

  // Label atas (tipe program)
  const typeLabel = (program.type ?? 'Program').toUpperCase();

  // Judul dibagi menjadi 2 baris agar tampak besar
  const words = (program.title ?? '').split(' ');
  const half  = Math.ceil(words.length / 2);
  const line1 = words.slice(0, half).join(' ');
  const line2 = words.slice(half).join(' ');

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{
        background: 'linear-gradient(135deg, #0d1632 0%, #1a2d6e 55%, #162058 100%)',
        minHeight: 140,
      }}
    >
      {/* Dekorasi: dot grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Dekorasi: watermark teks "Bootcamp Intensif" di kiri bawah */}
      <span
        className="absolute bottom-1 left-3 font-black italic select-none pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.04)', fontSize: 36, letterSpacing: '-1px', lineHeight: 1 }}
        aria-hidden
      >
        {typeLabel}
      </span>

      {/* Konten utama */}
      <div className="relative flex items-stretch h-full p-4 gap-3">

        {/* ── KIRI: Label + Judul ── */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          {/* Label type */}
          <span
            className="inline-block text-[10px] font-black uppercase px-2 py-0.5 rounded mb-2 w-fit"
            style={{ backgroundColor: accentColor, color: '#0d1632', letterSpacing: '0.05em' }}
          >
            {typeLabel}:
          </span>

          {/* Judul — besar, bold, italic */}
          <p
            className="font-black italic leading-none text-white uppercase"
            style={{ fontSize: 'clamp(16px, 4vw, 28px)', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            {line1}
            {line2 && (
              <>
                <br />
                {line2}
              </>
            )}
          </p>
        </div>

        {/* ── KANAN: Bullet kurikulum ── */}
        {bullets.length > 0 && (
          <div className="flex flex-col justify-center gap-1.5 shrink-0 max-w-[45%]">
            {bullets.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5">
                {/* Ikon bullet */}
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: accentColor }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <circle cx="4" cy="4" r="3" fill="#0d1632" />
                    <circle cx="4" cy="4" r="1.5" fill={accentColor} />
                  </svg>
                </div>
                <span
                  className="text-white font-semibold uppercase leading-tight"
                  style={{ fontSize: 'clamp(7px, 1.5vw, 10px)', letterSpacing: '0.03em' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
