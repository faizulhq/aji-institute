'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Users, Award, BookOpen, Star, X, ArrowRight, Clock, Calendar, Tag } from 'lucide-react';
import { ProgramTabsByProgram } from '@/components/ProgramTabs';
import { ProgramCardBanner } from '@/components/ProgramCardBanner';
import { WA_LINK } from '@/lib/config';
import type { Program } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL !== '/api'
  ? process.env.NEXT_PUBLIC_API_URL
  : 'https://api.aji-institute.com';

const KEUNGGULAN = [
  {
    icon: Users,
    title: 'Fasilitator Expert',
    desc: 'Dibimbing oleh praktisi dan peneliti berpengalaman di bidangnya',
    detail: 'Setiap fasilitator kami adalah praktisi aktif dan peneliti berpengalaman yang mengajar berdasarkan pengalaman nyata, bukan sekadar teori. Mereka hadir langsung di setiap sesi untuk menjawab pertanyaan dan membimbing Anda secara personal.',
  },
  {
    icon: BookOpen,
    title: '3–5 Hari Intensif',
    desc: 'Pembelajaran intensif langsung praktik dengan data nyata',
    detail: 'Durasi 3–5 hari dirancang agar Anda bisa belajar secara mendalam tanpa terburu-buru. Setiap sesi menggabungkan teori singkat dengan praktik langsung menggunakan dataset riil, bukan data simulasi.',
  },

  {
    icon: Award,
    title: 'Rekaman Tersedia',
    desc: 'Akses ulang rekaman sesi kapan saja setelah bootcamp selesai',
    detail: 'Seluruh rekaman sesi live tersimpan di platform dan bisa diakses kapan saja, selamanya. Anda bisa belajar ulang topik yang belum dikuasai tanpa batas waktu atau biaya tambahan.',
  },
];

