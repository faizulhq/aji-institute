import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, MessageCircle, Building2, GraduationCap, Users, Briefcase } from 'lucide-react';
import { WA_LINK } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Kerja Sama Institusional',
  description: 'Program kerja sama Aji Institute dengan kampus, sekolah, lembaga pemerintah, dan perusahaan untuk pelatihan dan pengembangan kompetensi.',
};

const BENTUK_KERJASAMA = [
  { icon: GraduationCap, title: 'Pelatihan & Workshop', desc: 'Program pelatihan terstruktur untuk dosen, mahasiswa, dan peneliti yang dapat disesuaikan dengan kurikulum atau kebutuhan institusi.' },
  { icon: Users, title: 'Pendampingan Riset', desc: 'Program pendampingan penelitian berjangka panjang untuk meningkatkan kualitas dan kuantitas output riset institusi.' },
  { icon: Building2, title: 'Program Institusional', desc: 'Pengembangan program pelatihan eksklusif dengan nama dan branding institusi mitra, dikelola bersama Tim Aji Institute.' },
  { icon: Briefcase, title: 'Konsultasi Korporat', desc: 'Layanan analisis data dan riset pasar untuk kebutuhan bisnis, evaluasi program, dan pengambilan keputusan berbasis data.' },
];

const MITRA_DUMMY = [
  'Universitas A', 'Universitas B', 'Lembaga C', 'Institusi D', 'Perusahaan E', 'Yayasan F',
];

const KEUNGGULAN = [
  'Tim berpengalaman dengan rekam jejak akademis yang kuat',
  'Kurikulum fleksibel — disesuaikan penuh dengan kebutuhan mitra',
  'Harga kompetitif dengan kualitas premium',
  'Dukungan administratif dan sertifikasi peserta',
  'Laporan evaluasi program untuk keperluan akreditasi',
  'Hubungan kerjasama jangka panjang, bukan sekadar event',
];

export default function KerjaSamaPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0C1A45] to-[#1e4fa0] py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <nav className="flex justify-center gap-2 text-white/40 text-sm mb-8">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <span className="text-white/80">Kerja Sama</span>
          </nav>
          <span className="inline-block bg-[#4FA8D8]/20 border border-[#4FA8D8]/30 text-[#4FA8D8] text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            🤝 Kolaborasi Institusional
          </span>
          <h1 className="font-[family-name:var(--font-poppins)] text-4xl sm:text-5xl font-bold text-white mb-6">
            Wujudkan Program Pelatihan<br />
            <span className="text-[#F0A500]">Bersama Institusi Anda</span>
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Aji Institute membuka peluang kerja sama dengan kampus, sekolah, lembaga pemerintah, dan perusahaan untuk memberikan dampak nyata bagi pengembangan sumber daya manusia.
          </p>
        </div>
      </div>

      {/* Bentuk Kerjasama */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Program Kolaborasi</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900">Bentuk Kerja Sama yang Tersedia</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BENTUK_KERJASAMA.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-gray-50 rounded-2xl p-7 border border-gray-100 flex gap-5">
                <div className="w-12 h-12 bg-[#2568B5]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6 text-[#2568B5]" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-20 bg-[#0C1A45]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[#4FA8D8] text-sm font-semibold uppercase tracking-widest mb-3">Mengapa Kami?</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-white mb-6">
              Keunggulan Bermitra dengan Aji Institute
            </h2>
            <ul className="space-y-3">
              {KEUNGGULAN.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#4FA8D8] shrink-0 mt-0.5" />
                  <span className="text-white/70 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/8 border border-white/15 rounded-2xl p-8">
            <p className="text-[#4FA8D8] text-sm font-semibold uppercase tracking-widest mb-4">Target Mitra Kami</p>
            <div className="space-y-3">
              {[
                { icon: '🏛️', label: 'Perguruan Tinggi (PTN & PTS)' },
                { icon: '🏫', label: 'SMA/SMK & Lembaga Pendidikan' },
                { icon: '🏢', label: 'Lembaga Pemerintah & BUMN' },
                { icon: '💼', label: 'Perusahaan Swasta & Startup' },
                { icon: '🔬', label: 'Lembaga Riset & Think Tank' },
                { icon: '🌐', label: 'Organisasi Non-Profit & NGO' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 bg-white/8 rounded-xl px-4 py-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/80 text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mitra Dummy */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-8">Telah Bekerja Sama Dengan</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {MITRA_DUMMY.map((name) => (
              <div key={name} className="bg-gray-50 border border-gray-100 rounded-xl py-4 px-2 flex items-center justify-center text-center">
                <span className="text-gray-400 text-xs font-medium">{name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-300 text-xs mt-4">(Logo mitra akan ditambahkan setelah izin publikasi)</p>
        </div>
      </section>

      {/* Form Inquiry */}
      <section id="form-kerjasama" className="py-20 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[#2568B5] text-sm font-semibold uppercase tracking-widest mb-3">Mulai Diskusi</p>
            <h2 className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-gray-900 mb-3">Ajukan Kerja Sama</h2>
            <p className="text-gray-500">Isi formulir berikut dan tim kami akan menghubungi Anda dalam 1×24 jam di hari kerja.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-5">
            {[
              { label: 'Nama Lembaga / Institusi', placeholder: 'Misal: Universitas XYZ', type: 'text' },
              { label: 'Nama Penanggung Jawab', placeholder: 'Nama lengkap PIC', type: 'text' },
              { label: 'Jabatan', placeholder: 'Misal: Kepala Program Studi', type: 'text' },
              { label: 'Email', placeholder: 'email@institusi.ac.id', type: 'email' },
              { label: 'Nomor WhatsApp', placeholder: '08xx-xxxx-xxxx', type: 'tel' },
            ].map(({ label, placeholder, type }) => (
              <div key={label}>
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">{label}</label>
                <input type={type} placeholder={placeholder}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] focus:ring-2 focus:ring-[#2568B5]/10" />
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">Bentuk Kerja Sama yang Diinginkan</label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] bg-white">
                <option>Pilih bentuk kerja sama...</option>
                <option>Pelatihan & Workshop</option>
                <option>Pendampingan Riset</option>
                <option>Program Institusional</option>
                <option>Konsultasi Korporat</option>
                <option>Lainnya</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider block mb-1.5">Deskripsi Kebutuhan</label>
              <textarea rows={4} placeholder="Ceritakan kebutuhan dan gambaran program yang Anda inginkan..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#2568B5] resize-none" />
            </div>
            <a href={WA_LINK('Halo Aji Institute, kami ingin mengajukan kerja sama institusional')}
              target="_blank" rel="noopener noreferrer"
              className="block w-full text-center bg-[#162660] hover:bg-[#2568B5] text-white font-bold py-3.5 rounded-xl transition-colors">
              <MessageCircle className="w-4 h-4 inline mr-2" />
              Kirim via WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
