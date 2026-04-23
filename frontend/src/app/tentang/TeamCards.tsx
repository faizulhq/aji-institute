'use client';

import { useState } from 'react';
import { X, Loader2, BarChart2, Briefcase, Radio, Monitor, Globe } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/api';

/* ── Types ──────────────────────────────────────────────────────── */
type TeamMember = {
  id?: number;
  name: string;
  role: string;
  initials: string;
  description?: string;
  desc?: string;
  detail?: string;
  accent_color?: string;
  accent_light?: string;
  image?: string | null;
  is_ceo?: boolean;
  tags?: string[] | string;
  order?: number;
};

/* ── Division config — satu warna brand, ikon SVG berbeda ────────── */
const BRAND = { color: '#1B3A8C', bg: '#EEF2FF', border: '#c7d2fe', dot: '#2348A8' };

const DIVISION_CONFIG: Record<string, {
  label: string;
  Icon: React.ElementType;
}> = {
  AjiStat:   { label: 'AjiStat',   Icon: BarChart2  },
  AjiBiz:    { label: 'AjiBiz',    Icon: Briefcase  },
  AjiComm:   { label: 'AjiComm',   Icon: Radio      },
  AjiAI:     { label: 'AjiAI',     Icon: Monitor    },
  AjiLingua: { label: 'AjiLingua', Icon: Globe      },
};

/* ── Detect division ────────────────────────────────────────────── */
function getDivisionKey(member: TeamMember): string {
  const src = `${member.name} ${member.role}`.toLowerCase();
  if (src.includes('ajistat'))   return 'AjiStat';
  if (src.includes('ajibiz'))    return 'AjiBiz';
  if (src.includes('ajicomm'))   return 'AjiComm';
  if (src.includes('ajiai'))     return 'AjiAI';
  if (src.includes('ajilingua')) return 'AjiLingua';
  return 'AjiStat';
}

/* ── Fallback data ──────────────────────────────────────────────── */
const TEAM_FALLBACK: TeamMember[] = [
  {
    name: 'Aji Pamoso, S.Si, M.T',
    role: 'CEO Aji Institute | Lead Expert AjiStat',
    initials: 'AP',
    accent_color: BRAND.color,
    accent_light: BRAND.bg,
    image: '/images/team/foto-aji-pamoso.jpeg',
    desc: 'Praktisi bidang marketing riset, metodologi, statistik, kewirausahaan dan penelitian operasional.',
    detail: 'Aji Pamoso, S.Si, M.T adalah CEO Aji Institute sekaligus Lead Expert AjiStat. Beliau adalah praktisi bidang marketing riset, metodologi, statistik, kewirausahaan, dan penelitian operasional yang telah mendampingi ribuan mahasiswa, peneliti, dan institusi di seluruh Indonesia.',
    tags: ['SPSS', 'SmartPLS', 'R Studio', 'Python', 'AMOS', 'Metodologi Riset'],
    is_ceo: false,
  },
  {
    name: 'Tim Fasilitator AjiBiz',
    role: 'Business & Management Trainer',
    initials: 'BZ',
    accent_color: BRAND.color,
    accent_light: BRAND.bg,
    image: null,
    desc: 'Praktisi bisnis dan manajemen dengan latar belakang MBA dan pengalaman korporat lebih dari 10 tahun.',
    detail: 'Tim AjiBiz menghadirkan pelatihan bisnis dan manajemen yang berorientasi pada praktik nyata. Diperkuat oleh praktisi korporat dan konsultan bisnis berpengalaman, kami menyentuh topik dari perencanaan strategis, pengembangan SDM, analisis keuangan, hingga transformasi digital organisasi.',
    tags: ['Business Strategy', 'Manajemen SDM', 'Financial Planning', 'Leadership', 'MBA'],
    is_ceo: false,
  },
  {
    name: 'Dr. Eriyanti Nurmala Dewi, Dra, M.Ikom',
    role: 'Lead Expert AjiComm',
    initials: 'EN',
    accent_color: BRAND.color,
    accent_light: BRAND.bg,
    image: '/images/team/foto-tim-expert-ajicomm.jpeg',
    desc: 'Practitioner in journalism, media studies, and government communications.',
    detail: 'Practitioner Lecturer in the Communication Science Study Program, Faculty of Communication and Design. Her areas of expertise are journalism, media studies and government communications.',
    tags: ['Journalism', 'Media Studies', 'Government Comm.', 'Public Relations', 'Media Relations'],
    is_ceo: false,
  },
  {
    name: 'Tim Fasilitator AjiAI',
    role: 'Digital Marketing & Developer',
    initials: 'DG',
    accent_color: BRAND.color,
    accent_light: BRAND.bg,
    image: null,
    desc: 'Expert praktisi industri dalam pengembangan strategi digital, konten kreatif, dan teknologi komputasi modern.',
    detail: 'Tim AjiAI adalah gabungan praktisi pemasaran digital dan pengembang teknologi yang aktif di industri. Dari strategi media sosial, SEO, iklan berbayar, hingga pengembangan aplikasi — kami mengajarkan apa yang benar-benar dibutuhkan dunia kerja digital saat ini.',
    tags: ['Digital Marketing', 'SEO/SEM', 'Content Strategy', 'Web Dev', 'Data Analytics'],
    is_ceo: false,
  },
  {
    name: 'Tim Fasilitator AjiLingua',
    role: 'English & Academic Instructor',
    initials: 'LG',
    accent_color: BRAND.color,
    accent_light: BRAND.bg,
    image: null,
    desc: 'Pengajar bahasa Inggris setingkat ahli dengan spesialisasi persiapan tes akademik dan komunikasi bisnis global.',
    detail: 'Tim AjiLingua mengkhususkan diri dalam pengajaran bahasa Inggris untuk keperluan akademik dan profesional. Dengan pendekatan komunikatif dan kontekstual, kami membantu peserta meningkatkan kemampuan berbicara, menulis akademis, serta mempersiapkan diri untuk ujian IELTS, TOEFL, dan seleksi beasiswa internasional.',
    tags: ['IELTS/TOEFL', 'Academic Writing', 'Business English', 'Conversation', 'Grammar'],
    is_ceo: false,
  },
];