function KeunggulanModal({ item, onClose }: {
  item: typeof KEUNGGULAN[0] | null;
  onClose: () => void;
}) {
  if (!item) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-7 z-10"
        onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="w-12 h-12 bg-[#F0A500]/15 rounded-2xl flex items-center justify-center mb-4">
          <item.icon className="w-6 h-6 text-[#F0A500]" />
        </div>
        <h3 className="text-xl font-black text-gray-900 mb-3">{item.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.detail}</p>
        <a href={WA_LINK(`Halo, saya ingin tanya tentang fitur Bootcamp: ${item.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold py-3 rounded-xl transition-colors text-sm">
          💬 Tanya via WhatsApp
        </a>
      </div>
    </div>
  );
}

export default function BootcampPage() {
  const [activeKeunggulan, setActiveKeunggulan] = useState<typeof KEUNGGULAN[0] | null>(null);

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span>/</span>
            <span className="text-white/80">Bootcamp</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              AJI Learning — Bootcamp Intensif
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Bootcamp —<br />
              <span className="text-[#F0A500]">Intensif, Praktis,</span>{' '}
              <span className="text-white/80">&amp; Berdampak</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Program bootcamp 3–5 hari yang dirancang untuk membawa Anda dari pemula hingga mahir secara praktis.
              Cocok untuk mahasiswa, peneliti, akademisi, dan profesional.
            </p>
            {/* Clickable keunggulan cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {KEUNGGULAN.map((item) => (
                <button key={item.title}
                  onClick={() => setActiveKeunggulan(item)}
                  className="bg-white/10 border border-white/15 rounded-xl p-4 text-left hover:bg-white/20 hover:border-white/30 transition-all hover:-translate-y-0.5 cursor-pointer group">
                  <item.icon className="w-6 h-6 text-[#F0A500] mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-white font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {['Mulai dari Rp 250.000', 'Sesi Live via Zoom'].map((text) => (
                <span key={text} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── SECTION: OPEN CLASS (ATAS) — Aji Institute & UNJANI bersebelahan ─── */}
      <OpenClassSideBySide />


      {/* ─── TABS PER PROGRAM ─── */}
      <section className="py-14 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Pilih Program Divisi</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Bootcamp per Divisi Program</h2>
            <p className="text-gray-500 text-sm">Pilih divisi program yang sesuai kebutuhan Anda. Klik kartu untuk mendaftar.</p>
          </div>
          <ProgramTabsByProgram formatFilter="bootcamp" queryKey="bootcamp-by-program" />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-[#F0A500] py-12">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-bold text-[#162058] mb-3">Ada topik yang belum tersedia?</h2>
          <p className="text-[#162058]/70 mb-6">Kami menerima permintaan topik khusus. Hubungi tim Aji Institute.</p>
          <a href={WA_LINK('Halo Admin, saya ingin request topik Bootcamp baru')}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
            Request Topik via WhatsApp
          </a>
        </div>
      </section>

      <KeunggulanModal item={activeKeunggulan} onClose={() => setActiveKeunggulan(null)} />
    </>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
import Image from 'next/image';

const isUnjaniProgram = (p: Program) =>
  p.tags?.some((t: string) => ['unjani', 'fisip', 'hi', 'praktikum'].includes(t.toLowerCase())) ||
  p.slug?.toLowerCase().includes('unjani') ||
  p.slug?.toLowerCase().includes('praktikum') ||
  p.title?.toLowerCase().includes('unjani') ||
  p.title?.toLowerCase().includes('fisip');

const STATUS_LABEL: Record<string, string> = {
  upcoming: 'Akan Datang',
  ongoing: 'Sedang Berlangsung',
  recorded: 'Rekaman Tersedia',
};
const STATUS_COLOR: Record<string, string> = {
  upcoming: '#F0A500',
  ongoing: '#16a34a',
  recorded: '#6366f1',
};

// ─── ✏️  UBAH UKURAN CARD DI SINI ──────────────────────────────────────────
const CARD_CONFIG = {
  // ↓ Tinggi gambar flyer di dalam card (pixel). Contoh: 160, 200, 240, 300
  imageHeight: 350,

  // ↓ Tinggi MINIMAL area teks/info di bawah gambar (pixel). Contoh: 160, 180, 200
  infoMinHeight: 0,

  // ↓ Lebar MAKSIMAL setiap card. Contoh: '320px', '380px', '100%' (penuh kolom)
  cardMaxWidth: '100%',

  // ↓ Lebar MAKSIMAL tiap KOLOM (kiri/kanan). Contoh: '480px', '520px', '100%'
  colMaxWidth: '520px',
};
// ──────────────────────────────────────────────────────────────────────

function ProgramCard({ p, dark = true }: { p: Program; dark?: boolean }) {
  return (
    <Link
      href={`/program/${p.slug}`}
      style={{ maxWidth: CARD_CONFIG.cardMaxWidth }}
      className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col w-full ${
        dark
          ? 'bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[#F0A500]/50 hover:shadow-xl'
          : 'bg-white border border-gray-100 hover:shadow-xl shadow-sm'
      }`}
    >
      {p.image ? (
        <div className="relative w-full overflow-hidden shrink-0" style={{ height: CARD_CONFIG.imageHeight }}>
          <Image
            src={p.image.startsWith('http') ? p.image : `${API}${p.image}`}
            alt={p.title} fill
            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 left-2 flex gap-1.5">
            <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#F0A500] text-[#162058] uppercase shadow">Bootcamp</span>
            {p.status && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase shadow"
                style={{ backgroundColor: `${STATUS_COLOR[p.status]}dd`, color: '#fff' }}>
                {STATUS_LABEL[p.status] ?? p.status}
              </span>
            )}
          </div>
        </div>
      ) : (
        /* Template banner dinamis jika tidak ada gambar */
        <ProgramCardBanner program={p} />
      )}
      <div className="p-4 flex-1 flex flex-col justify-between" style={{ minHeight: CARD_CONFIG.infoMinHeight }}>
        <div>
          {!p.image && (
            <div className="flex gap-1.5 mb-2">
              <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#F0A500] text-[#162058] uppercase">Bootcamp</span>
              {p.status && (
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase"
                  style={{ backgroundColor: `${STATUS_COLOR[p.status]}25`, color: STATUS_COLOR[p.status] }}>
                  {STATUS_LABEL[p.status] ?? p.status}
                </span>
              )}
            </div>
          )}
          <h3 className={`font-black text-sm leading-tight mb-1.5 group-hover:text-[#F0A500] transition-colors ${ dark ? 'text-white' : 'text-gray-900' }`}>{p.title}</h3>
          <div className={`space-y-0.5 mb-3 text-xs ${ dark ? 'text-white/50' : 'text-gray-400' }`}>
            {p.duration && <div className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{p.duration}</div>}
            {p.schedule && <div className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{p.schedule}</div>}
            {p.facilitator_name && <div className="flex items-center gap-1.5"><Tag className="w-3 h-3" />{p.facilitator_name}</div>}
          </div>
        </div>
        <div className={`flex items-center justify-between pt-2.5 border-t mt-auto ${ dark ? 'border-white/10' : 'border-gray-100' }`}>
          <span className="font-black text-[#F0A500] text-base">
            {Number(p.price) === 0 ? 'Hubungi Admin' : `Rp ${Number(p.price).toLocaleString('id-ID')}`}
          </span>
          <span className={`flex items-center gap-1 text-xs font-semibold group-hover:gap-2 group-hover:text-[#F0A500] transition-all ${ dark ? 'text-white/70' : 'text-gray-500' }`}>
            Daftar <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function OpenClassSideBySide() {
  const { data: allData, isLoading } = useQuery<Program[]>({
    queryKey: ['aji-institute-openclass-combined'],
    queryFn: () =>
      fetch(`${API}/api/programs/?brand=aji-institute`)
        .then((r) => r.ok ? r.json() : { data: [] })
        .then((json) => {
          const arr: Program[] = json.data ?? json;
          return Array.isArray(arr) ? arr.filter((p) => p.type?.toLowerCase() === 'bootcamp') : [];
        }),
    staleTime: 1000 * 60 * 5,
  });

  const regularPrograms = (allData ?? []).filter((p) => !isUnjaniProgram(p));
  const unjaniPrograms  = (allData ?? []).filter((p) =>  isUnjaniProgram(p));

  const hasRegular = regularPrograms.length > 0;
  const hasUnjani  = unjaniPrograms.length  > 0;
  const bothExist  = hasRegular && hasUnjani;

  // Setelah loading selesai, jika tidak ada program sama sekali — sembunyikan section
  if (!isLoading && !hasRegular && !hasUnjani) return null;

  return (
    <section className="relative bg-gradient-to-br from-[#0d1632] via-[#162058] to-[#1B3A8C] py-10 overflow-hidden">
      {/* Dekorasi */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500]/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#2348A8]/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid 2 kolom jika keduanya ada, flex center jika hanya 1 */}
        <div className={bothExist
          ? 'grid lg:grid-cols-2 gap-8'
          : 'flex justify-center'
        }>

          {/* ─── KIRI: Kelas Terbuka Aji Institute — hanya tampil jika ada program ─── */}
          {(isLoading || hasRegular) && (
            <div style={{ maxWidth: CARD_CONFIG.colMaxWidth, width: '100%' }}>
              <div className="mb-5">
                <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-widest">
                  Open Class
                </span>
                <h2 className="text-lg font-black text-white mb-1">Kelas Terbuka Aji Institute</h2>
                <p className="text-white/50 text-xs">Program bootcamp untuk umum.</p>
              </div>
              {isLoading ? (
                <div className="space-y-4">{[1, 2].map((i) => <div key={i} className="bg-white/10 animate-pulse rounded-2xl h-56" />)}</div>
              ) : (
                <div className="space-y-4">
                  {regularPrograms.map((p) => <ProgramCard key={p.id} p={p} dark={true} />)}
                </div>
              )}
            </div>
          )}

          {/* ─── KANAN: Kerjasama UNJANI — hanya tampil jika ada program ─── */}
          {(isLoading || hasUnjani) && (
            <div style={{ maxWidth: CARD_CONFIG.colMaxWidth, width: '100%' }}>
              {/* Header dengan logo UNJANI */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 bg-[#1E6B2E]/30 border border-[#1E6B2E]/40 text-[#4ade80] text-xs font-bold px-3 py-1 rounded-full mb-2 uppercase tracking-widest">
                    Kerjasama UNJANI
                  </span>
                  <h2 className="text-lg font-black text-white mb-1">Bootcamp × UNJANI</h2>
                  <p className="text-white/50 text-xs">Program kolaborasi FISIP HI UNJANI.</p>
                </div>
                {/* Logo UNJANI kecil di header */}
                <div className="bg-white/10 border border-white/20 rounded-xl p-1.5 shrink-0">
                  <Image src="/images/Logo_Unjani.png" alt="UNJANI" width={28} height={28} className="object-contain" />
                </div>
              </div>
              {isLoading ? (
                <div className="space-y-4">{[1].map((i) => <div key={i} className="bg-white/10 animate-pulse rounded-2xl h-56" />)}</div>
              ) : (
                <div className="space-y-4">
                  {unjaniPrograms.map((p) => (
                    <div key={p.id} className="relative">
                      {/* Badge kerjasama di atas card */}
                      <div className="absolute -top-2 right-3 z-10 flex items-center gap-1.5 bg-[#1E6B2E] border border-[#2D9B44] rounded-full px-3 py-1">
                        <Image src="/images/Logo_Unjani.png" alt="UNJANI" width={14} height={14} className="object-contain" />
                        <span className="text-[9px] text-white font-bold uppercase tracking-widest">× UNJANI</span>
                      </div>
                      <ProgramCard p={p} dark={true} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
