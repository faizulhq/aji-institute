'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { programsApi } from '@/lib/api';
import { ArrowRight, Clock, Calendar, GraduationCap, Users, ZoomIn, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { WA_LINK } from '@/lib/config';
import type { Program, ProgramDocumentationImage } from '@/lib/types';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.aji-institute.com';

const isUnjaniProgram = (p: Program) =>
  p.tags?.some((t: string) => ['unjani', 'fisip', 'hi', 'praktikum'].includes(t.toLowerCase())) ||
  p.slug?.toLowerCase().includes('unjani') ||
  p.slug?.toLowerCase().includes('praktikum') ||
  p.title?.toLowerCase().includes('unjani') ||
  p.title?.toLowerCase().includes('fisip');

const KERJASAMA_HIGHLIGHTS = [
  { icon: GraduationCap, label: 'Kolaborasi Akademik', desc: 'Kurikulum dirancang bersama dosen & praktisi UNJANI' },
  { icon: Users, label: 'Khusus Mahasiswa UNJANI', desc: 'Mahasiswa Semester Genap Prodi HI Fisip Unjani Angkatan 2025/2026' },
  { icon: Clock, label: '6 Kali Pertemuan', desc: 'Latihan langsung dengan bimbingan ahli' },
];

// Tidak ada static fallback — section hanya muncul jika admin upload foto di Django Admin

/** Ekstrak YouTube video ID dari berbagai format URL */
function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).split('?')[0];
    if (u.hostname.includes('youtube.com')) return u.searchParams.get('v');
  } catch { /* invalid URL */ }
  return null;
}

