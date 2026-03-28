// Konstanta global untuk seluruh aplikasi Aji Institute
export const SITE = {
  name: 'Aji Institute',
  subBrand: 'AjiStat',
  tagline: 'Center for Research, Data, and Professional Development',
  company: 'PT. Amanah Jana Insani',
  description: 'Platform pelatihan, pengembangan kompetensi, dan konsultasi profesional — dari statistik, bisnis, hingga komunikasi.',
};

export const CONTACT = {
  whatsapp: '6285892605592',
  whatsappDisplay: '+62 858-9260-5592',
  email: 'info@ajistat.com',
  instagram: '@ajistat.id',
  operationalHours: 'Senin–Jumat, 08.00–17.00 WIB',
};

export const SUB_BRANDS = [
  {
    id: 'ajistat',
    name: 'AjiStat',
    label: 'Statistik & Riset',
    description: 'Pelatihan statistik, analisis data, metodologi penelitian, dan konsultasi riset akademik.',
    icon: '📊',
    color: '#2568B5',
    href: '/bootcamp',
    available: true,
  },
  {
    id: 'business',
    name: 'Business Class',
    label: 'Bisnis & Manajemen',
    description: 'Program pengembangan kompetensi bisnis, kewirausahaan, dan manajemen profesional.',
    icon: '💼',
    color: '#16A34A',
    href: '/program-business',
    available: false,
  },
  {
    id: 'speaking',
    name: 'Public Speaking',
    label: 'Komunikasi & Presentasi',
    description: 'Kelas public speaking, presentasi profesional, dan pengembangan komunikasi efektif.',
    icon: '🎤',
    color: '#DC2626',
    href: '/program-speaking',
    available: false,
  },
  {
    id: 'digital',
    name: 'Digital Skills',
    label: 'Digital & Teknologi',
    description: 'Digital marketing, tools produktivitas, dan keterampilan teknologi untuk era digital.',
    icon: '💻',
    color: '#7C3AED',
    href: '/program-digital',
    available: false,
  },
  {
    id: 'language',
    name: 'Language Class',
    label: 'Bahasa & Komunikasi',
    description: 'Kelas bahasa Inggris, Arab, dan komunikasi global untuk karier internasional.',
    icon: '🌐',
    color: '#B45309',
    href: '/program-language',
    available: false,
  },
];

export const WA_LINK = (message?: string) =>
  `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
