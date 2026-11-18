export type Language = 'id' | 'en';

export type PartnerSector =
  | 'all'
  | 'manufacturing'
  | 'automotive_finance'
  | 'retail_media_hospitality'
  | 'public_healthcare';

export interface LocalizedText {
  id: string;
  en: string;
}

export interface CapabilityPillar {
  id: string;
  code: string;
  title: LocalizedText;
  summary: LocalizedText;
  deliverables: string[];
  sectors: LocalizedText;
}

export interface SolutionDiscipline {
  id: string;
  index: string;
  title: LocalizedText;
  summary: LocalizedText;
  scope: string[];
  featured?: boolean;
}

export interface WhyChooseItem {
  id: string;
  index: string;
  title: LocalizedText;
  description: LocalizedText;
}

export interface CommitmentValue {
  id: string;
  title: string;
  tagline: LocalizedText;
}

export interface PartnerItem {
  name: string;
  sector: Exclude<PartnerSector, 'all'>;
}

export const COMPANY_PDF_PATH =
  '/assets/aistudio/COMPANY_PROFILE_TAGLINE__2026_99c4bb3b.pdf';

export const COMPANY_INFO = {
  name: 'PT TAGLINE KREASINDO ASKARA',
  shortName: 'Tagline Kreasindo Askara',
  tagline: 'Your Solution Partner',
  heroHeadline: {
    id: 'Solusi Terpadu untuk Infrastruktur yang Lebih Cerdas, Aman, dan Terkoneksi',
    en: 'Integrated Solutions for a Smarter, Safer, and More Connected Future',
  },
  heroLead: {
    id: 'PT Tagline Kreasindo Askara menghadirkan layanan rekayasa keamanan, teknologi informasi, instalasi mekanikal & elektrikal (MEP), otomasi industri, hingga pekerjaan sipil dari tahap perencanaan hingga pemeliharaan.',
    en: 'PT Tagline Kreasindo Askara delivers integrated solutions across security systems, technology, mechanical & electrical engineering, industrial automation, and civil infrastructure from design through maintenance.',
  },
  phone: '021 8779 1341',
  phoneHref: 'tel:+622187791341',
  email: 'taglinekreasindoaskara@gmail.com',
  website: 'www.tagline.co.id',
  offices: [
    {
      id: 'jakarta',
      label: { id: 'Kantor 1 — Jakarta', en: 'Office 1 — Jakarta' },
      city: 'Jakarta Selatan',
      address:
        'Jl. Wisma NH Lt. 1, Jl. Raya Pasar Minggu No. 2B-C, Pancoran, Jakarta Selatan, DKI Jakarta 12780',
      mapsQuery:
        'https://maps.google.com/?q=Wisma+NH+Jl.+Raya+Pasar+Minggu+No.+2B-C+Pancoran+Jakarta+Selatan',
    },
    {
      id: 'bsd',
      label: { id: 'Kantor 2 — BSD City', en: 'Office 2 — BSD' },
      city: 'Tangerang Selatan',
      address:
        'Ruko Malibu Blok B No. 38, BSD City Serpong, Tangerang Selatan, Banten 15310',
      mapsQuery:
        'https://maps.google.com/?q=Ruko+Malibu+Blok+B+No.+38+BSD+City+Serpong+Tangerang+Selatan',
    },
  ],
  legal: {
    nib: '9120103772202',
    nibDate: '20 Juli 2019',
    npwp: '81.158.782.3-061.000',
    pkpNumber: 'S-205PKP/WPJ.04/KP.0603/2017',
    pkpDate: '30 Mei 2017',
    taxOffice: 'KPP Pratama Jakarta Pancoran',
    investmentStatus: 'PMDN (Penanaman Modal Dalam Negeri)',
    kbli: [
      {
        code: '46511',
        name: 'Perdagangan Besar Komputer dan Perlengkapan Komputer',
      },
      {
        code: '46512',
        name: 'Perdagangan Besar Piranti Lunak',
      },
      {
        code: '46522',
        name: 'Perdagangan Besar Disket, Pita Audio dan Video, CD dan DVD Kosong',
      },
      {
        code: '47414',
        name: 'Perdagangan Eceran Alat Telekomunikasi',
      },
    ],
  },
};