/* ── Helpers ────────────────────────────────────────────────────── */
function getDesc(m: TeamMember) { return m.description || m.desc || ''; }

function parseTags(tags: string[] | string | undefined): string[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return tags.split(',').map((t) => t.trim()).filter(Boolean);
}

/* ── Division Badge — warna brand seragam, ikon SVG berbeda ─────── */
function DivisionBadge({ member }: { member: TeamMember }) {
  const key = getDivisionKey(member);
  const cfg = DIVISION_CONFIG[key];
  const { Icon } = cfg;
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full border"
      style={{ color: BRAND.color, backgroundColor: BRAND.bg, borderColor: BRAND.border }}
    >
      <Icon className="w-3 h-3 shrink-0" style={{ color: BRAND.dot }} />
      {cfg.label}
    </span>
  );
}

/* ── Card component ─────────────────────────────────────────────── */
function TeamCard({ member, onOpen }: { member: TeamMember; onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="group text-left bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] flex flex-col"
      style={{ '--tw-ring-color': BRAND.color } as React.CSSProperties}
    >
      {/* Image at Top */}
      <div className="relative w-full aspect-[4/3] bg-[#EEF2FF] shrink-0 border-b border-gray-100 overflow-hidden">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-[#1B3A8C] opacity-20">
            {member.initials}
          </div>
        )}
        
        {/* Floating badge */}
        <div className="absolute top-4 right-4 z-10 shadow-sm">
          <DivisionBadge member={member} />
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        {/* Name & Role */}
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">{member.name}</h3>
          <p className="text-sm font-medium mt-1.5 line-clamp-2 text-[#2348A8]">{member.role}</p>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">{getDesc(member)}</p>

        {/* See details link */}
        <div className="mt-auto flex items-center justify-between">
           <div className="h-0.5 w-8 rounded-full bg-[#1B3A8C] group-hover:w-16 transition-all duration-300" />
           <span className="text-xs font-semibold text-[#2348A8] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             Lihat Detail →
           </span>
        </div>
      </div>
    </button>
  );
}

/* ── Modal ──────────────────────────────────────────────────────── */
function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const tags = parseTags(member.tags);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(10,20,50,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col sm:flex-row max-h-[95vh] sm:max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-gray-800 transition-colors sm:bg-gray-100 sm:hover:bg-gray-200 sm:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Portrait Image */}
        <div className="sm:w-[45%] shrink-0 bg-[#EEF2FF] relative h-72 sm:h-auto overflow-hidden">
          {member.image ? (
            <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover object-top" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-[#1B3A8C] opacity-20">
              {member.initials}
            </div>
          )}
          {/* Gradient Overlay for mobile readability if close button overlaps */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/20 to-transparent sm:hidden" />
        </div>

        {/* Right Side: Content */}
        <div className="p-6 sm:p-10 sm:w-[55%] overflow-y-auto flex flex-col">
          <div className="mb-6 inline-block">
            <DivisionBadge member={member} />
          </div>

          <h3 className="font-bold text-gray-900 text-2xl sm:text-3xl mb-2 leading-tight">{member.name}</h3>
          <p className="text-base sm:text-lg font-medium text-[#2348A8] mb-8">{member.role}</p>

          <div className="prose prose-sm sm:prose-base prose-blue text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
            {member.detail || getDesc(member)}
          </div>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#EEF2FF] text-[#1B3A8C] border border-[#c7d2fe]">
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────────────── */
export function TeamCards() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const { data: apiTeams, isLoading } = useQuery({
    queryKey: ['cms', 'teams'],
    queryFn: async () => {
      const res = await cmsApi.teams();
      const all = res.data as TeamMember[];
      return all.filter((t) => !t.is_ceo);
    },
    staleTime: 1000 * 60 * 5,
  });

  const displayTeams: TeamMember[] =
    apiTeams && apiTeams.length > 0 ? apiTeams : TEAM_FALLBACK;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-[#1B3A8C] animate-spin" />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-5">
        {displayTeams.map((member) => (
          <TeamCard key={member.id ?? member.name} member={member} onOpen={() => setSelected(member)} />
        ))}
      </div>
      {selected && <TeamModal member={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
