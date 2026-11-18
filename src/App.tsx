import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  FileText,
  Mail,
  MapPin,
  Menu,
  Phone,
  Search,
  Globe,
  X,
  Building2,
  ShieldCheck,
} from 'lucide-react';
import { BrandMark } from './components/BrandMark';
import { SystemsBlueprint } from './components/SystemsBlueprint';
import { PdfPreviewModal } from './components/PdfPreviewModal';
import {
  ABOUT_CONTENT,
  CAPABILITY_PILLARS,
  COMMITMENT_VALUES,
  COMPANY_INFO,
  COMPANY_PDF_PATH,
  CUSTOMER_PARTNERS,
  Language,
  PartnerSector,
  SECTOR_FILTERS,
  SOLUTION_DISCIPLINES,
  WHY_CHOOSE_US,
} from './data/companyProfile';

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  discipline: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function App() {
  const [lang, setLang] = useState<Language>('id');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);

  const [selectedSolutionId, setSelectedSolutionId] = useState<string>(
    SOLUTION_DISCIPLINES[0].id
  );
  const [selectedCapabilityId, setSelectedCapabilityId] = useState<string>(
    CAPABILITY_PILLARS[0].id
  );

  const [partnerSector, setPartnerSector] = useState<PartnerSector>('all');
  const [partnerQuery, setPartnerQuery] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const [formState, setFormState] = useState<FormState>({
    fullName: '',
    company: '',
    email: '',
    phone: '',
    discipline: SOLUTION_DISCIPLINES[0].title.id,
    message: '',
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submittedSummary, setSubmittedSummary] = useState<FormState | null>(
    null
  );

  const navItems = useMemo(
    () => [
      { href: '#tentang', label: lang === 'id' ? 'Tentang' : 'About' },
      { href: '#solusi', label: lang === 'id' ? 'Solusi' : 'Solutions' },
      { href: '#keunggulan', label: lang === 'id' ? 'Keunggulan' : 'Advantages' },
      { href: '#klien', label: lang === 'id' ? 'Mitra' : 'Partners' },
      { href: '#legalitas', label: lang === 'id' ? 'Legalitas' : 'Legal' },
    ],
    [lang]
  );

  const activeCapability = useMemo(
    () =>
      CAPABILITY_PILLARS.find((item) => item.id === selectedCapabilityId) ??
      CAPABILITY_PILLARS[0],
    [selectedCapabilityId]
  );

  const filteredPartners = useMemo(() => {
    const q = partnerQuery.trim().toLowerCase();
    return CUSTOMER_PARTNERS.filter((partner) => {
      const matchesSector =
        partnerSector === 'all' || partner.sector === partnerSector;
      const matchesQuery = !q || partner.name.toLowerCase().includes(q);
      return matchesSector && matchesQuery;
    });
  }, [partnerSector, partnerQuery]);

  const sectorLabelMap = useMemo(
    () => ({
      manufacturing:
        lang === 'id' ? 'Manufaktur & Konstruksi' : 'Manufacturing & Engineering',
      automotive_finance:
        lang === 'id' ? 'Otomotif & Pembiayaan' : 'Automotive & Finance',
      retail_media_hospitality:
        lang === 'id' ? 'Media, Ritel & Hotel' : 'Media, Retail & Hospitality',
      public_healthcare:
        lang === 'id' ? 'Kesehatan & Publik' : 'Healthcare & Public',
    }),
    [lang]
  );

  const handleJumpToSolution = (disciplineId: string) => {
    setSelectedSolutionId(disciplineId);
    const el = document.getElementById('solusi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConsultSolution = (title: string) => {
    setFormState((prev) => ({ ...prev, discipline: title }));
    setSubmittedSummary(null);
    const el = document.getElementById('kontak');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(label);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard fallback unavailable
    }
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: FormErrors = {};

    if (!formState.fullName.trim()) {
      errors.fullName =
        lang === 'id'
          ? 'Nama lengkap wajib diisi.'
          : 'Full name is required.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email =
        lang === 'id'
          ? 'Masukkan alamat email yang valid.'
          : 'Please enter a valid email address.';
    }
    const cleanPhone = formState.phone.replace(/[^\d+]/g, '');
    if (cleanPhone.length < 8) {
      errors.phone =
        lang === 'id'
          ? 'Masukkan nomor telepon atau WhatsApp minimal 8 digit.'
          : 'Please enter a valid phone number (min. 8 digits).';
    }
    if (formState.message.trim().length < 10) {
      errors.message =
        lang === 'id'
          ? 'Jelaskan kebutuhan proyek Anda minimal 10 karakter.'
          : 'Please describe your project needs (min. 10 characters).';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setSubmittedSummary({ ...formState });
    }
  };

  const buildMailtoHref = (data: FormState) => {
    const subject = encodeURIComponent(
      `[Konsultasi Proyek] ${data.discipline} - ${data.company || data.fullName}`
    );
    const body = encodeURIComponent(
      `Nama: ${data.fullName}\nPerusahaan: ${data.company || '-'}\nEmail: ${data.email}\nTelepon: ${data.phone}\nBidang Solusi: ${data.discipline}\n\nKebutuhan Proyek:\n${data.message}`
    );
    return `mailto:${COMPANY_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="inline-flex items-center gap-2.5 text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded"
          >
            <BrandMark className="w-7 h-7 shrink-0" />
            <span>Tagline Kreasindo Askara</span>
          </a>

          {/* Zone 2: 5 Clean Single-line Nav Links */}
          <nav
            aria-label={lang === 'id' ? 'Navigasi utama' : 'Primary navigation'}
            className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-blue-700 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#kontak"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              {lang === 'id' ? 'Konsultasi Proyek' : 'Request Consultation'}
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={lang === 'id' ? 'Buka menu' : 'Toggle menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#kontak"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center mt-2 px-4 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
            >
              {lang === 'id' ? 'Konsultasi Proyek' : 'Request Consultation'}
            </a>
          </div>
        )}
      </header>

      <main>
        {/* 1. Hero Section + Integrated Systems Blueprint + 4-Column Fact Strip */}
        <section className="bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
            {/* Utility Row: Location Metadata & Language Switcher (outside Top Bar) */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <span>PT TAGLINE KREASINDO ASKARA</span>
                <span aria-hidden="true">·</span>
                <span>Jakarta Selatan</span>
                <span aria-hidden="true">·</span>
                <span>BSD City Tangerang Selatan</span>
                <span aria-hidden="true">·</span>
                <span>{COMPANY_INFO.tagline}</span>
              </div>

              <div
                className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-lg"
                role="group"
                aria-label="Language switch"
              >
                <button
                  type="button"
                  onClick={() => setLang('id')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'id'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Bahasa ID
                </button>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    lang === 'en'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  English EN
                </button>
              </div>
            </div>

            {/* 2-Column Hero Split (items-stretch for balanced vertical geometry) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              <div className="lg:col-span-7 flex flex-col justify-between py-2">
                <div>
                  <h1
                    className="font-display font-bold tracking-tight text-slate-950 leading-[1.12] max-w-2xl"
                    style={{
                      fontSize: 'clamp(2.15rem, 3.6vw, 3.35rem)',
                      textWrap: 'balance',
                    }}
                  >
                    {COMPANY_INFO.heroHeadline[lang]}
                  </h1>

                  <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
                    {COMPANY_INFO.heroLead[lang]}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4">
                  <a
                    href="#kontak"
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <span>
                      {lang === 'id'
                        ? 'Jadwalkan Konsultasi Proyek'
                        : 'Schedule Project Consultation'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setPdfModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <FileText className="w-4 h-4 text-blue-700" />
                    <span>
                      {lang === 'id'
                        ? 'Lihat Company Profile (PDF)'
                        : 'Preview Company Profile (PDF)'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <SystemsBlueprint
                  lang={lang}
                  onSelectDiscipline={handleJumpToSolution}
                />
              </div>
            </div>

            {/* Full-Width 4-Column Company Fact Strip below Hero Split */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              <div className="bg-slate-50 p-5 sm:p-6">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-950">
                  08
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  {lang === 'id'
                    ? 'Bidang Kapabilitas Rekayasa Inti'
                    : 'Core Engineering Capabilities'}
                </div>
              </div>
              <div className="bg-slate-50 p-5 sm:p-6">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-950">
                  52+
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  {lang === 'id'
                    ? 'Mitra Perusahaan & Institusi Publik'
                    : 'Corporate & Public Sector Partners'}
                </div>
              </div>
              <div className="bg-slate-50 p-5 sm:p-6">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-950">
                  02
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  {lang === 'id'
                    ? 'Kantor Operasional (Jakarta & BSD)'
                    : 'Operational Offices (Jakarta & BSD)'}
                </div>
              </div>
              <div className="bg-slate-50 p-5 sm:p-6">
                <div className="font-mono-tabular text-2xl sm:text-3xl font-bold text-slate-950">
                  2017
                </div>
                <div className="mt-1 text-xs sm:text-sm font-medium text-slate-600">
                  {lang === 'id'
                    ? 'Pengusaha Kena Pajak (PKP) & NIB Resmi'
                    : 'Registered PKP & Verified NIB Entity'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. About The Company, Vision, Mission & Commitment */}
        <section id="tentang" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
              {/* Left Column: Narrative + Vision */}
              <div className="lg:col-span-6 space-y-8">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-blue-700">
                    {lang === 'id' ? '01. TENTANG PERUSAHAAN' : '01. ABOUT THE COMPANY'}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                    {lang === 'id'
                      ? 'Mitra Solusi Terpadu untuk Lingkungan Industri & Komersial'
                      : 'Your Trusted Partner for Safer, Future-Ready Environments'}
                  </h2>
                </div>

                <div className="space-y-4 text-[15px] leading-relaxed text-slate-600">
                  {ABOUT_CONTENT.paragraphs[lang].map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))}
                </div>

                <div className="bg-[#0A1628] text-slate-100 rounded-xl p-6 sm:p-7 border border-slate-800">
                  <p className="text-xs font-mono-tabular tracking-wider text-orange-400">
                    {lang === 'id' ? 'VISI PERUSAHAAN' : 'OUR VISION'}
                  </p>
                  <p className="mt-3 text-base sm:text-lg font-medium leading-relaxed text-white">
                    “{ABOUT_CONTENT.vision[lang]}”
                  </p>
                </div>
              </div>

              {/* Right Column: 5 Mission Statements */}
              <div className="lg:col-span-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 h-full flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-mono-tabular tracking-wider text-blue-700">
                      {lang === 'id' ? 'MISI KAMI' : 'OUR MISSION'}
                    </p>
                    <h3 className="mt-1.5 text-xl font-bold text-slate-950">
                      {lang === 'id'
                        ? 'Standar Pelaksanaan & Kemitraan Jangka Panjang'
                        : 'Execution Standards & Long-Term Partnerships'}
                    </h3>
                  </div>

                  <ol className="mt-6 divide-y divide-slate-200">
                    {ABOUT_CONTENT.missions.map((mission) => (
                      <li
                        key={mission.index}
                        className="py-4 first:pt-2 last:pb-0 flex items-start gap-4"
                      >
                        <span className="font-mono-tabular text-sm font-semibold text-blue-700 shrink-0 pt-0.5">
                          {mission.index}
                        </span>
                        <span className="text-sm leading-relaxed text-slate-700">
                          {mission[lang]}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            {/* 5 Commitment Pillars */}
            <div className="mt-12 pt-10 border-t border-slate-200">
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                <h3 className="text-base font-bold text-slate-950">
                  {lang === 'id'
                    ? 'Nilai Komitmen Kami'
                    : 'Our Commitment Pillars'}
                </h3>
                <span className="text-xs text-slate-500">
                  {lang === 'id'
                    ? 'Tujuan Kami · Komitmen Kami'
                    : 'Our Purpose · Our Commitment'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {COMMITMENT_VALUES.map((val, idx) => (
                  <div
                    key={val.id}
                    className="bg-white border border-slate-200 rounded-xl p-5"
                  >
                    <span className="font-mono-tabular text-xs text-slate-400">
                      0{idx + 1}
                    </span>
                    <div className="mt-2 text-base font-bold text-slate-950">
                      {val.title}
                    </div>
                    <p className="mt-1 text-xs text-slate-600">
                      {val.tagline[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Our Solutions (Asymmetric Grid) + 8 Core Capabilities Explorer */}
        <section id="solusi" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold tracking-wider text-blue-700">
                {lang === 'id' ? '02. SOLUSI TERPADU' : '02. OUR SOLUTIONS'}
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                {lang === 'id'
                  ? 'Layanan End-to-End Lintas Disiplin Rekayasa'
                  : 'End-to-End Solutions Across Multiple Disciplines'}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                {lang === 'id'
                  ? 'Setiap layanan dirancang dengan mengutamakan kualitas, keandalan, dan efisiensi operasional di lapangan.'
                  : 'We deliver end-to-end solutions across multiple disciplines designed with quality, reliability, and efficiency in mind.'}
              </p>
            </div>

            {/* Asymmetric Bento Grid: Featured 2 disciplines span 2 cols on lg if 4-col or 3-col layout */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SOLUTION_DISCIPLINES.map((item) => {
                const isSelected = item.id === selectedSolutionId;
                return (
                  <article
                    key={item.id}
                    onClick={() => setSelectedSolutionId(item.id)}
                    className={`rounded-xl p-6 transition-colors cursor-pointer flex flex-col justify-between border ${
                      item.featured ? 'lg:col-span-1' : ''
                    } ${
                      isSelected
                        ? 'bg-slate-950 text-slate-100 border-slate-900'
                        : 'bg-slate-50 text-slate-900 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span
                          className={`font-mono-tabular text-xs font-semibold ${
                            isSelected ? 'text-blue-400' : 'text-blue-700'
                          }`}
                        >
                          {item.index}. {item.title[lang]}
                        </span>
                      </div>

                      <h3
                        className={`mt-3 text-lg font-bold ${
                          isSelected ? 'text-white' : 'text-slate-950'
                        }`}
                      >
                        {item.title[lang]}
                      </h3>

                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          isSelected ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {item.summary[lang]}
                      </p>

                      <ul
                        className={`mt-5 pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs ${
                          isSelected
                            ? 'border-slate-800 text-slate-300'
                            : 'border-slate-200 text-slate-600'
                        }`}
                      >
                        {item.scope.map((point) => (
                          <li key={point} className="truncate">
                            · {point}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConsultSolution(item.title[lang]);
                        }}
                        className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          isSelected
                            ? 'text-orange-400 hover:text-orange-300'
                            : 'text-blue-700 hover:text-blue-800'
                        }`}
                      >
                        <span>
                          {lang === 'id'
                            ? 'Konsultasikan Solusi Ini'
                            : 'Discuss This Solution'}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* 8 Core Capability Pillars Interactive Strip */}
            <div className="mt-16 pt-12 border-t border-slate-200">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-blue-700">
                    {lang === 'id'
                      ? 'DELAPAN KAPABILITAS TEKNIS'
                      : 'EIGHT CORE TECHNICAL CAPABILITIES'}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-950">
                    {lang === 'id'
                      ? 'Cakupan Pekerjaan Lapangan'
                      : 'Field Engineering Scope'}
                  </h3>
                </div>
                <span className="text-xs text-slate-500">
                  {lang === 'id'
                    ? 'Klik bidang untuk melihat rincian layanan'
                    : 'Select a capability to inspect deliverables'}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Selector List */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {CAPABILITY_PILLARS.map((cap) => {
                    const active = cap.id === activeCapability.id;
                    return (
                      <button
                        key={cap.id}
                        type="button"
                        onClick={() => setSelectedCapabilityId(cap.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border text-sm font-medium transition-colors flex items-center justify-between gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          active
                            ? 'bg-blue-700 text-white border-blue-700'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">
                          <span
                            className={`font-mono-tabular text-xs mr-2 ${
                              active ? 'text-blue-200' : 'text-slate-400'
                            }`}
                          >
                            {cap.code}
                          </span>
                          {cap.title[lang]}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 shrink-0 ${
                            active ? 'text-white' : 'text-slate-400'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>

                {/* Selected Capability Inspector Panel */}
                <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <span className="font-mono-tabular text-blue-700 font-semibold">
                        CAPABILITY {activeCapability.code}
                      </span>
                      <span>
                        {lang === 'id' ? 'Sektor:' : 'Sectors:'}{' '}
                        {activeCapability.sectors[lang]}
                      </span>
                    </div>

                    <h4 className="mt-3 text-2xl font-bold text-slate-950">
                      {activeCapability.title[lang]}
                    </h4>
                    <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                      {activeCapability.summary[lang]}
                    </p>

                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <p className="text-xs font-semibold text-slate-500 mb-3">
                        {lang === 'id'
                          ? 'Lingkup Perangkat & Implementasi'
                          : 'Deliverables & Implementation Scope'}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeCapability.deliverables.map((deliv) => (
                          <div
                            key={deliv}
                            className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-800"
                          >
                            {deliv}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-slate-500">
                      {lang === 'id'
                        ? 'Tersedia untuk proyek baru, renovasi, maupun kontrak pemeliharaan.'
                        : 'Available for new builds, retrofits, and maintenance contracts.'}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        handleConsultSolution(activeCapability.title[lang])
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>
                        {lang === 'id'
                          ? 'Minta Penawaran Teknis'
                          : 'Request Technical Proposal'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Why Choose Us */}
        <section id="keunggulan" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider text-blue-700">
                  {lang === 'id' ? '03. KEUNGGULAN KAMI' : '03. WHY CHOOSE US'}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                  {lang === 'id'
                    ? 'Menghadirkan Nilai, Membangun Kepercayaan'
                    : 'Delivering Value, Building Trust'}
                </h2>
              </div>
              <p className="text-sm text-slate-600 max-w-md">
                {lang === 'id'
                  ? 'Komitmen standar kualitas, keselamatan kerja, dan dukungan teknis responsif di setiap proyek.'
                  : 'Committed to reliable solutions that meet your business needs with the highest standards of safety and professionalism.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-xl overflow-hidden">
              {WHY_CHOOSE_US.map((item) => (
                <div key={item.id} className="bg-white p-6 sm:p-8">
                  <div className="font-mono-tabular text-xs font-semibold text-orange-600">
                    {item.index}.
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-950">
                    {item.title[lang]}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                    {item.description[lang]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Our Customer Partners (All 52 Verified Partners + Search & Sector Filter) */}
        <section id="klien" className="py-16 lg:py-24 bg-white border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold tracking-wider text-blue-700">
                  {lang === 'id' ? '04. MITRA & KLIEN' : '04. OUR CUSTOMER PARTNER'}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                  {lang === 'id'
                    ? 'Dipercaya oleh 52+ Perusahaan & Institusi Lintas Industri'
                    : 'Trusted by Various Industries'}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600">
                  {lang === 'id'
                    ? 'Kepercayaan klien dari sektor manufaktur, otomotif, pembiayaan, ritel, media televisi, hingga fasilitas kesehatan menjadi motivasi kami menjaga mutu layanan.'
                    : 'We are proud to have collaborated with companies, institutions, and business partners across manufacturing, automotive, media, retail, and healthcare.'}
                </p>
              </div>

              {/* Live Partner Search */}
              <div className="w-full lg:w-80 shrink-0">
                <label htmlFor="partner-search" className="sr-only">
                  {lang === 'id' ? 'Cari mitra klien' : 'Search client partner'}
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="partner-search"
                    type="text"
                    value={partnerQuery}
                    onChange={(e) => setPartnerQuery(e.target.value)}
                    placeholder={
                      lang === 'id'
                        ? 'Cari nama perusahaan / PKM...'
                        : 'Search partner name...'
                    }
                    className="w-full pl-10 pr-9 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                  {partnerQuery && (
                    <button
                      type="button"
                      onClick={() => setPartnerQuery('')}
                      aria-label={lang === 'id' ? 'Hapus pencarian' : 'Clear search'}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive Sector Filter Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg w-fit max-w-full">
              {SECTOR_FILTERS.map((filter) => {
                const isActive = partnerSector === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setPartnerSector(filter.id)}
                    className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-xs'
                        : 'text-slate-600 hover:text-slate-950'
                    }`}
                  >
                    {filter.label[lang]}
                  </button>
                );
              })}
            </div>

            {/* Partner Directory Grid */}
            {filteredPartners.length > 0 ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {filteredPartners.map((partner, idx) => (
                  <div
                    key={partner.name}
                    className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3.5 flex flex-col justify-between gap-1"
                  >
                    <div className="flex items-start gap-2.5">
                      <Building2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                      <span className="text-sm font-semibold text-slate-900 leading-snug">
                        {partner.name}
                      </span>
                    </div>
                    <div className="pl-6.5 text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="font-mono-tabular">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">
                        {sectorLabelMap[partner.sector]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-10 text-center">
                <p className="text-sm font-medium text-slate-700">
                  {lang === 'id'
                    ? `Tidak ada mitra yang cocok dengan pencarian "${partnerQuery}".`
                    : `No partner matched "${partnerQuery}".`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setPartnerQuery('');
                    setPartnerSector('all');
                  }}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-blue-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  {lang === 'id' ? 'Tampilkan Semua Mitra' : 'Reset Filter'}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* 6. Legal Information & Official Document Verification */}
        <section id="legalitas" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Summary */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-blue-700">
                    {lang === 'id'
                      ? '05. INFORMASI LEGALITAS'
                      : '05. LEGAL INFORMATION'}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                    {lang === 'id'
                      ? 'Terdaftar Resmi & Patuh Perpajakan Indonesia'
                      : 'Legally Registered & Tax-Compliant Company'}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                    {lang === 'id'
                      ? 'PT Tagline Kreasindo Askara merupakan badan usaha berizin resmi (NIB & PKP) yang beroperasi sesuai hukum dan peraturan perpajakan di Republik Indonesia.'
                      : 'PT Tagline Kreasindo Askara is a legally registered and tax-compliant company, operating under the applicable laws and regulations in Indonesia.'}
                  </p>
                </div>

                {/* 4 Compliance Pillars */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      title: 'Legal',
                      sub: lang === 'id' ? 'Terdaftar & Patuh' : 'Registered & Compliant',
                    },
                    {
                      title: 'Trusted',
                      sub: lang === 'id' ? 'Sesuai Regulasi RI' : 'Indonesian Regulations',
                    },
                    {
                      title: 'Accountable',
                      sub: lang === 'id' ? 'Transparan & Profesional' : 'Transparent & Professional',
                    },
                    {
                      title: 'Ready to Partner',
                      sub: lang === 'id' ? 'Kemitraan Jangka Panjang' : 'Long-Term Collaboration',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="bg-white border border-slate-200 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 text-sm font-bold text-slate-950">
                        <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
                        <span>{item.title}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-600">{item.sub}</p>
                    </div>
                  ))}
                </div>

                {/* Official PDF Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setPdfModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <FileText className="w-4 h-4" />
                    <span>
                      {lang === 'id'
                        ? 'Pratinjau Dokumen PDF'
                        : 'Preview PDF Profile'}
                    </span>
                  </button>
                  <a
                    href={COMPANY_PDF_PATH}
                    download="Company_Profile_PT_Tagline_Kreasindo_Askara.pdf"
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>
                      {lang === 'id' ? 'Unduh PDF (8 Hal)' : 'Download PDF (8p)'}
                    </span>
                  </a>
                </div>
              </div>

              {/* Right Registry Table */}
              <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="px-6 py-4 bg-slate-950 text-white flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold">
                    {lang === 'id'
                      ? 'Registrasi Badan Usaha & Perpajakan'
                      : 'Corporate & Tax Registration Registry'}
                  </span>
                  <span className="font-mono-tabular text-xs text-blue-400">
                    PMDN · DKI JAKARTA
                  </span>
                </div>

                <dl className="divide-y divide-slate-200">
                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <dt className="text-xs font-semibold text-slate-500">
                      {lang === 'id' ? 'Nama Perusahaan' : 'Company Name'}
                    </dt>
                    <dd className="sm:col-span-2 text-sm font-semibold text-slate-950">
                      {COMPANY_INFO.name}
                    </dd>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <dt className="text-xs font-semibold text-slate-500">
                      NIB (Nomor Induk Berusaha)
                    </dt>
                    <dd className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="font-mono-tabular text-sm font-semibold text-slate-950">
                          {COMPANY_INFO.legal.nib}
                        </span>
                        <span className="ml-2 text-xs text-slate-500">
                          ({lang === 'id' ? 'Ditetapkan' : 'Issued'}{' '}
                          {COMPANY_INFO.legal.nibDate})
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('nib', COMPANY_INFO.legal.nib)
                        }
                        className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800 cursor-pointer"
                      >
                        {copiedField === 'nib' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'id' ? 'Tersalin' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{lang === 'id' ? 'Salin' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </dd>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <dt className="text-xs font-semibold text-slate-500">
                      NPWP
                    </dt>
                    <dd className="sm:col-span-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-tabular text-sm font-semibold text-slate-950">
                        {COMPANY_INFO.legal.npwp}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy('npwp', COMPANY_INFO.legal.npwp)
                        }
                        className="inline-flex items-center gap-1 text-xs text-blue-700 hover:text-blue-800 cursor-pointer"
                      >
                        {copiedField === 'npwp' ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{lang === 'id' ? 'Tersalin' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{lang === 'id' ? 'Salin' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </dd>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <dt className="text-xs font-semibold text-slate-500">
                      Surat Pengukuhan PKP
                    </dt>
                    <dd className="sm:col-span-2 text-sm text-slate-800">
                      <div className="font-mono-tabular font-semibold text-slate-950">
                        {COMPANY_INFO.legal.pkpNumber}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {COMPANY_INFO.legal.taxOffice} ·{' '}
                        {COMPANY_INFO.legal.pkpDate}
                      </div>
                    </dd>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <dt className="text-xs font-semibold text-slate-500">
                      Status Penanaman Modal
                    </dt>
                    <dd className="sm:col-span-2 text-sm font-medium text-slate-800">
                      {COMPANY_INFO.legal.investmentStatus}
                    </dd>
                  </div>

                  <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <dt className="text-xs font-semibold text-slate-500">
                      Kode &amp; Klasifikasi KBLI
                    </dt>
                    <dd className="sm:col-span-2 space-y-1.5">
                      {COMPANY_INFO.legal.kbli.map((item) => (
                        <div
                          key={item.code}
                          className="text-xs sm:text-sm text-slate-700 flex items-baseline gap-2"
                        >
                          <span className="font-mono-tabular font-semibold text-blue-700 shrink-0">
                            {item.code}
                          </span>
                          <span>{item.name}</span>
                        </div>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Contact & Offices + Validated Inquiry Form */}
        <section id="kontak" className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Offices & Direct Contact */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold tracking-wider text-blue-700">
                    {lang === 'id' ? '06. HUBUNGI KAMI' : '06. CONTACT US'}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                    {lang === 'id'
                      ? 'Diskusikan Kebutuhan Proyek Anda'
                      : 'Discuss Your Project Requirements'}
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-slate-600">
                    {lang === 'id'
                      ? 'Tim teknis kami siap membantu survei lokasi, perancangan sistem, hingga penyusunan penawaran resmi.'
                      : 'Our engineering team is ready to assist with site surveys, system design, and formal technical proposals.'}
                  </p>
                </div>

                {/* Direct Channels */}
                <div className="space-y-3 pt-2">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-slate-500">
                          {lang === 'id' ? 'Telepon Kantor' : 'Office Phone'}
                        </div>
                        <a
                          href={COMPANY_INFO.phoneHref}
                          className="font-mono-tabular text-sm font-semibold text-slate-950 hover:text-blue-700"
                        >
                          {COMPANY_INFO.phone}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('phone', COMPANY_INFO.phone)}
                      className="text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'phone'
                        ? lang === 'id'
                          ? 'Tersalin'
                          : 'Copied'
                        : lang === 'id'
                        ? 'Salin'
                        : 'Copy'}
                    </button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs text-slate-500">Email</div>
                        <a
                          href={`mailto:${COMPANY_INFO.email}`}
                          className="text-sm font-semibold text-slate-950 hover:text-blue-700 truncate block"
                        >
                          {COMPANY_INFO.email}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy('email', COMPANY_INFO.email)}
                      className="text-xs font-medium text-blue-700 hover:text-blue-800 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'email'
                        ? lang === 'id'
                          ? 'Tersalin'
                          : 'Copied'
                        : lang === 'id'
                        ? 'Salin'
                        : 'Copy'}
                    </button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-center gap-3">
                    <Globe className="w-4 h-4 text-blue-700 shrink-0" />
                    <div>
                      <div className="text-xs text-slate-500">Website</div>
                      <a
                        href={`https://${COMPANY_INFO.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold text-slate-950 hover:text-blue-700"
                      >
                        {COMPANY_INFO.website}
                      </a>
                    </div>
                  </div>
                </div>

                {/* 2 Office Locations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  {COMPANY_INFO.offices.map((office) => (
                    <div
                      key={office.id}
                      className="bg-slate-50 border border-slate-200 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-2 text-xs font-bold text-slate-950">
                          <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                          <span>{office.label[lang]}</span>
                        </span>
                        <a
                          href={office.mapsQuery}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-blue-700 hover:underline whitespace-nowrap shrink-0"
                        >
                          {lang === 'id' ? 'Buka Peta' : 'Open Map'}
                        </a>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {office.address}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Validated Consultation Form */}
              <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
                {submittedSummary ? (
                  <div className="space-y-6 py-4">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                      <Check className="w-5 h-5" />
                      <span>
                        {lang === 'id'
                          ? 'Permintaan Konsultasi Siap Dikirim'
                          : 'Consultation Brief Ready'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {lang === 'id'
                          ? `Terima kasih, ${submittedSummary.fullName}`
                          : `Thank you, ${submittedSummary.fullName}`}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        {lang === 'id'
                          ? 'Ringkasan kebutuhan proyek Anda telah divalidasi. Klik tombol di bawah untuk mengirim langsung melalui aplikasi email Anda ke tim kami.'
                          : 'Your project summary has been validated. Use the button below to send this brief directly to our team via your email client.'}
                      </p>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-2 text-sm">
                      <div>
                        <span className="text-slate-500">
                          {lang === 'id' ? 'Perusahaan:' : 'Company:'}{' '}
                        </span>
                        <span className="font-medium text-slate-900">
                          {submittedSummary.company || '-'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">
                          {lang === 'id' ? 'Bidang Solusi:' : 'Solution:'}{' '}
                        </span>
                        <span className="font-medium text-slate-900">
                          {submittedSummary.discipline}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500">Email / Telp: </span>
                        <span className="font-mono-tabular font-medium text-slate-900">
                          {submittedSummary.email} · {submittedSummary.phone}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-slate-100 text-slate-700">
                        {submittedSummary.message}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildMailtoHref(submittedSummary)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <Mail className="w-4 h-4" />
                        <span>
                          {lang === 'id'
                            ? 'Kirim ke Email Tagline'
                            : 'Send via Email Client'}
                        </span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setSubmittedSummary(null)}
                        className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {lang === 'id' ? 'Ubah / Buat Baru' : 'Edit / New Inquiry'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={validateAndSubmit} noValidate className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-950">
                        {lang === 'id'
                          ? 'Formulir Konsultasi & Penawaran Proyek'
                          : 'Project Consultation & Proposal Form'}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {lang === 'id'
                          ? 'Lengkapi detail berikut untuk menjadwalkan survei atau permintaan penawaran.'
                          : 'Complete the details below to schedule a site survey or request a quote.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'id' ? 'Nama Lengkap *' : 'Full Name *'}
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          value={formState.fullName}
                          onChange={(e) =>
                            setFormState({ ...formState, fullName: e.target.value })
                          }
                          placeholder={
                            lang === 'id' ? 'Nama PIC proyek' : 'Contact person name'
                          }
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {formErrors.fullName && (
                          <p className="mt-1 text-xs text-red-600">
                            {formErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="company"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'id'
                            ? 'Perusahaan / Institusi'
                            : 'Company / Institution'}
                        </label>
                        <input
                          id="company"
                          type="text"
                          value={formState.company}
                          onChange={(e) =>
                            setFormState({ ...formState, company: e.target.value })
                          }
                          placeholder="PT / CV / Institusi"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          Email *
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          placeholder="nama@perusahaan.co.id"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {formErrors.email && (
                          <p className="mt-1 text-xs text-red-600">
                            {formErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-xs font-semibold text-slate-700 mb-1.5"
                        >
                          {lang === 'id'
                            ? 'Nomor Telepon / WhatsApp *'
                            : 'Phone / WhatsApp *'}
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState({ ...formState, phone: e.target.value })
                          }
                          placeholder="0812 xxxx xxxx"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                        {formErrors.phone && (
                          <p className="mt-1 text-xs text-red-600">
                            {formErrors.phone}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="discipline"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        {lang === 'id'
                          ? 'Bidang Solusi yang Dibutuhkan'
                          : 'Required Solution Discipline'}
                      </label>
                      <select
                        id="discipline"
                        value={formState.discipline}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            discipline: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        {SOLUTION_DISCIPLINES.map((sol) => (
                          <option key={sol.id} value={sol.title[lang]}>
                            {sol.title[lang]}
                          </option>
                        ))}
                        {CAPABILITY_PILLARS.map((cap) => (
                          <option key={cap.id} value={cap.title[lang]}>
                            {cap.title[lang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold text-slate-700 mb-1.5"
                      >
                        {lang === 'id'
                          ? 'Ringkasan Kebutuhan & Lokasi Proyek *'
                          : 'Project Scope & Site Location *'}
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({ ...formState, message: e.target.value })
                        }
                        placeholder={
                          lang === 'id'
                            ? 'Contoh: Instalasi CCTV & access control untuk gedung perkantoran 4 lantai di Jakarta Selatan.'
                            : 'Example: CCTV & access control installation for a 4-story office building in South Jakarta.'
                        }
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-xs text-red-600">
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-xs text-slate-500">
                        {lang === 'id'
                          ? '* Wajib diisi sebelum pengiriman'
                          : '* Required fields'}
                      </span>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                      >
                        <span>
                          {lang === 'id'
                            ? 'Siapkan Permintaan Konsultasi'
                            : 'Submit Consultation Brief'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="bg-[#0A1628] text-slate-300 border-t border-slate-800">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
            <div className="md:col-span-5 space-y-3">
              <div className="inline-flex items-center gap-2.5 text-base font-bold text-white">
                <BrandMark className="w-6 h-6" inverted />
                <span>PT TAGLINE KREASINDO ASKARA</span>
              </div>
              <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
                {lang === 'id'
                  ? 'Solusi Terpadu untuk Sistem Keamanan, Jaringan & IoT, Instalasi Kelistrikan, MEP, Pekerjaan Sipil, dan Otomasi Industri.'
                  : 'Integrated Solutions for a Smarter, Safer, and More Connected Future.'}
              </p>
              <div className="text-xs font-mono-tabular text-slate-400 pt-1">
                NIB {COMPANY_INFO.legal.nib} · NPWP {COMPANY_INFO.legal.npwp}
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="text-xs font-semibold text-white">
                {lang === 'id' ? 'Navigasi' : 'Navigation'}
              </div>
              <ul className="space-y-1.5 text-xs text-slate-400">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="hover:text-white transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#kontak"
                    className="hover:text-white transition-colors"
                  >
                    {lang === 'id' ? 'Kontak' : 'Contact'}
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-2 text-xs text-slate-400">
              <div className="text-xs font-semibold text-white">
                {lang === 'id' ? 'Kantor & Kontak Resmi' : 'Offices & Contact'}
              </div>
              <p>
                <strong className="text-slate-200">Jakarta:</strong> Jl. Wisma NH
                Lt. 1, Jl. Raya Pasar Minggu No. 2B-C, Pancoran, Jakarta Selatan
                12780
              </p>
              <p>
                <strong className="text-slate-200">BSD:</strong> Ruko Malibu Blok
                B No. 38, BSD City Serpong, Tangerang Selatan 15310
              </p>
              <p className="font-mono-tabular pt-1">
                Tel. {COMPANY_INFO.phone} · {COMPANY_INFO.email}
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>
              © {new Date().getFullYear()} PT Tagline Kreasindo Askara.{' '}
              {lang === 'id' ? 'Hak cipta dilindungi.' : 'All rights reserved.'}
            </span>
            <a
              href={COMPANY_PDF_PATH}
              download="Company_Profile_PT_Tagline_Kreasindo_Askara.pdf"
              className="text-slate-400 hover:text-white transition-colors"
            >
              {lang === 'id'
                ? 'Unduh Company Profile (PDF)'
                : 'Download Company Profile (PDF)'}
            </a>
          </div>
        </div>
      </footer>

      <PdfPreviewModal
        isOpen={pdfModalOpen}
        onClose={() => setPdfModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
