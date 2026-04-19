import Link from 'next/link';
import {
  MessageCircle, Search, Settings2, BarChart2, CheckCircle,
  GraduationCap, BookOpen, FlaskConical, Users, Building2,
  Shield, Clock, Award, RefreshCw,
} from 'lucide-react';
import { WA_LINK, CONTACT } from '@/lib/config';

const METHODS = [
  {
    step: '01',
    title: 'Konsultasi Awal',
    desc: 'Anda menceritakan kebutuhan riset — jenis penelitian, software yang digunakan, deadline, dan permasalahan yang dihadapi. Kami mendengarkan dan memberikan gambaran awal solusinya.',
    Icon: MessageCircle,
  },
  {
    step: '02',
    title: 'Need Assessment',
    desc: 'Tim AjiStat menganalisis kebutuhan Anda secara mendalam — metodologi penelitian, jenis data, teknik analisis yang tepat, serta estimasi waktu pengerjaan.',
    Icon: Search,
  },
  {
    step: '03',
    title: 'Pengolahan Data',
    desc: 'Data Anda diproses oleh Tim Analis Data profesional secara in-house (bukan joki perorangan) menggunakan software statistik yang sesuai (SPSS, SmartPLS, R, Python, NVivo, dll.) dengan standar akademik yang ketat.',
    Icon: Settings2,
  },
  {
    step: '04',
    title: 'Interpretasi & Pelaporan',
    desc: 'Hasil analisis dijelaskan secara sistematis — bukan sekadar output software, tapi pemahaman mendalam tentang temuan dan maknanya untuk penelitian Anda.',
    Icon: BarChart2,
  },
  {
    step: '05',
    title: 'Revisi & Pendampingan',
    desc: 'Kami mendampingi hingga laporan siap dipresentasikan atau diajukan ke pembimbing. Revisi termasuk dalam layanan untuk memastikan hasil maksimal.',
    Icon: CheckCircle,
  },
];

const SERVICES = [
  {
    title: 'Analisis Kuantitatif',
    items: ['Uji Validitas & Reliabilitas, MSI', 'Analisis Regresi (Anreg), ANOVA, Korelasi', 'SEM (SmartPLS, AMOS) & Path Analysis', 'Analisis Faktor, MDS, PCA, Cluster Analysis', 'Time Series, Data Panel & Service Quality', 'Design Experiment & Statistika Nonparametrik', 'Teknik Sampling, Statistik Deskriptif & Conj'],
    color: 'bg-blue-50 border-blue-100',
    badge: 'bg-blue-100 text-blue-700',
  },
  {
    title: 'Analisis Kualitatif',
    items: ['Koding & kategorisasi data NVivo', 'Analisis tematik & naratif', 'Grounded theory & fenomenologi', 'Triangulasi data mixed methods', 'Studi kasus & analisis dokumen'],
    color: 'bg-emerald-50 border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
  },
  {
    title: 'Metodologi & Penulisan',
    items: ['Penyusunan bab metodologi penelitian', 'Pemilihan teknik analisis yang tepat', 'Interpretasi hasil & penulisan pembahasan', 'Editing laporan & penyesuaian format jurnal', 'Konsultasi proposal & kerangka riset'],
    color: 'bg-amber-50 border-amber-100',
    badge: 'bg-amber-100 text-amber-700',
  },
];

const TARGET = [
  { Icon: GraduationCap, label: 'Mahasiswa S1', desc: 'Skripsi, tugas akhir, laporan penelitian' },
  { Icon: BookOpen,      label: 'Mahasiswa S2', desc: 'Tesis, penelitian magister' },
  { Icon: FlaskConical,  label: 'Mahasiswa S3', desc: 'Disertasi, riset doktoral' },
  { Icon: Users,         label: 'Dosen & Peneliti', desc: 'Penelitian ilmiah, pengabdian masyarakat' },
  { Icon: Building2,     label: 'Instansi & Perusahaan', desc: 'Riset pasar, evaluasi program, data bisnis' },
];

const GUARANTEES = [
  { Icon: Shield,    title: '100% Kerahasiaan', desc: 'Data dan informasi penelitian Anda sepenuhnya terjaga kerahasiaannya.' },
  { Icon: Award,     title: 'Tim Analis Profesional', desc: 'Dikerjakan langsung oleh tim analis data profesional in-house (bukan joki perorangan).' },
  { Icon: Clock,     title: 'Tepat Waktu', desc: 'Pengerjaan sesuai deadline yang disepakati, dengan update progres berkala.' },
  { Icon: RefreshCw, title: 'Revisi Included', desc: 'Revisi termasuk dalam paket hingga hasil sesuai kebutuhan Anda.' },
];

