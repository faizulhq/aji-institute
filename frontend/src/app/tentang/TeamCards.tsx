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
    role: 'Founder & CEO Aji Institute | Lead Expert AjiStat',
    initials: 'AP',
    accent_color: BRAND.color,
    accent_light: BRAND.bg,
    image: '/images/team/foto-aji-pamoso.jpeg',
    desc: 'Praktisi bidang marketing riset, metodologi, statistik, kewirausahaan dan penelitian operasional.',
    detail: 'Aji Pamoso, S.Si, M.T adalah Founder & CEO Aji Institute sekaligus Lead Expert AjiStat. Beliau adalah praktisi bidang marketing riset, metodologi, statistik, kewirausahaan, dan penelitian operasional yang telah mendampingi ribuan mahasiswa, peneliti, dan institusi di seluruh Indonesia.',
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
      className="group text-left bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
      style={{ '--tw-ring-color': BRAND.color } as React.CSSProperties}
    >
      {/* Brand color bar at top */}
      <div className="h-1 bg-[#1B3A8C]" />

      <div className="p-6">
        {/* Division badge + Lihat arrow */}
        <div className="flex items-center justify-between mb-4">
          <DivisionBadge member={member} />
          <span className="text-xs font-semibold text-[#2348A8] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Lihat Detail →
          </span>
        </div>

        {/* Avatar + name row */}
        <div className="flex items-center gap-3 mb-4">
          {member.image ? (
            <div
              className="w-14 h-14 rounded-xl overflow-hidden shadow-sm shrink-0 border-2"
              style={{ borderColor: BRAND.border }}
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          ) : (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
              style={{ backgroundColor: BRAND.bg, color: BRAND.color }}
            >
              {member.initials}
            </div>
          )}
          <div className="min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm leading-tight line-clamp-2">{member.name}</h3>
            <p className="text-xs font-medium mt-0.5 line-clamp-1 text-[#2348A8]">{member.role}</p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{getDesc(member)}</p>

        {/* Accent underline */}
        <div className="mt-5 h-0.5 w-8 rounded-full bg-[#1B3A8C] group-hover:w-full transition-all duration-300" />
      </div>
    </button>
  );
}

/* ── Modal ──────────────────────────────────────────────────────── */
function TeamModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const tags = parseTags(member.tags);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10,20,50,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1.5 bg-[#1B3A8C]" />

        <div className="p-7">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>

          <div className="mb-4">
            <DivisionBadge member={member} />
          </div>

          {/* Avatar + name */}
          <div className="flex items-center gap-4 mb-5">
            {member.image ? (
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0 border-2 border-[#c7d2fe]">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 bg-[#EEF2FF] text-[#1B3A8C]">
                {member.initials}
              </div>
            )}
            <div>
              <h3 className="font-bold text-gray-900 text-base">{member.name}</h3>
              <p className="text-sm font-medium text-[#2348A8]">{member.role}</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-6">{member.detail || getDesc(member)}</p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-[#EEF2FF] text-[#1B3A8C] border border-[#c7d2fe]">
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