export const ABOUT_CONTENT = {
  paragraphs: {
    id: [
      'PT TAGLINE KREASINDO ASKARA adalah perusahaan yang bergerak dalam penyediaan solusi terpadu di bidang keamanan, teknologi, mekanikal, elektrikal, konstruksi, serta layanan manajemen operasional dan sumber daya.',
      'Kami melayani beragam kebutuhan bisnis, mulai dari kawasan industri, gedung komersial, perkantoran, ritel, area publik, hingga proyek pemerintahan melalui produk andal dan layanan yang disesuaikan dengan kondisi lapangan.',
      'Berbekal pengalaman menangani proyek CCTV, kontrol akses, sistem alarm, jaringan, fiber optik, instalasi kelistrikan, MEP, pekerjaan sipil & infrastruktur, serta sistem otomasi, kami berkomitmen menjadi mitra terpercaya untuk lingkungan yang lebih aman, efisien, dan siap menghadapi masa depan.',
    ],
    en: [
      'PT TAGLINE KREASINDO ASKARA is a company engaged in delivering integrated solutions in security, technology, mechanical, electrical, construction, and operational & resource management services.',
      'We provide integrated solutions for various business needs, including industrial, commercial buildings, offices, retail, public areas, and government projects through reliable products and services tailored to field requirements.',
      'With experience in a wide range of projects such as CCTV, access control, alarm systems, networking, fiber optic, electrical installation, MEP, civil & infrastructure works, and automation systems, we are committed to being a trusted partner in creating safer, more efficient, and future-ready environments.',
    ],
  },
  vision: {
    id: 'Menjadi penyedia solusi rekayasa dan infrastruktur terpadu yang terpercaya dalam menghadirkan keselamatan, efisiensi, inovasi, dan nilai berkelanjutan bagi pelanggan serta masyarakat.',
    en: 'To be a trusted provider of integrated engineering and infrastructure solutions that deliver safety, efficiency, innovation, and sustainable value for our customers and society.',
  },
  missions: [
    {
      index: '01.',
      id: 'Menghadirkan produk dan layanan berkualitas tinggi yang memenuhi standar nasional maupun internasional.',
      en: 'Deliver high-quality products and services that meet national and international standards.',
    },
    {
      index: '02.',
      id: 'Menyediakan solusi yang inovatif, andal, dan efisien biaya di bidang keamanan, jaringan, kelistrikan, MEP, serta infrastruktur sipil.',
      en: 'Provide innovative, reliable, and cost-effective solutions across security, network, electrical, MEP, and civil infrastructure.',
    },
    {
      index: '03.',
      id: 'Membangun kemitraan jangka panjang bersama klien, mitra usaha, dan pemangku kepentingan berlandaskan kepercayaan dan integritas.',
      en: 'Build long-term partnerships with clients, business partners, and stakeholders based on trust and integrity.',
    },
    {
      index: '04.',
      id: 'Menjamin keselamatan kerja, profesionalisme, ketepatan waktu penyelesaian, serta perbaikan berkelanjutan di setiap proyek.',
      en: 'Ensure safety, professionalism, on-time delivery, and continuous improvement in every project.',
    },
    {
      index: '05.',
      id: 'Memberikan dukungan purna jual dan pemeliharaan yang responsif guna menjaga performa sistem optimal serta kepuasan pelanggan.',
      en: 'Deliver responsive after-sales support and maintenance to ensure optimal system performance and customer satisfaction.',
    },
  ],
};

export const COMMITMENT_VALUES: CommitmentValue[] = [
  {
    id: 'integrity',
    title: 'Integrity',
    tagline: { id: 'Menjalankan yang Benar', en: "We Do What's Right" },
  },
  {
    id: 'quality',
    title: 'Quality',
    tagline: { id: 'Menghadirkan Keunggulan', en: 'We Deliver Excellence' },
  },
  {
    id: 'innovation',
    title: 'Innovation',
    tagline: { id: 'Menciptakan Solusi Lebih Baik', en: 'We Create Better Solutions' },
  },
  {
    id: 'reliability',
    title: 'Reliability',
    tagline: { id: 'Menepati Komitmen', en: 'We Keep Our Promise' },
  },
  {
    id: 'sustainability',
    title: 'Sustainability',
    tagline: { id: 'Membangun Masa Depan', en: 'We Build For The Future' },
  },
];

