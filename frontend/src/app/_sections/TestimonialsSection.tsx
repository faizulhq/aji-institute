'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/api';

type Testimonial = {
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
};

export function TestimonialsSection() {
  const { data: dbTestimonials, isLoading } = useQuery({
    queryKey: ['cms', 'testimonials'],
    queryFn: async () => {
      const res = await cmsApi.testimonials();
      return res.data as Testimonial[];
    },
    staleTime: 1000 * 60 * 5,
  });

  const displayTestimonials = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : [];

  if (isLoading || displayTestimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#162058] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#1B3A8C] to-transparent opacity-50 pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#F0A500]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-[#F0A500] text-sm font-bold uppercase tracking-widest mb-3">Testimoni Alumni</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white">Apa Kata Mereka?</h2>
        </div>

        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 hide-scrollbar">
          {displayTestimonials.map((t, i) => (
            <div key={i} className="shrink-0 w-[300px] sm:w-[400px] bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 snap-center flex flex-col hover:bg-white/10 transition-colors">
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-[#F0A500] fill-current" />
                ))}
              </div>
              <p className="text-white/90 text-lg leading-relaxed flex-1 mb-8 italic">
                &quot;{t.content}&quot;
              </p>
              <div className="flex items-center gap-4">
                {t.image ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border-2 border-[#1B3A8C]">
                    <Image src={t.image} alt={t.name} width={48} height={48} className="object-cover w-full h-full" />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#1B3A8C] text-white flex items-center justify-center font-bold shrink-0">
                    {t.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-white/60 text-sm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
