'use client';

import Link from 'next/link';
import { Clock, Calendar, ArrowRight, Users } from 'lucide-react';
import { formatPrice, STATUS_LABELS, STATUS_COLORS, cn } from '@/lib/utils';
import type { Program } from '@/lib/types';

interface Props { program: Program; }

const TYPE_CONFIG = {
  'bootcamp': { label: 'Bootcamp Intensif', color: 'bg-[#1B3A8C] text-white' },
  'short-class': { label: 'Short Class', color: 'bg-[#F0A500] text-[#162058]' },
  'private-class': { label: 'Private Class', color: 'bg-[#0d1632] text-white' },
};

/**
 * Deteksi apakah program ini milik AjiStat.
 * Program AjiStat = punya tag 'ajistat' ATAU tidak punya tag divisi lain.
 * KECUALI: brand aji-institute → selalu internal (bukan AjiStat).
 */
function isAjiStatProgram(tags: string[], brand?: string): boolean {
  if (brand === 'aji-institute') return false;
  const t = tags.map((s) => s.toLowerCase());
  const otherDivisions = ['ajibiz', 'ajicomm', 'ajiai', 'ajilingua'];
  return t.includes('ajistat') || !t.some((tag) => otherDivisions.includes(tag));
}

export function ProgramCard({ program }: Props) {
  const typeConf = TYPE_CONFIG[program.type as keyof typeof TYPE_CONFIG] ?? TYPE_CONFIG['bootcamp'];
  const discount = program.original_price
    ? Math.round((1 - program.price / program.original_price) * 100)
    : null;

  // aji-institute brand → internal; AjiStat → ajistat.aji-institute.com; lainnya → internal
  const isAjiStat = isAjiStatProgram(program.tags, program.brand);
  const cardHref = isAjiStat
    ? `https://ajistat.aji-institute.com/program/${program.slug}`
    : `/program/${program.slug}`;
  const isExternal = isAjiStat;

  const cardClassName = "group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(27,58,140,0.12)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden";

  const cardContent = (
    <>
      {/* Color Banner */}
      <div
        className="relative h-32 flex items-end justify-between px-5 pb-4"
        style={{ background: `linear-gradient(135deg, ${program.thumbnail_color} 0%, ${program.thumbnail_color}dd 60%, #1B3A8C 100%)` }}
      >
        {/* Decorative AJI watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span className="text-white/10 text-8xl font-black select-none tracking-tighter opacity-70 mix-blend-overlay">AJI</span>
        </div>

        <div className="relative flex items-center gap-2">
          <span className={cn('text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm', typeConf.color)}>
            {typeConf.label}
          </span>
        </div>

        <div className="relative">
          <span className={cn('text-[10px] font-bold px-3 py-1 rounded-full shadow-sm', STATUS_COLORS[program.status])}>
            {STATUS_LABELS[program.status]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {program.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 font-bold uppercase tracking-wider px-2 py-1 rounded border border-gray-100 group-hover:bg-blue-50 group-hover:text-[#2348A8] group-hover:border-blue-100 transition-colors">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-[1.1rem] leading-snug mb-3 line-clamp-2 group-hover:text-[#2348A8] transition-colors">
          {program.title}
        </h3>

        {/* Short Description */}
        {program.description && (
          <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2">
            {program.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex flex-col gap-2 mb-5 mt-auto">
          {program.duration && (
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <Clock className="w-3.5 h-3.5 text-[#F0A500] shrink-0" />
              <span className="font-medium">{program.duration}</span>
            </div>
          )}
          {program.schedule && (
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <Calendar className="w-3.5 h-3.5 text-[#F0A500] shrink-0" />
              <span className="font-medium">{program.schedule}</span>
            </div>
          )}
          {program.facilitator_name && (
            <div className="flex items-center gap-2.5 text-xs text-gray-600">
              <Users className="w-3.5 h-3.5 text-[#F0A500] shrink-0" />
              <span className="font-medium">{program.facilitator_name}</span>
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="border-t border-gray-100 pt-4 flex items-center justify-between mt-auto">
          <div>
            {program.original_price && (
              <p className="text-[10px] font-medium text-gray-400 line-through mb-0.5">{formatPrice(program.original_price)}</p>
            )}
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-gray-900">{formatPrice(program.price)}</span>
              {discount && (
                <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">-{discount}%</span>
              )}
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-[#2348A8] transition-colors">
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </>
  );

  // External → <a> with target _blank; Internal → <Link> for SPA navigation
  if (isExternal) {
    return (
      <a href={cardHref} target="_blank" rel="noopener noreferrer" className={cardClassName}>
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={cardHref} className={cardClassName}>
      {cardContent}
    </Link>
  );
}