export const CAPABILITY_PILLARS: CapabilityPillar[] = [
  {
    id: 'security',
    code: '01',
    title: { id: 'Security & Surveillance', en: 'Security & Surveillance' },
    summary: {
      id: 'Sistem pengawasan dan kontrol akses terpusat untuk perlindungan fasilitas industri maupun komersial.',
      en: 'Centralized surveillance and physical access protection for industrial and commercial facilities.',
    },
    deliverables: ['CCTV', 'Access Control', 'Alarm', 'Gate System', 'Monitoring Room'],
    sectors: { id: 'Industri, Perkantoran, Publik', en: 'Industrial, Office, Public' },
  },
  {
    id: 'network',
    code: '02',
    title: { id: 'Network & Infrastructure', en: 'Network & Infrastructure' },
    summary: {
      id: 'Arsitektur jaringan berkecepatan tinggi dengan pengkabelan terstruktur dan manajemen perangkat terpusat.',
      en: 'High-availability enterprise network architecture with structured cabling and centralized management.',
    },
    deliverables: ['LAN/WAN', 'WiFi', 'Router', 'Switch', 'Structured Cabling', 'Network Management'],
    sectors: { id: 'Komersial, Korporasi, Ritel', en: 'Commercial, Enterprise, Retail' },
  },
  {
    id: 'fiber',
    code: '03',
    title: { id: 'Fiber Optic & Telecommunication', en: 'Fiber Optic & Telecommunication' },
    summary: {
      id: 'Penarikan, penyambungan, dan pengujian kabel serat optik untuk tulang punggung komunikasi jarak jauh.',
      en: 'End-to-end optical fiber deployment, precision splicing, and OTDR certification for telecom backbones.',
    },
    deliverables: ['Fiber Optic Installation', 'Splicing', 'OTDR Testing', 'Telecom Infrastructure'],
    sectors: { id: 'Kawasan Industri, Infrastruktur', en: 'Industrial Estates, Infrastructure' },
  },
  {
    id: 'electrical',
    code: '04',
    title: { id: 'Electrical Installation', en: 'Electrical Installation' },
    summary: {
      id: 'Distribusi daya listrik yang aman dan terukur, mulai dari panel utama hingga penerangan jalan umum.',
      en: 'Safe, compliant power distribution from main distribution panels to area and street lighting.',
    },
    deliverables: ['Power Distribution', 'Panel Installation', 'MDP', 'Lighting System', 'PJU'],
    sectors: { id: 'Pabrik, Gedung, Area Publik', en: 'Plants, Buildings, Public Areas' },
  },
  {
    id: 'mep',
    code: '05',
    title: { id: 'MEP Services', en: 'MEP Services' },
    summary: {
      id: 'Pekerjaan mekanikal, elektrikal, perpipaan, dan tata udara yang terintegrasi dari instalasi hingga perawatan.',
      en: 'Integrated mechanical, electrical, plumbing, and HVAC engineering from installation to maintenance.',
    },
    deliverables: ['Mechanical', 'Electrical', 'Plumbing', 'HVAC', 'Installation & Maintenance'],
    sectors: { id: 'Gedung Bertingkat, Fasilitas Kesehatan', en: 'High-Rise, Healthcare' },
  },
  {
    id: 'civil',
    code: '06',
    title: { id: 'Civil & Infrastructure', en: 'Civil & Infrastructure' },
    summary: {
      id: 'Pekerjaan sipil pendukung infrastruktur utilitas, galian kabel, ducting, beton, pondasi, dan struktur.',
      en: 'Supporting civil construction covering utility trenching, ducting, concrete works, foundations, and structures.',
    },
    deliverables: ['Civil Works', 'Trenching', 'Ducting', 'Concrete', 'Pondasi', 'Struktur'],
    sectors: { id: 'Konstruksi, Pemerintah, Pabrik', en: 'Construction, Government, Plants' },
  },
  {
    id: 'automation',
    code: '07',
    title: { id: 'Automation & Control System', en: 'Automation & Control System' },
    summary: {
      id: 'Otomasi proses manufaktur dan batching plant berbasis PLC, HMI, serta integrasi sistem SCADA.',
      en: 'Industrial process automation and batching plant control built on PLC, HMI, and SCADA integration.',
    },
    deliverables: ['Industrial Automation', 'SCADA', 'Batching Plant', 'System Integration'],
    sectors: { id: 'Manufaktur, Konstruksi Berat', en: 'Manufacturing, Heavy Industry' },
  },
  {
    id: 'maintenance',
    code: '08',
    title: { id: 'Operation & Maintenance', en: 'Operation & Maintenance' },
    summary: {
      id: 'Layanan pemeliharaan preventif, penanganan gangguan cepat, serta pemantauan kestabilan sistem.',
      en: 'Preventive maintenance schedules, rapid troubleshooting, and ongoing system health monitoring.',
    },
    deliverables: ['Preventive Maintenance', 'Troubleshooting', 'System Support & Monitoring'],
    sectors: { id: 'Operasional 24/7, SLA Korporasi', en: '24/7 Operations, Corporate SLA' },
  },
];

