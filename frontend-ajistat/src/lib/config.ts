// AjiStat — Divisi Statistik & Riset Aji Institute
export const BRAND = {
  name: 'AjiStat',
  fullName: 'AjiStat by Aji Institute',
  tagline: 'Konsultasi & Olah Data Statistik Profesional',
  parent: 'Aji Institute',
  legalName: 'PT. Amanah Jñāna Insani',
};

export const CONTACT = {
  whatsapp: '6285195564668',
  whatsappDisplay: '+62 851-9556-4668',
  email: 'info@aji-institute.id',
  address: 'Kompleks Bandung Indah Raya Blok C7 No.1, Kel. Mekarjaya, Kec. Rancasari, Bandung',
};

export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://api.aji-institute.com';

export function WA_LINK(message?: string) {
  return `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
}

export const TOOLS = [
  {
    name: 'SPSS',
    color: '#BE1425',
    logo: '/logos/spss-1.jpg',
    desc: 'Statistical Package for the Social Sciences. Software analisis statistik paling populer untuk riset akademik.',
    useFor: 'Uji asumsi, regresi, ANOVA, uji beda, korelasi, crosstab.',
  },
  {
    name: 'SmartPLS',
    color: '#E8A020',
    logo: '/logos/pls.jpg',
    desc: 'Software Structural Equation Modeling berbasis Partial Least Squares. Ideal untuk penelitian bisnis dan sosial.',
    useFor: 'SEM-PLS, CFA, path analysis, mediasi, moderasi.',
  },
  {
    name: 'AMOS',
    color: '#CC2222',
    logo: '/logos/amos-1.png',
    desc: 'Analysis of Moment Structures. Software SEM berbasis covariance untuk model pengukuran yang kompleks.',
    useFor: 'SEM-CB, CFA, path diagram, goodness of fit.',
  },
  {
    name: 'R / RStudio',
    color: '#2266B8',
    logo: '/logos/r-studio.png',
    desc: 'Bahasa pemrograman statistik open-source yang sangat powerful dan fleksibel.',
    useFor: 'Analisis data, visualisasi, machine learning, big data.',
  },
  {
    name: 'Python',
    color: '#3776AB',
    logo: '/logos/python.png',
    desc: 'Bahasa pemrograman serbaguna yang kuat untuk data science dan analisis statistik.',
    useFor: 'Data wrangling, visualisasi, ML, NLP, otomasi analisis.',
  },
  {
    name: 'NVivo',
    color: '#8B0000',
    logo: '/logos/nvivo-1.png',
    desc: 'Software analisis data kualitatif (QDA) terkemuka di dunia.',
    useFor: 'Coding tema, analisis wawancara, FGD, konten media.',
  },
  {
    name: 'EViews',
    color: '#005A9C',
    logo: '/logos/EViews-1.jpeg',
    desc: 'Software ekonometri untuk analisis data time series dan cross-section.',
    useFor: 'Regresi panel data, ARIMA, VAR, VECM, uji stasioneritas.',
  },
  {
    name: 'STATA',
    color: '#1A5276',
    logo: '/logos/stata.png',
    desc: 'Software statistik profesional yang banyak digunakan di bidang ekonomi dan kesehatan.',
    useFor: 'Regresi, panel data, survival analysis, survei data.',
  },
  {
    name: 'LISREL',
    color: '#444444',
    logo: '/logos/lisrel-1.jpeg',
    desc: 'Pioneer software SEM berbasis covariance yang banyak dipakai di riset psikologi dan sosial.',
    useFor: 'CFA, SEM-CB, path analysis, multitrait-multimethod.',
  },
  {
    name: 'Excel',
    color: '#217346',
    logo: '/logos/excel-logo.png',
    desc: 'Microsoft Excel — spreadsheet paling banyak digunakan untuk analisis data dasar dan visualisasi.',
    useFor: 'Tabulasi data, pivot table, chart, statistik deskriptif.',
  },
];

export const TOPICS = [
  'Validasi & Reliabilitas', 'MSI (Method of Successive Intervals)', 'Analisis Regresi',
  'Korelasi', 'Design Experiment', 'SEM (Structural Equation Modeling)',
  'Statistika Nonparametrik', 'Analisis Faktor', 'MDS & PCA', 'Cluster Analysis',
  'Path Analysis', 'Service Quality', 'Time Series Analysis', 'Teknik Sampling',
  'Statistik Deskriptif', 'Conjoint Analysis', 'SEM-PLS', 'SEM-AMOS',
  'Uji Hipotesis', 'Mediasi & Moderasi', 'ANOVA', 'Uji Beda',
  'NVivo (Kualitatif)', 'Content Analysis',
];

export const TARGET_MARKET = [
  {
    key: 's1',
    label: 'Mahasiswa S1',
    desc: 'Skripsi & tugas akhir',
    icon: '🎓',
    packages: [
      { name: 'Konsultasi Cepat', price: 'Mulai Rp 50.000', detail: 'Konsultasi singkat 1 jam via WA/Zoom untuk pertanyaan spesifik tentang metode atau hasil analisis.' },
      { name: 'Short Class Statistik', price: 'Mulai Rp 75.000', detail: 'Kelas singkat 2–3 jam untuk menguasai satu software/topik, cocok sebelum sidang atau submit laporan.' },
      { name: 'Paket Skripsi Lengkap', price: 'Mulai Rp 200.000', detail: 'Pendampingan menyeluruh dari pemilihan metode, olah data, interpretasi, hingga penulisan BAB IV & V.' },
    ],
  },
  {
    key: 's2',
    label: 'Mahasiswa S2',
    desc: 'Tesis & penelitian magister',
    icon: '🎓',
    packages: [
      { name: 'Konsultasi Metodologi', price: 'Mulai Rp 100.000', detail: 'Konsultasi intensif untuk pemilihan metode yang tepat, desain penelitian, dan interpretasi hasil tesis.' },
      { name: 'Kelas Privat SEM/PLS', price: 'Mulai Rp 150.000', detail: 'Pendampingan personal untuk menguasai SEM-PLS, SEM-AMOS, atau metode lanjutan lainnya.' },
      { name: 'Paket Tesis Komprehensif', price: 'Mulai Rp 500.000', detail: 'Layanan lengkap dari reviu proposal hingga analisis final. Termasuk sesi tanya jawab tak terbatas selama proses.' },
    ],
  },
  {
    key: 's3',
    label: 'Mahasiswa S3',
    desc: 'Disertasi & riset doktoral',
    icon: '🎓',
    packages: [
      { name: 'Konsultasi Expert', price: 'Mulai Rp 200.000', detail: 'Konsultasi mendalam dengan pakar statistik untuk desain riset doktoral yang kompleks dan valid.' },
      { name: 'Pendampingan Disertasi', price: 'Negosiasi', detail: 'Program pendampingan jangka panjang dari awal hingga seminar hasil, termasuk persiapan publikasi jurnal.' },
      { name: 'Mixed Methods Intensif', price: 'Mulai Rp 300.000', detail: 'Khusus riset campuran kuantitatif + kualitatif, termasuk NVivo, triangulasi data, dan penulisan hasil.' },
    ],
  },
  {
    key: 'peneliti',
    label: 'Peneliti',
    desc: 'Riset akademik & publikasi',
    icon: '🔬',
    packages: [
      { name: 'Konsultasi Publikasi', price: 'Mulai Rp 150.000', detail: 'Bantuan analisis data untuk keperluan submit ke jurnal ilmiah nasional/internasional.' },
      { name: 'Olah Data Mandiri', price: 'Mulai Rp 100.000', detail: 'Pendampingan olah data riset dengan software pilihan Anda, termasuk visualisasi dan laporan.' },
    ],
  },
  {
    key: 'dosen',
    label: 'Dosen',
    desc: 'Penelitian & pengabdian',
    icon: '📚',
    packages: [
      { name: 'Workshop Singkat', price: 'Mulai Rp 200.000', detail: 'Workshop statistik 1 hari untuk tim dosen atau mahasiswa binaan. Bisa diselenggarakan di kampus.' },
      { name: 'In-House Training', price: 'Hubungi Kami', detail: 'Pelatihan eksklusif di lingkungan kampus untuk dosen atau tim peneliti, disesuaikan kebutuhan institusi.' },
    ],
  },
  {
    key: 'perusahaan',
    label: 'Perusahaan',
    desc: 'Riset pasar & data bisnis',
    icon: '🏢',
    packages: [
      { name: 'Analisis Riset Pasar', price: 'Negosiasi', detail: 'Analisis data survei, customer satisfaction, atau riset pasar perusahaan Anda secara profesional.' },
      { name: 'Corporate Training', price: 'Hubungi Kami', detail: 'Pelatihan analisis data untuk tim divisi riset/marketing perusahaan. Program bisa disesuaikan kebutuhan.' },
    ],
  },
];
