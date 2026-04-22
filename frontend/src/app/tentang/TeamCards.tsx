'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/api';

type TeamMember = {
  name: string;
  role: string;
  initials: string;
  desc: string;
  accent_color?: string;
  accent_light?: string;
  accent?: string;
  accentLight?: string;
  image?: string;
  is_ceo?: boolean;
  tags?: string[] | string;
  detail?: string;
};

const TEAM: TeamMember[] = [
  {
    name: 'Tim Fasilitator AjiStat',
    role: 'Konsultan Statistik & Peneliti',
    initials: 'ST',
    accent: '#1B3A8C',
    accentLight: '#EEF2FF',
    desc: 'Bekerja di bawah supervisi langsung dari Lead Expert Aji Pamoso untuk analisis data riset akademik dan industri.',
    tags: ['SPSS', 'SmartPLS', 'R Studio', 'Python', 'AMOS', 'Metodologi Riset'],
    detail: 'Tim AjiStat terdiri dari para konsultan statistik dan peneliti berpengalaman yang bekerja secara langsung di bawah supervisi ketat Lead Expert Aji Pamoso. Kami telah mendampingi lebih dari 5.000 mahasiswa, akademisi, dan peneliti di seluruh Indonesia. Spesialisasi kami mencakup analisis data kuantitatif, uji validitas & reliabilitas, analisis regresi, SEM-PLS, hingga penulisan laporan ilmiah yang terstandar.',
  },
  {
    name: 'Tim Fasilitator AjiBiz',
    role: 'Business & Management Trainer',
    initials: 'BZ',
    accent: '#1B3A8C',
    accentLight: '#EEF2FF',
    desc: 'Praktisi bisnis dan manajemen dengan latar belakang MBA dan pengalaman korporat lebih dari 10 tahun.',
    tags: ['Business Strategy', 'Manajemen SDM', 'Financial Planning', 'Leadership', 'MBA'],
    detail:
      'Tim AjiBiz menghadirkan pelatihan bisnis dan manajemen yang berorientasi pada praktik nyata. Diperkuat oleh praktisi korporat dan konsultan bisnis berpengalaman, kami menyentuh topik dari perencanaan strategis, pengembangan SDM, analisis keuangan, hingga transformasi digital organisasi.',
  },
  {
    name: 'Tim Fasilitator AjiComm',
    role: 'PR & Communication Expert',
    initials: 'PR',
    accent: '#1B3A8C',
    accentLight: '#EEF2FF',
    desc: 'Trainer komunikasi publik, media relation, dan personal branding bersertifikat dengan jam terbang tinggi.',
    tags: ['Public Speaking', 'Media Relations', 'Personal Branding', 'Crisis Comm.', 'LinkedIn'],
    detail:
      'Tim AjiComm adalah para ahli komunikasi yang berpengalaman di bidang public relations, jurnalistik, dan media. Kami membantu individu dan organisasi membangun citra profesional, mengelola hubungan media, serta menguasai komunikasi krisis dan personal branding di era digital.',
  },
  {
    name: 'Tim Fasilitator AjiAI',
    role: 'Digital Marketing & Developer',
    initials: 'DG',
    accent: '#1B3A8C',
    accentLight: '#EEF2FF',
    desc: 'Expert praktisi industri dalam pengembangan strategi digital, konten kreatif, dan teknologi komputasi modern.',
    tags: ['Digital Marketing', 'SEO/SEM', 'Content Strategy', 'Web Dev', 'Data Analytics'],
    detail:
      'Tim AjiAI adalah gabungan praktisi pemasaran digital dan pengembang teknologi yang aktif di industri. Dari strategi media sosial, SEO, iklan berbayar, hingga pengembangan aplikasi — kami mengajarkan apa yang benar-benar dibutuhkan dunia kerja digital saat ini.',
  },
  {
    name: 'Tim Fasilitator AjiLingua',
    role: 'English & Academic Instructor',
    initials: 'LG',
    accent: '#1B3A8C',
    accentLight: '#EEF2FF',
    desc: 'Pengajar bahasa Inggris setingkat ahli dengan spesialisasi persiapan tes akademik dan komunikasi bisnis global.',
    tags: ['IELTS/TOEFL', 'Academic Writing', 'Business English', 'Conversation', 'Grammar'],
    detail:
      'Tim AjiLingua mengkhususkan diri dalam pengajaran bahasa Inggris untuk keperluan akademik dan profesional. Dengan pendekatan komunikatif dan kontekstual, kami membantu peserta meningkatkan kemampuan berbicara, menulis akademis, serta mempersiapkan diri untuk ujian IELTS, TOEFL, dan seleksi beasiswa internasional.',
  },
];

export function TeamCards() {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  const { data: dbTeams, isLoading } = useQuery({
    queryKey: ['cms', 'teams'],
    queryFn: async () => {
      const res = await cmsApi.teams();
      // Filter out CEO, only keep non-CEO
      const allTeams = res.data as TeamMember[];
      return allTeams.filter(t => !t.is_ceo);
    },
    staleTime: 1000 * 60 * 5, // cache 5 menit
  });

  // Fallback to local TEAM if api fails/empty
  const displayTeams = dbTeams && dbTeams.length > 0 
    ? dbTeams 
    : TEAM.map(t => ({
        ...t,
        accent_color: t.accent,
        accent_light: t.accentLight,
        tags: t.tags,
        is_ceo: false
      })) as TeamMember[];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 text-[#1B3A8C] animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Cards — flex so last row centers automatically */}
      <div className="flex flex-wrap justify-center gap-5">
        {displayTeams.map((member) => (
          <button
            key={member.name}
            onClick={() => setSelected(member)}
            className="group text-left bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
            style={{ '--tw-ring-color': member.accent_color } as React.CSSProperties}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-5">
              {member.image ? (
                <div className="w-14 h-14 rounded-xl overflow-hidden shadow-sm shrink-0">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
              ) : (
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: member.accent_light, color: member.accent_color }}
                >
                  {member.initials}
                </div>
              )}
              <span
                className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ color: member.accent_color }}
              >
                Lihat Detail →
              </span>
            </div>

            {/* Content */}
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{member.name}</h3>
            <p className="text-xs font-medium mb-3" style={{ color: member.accent_color }}>
              {member.role}
            </p>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{member.desc}</p>

            {/* Bottom accent line */}
            <div
              className="mt-5 h-0.5 w-8 rounded-full group-hover:w-full transition-all duration-300"
              style={{ backgroundColor: member.accent_color }}
            />
          </button>
        ))}
      </div>

      {/* Modal Overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(10,20,50,0.55)', backdropFilter: 'blur(6px)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Accent header bar */}
            <div className="h-1.5 w-full" style={{ backgroundColor: selected.accent_color }} />

            <div className="p-7">
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>

              {/* Avatar + name */}
              <div className="flex items-center gap-4 mb-5">
                {selected.image ? (
                  <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm shrink-0 border-2" style={{ borderColor: selected.accent_light }}>
                    <img src={selected.image} alt={selected.name} className="w-full h-full object-cover object-top" />
                  </div>
                ) : (
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0"
                    style={{ backgroundColor: selected.accent_light, color: selected.accent_color }}
                  >
                    {selected.initials}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900 text-base">{selected.name}</h3>
                  <p className="text-sm font-medium" style={{ color: selected.accent_color }}>
                    {selected.role}
                  </p>
                </div>
              </div>

              {/* Detail paragraph */}
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{selected.detail}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(selected.tags) ? selected.tags : (typeof selected.tags === 'string' ? selected.tags.split(',') : [])).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{ backgroundColor: selected.accent_light, color: selected.accent_color }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