export const SOLUTION_DISCIPLINES: SolutionDiscipline[] = [
  {
    id: 'security-system',
    index: '01',
    featured: true,
    title: { id: 'Security System', en: 'Security System' },
    summary: {
      id: 'Perlindungan menyeluruh berbasis CCTV beresolusi tinggi, kontrol akses terintegrasi, dan ruang kendali pemantauan.',
      en: 'Comprehensive physical security combining IP surveillance, automated gate barriers, analytics, and dedicated monitoring rooms.',
    },
    scope: [
      'CCTV systems & IP camera',
      'NVR / DVR recording architecture',
      'Command & monitoring room',
      'Alarm system & intrusion detection',
      'Access control & attendance',
      'Gate & barrier system',
      'Video analytics',
      'Integrated security solutions',
    ],
  },
  {
    id: 'networking-iot',
    index: '02',
    featured: true,
    title: { id: 'Networking & IoT', en: 'Networking & IoT' },
    summary: {
      id: 'Infrastruktur konektivitas end-to-end dari pusat data dan fiber optik hingga implementasi perangkat IoT.',
      en: 'End-to-end connectivity infrastructure spanning structured cabling, data centers, enterprise wireless, and IoT deployment.',
    },
    scope: [
      'Network infrastructure & LAN/WAN',
      'Structured cabling systems',
      'Fiber optic backbone',
      'Enterprise wireless solutions',
      'Data center build & racks',
      'Smart home & building solutions',
      'IoT implementation',
      'Integrated device management',
    ],
  },
  {
    id: 'engineering-support',
    index: '03',
    title: { id: 'Engineering Support', en: 'Engineering Support' },
    summary: {
      id: 'Dukungan teknis mekanikal, elektrikal, dan MEP mulai dari survei lapangan hingga pengujian dan komisioning.',
      en: 'Technical mechanical, electrical, and MEP engineering from initial site survey through testing and commissioning.',
    },
    scope: [
      'Mechanical & electrical support',
      'MEP services & installation',
      'Site survey & system design',
      'Construction support',
      'Testing & commissioning',
      'Preventive maintenance',
    ],
  },
  {
    id: 'industrial-automation',
    index: '04',
    title: { id: 'Industrial Automation', en: 'Industrial Automation' },
    summary: {
      id: 'Rekayasa sistem kendali pabrik dan fabrikasi panel kontrol untuk efisiensi lini produksi dan batching plant.',
      en: 'Plant control engineering and custom panel fabrication to streamline production lines, AMP, and batching plants.',
    },
    scope: [
      'PLC & HMI programming',
      'SCADA system deployment',
      'Batching plant & AMP plant',
      'Control panel design & fabrication',
      'Industrial control system',
      'Monitoring integration',
    ],
  },
  {
    id: 'project-management',
    index: '05',
    title: { id: 'Project Management', en: 'Project Management' },
    summary: {
      id: 'Pengelolaan proyek terstruktur dengan analisis kebutuhan, kontrol kualitas, manajemen risiko, dan serah terima teknis.',
      en: 'Disciplined project execution covering needs analysis, scheduling, quality control, risk mitigation, and technical handover.',
    },
    scope: [
      'Project planning & needs analysis',
      'Solution design & engineering',
      'Implementation scheduling',
      'Technical documentation',
      'Quality control & risk management',
      'Formal technical handover',
    ],
  },
  {
    id: 'after-sales-service',
    index: '06',
    title: { id: 'After-Sales Service', en: 'After-Sales Service' },
    summary: {
      id: 'Kemitraan jangka panjang melalui dukungan teknis responsif, ketersediaan suku cadang, dan pembaruan sistem.',
      en: 'Long-term operational continuity through responsive troubleshooting, spare parts availability, and scheduled system upgrades.',
    },
    scope: [
      'Responsive technical support',
      'Scheduled system maintenance',
      'On-site & remote troubleshooting',
      'Spare parts support',
      'Preventive maintenance',
      'System upgrade & lifecycle care',
    ],
  },
];

