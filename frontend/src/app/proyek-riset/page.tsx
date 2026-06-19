'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight, BarChart2, Users, Shield, FileText,
  TrendingUp, GraduationCap, CheckCircle, MapPin,
  Calendar, ChevronRight, Microscope, ClipboardList,
  Search, MessageSquare, PieChart, Presentation,
} from 'lucide-react';
import { risetApi } from '@/lib/api';
import { WA_LINK } from '@/lib/config';
import type { RisetProject, RisetProjectsResponse } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.aji-institute.com';

// ─── Bidang Riset ──────────────────────────────────────────────
const BIDANG_RISET = [
  {
    icon: Users,
    label: 'Riset Sosial Budaya',
    desc: 'Dinamika masyarakat, gotong royong, partisipasi kebangsaan, kohesi sosial, dan interaksi antar kelompok.',
    color: '#2348A8',
    bg: '#EEF2FF',
  },
  {
    icon: TrendingUp,
    label: 'Riset Ekonomi & Kesejahteraan',
    desc: 'Peredaran uang, penyerapan tenaga kerja, pendapatan masyarakat, aktivitas perdagangan dan UMKM.',
    color: '#1E6B2E',
    bg: '#F0FDF4',
  },
  {
    icon: Shield,
    label: 'Riset Pertahanan & Keamanan',
    desc: 'Penurunan gangguan keamanan, kepercayaan masyarakat terhadap aparat, deteksi dini konflik sosial.',
    color: '#7C3AED',
    bg: '#F5F3FF',
  },
  {
    icon: FileText,
    label: 'Evaluasi Kebijakan & Program',
    desc: 'Pengukuran dampak program pemerintah, evaluasi efektivitas intervensi, rekomendasi kebijakan berbasis data.',
    color: '#B45309',
    bg: '#FFFBEB',
  },
  {
    icon: BarChart2,
    label: 'Survei Kepuasan & Dampak',
    desc: 'Pengukuran tingkat kepuasan stakeholder, analisis dampak keberadaan institusi terhadap lingkungan sekitar.',
    color: '#0E7490',
    bg: '#ECFEFF',
  },
  {
    icon: GraduationCap,
    label: 'Riset Pendidikan & SDM',
    desc: 'Kualitas pendidikan, pengembangan SDM, kebutuhan pelatihan, dan evaluasi program pemberdayaan masyarakat.',
    color: '#BE185D',
    bg: '#FDF2F8',
  },
];

// ─── Metodologi ────────────────────────────────────────────────
const METODOLOGI = [
  {
    icon: MessageSquare,
    step: '01',
    label: 'Konsultasi Awal',
    desc: 'Perumusan masalah, tujuan riset, dan desain penelitian bersama klien.',
  },
  {
    icon: ClipboardList,
    step: '02',
    label: 'Desain Instrumen',
    desc: 'Penyusunan kuesioner, pedoman wawancara, dan panduan observasi lapangan.',
  },
  {
    icon: Search,
    step: '03',
    label: 'Pengumpulan Data',
    desc: 'Survei lapangan, wawancara mendalam, FGD, dan observasi langsung di lokasi.',
  },
  {
    icon: PieChart,
    step: '04',
    label: 'Analisis & Triangulasi',
    desc: 'Pengolahan data kuantitatif & kualitatif dengan validasi lintas sumber (triangulasi).',
  },
  {
    icon: Presentation,
    step: '05',
    label: 'Laporan & Visualisasi',
    desc: 'Penyusunan laporan komprehensif lengkap grafik, tabel, dan narasi analisis.',
  },
  {
    icon: Microscope,
    step: '06',
    label: 'Presentasi Hasil',
    desc: 'Paparan temuan kepada pemangku kepentingan dan rekomendasi kebijakan berbasis data.',
  },
];

// ─── Keunggulan ────────────────────────────────────────────────
const KEUNGGULAN = [
  'Tim peneliti berpengalaman di bidang sosial, ekonomi, dan kebijakan publik',
  'Metodologi ilmiah yang terstandar dan dapat dipertanggungjawabkan',
  'Pengalaman riset di wilayah terpencil dengan keterbatasan akses data',
  'Laporan komprehensif: grafik, tabel, dan narasi analisis yang mudah dipahami',
  'Koordinasi aktif dengan stakeholder lokal (pemerintah, tokoh masyarakat, instansi)',
  'Kerahasiaan data dan etika penelitian terjamin',
];