export function UnjaniPartnership() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [showPlayer, setShowPlayer] = useState(false);

  const { data } = useQuery<Program[]>({
    queryKey: ['unjani-collab-programs'],
    queryFn: () =>
      programsApi.list({ type: 'bootcamp' })
        .then((r) => r.data?.data ?? r.data)
        .then((arr: Program[]) =>
          Array.isArray(arr) ? arr.filter(isUnjaniProgram) : []
        ),
    staleTime: 1000 * 60 * 5,
  });

  const programs = data ?? [];
  const featured = programs[0] ?? null;

  // Fetch detail program Unjani untuk mendapatkan documentation_images secara dinamis
  const { data: featuredDetail } = useQuery({
    queryKey: ['unjani-program-detail', featured?.slug],
    queryFn: () => programsApi.detail(featured!.slug).then((r) => r.data),
    enabled: !!featured?.slug,
    staleTime: 1000 * 60 * 5,
  });

  // Foto dokumentasi dari API — hanya tampil jika admin sudah upload & aktifkan show_documentation
  const dokumentasiFotos: { src: string; caption: string }[] =
    featuredDetail?.show_documentation &&
    Array.isArray(featuredDetail?.documentation_images) &&
    featuredDetail.documentation_images.length > 0
      ? featuredDetail.documentation_images.map((d: ProgramDocumentationImage) => ({
          src: d.image,
          caption: d.caption || `Foto dokumentasi ${d.order}`,
        }))
      : [];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-[#1E6B2E]" />
            <span className="text-[#1E6B2E] text-xs font-bold uppercase tracking-widest">Mitra Kerjasama Institusional</span>
            <span className="w-8 h-px bg-[#1E6B2E]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
            Kerjasama dengan <span className="text-[#1E6B2E]">UNJANI</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            Aji Institute berkolaborasi dengan Universitas Jenderal Achmad Yani dalam
            penyelenggaraan program bootcamp untuk Mahasiswa Semester Genap Prodi HI Fisip Unjani Angkatan 2025/2026.
          </p>
        </div>

        {/* ── Main Card: 2 kolom 50/50 ── */}
        <div className="bg-white border border-gray-100 rounded-3xl shadow-2xl overflow-hidden">
          {/* Accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#1E6B2E] via-[#2D9B44] to-[#F0A500]" />

          <div className="grid lg:grid-cols-2 min-h-[460px]">

            {/* ── KIRI (50%): Info Kerjasama ── */}
            <div className="p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-[#f0faf3] to-white border-r border-gray-100">
              <div>
                {/* Logo pair */}
                <div className="flex items-center gap-3 mb-7">
                  <div className="bg-white rounded-2xl px-3 py-2 border border-gray-100 shadow-sm">
                    <Image src="/images/logo.png" alt="Aji Institute" width={90} height={36} className="h-9 w-auto object-contain" />
                  </div>
                  <span className="text-gray-300 font-bold text-xl">×</span>
                  <div className="bg-white rounded-2xl p-2 border border-gray-100 shadow-sm">
                    <Image src="/images/Logo_Unjani.png" alt="UNJANI" width={48} height={48} className="h-12 w-auto object-contain" />
                  </div>
                </div>

                <p className="text-[#1E6B2E] text-xs font-bold uppercase tracking-widest mb-1">Program Kerjasama</p>
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-2">
                  FISIP HI — UNJANI<br />
                  <span className="text-gray-400 text-base font-semibold">× Aji Institute</span>
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Kolaborasi pengembangan kompetensi riset mahasiswa menggunakan
                  software analisis data kualitatif mutakhir (NVivo).
                </p>

                {/* Highlights */}
                <div className="space-y-3">
                  {KERJASAMA_HIGHLIGHTS.map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#1E6B2E]/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-[#1E6B2E]" />
                      </div>
                      <div>
                        <p className="text-gray-800 text-sm font-semibold leading-tight">{item.label}</p>
                        <p className="text-gray-400 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={WA_LINK('Halo Aji Institute, saya ingin info program kerjasama (Bootcamp Praktikum NVIVO). Bisa bantu?')}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 bg-[#1E6B2E] hover:bg-[#155623] text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors self-start"
              >
                Info Kerjasama <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* ── KANAN (50%): Frame dark dengan [FLYER | CARD] di dalamnya ── */}
            <div className="bg-[#0d1632] p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-5">
                Program dalam Kerjasama ini
              </p>

              {/* Frame: Flyer (kiri) + Card info (kanan) bersebelahan */}
              <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 items-stretch">

                  {/* Flyer image */}
                  <div className="relative border-r border-white/10 overflow-hidden">
                    {featured?.image ? (
                      <div className="relative">
                        <Image
                          src={featured.image.startsWith('http') ? featured.image : `${API}${featured.image}`}
                          alt={featured?.title ?? 'Bootcamp Praktikum NVIVO'}
                          width={0}
                          height={0}
                          sizes="(max-width: 768px) 50vw, 350px"
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                          priority
                        />
                        {/* Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-[#F0A500] text-[#162058] uppercase shadow">Bootcamp</span>
                        </div>
                      </div>
                    ) : (
                      <div className="min-h-[260px] bg-gradient-to-br from-[#162058] to-[#1B3A8C] flex items-center justify-center">
                        <Image src="/images/Logo_Unjani.png" alt="UNJANI" width={48} height={48} className="opacity-30" />
                      </div>
                    )}
                  </div>

                  {/* Card info */}
                  <div className="p-5 flex flex-col justify-between h-full">
                    <div>
                      <p className="text-[#1E6B2E] text-[16px] font-bold uppercase tracking-wider mb-1">FISIP HI UNJANI</p>
                      <h4 className="text-white font-black text-sm leading-tight mb-3 line-clamp-2">
                        {featured?.title ?? 'Bootcamp Praktikum NVIVO'}
                      </h4>
                      <div className="space-y-1.5">
                        {featured?.duration && (
                          <div className="flex items-center gap-1.5 text-[14px] text-white/50">
                            <Clock className="w-3 h-3 text-[#F0A500]" />
                            <span>{featured.duration}</span>
                          </div>
                        )}
                        {featured?.schedule && (
                          <div className="flex items-center gap-1.5 text-[14px] text-white/50">
                            <Calendar className="w-3 h-3 text-[#F0A500]" />
                            <span>{featured.schedule}</span>
                          </div>
                        )}
                        {featured?.facilitator_name && (
                          <div className="flex items-center gap-1.5 text-[14px] text-white/50">
                            <GraduationCap className="w-3 h-3 text-[#F0A500]" />
                            <span>{featured.facilitator_name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ── Dokumentasi Sesi Pelatihan — hanya tampil jika admin sudah upload foto ── */}
        {dokumentasiFotos.length > 0 && (
          <div className="mt-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-[#1E6B2E]/10 flex items-center justify-center shrink-0">
                <Camera className="w-4 h-4 text-[#1E6B2E]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-base leading-tight">Dokumentasi Sesi Pelatihan</h3>
                <p className="text-gray-400 text-xs">Rekaman sesi pelatihan langsung bersama mahasiswa UNJANI — Aji Institute</p>
              </div>
            </div>

            {/* Grid foto dinamis dari API */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {dokumentasiFotos.map((foto, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIdx(i)}
                  className="relative rounded-xl overflow-hidden border border-gray-100 shadow-sm bg-gray-50 aspect-video group cursor-zoom-in"
                  title={foto.caption}
                >
                  <Image
                    src={foto.src}
                    alt={foto.caption}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-white drop-shadow" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Video YouTube — hanya tampil jika admin mengisi youtube_url ── */}
        {featuredDetail?.youtube_url && (() => {
          const videoId = getYouTubeId(featuredDetail.youtube_url);
          if (!videoId) return null;
          return (
            <div className="mt-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  {/* YouTube icon */}
                  <svg className="w-4 h-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-base leading-tight">Video Rekaman Pelatihan</h3>
                  <p className="text-gray-400 text-xs">Rekaman sesi bootcamp UNJANI × Aji Institute</p>
                </div>
              </div>

              {/* Thumbnail facade → iframe on click */}
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black" style={{ aspectRatio: '16/9' }}>
                {showPlayer ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title="Video Rekaman Pelatihan"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <button
                    onClick={() => setShowPlayer(true)}
                    className="relative w-full h-full group"
                    aria-label="Putar video"
                  >
                    {/* Thumbnail */}
                    <Image
                      src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                      alt="Thumbnail video pelatihan"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 800px"
                      unoptimized
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                        <svg className="w-7 h-7 text-white ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
          );
        })()}

        {/* Lightbox */}
        {lightboxIdx !== null && (
          <div
            className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightboxIdx(null)}
              className="absolute top-4 right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>
            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx - 1 + dokumentasiFotos.length) % dokumentasiFotos.length); }}
              className="absolute left-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            {/* Image */}
            <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                <Image
                  src={dokumentasiFotos[lightboxIdx].src}
                  alt={dokumentasiFotos[lightboxIdx].caption}
                  fill
                  className="object-contain rounded-xl shadow-2xl"
                  sizes="90vw"
                />
              </div>
              <p className="text-white/70 text-sm text-center mt-3">
                {lightboxIdx + 1} / {dokumentasiFotos.length} — {dokumentasiFotos[lightboxIdx].caption}
              </p>
            </div>
            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((lightboxIdx + 1) % dokumentasiFotos.length); }}
              className="absolute right-4 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        {/* CTA bawah */}
        <div className="text-center mt-10">
          <p className="text-gray-400 text-sm mb-3">Tertarik mengadakan kerjasama serupa untuk institusi Anda?</p>
          <Link
            href="/in-house-training"
            className="inline-flex items-center gap-2 border-2 border-[#2348A8] text-[#2348A8] hover:bg-[#2348A8] hover:text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
          >
            Pelajari Kerjasama Institusional <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