export const WHY_CHOOSE_US: WhyChooseItem[] = [
  {
    id: 'experienced-team',
    index: '01',
    title: { id: 'Experienced Team', en: 'Experienced Team' },
    description: {
      id: 'Didukung tenaga profesional terampil dengan pengalaman luas dalam instalasi, integrasi sistem, dan implementasi di berbagai sektor industri.',
      en: 'Our team consists of skilled professionals with extensive experience in installation, system integration, and implementation across various industries.',
    },
  },
  {
    id: 'integrated-solution',
    index: '02',
    title: { id: 'Integrated Solution', en: 'Integrated Solution' },
    description: {
      id: 'Menyediakan solusi menyeluruh mulai dari konsultasi, desain sistem, pengadaan perangkat, instalasi, komisioning, hingga layanan purna jual.',
      en: 'We provide end-to-end solutions from consultation, system design, product supply, installation, commissioning, to after-sales support.',
    },
  },
  {
    id: 'reliable-brands',
    index: '03',
    title: { id: 'Reliable Brands', en: 'Reliable Brands' },
    description: {
      id: 'Bermitra dengan merek teknologi terpercaya dan berkualitas tinggi untuk menghadirkan perangkat andal sesuai anggaran dan skala proyek Anda.',
      en: 'We partner with trusted and high-quality technology brands to deliver reliable products that fit your budget and project scale.',
    },
  },
  {
    id: 'project-oriented',
    index: '04',
    title: { id: 'Project-Oriented', en: 'Project-Oriented' },
    description: {
      id: 'Setiap rekomendasi disesuaikan secara spesifik dengan kondisi lokasi, target operasional, jadwal, dan standar keselamatan proyek Anda.',
      en: 'We tailor every recommendation to your site conditions, objectives, timeline, and operational standards to ensure project success.',
    },
  },
  {
    id: 'responsive-support',
    index: '05',
    title: { id: 'Responsive Support', en: 'Responsive Support' },
    description: {
      id: 'Memberikan dukungan teknis yang responsif serta layanan purna jual terjamin untuk memastikan kinerja sistem tetap optimal pasca-implementasi.',
      en: 'We provide responsive technical support and reliable after-sales service to ensure optimal system performance after implementation.',
    },
  },
  {
    id: 'safety-compliance',
    index: '06',
    title: { id: 'Safety & Compliance', en: 'Safety & Compliance' },
    description: {
      id: 'Menerapkan praktik keselamatan kerja (K3) secara ketat dan mematuhi standar serta regulasi industri pada setiap proyek yang dijalankan.',
      en: 'We implement strict safety practices and comply with industry standards and regulations in every project we deliver.',
    },
  },
];

