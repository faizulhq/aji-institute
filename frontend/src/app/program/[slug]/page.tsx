'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock, Calendar, Users, CheckCircle, Star, ShoppingCart,
  MessageCircle, ArrowLeft, BookOpen, Award, Video, ChevronDown, ChevronUp
} from 'lucide-react';
import { programsApi, cartApi } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { formatPrice, STATUS_LABELS, STATUS_COLORS, cn } from '@/lib/utils';
import { WA_LINK } from '@/lib/config';
import type { Program } from '@/lib/types';

const TYPE_LABEL: Record<string, string> = {
  'bootcamp': 'Bootcamp Intensif',
  'short-class': 'Short Class',
  'private-class': 'Private Class',
};

const WHAT_YOU_GET = [
  { icon: Video, label: 'Rekaman sesi seumur hidup' },
  { icon: BookOpen, label: 'Modul & materi tertulis' },
  { icon: Award, label: 'Sertifikat kelulusan resmi' },
  { icon: Users, label: 'Akses grup diskusi alumni' },
  { icon: CheckCircle, label: 'Dataset riset untuk praktik' },
  { icon: MessageCircle, label: 'Konsultasi lanjutan via WA' },
];

export default function ProgramDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const qc = useQueryClient();
  const [showFullCurriculum, setShowFullCurriculum] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['program', slug],
    queryFn: () => programsApi.detail(slug).then((r) => r.data),
  });

  const program: Program | undefined = data; // API detail mengembalikan object langsung, bukan {data: ...}

  const cartMutation = useMutation({
    mutationFn: () => cartApi.add(program!.id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    },
    onError: () => alert('Gagal menambah ke keranjang. Coba lagi.'),
  });

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    cartMutation.mutate();
  };

  if (isLoading) return (
    <div className="max-w-5xl mx-auto px-4 py-20 animate-pulse space-y-6">
      <div className="h-8 bg-gray-200 rounded-xl w-3/4" />
      <div className="h-4 bg-gray-100 rounded-xl" />
      <div className="h-4 bg-gray-100 rounded-xl w-2/3" />
      <div className="grid grid-cols-3 gap-4 mt-8">
        {[...Array(3)].map((_, i) => <div key={i} className="h-32 bg-gray-100 rounded-2xl" />)}
      </div>
    </div>
  );

  if (isError || !program) return (
    <div className="text-center py-32">
      <p className="text-5xl mb-4">😕</p>
      <h2 className="font-bold text-xl text-gray-800 mb-2">Program tidak ditemukan</h2>
      <Link href="/bootcamp" className="text-[#2568B5] text-sm hover:underline">← Lihat semua program</Link>
    </div>
  );

  const curriculum = program.curriculum ?? [];
  const testimonials = program.testimonials ?? [];
  const visibleCurriculum = showFullCurriculum ? curriculum : curriculum.slice(0, 6);

  const discount = program.original_price
    ? Math.round((1 - program.price / program.original_price) * 100)
    : null;

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="bg-[#0C1A45] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: program.thumbnail_color }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex gap-2 text-white/40 text-sm mb-8 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Beranda</Link>
            <span>/</span>
            <Link href={`/${program.type}`} className="hover:text-white transition-colors capitalize">
              {TYPE_LABEL[program.type]}
            </Link>
            <span>/</span>
            <span className="text-white/70 line-clamp-1">{program.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left: Info */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-xs font-bold bg-[#2568B5]/40 border border-[#2568B5]/50 text-white px-3 py-1 rounded-full">
                  {TYPE_LABEL[program.type]}
                </span>
                <span className={cn('text-xs font-semibold px-3 py-1 rounded-full', STATUS_COLORS[program.status])}>
                  {STATUS_LABELS[program.status]}
                </span>
                {program.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs bg-white/10 text-white/75 px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>

              <h1 className="font-[family-name:var(--font-poppins)] text-3xl sm:text-4xl font-bold text-white mb-5 leading-snug">
                {program.title}
              </h1>

              {program.description && (
                <p className="text-white/70 text-base leading-relaxed mb-7">{program.description}</p>
              )}

              {/* Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {program.duration && (
                  <div className="bg-white/8 border border-white/12 rounded-xl p-4 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[#4FA8D8] shrink-0" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">Durasi</p>
                      <p className="text-white text-sm font-medium">{program.duration}</p>
                    </div>
                  </div>
                )}
                {program.schedule && (
                  <div className="bg-white/8 border border-white/12 rounded-xl p-4 flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#4FA8D8] shrink-0" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">Jadwal</p>
                      <p className="text-white text-sm font-medium">{program.schedule}</p>
                    </div>
                  </div>
                )}
                {program.facilitator_name && (
                  <div className="bg-white/8 border border-white/12 rounded-xl p-4 flex items-center gap-3">
                    <Users className="w-5 h-5 text-[#4FA8D8] shrink-0" />
                    <div>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider">Fasilitator</p>
                      <p className="text-white text-sm font-medium">{program.facilitator_name}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Purchase Card (desktop) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl p-6 shadow-2xl sticky top-20">
                <div className="mb-4">
                  {program.original_price && (
                    <p className="text-gray-400 text-sm line-through">{formatPrice(program.original_price)}</p>
                  )}
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-[#162660]">{formatPrice(program.price)}</p>
                    {discount && (
                      <span className="bg-red-50 text-red-500 text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={cartMutation.isPending || addedToCart}
                  className={cn(
                    'w-full flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl transition-all mb-3 text-sm',
                    addedToCart
                      ? 'bg-emerald-500 text-white'
                      : 'bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45]'
                  )}
                >
                  {addedToCart ? (
                    <><CheckCircle className="w-4 h-4" /> Ditambahkan!</>
                  ) : cartMutation.isPending ? (
                    'Menambahkan...'
                  ) : (
                    <><ShoppingCart className="w-4 h-4" /> Tambah ke Keranjang</>
                  )}
                </button>

                <a
                  href={WA_LINK(`Halo, saya tertarik dengan program: ${program.title}. Bisa info lebih lanjut?`)}
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" /> Tanya via WhatsApp
                </a>

                <ul className="mt-5 space-y-2">
                  {WHAT_YOU_GET.slice(0, 4).map(({ icon: Icon, label }) => (
                    <li key={label} className="flex items-center gap-2 text-xs text-gray-600">
                      <Icon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE PURCHASE BAR ─── */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-100 shadow-2xl px-4 py-3 flex items-center gap-3">
        <div className="flex-1">
          <p className="text-[#162660] font-bold text-lg leading-none">{formatPrice(program.price)}</p>
          {discount && <p className="text-gray-400 text-xs line-through">{formatPrice(program.original_price!)}</p>}
        </div>
        <a href={WA_LINK(`Halo, saya tertarik dengan: ${program.title}`)}
          target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 font-semibold px-4 py-2.5 rounded-xl text-sm">
          <MessageCircle className="w-4 h-4" />WA
        </a>
        <button
          onClick={handleAddToCart}
          disabled={cartMutation.isPending || addedToCart}
          className="flex items-center gap-2 bg-[#F0A500] hover:bg-[#C8870A] text-[#0C1A45] font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          {addedToCart ? 'Ditambahkan!' : 'Keranjang'}
        </button>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 pb-28 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">

            {/* Yang akan dipelajari */}
            {curriculum.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">📚 Kurikulum Program</h2>
                <div className="border border-gray-100 rounded-2xl overflow-hidden">
                  {visibleCurriculum.map((item, i) => (
                    <div key={i} className={cn(
                      'flex items-start gap-4 px-5 py-4',
                      i % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                      i > 0 && 'border-t border-gray-100'
                    )}>
                      <div className="w-7 h-7 bg-[#162660] rounded-lg text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 text-sm pt-1">{item}</p>
                    </div>
                  ))}
                </div>
                {curriculum.length > 6 && (
                  <button
                    onClick={() => setShowFullCurriculum(!showFullCurriculum)}
                    className="mt-4 flex items-center gap-1.5 text-[#2568B5] text-sm font-semibold hover:underline"
                  >
                    {showFullCurriculum ? (
                      <><ChevronUp className="w-4 h-4" /> Tampilkan lebih sedikit</>
                    ) : (
                      <><ChevronDown className="w-4 h-4" /> Lihat {curriculum.length - 6} modul lainnya</>
                    )}
                  </button>
                )}
              </section>
            )}

            {/* Fasilitator */}
            {program.facilitator_name && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">👨‍🏫 Fasilitator</h2>
                <div className="bg-white border border-gray-100 rounded-2xl p-6 flex gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#162660] to-[#2568B5] flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {program.facilitator_name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{program.facilitator_name}</p>
                    {program.facilitator_title && (
                      <p className="text-[#2568B5] text-sm font-medium mb-3">{program.facilitator_title}</p>
                    )}
                    {program.facilitator_bio && (
                      <p className="text-gray-500 text-sm leading-relaxed">{program.facilitator_bio}</p>
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Untuk siapa */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-5">🎯 Untuk Siapa Program Ini?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  'Mahasiswa S1, S2, dan S3 yang sedang mengerjakan skripsi/tesis/disertasi',
                  'Dosen dan peneliti yang ingin meningkatkan kompetensi analisis data',
                  'Praktisi dan profesional yang membutuhkan keterampilan riset berbasis data',
                  'Pemula yang ingin mulai belajar statistik dan analisis data dari nol',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
                    <CheckCircle className="w-4 h-4 text-[#2568B5] shrink-0 mt-0.5" />
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Testimoni */}
            {testimonials.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-5">⭐ Apa Kata Peserta?</h2>
                <div className="space-y-4">
                  {testimonials.map((t) => (
                    <div key={t.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                      <div className="flex gap-1 mb-3">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#F0A500] text-[#F0A500]" />
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm italic mb-4">"{t.comment}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#162660] to-[#2568B5] flex items-center justify-center text-white text-xs font-bold">
                          {t.avatar || t.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 text-sm">{t.name}</p>
                          <p className="text-gray-400 text-xs">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar: Yang Didapatkan */}
          <div className="hidden lg:block">
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">✅ Yang Akan Anda Dapatkan</h3>
              <ul className="space-y-3">
                {WHAT_YOU_GET.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 text-sm">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back to listing */}
            <Link
              href={`/${program.type}`}
              className="mt-4 flex items-center gap-2 text-gray-500 hover:text-[#2568B5] text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Kembali ke daftar program
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