export default function KonsultasiPage() {
  return (
    <>
      {/* HERO */}
      <div className="bg-[#162058] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#F0A500] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2348A8] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <nav className="flex gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Konsultasi & Olah Data</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-[#F0A500]/20 border border-[#F0A500]/40 text-[#F0A500] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
              AjiStat — Pendampingan Riset Profesional
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Konsultasi &<br />
              <span className="text-[#F0A500]">Olah Data Statistik</span><br />
              <span className="text-white/70">Profesional</span>
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
              Kami mendampingi setiap tahap penelitian Anda — dari pemilihan metodologi,
              pengolahan data, interpretasi hasil, hingga laporan siap presentasi.
              Berpengalaman sejak 2015, melayani mahasiswa S1–S3, dosen, peneliti, dan institusi.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={WA_LINK('Halo AjiStat, saya ingin konsultasi olah data penelitian saya')}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#162058] font-black px-8 py-4 rounded-2xl transition-colors text-sm shadow-xl">
                Mulai Konsultasi via WhatsApp
              </a>
              <Link href="#layanan"
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl transition-colors text-sm">
                Lihat Layanan
              </Link>
            </div>
          </div>
        </div>
        {/* Trust strip */}
        <div className="relative border-t border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-white/60">
              {['5.000+ Klien Terbantu', 'Berpengalaman Sejak 2015', 'Respons < 24 Jam', '100% Kerahasiaan Data', 'Kuantitatif & Kualitatif'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F0A500]" />{t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ALUR KERJA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Alur Kerja</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Bagaimana Proses Konsultasi Berjalan?</h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">
              Dari kontak pertama hingga laporan final, kami mendampingi setiap langkah riset Anda secara profesional.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#162058] to-[#F0A500] hidden md:block" />
            <div className="space-y-6">
              {METHODS.map((m) => (
                <div key={m.step} className="relative flex gap-6 items-start">
                  <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#162058] flex flex-col items-center justify-center z-10 shadow-lg gap-1">
                    <m.Icon className="w-5 h-5 text-white" />
                    <span className="text-[#F0A500] text-[10px] font-black">{m.step}</span>
                  </div>
                  <div className="flex-1 bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="font-black text-gray-900 mb-1">{m.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Cakupan Layanan</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Apa yang Kami Kerjakan?</h2>
            <p className="text-gray-500 text-sm">Layanan konsultasi data AjiStat mencakup seluruh kebutuhan analisis penelitian Anda.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div key={s.title} className={`rounded-2xl border p-6 ${s.color}`}>
                <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${s.badge}`}>{s.title}</span>
                <ul className="space-y-2.5">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-[#162058] mt-0.5 shrink-0">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNTUK SIAPA */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#2348A8] text-sm font-semibold uppercase tracking-widest mb-2">Untuk Siapa?</p>
            <h2 className="text-3xl font-black text-gray-900 mb-2">Melayani Berbagai Kalangan</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {TARGET.map((t) => (
              <div key={t.label} className="text-center p-5 rounded-2xl border border-gray-200 bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#162058] to-[#2348A8] flex items-center justify-center mx-auto mb-3">
                  <t.Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-black text-gray-900 text-sm mb-1">{t.label}</p>
                <p className="text-gray-400 text-xs leading-snug">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JAMINAN */}
      <section className="py-14 bg-[#162058]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-[#F0A500] text-sm font-semibold uppercase tracking-widest mb-2">Komitmen Kami</p>
            <h2 className="text-3xl font-black text-white mb-2">Jaminan Layanan AjiStat</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {GUARANTEES.map((g) => (
              <div key={g.title} className="bg-white/8 border border-white/15 rounded-2xl p-5">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                  <g.Icon className="w-5 h-5 text-[#F0A500]" />
                </div>
                <p className="text-[#F0A500] font-black mb-2">{g.title}</p>
                <p className="text-white/60 text-sm leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#F0A500] py-14">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-2xl font-black text-[#162058] mb-3">Siap Mulai Konsultasi?</h2>
          <p className="text-[#162058]/70 mb-6 text-sm">
            Ceritakan kebutuhan riset Anda dan tim AjiStat akan membantu menentukan solusi terbaik.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href={WA_LINK('Halo AjiStat, saya ingin konsultasi olah data penelitian saya. Bisa bantu?')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#162058] hover:bg-[#1B3A8C] text-white font-black px-8 py-4 rounded-2xl transition-colors">
              Hubungi via WhatsApp
            </a>
            <a href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center gap-2 bg-white/30 hover:bg-white/50 text-[#162058] font-bold px-8 py-4 rounded-2xl transition-colors">
              Kirim Email
            </a>
          </div>
          <p className="text-[#162058]/60 text-xs mt-4">Respons dalam &lt; 24 jam pada hari kerja · {CONTACT.whatsappDisplay}</p>
        </div>
      </section>
    </>
  );
}
