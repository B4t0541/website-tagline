import React, { useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { COMPANY_PDF_PATH, Language } from '../data/companyProfile';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdf-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl h-[85vh] bg-white rounded-xl border border-slate-200 flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="min-w-0">
            <h3
              id="pdf-modal-title"
              className="text-base font-semibold text-slate-900 truncate"
            >
              {lang === 'id'
                ? 'Company Profile — PT Tagline Kreasindo Askara (PDF)'
                : 'Company Profile — PT Tagline Kreasindo Askara (PDF)'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 truncate">
              {lang === 'id'
                ? 'Dokumen resmi 8 halaman · Profil, Solusi, Mitra & Legalitas'
                : 'Official 8-page corporate profile · Solutions, Partners & Legal Registry'}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={COMPANY_PDF_PATH}
              download="Company_Profile_PT_Tagline_Kreasindo_Askara.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Unduh PDF' : 'Download PDF'}</span>
            </a>
            <a
              href={COMPANY_PDF_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? 'Tab Baru' : 'New Tab'}</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'id' ? 'Tutup pratinjau' : 'Close preview'}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-slate-100">
          <iframe
            src={COMPANY_PDF_PATH}
            title="PT Tagline Kreasindo Askara Company Profile PDF"
            className="w-full h-full border-0"
          />
        </div>
      </div>
    </div>
  );
};