export const CUSTOMER_PARTNERS: PartnerItem[] = [
  { name: 'PT. Adicipta Boga Intiprima', sector: 'manufacturing' },
  { name: 'PT. Asco Dwi Mobilindo', sector: 'automotive_finance' },
  { name: 'PT. Asco Prima Mobilindo', sector: 'automotive_finance' },
  { name: 'PT. Aston Inti Makmur', sector: 'retail_media_hospitality' },
  { name: 'PT. Astra Honda Motor', sector: 'manufacturing' },
  { name: 'Bogor Trade Mall', sector: 'retail_media_hospitality' },
  { name: 'PT. Cakrawala Andalas Televisi (ANTV)', sector: 'retail_media_hospitality' },
  { name: 'PT. Calbee Wings Food', sector: 'manufacturing' },
  { name: 'PT. Data Energy Infomedia', sector: 'manufacturing' },
  { name: 'PT. Dinamika Maju Bersama', sector: 'manufacturing' },
  { name: 'PT. Fajar Mitra Indah', sector: 'retail_media_hospitality' },
  { name: 'PT. Grha Humanindo Manajemen', sector: 'retail_media_hospitality' },
  { name: 'Hotel Mercure', sector: 'retail_media_hospitality' },
  { name: 'PT. Imora Motor', sector: 'automotive_finance' },
  { name: 'PT. Inbisco Niagatama', sector: 'manufacturing' },
  { name: 'PT. Internusa Jaya Sejahtera', sector: 'manufacturing' },
  { name: 'PT. Jaya Wira Jerindo', sector: 'manufacturing' },
  { name: 'PT. Kharisma Megah Darma', sector: 'manufacturing' },
  { name: 'PT. Kuta Beachwear', sector: 'retail_media_hospitality' },
  { name: 'PT. M Class Industry', sector: 'manufacturing' },
  { name: 'PT. Makmur Alam Lestari', sector: 'manufacturing' },
  { name: 'PT. Makmur Alam Sentosa', sector: 'manufacturing' },
  { name: 'PT. Mayora Indah Tbk', sector: 'manufacturing' },
  { name: 'PT. Mega Finance', sector: 'automotive_finance' },
  { name: 'PT. Mitra Lestari Abadi', sector: 'manufacturing' },
  { name: 'Multi Usage', sector: 'manufacturing' },
  { name: 'PT. Musirawas Lestari Makmur', sector: 'manufacturing' },
  { name: 'PT. Net Mediatama Televisi', sector: 'retail_media_hospitality' },
  { name: 'PT. Nusa Konstruksi Enjiniring', sector: 'manufacturing' },
  { name: 'PT. Nutrindo Bogarasa', sector: 'manufacturing' },
  { name: 'Perum Jasa Tirta I', sector: 'public_healthcare' },
  { name: 'PKM Cakung', sector: 'public_healthcare' },
  { name: 'PKM Cipayung', sector: 'public_healthcare' },
  { name: 'PKM Duren Sawit', sector: 'public_healthcare' },
  { name: 'PKM Grogol Petamburan', sector: 'public_healthcare' },
  { name: 'PKM Jatinegara', sector: 'public_healthcare' },
  { name: 'PKM Kramat Jati', sector: 'public_healthcare' },
  { name: 'PKM Pasar Rebo', sector: 'public_healthcare' },
  { name: 'PT. Pro Car International Finance', sector: 'automotive_finance' },
  { name: 'PT. Pro Mitra Finance', sector: 'automotive_finance' },
  { name: 'PT. Sinar Kharisma Padjadjaran', sector: 'manufacturing' },
  { name: 'CV. Sinar Solaria', sector: 'retail_media_hospitality' },
  { name: 'PT. Sumber Graha Sejahtera', sector: 'manufacturing' },
  { name: 'Televisi Anak Spacetoon', sector: 'retail_media_hospitality' },
  { name: 'PT. Tirta Fresindo Jaya', sector: 'manufacturing' },
  { name: 'PT. Torabika Eka Semesta', sector: 'manufacturing' },
  { name: 'PT. United Steel Center Indonesia', sector: 'manufacturing' },
  { name: 'PT. Voith Paper Rolls Indonesia', sector: 'manufacturing' },
  { name: 'PT. Wana Makmur Sejahtera', sector: 'manufacturing' },
  { name: 'PT. Takeda Indonesia', sector: 'public_healthcare' },
  { name: 'PT. Dellifood Sentos Corpindo', sector: 'manufacturing' },
  { name: 'PT. Kakao Mas Gemilang', sector: 'manufacturing' },
];

export const SECTOR_FILTERS: { id: PartnerSector; label: LocalizedText }[] = [
  { id: 'all', label: { id: 'Semua Mitra (52)', en: 'All Partners (52)' } },
  {
    id: 'manufacturing',
    label: { id: 'Manufaktur & Konstruksi', en: 'Manufacturing & Engineering' },
  },
  {
    id: 'automotive_finance',
    label: { id: 'Otomotif & Pembiayaan', en: 'Automotive & Finance' },
  },
  {
    id: 'retail_media_hospitality',
    label: { id: 'Media, Ritel & Perhotelan', en: 'Media, Retail & Hospitality' },
  },
  {
    id: 'public_healthcare',
    label: { id: 'Kesehatan & Layanan Publik', en: 'Healthcare & Public' },
  },
];