// ─── Status badge ──────────────────────────────────────────────
function StatusBadge({ status }: { status: RisetProject['status'] }) {
  const config = {
    ongoing:   { label: 'Sedang Berlangsung', bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
    completed: { label: 'Selesai',            bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
  }[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold"
      style={{ background: config.bg, color: config.text }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: config.dot }} />
      {config.label}
    </span>
  );
}

// ─── Portfolio Card ────────────────────────────────────────────
function ProyekCard({ proyek }: { proyek: RisetProject }) {
  const imgSrc = proyek.image
    ? (proyek.image.startsWith('http') ? proyek.image : `${API}${proyek.image}`)
    : null;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Cover image atau placeholder */}
      <div className="relative h-44 bg-gradient-to-br from-[#162058] to-[#2348A8] flex items-center justify-center overflow-hidden">
        {imgSrc ? (
          <Image src={imgSrc} alt={proyek.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        ) : (
          <Microscope className="w-12 h-12 text-white/20" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <StatusBadge status={proyek.status} />
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-black text-gray-900 text-base leading-tight mb-2 line-clamp-2">{proyek.title}</h3>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-400">
          {proyek.client && (
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" /> {proyek.client}
            </span>
          )}
          {proyek.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {proyek.location}
            </span>
          )}
          {proyek.year && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" /> {proyek.year}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-4">{proyek.description}</p>

        {/* Scope tags */}
        {proyek.scope?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {proyek.scope.map((s) => (
              <span key={s} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#EEF2FF] text-[#2348A8]">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
export default function ProyekRisetPage() {
  const { data } = useQuery<RisetProjectsResponse>({
    queryKey: ['riset-projects'],
    queryFn: () => risetApi.list().then((r) => r.data),
    staleTime: 1000 * 60 * 5,
  });

  const projects = data?.data ?? [];

  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="bg-[#162058] pt-28 pb-20 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex gap-2 text-white/40 text-sm mb-8">
              <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
              <span>/</span>
              <span className="text-white/80">Proyek Riset</span>
            </nav>

            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 px-4 py-1.5 rounded-full mb-6">
              <Microscope className="w-3.5 h-3.5 text-[#F0A500]" />
              <span className="text-[#F0A500] text-xs font-semibold uppercase tracking-widest">Layanan Aji Institute</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-5">
              Proyek Riset<br />
              <span className="text-[#F0A500]">Berbasis Bukti</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-2xl">
              Aji Institute hadir sebagai mitra riset terpercaya untuk instansi, lembaga, dan korporasi.
              Kami menyusun data, analisis, dan laporan penelitian yang komprehensif — mulai dari survei lapangan
              hingga visualisasi data yang siap dipresentasikan.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={WA_LINK('Halo Aji Institute, saya ingin konsultasi tentang Layanan Proyek Riset. Bisa dibantu?')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl transition-all hover:scale-105 shadow-xl"
              >
                Konsultasikan Proyek Anda <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-4 rounded-2xl transition-colors"
              >
                Lihat Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TENTANG LAYANAN ──────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#2348A8] text-sm font-bold uppercase tracking-widest mb-2">Tentang Layanan</p>
              <h2 className="text-3xl font-black text-gray-900 leading-tight mb-5">
                Riset yang Dapat<br />
                <span className="text-[#2348A8]">Dipertanggungjawabkan</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                Aji Institute menyediakan layanan proyek riset end-to-end untuk membantu instansi pemerintah,
                lembaga militer, organisasi masyarakat, dan korporasi dalam mengambil keputusan berbasis data.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Dengan pendekatan metodologi yang terstandar — mencakup survei kuantitatif, wawancara mendalam,
                Focus Group Discussion (FGD), dan observasi lapangan — kami menghasilkan temuan yang valid,
                akurat, dan mudah dikomunikasikan kepada pemangku kepentingan.
              </p>

              <a
                href={WA_LINK('Halo Aji Institute, saya ingin tahu lebih lanjut tentang Layanan Proyek Riset.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-xl"
              >
                Hubungi Tim Kami <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Keunggulan list */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-5">Mengapa Aji Institute?</p>
              <ul className="space-y-4">
                {KEUNGGULAN.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#1E6B2E] shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BIDANG RISET ─────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2348A8] text-sm font-bold uppercase tracking-widest mb-3">Cakupan Layanan</p>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Bidang Riset</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Kami menangani berbagai bidang penelitian sosial, ekonomi, dan kebijakan dengan pendekatan ilmiah yang terstandar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BIDANG_RISET.map((bidang) => (
              <div
                key={bidang.label}
                className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: bidang.bg }}
                >
                  <bidang.icon className="w-5 h-5" style={{ color: bidang.color }} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{bidang.label}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{bidang.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METODOLOGI ───────────────────────────────────────── */}
      <section className="py-20 bg-[#162058]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#F0A500] text-sm font-bold uppercase tracking-widest mb-3">Cara Kami Bekerja</p>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Metodologi Penelitian</h2>
            <p className="text-white/60 max-w-xl mx-auto">
              Alur kerja sistematis dari konsultasi awal hingga presentasi hasil kepada pemangku kepentingan.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {METODOLOGI.map((step, i) => (
              <div
                key={step.step}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-black text-white/10">{step.step}</span>
                  <div className="w-9 h-9 rounded-xl bg-[#F0A500]/10 flex items-center justify-center">
                    <step.icon className="w-4.5 h-4.5 text-[#F0A500]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO PROYEK ─────────────────────────────────── */}
      {projects.length > 0 && (
        <section id="portfolio" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#2348A8] text-sm font-bold uppercase tracking-widest mb-3">Track Record</p>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">Portfolio Proyek</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Proyek-proyek riset yang telah dan sedang dikerjakan Aji Institute.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proyek) => (
                <ProyekCard key={proyek.id} proyek={proyek} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BAWAH ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#F0A500]/10 via-white to-[#EEF2FF]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#162058] flex items-center justify-center mx-auto mb-6">
            <Microscope className="w-7 h-7 text-[#F0A500]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Punya Kebutuhan Riset?
          </h2>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Ceritakan kebutuhan riset Anda. Tim kami siap membantu merumuskan desain penelitian
            yang sesuai dengan tujuan, anggaran, dan timeline yang Anda miliki.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={WA_LINK('Halo Aji Institute, saya ingin konsultasi Proyek Riset. Bisa dibantu?')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#2348A8] hover:bg-[#1B3A8C] text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl hover:shadow-[#2348A8]/50 text-lg"
            >
              Konsultasi via WhatsApp <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/tentang"
              className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-[#162058] text-gray-700 hover:text-[#162058] font-bold px-10 py-5 rounded-2xl transition-colors text-lg"
            >
              Tentang Aji Institute
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
