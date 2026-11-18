import React, { useState } from 'react';
import { Shield, Network, Zap, Cpu, ArrowUpRight } from 'lucide-react';
import { Language } from '../data/companyProfile';

interface SystemsBlueprintProps {
  lang: Language;
  onSelectDiscipline?: (id: string) => void;
}

interface BlueprintLayer {
  id: string;
  disciplineId: string;
  label: string;
  code: string;
  accent: string;
  description: { id: string; en: string };
  specs: string[];
  icon: React.ComponentType<{ className?: string }>;
}

const LAYERS: BlueprintLayer[] = [
  {
    id: 'security',
    disciplineId: 'security-system',
    label: 'Security & Surveillance',
    code: 'SYS-01',
    accent: '#0072E5',
    description: {
      id: 'CCTV IP, kontrol akses biometrik, portal barrier gate, dan ruang monitoring terintegrasi.',
      en: 'IP CCTV arrays, biometric access control, barrier gates, and centralized monitoring rooms.',
    },
    specs: ['IP Camera & NVR/DVR', 'Access Control & Gate', 'Video Analytics'],
    icon: Shield,
  },
  {
    id: 'network',
    disciplineId: 'networking-iot',
    label: 'Network, Fiber & IoT',
    code: 'SYS-02',
    accent: '#0284C7',
    description: {
      id: 'Tulang punggung fiber optik, pengkabelan terstruktur LAN/WAN, data center, dan sensor IoT.',
      en: 'Optical fiber backbones, structured LAN/WAN cabling, data centers, and IoT telemetry.',
    },
    specs: ['Fiber Splicing & OTDR', 'Managed Switch & WiFi', 'Data Center & IoT'],
    icon: Network,
  },
  {
    id: 'mep',
    disciplineId: 'engineering-support',
    label: 'Electrical & MEP',
    code: 'SYS-03',
    accent: '#EA580C',
    description: {
      id: 'Panel distribusi daya (MDP), instalasi kelistrikan, HVAC, plumbing, hingga penerangan PJU.',
      en: 'Main distribution panels (MDP), power wiring, HVAC, plumbing, and facility lighting.',
    },
    specs: ['Power & MDP Panels', 'HVAC & Plumbing', 'Testing & Commissioning'],
    icon: Zap,
  },
  {
    id: 'automation',
    disciplineId: 'industrial-automation',
    label: 'Industrial Automation',
    code: 'SYS-04',
    accent: '#2563EB',
    description: {
      id: 'Pemrograman PLC & HMI, sistem SCADA, kontrol batching plant, dan fabrikasi panel kontrol.',
      en: 'PLC & HMI engineering, SCADA supervision, batching plant control, and panel fabrication.',
    },
    specs: ['PLC / HMI & SCADA', 'Batching & AMP Plant', 'Control Panel Fabrication'],
    icon: Cpu,
  },
];

export const SystemsBlueprint: React.FC<SystemsBlueprintProps> = ({
  lang,
  onSelectDiscipline,
}) => {
  const [activeId, setActiveId] = useState<string>('security');
  const activeLayer = LAYERS.find((l) => l.id === activeId) ?? LAYERS[0];

  return (
    <div className="relative flex flex-col justify-between h-full bg-[#0A1628] text-slate-100 rounded-xl border border-slate-800 overflow-hidden p-6 lg:p-7">
      {/* Subtle architectural engineering grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(148,163,184,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.18) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top Schematic Header */}
      <div className="relative z-10 flex items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-mono-tabular tracking-wider text-blue-400">
            {lang === 'id' ? 'ARSITEKTUR SISTEM TERPADU' : 'INTEGRATED FACILITY ARCHITECTURE'}
          </p>
          <h2 className="mt-1 text-base font-semibold text-white">
            {lang === 'id'
              ? 'Pilih Lapisan Infrastruktur'
              : 'Inspect Infrastructure Layer'}
          </h2>
        </div>
        <span className="font-mono-tabular text-xs text-slate-400 whitespace-nowrap shrink-0">
          {activeLayer.code}
        </span>
      </div>

      {/* Isometric Facility Wireframe SVG */}
      <div className="relative z-10 my-5 flex items-center justify-center">
        <svg
          viewBox="0 0 460 230"
          className="w-full max-w-[440px] h-auto"
          role="img"
          aria-label={
            lang === 'id'
              ? 'Diagram skematik empat lapisan infrastruktur Tagline Kreasindo Askara'
              : 'Four-layer engineering infrastructure schematic'
          }
        >
          {/* Base Foundation Plane */}
          <polygon
            points="230,206 420,148 230,90 40,148"
            fill="rgba(15, 23, 42, 0.85)"
            stroke="rgba(148, 163, 184, 0.25)"
            strokeWidth="1"
          />

          {/* Layer 4: Automation / Plant Core (Bottom-most active plane) */}
          <g
            onClick={() => setActiveId('automation')}
            className="cursor-pointer transition-opacity duration-200"
            style={{ opacity: activeId === 'automation' ? 1 : 0.45 }}
          >
            <polygon
              points="230,186 382,138 230,90 78,138"
              fill={
                activeId === 'automation'
                  ? 'rgba(37, 99, 235, 0.28)'
                  : 'rgba(30, 41, 59, 0.7)'
              }
              stroke={activeId === 'automation' ? '#60A5FA' : '#475569'}
              strokeWidth={activeId === 'automation' ? '1.75' : '1'}
            />
            <circle cx="230" cy="138" r="10" fill="#2563EB" opacity="0.9" />
            <path
              d="M155 138 H215 M245 138 H305"
              stroke="#93C5FD"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          </g>

          {/* Layer 3: Electrical & MEP */}
          <g
            onClick={() => setActiveId('mep')}
            className="cursor-pointer transition-opacity duration-200"
            style={{ opacity: activeId === 'mep' ? 1 : 0.5 }}
          >
            <polygon
              points="230,152 382,104 230,56 78,104"
              fill={
                activeId === 'mep'
                  ? 'rgba(234, 88, 12, 0.24)'
                  : 'rgba(30, 41, 59, 0.65)'
              }
              stroke={activeId === 'mep' ? '#FB923C' : '#475569'}
              strokeWidth={activeId === 'mep' ? '1.75' : '1'}
            />
            <path
              d="M165 104 L230 82 L295 104 L230 126 Z"
              fill="none"
              stroke={activeId === 'mep' ? '#FDBA74' : '#64748B'}
              strokeWidth="1.25"
            />
            <circle cx="165" cy="104" r="4" fill="#EA580C" />
            <circle cx="295" cy="104" r="4" fill="#EA580C" />
          </g>

          {/* Layer 2: Network & Fiber Optic */}
          <g
            onClick={() => setActiveId('network')}
            className="cursor-pointer transition-opacity duration-200"
            style={{ opacity: activeId === 'network' ? 1 : 0.55 }}
          >
            <polygon
              points="230,118 382,70 230,22 78,70"
              fill={
                activeId === 'network'
                  ? 'rgba(2, 132, 199, 0.28)'
                  : 'rgba(30, 41, 59, 0.6)'
              }
              stroke={activeId === 'network' ? '#38BDF8' : '#475569'}
              strokeWidth={activeId === 'network' ? '1.75' : '1'}
            />
            <line
              x1="140"
              y1="70"
              x2="320"
              y2="70"
              stroke={activeId === 'network' ? '#7DD3FC' : '#64748B'}
              strokeWidth="1.5"
            />
            <circle cx="230" cy="70" r="6" fill="#0284C7" stroke="#BAE6FD" strokeWidth="1.5" />
            <circle cx="140" cy="70" r="3.5" fill="#38BDF8" />
            <circle cx="320" cy="70" r="3.5" fill="#38BDF8" />
          </g>

          {/* Vertical Spine Connections */}
          <line
            x1="230"
            y1="22"
            x2="230"
            y2="186"
            stroke="rgba(148, 163, 184, 0.35)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />

          {/* Layer 1: Security Perimeter Markers */}
          <g
            onClick={() => setActiveId('security')}
            className="cursor-pointer transition-opacity duration-200"
            style={{ opacity: activeId === 'security' ? 1 : 0.6 }}
          >
            <rect
              x="198"
              y="10"
              width="64"
              height="24"
              rx="4"
              fill={activeId === 'security' ? '#0072E5' : '#1E293B'}
              stroke={activeId === 'security' ? '#93C5FD' : '#475569'}
              strokeWidth="1.25"
            />
            <text
              x="230"
              y="26"
              textAnchor="middle"
              fill="#F8FAFC"
              fontSize="9.5"
              fontWeight="600"
              fontFamily="JetBrains Mono, monospace"
            >
              CCTV / SOC
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Layer Switcher Tabs */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {LAYERS.map((layer) => {
          const Icon = layer.icon;
          const isActive = layer.id === activeId;
          return (
            <button
              key={layer.id}
              type="button"
              onClick={() => setActiveId(layer.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left text-xs font-medium transition-colors whitespace-nowrap truncate cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-600 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{layer.label.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Active Layer Detail Readout */}
      <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-lg p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">
              {activeLayer.label}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-300">
              {activeLayer.description[lang]}
            </p>
          </div>
          {onSelectDiscipline && (
            <button
              type="button"
              onClick={() => onSelectDiscipline(activeLayer.disciplineId)}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 hover:text-blue-300 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded"
            >
              <span>{lang === 'id' ? 'Detail' : 'Explore'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          {activeLayer.specs.map((spec, idx) => (
            <React.Fragment key={spec}>
              {idx > 0 && <span aria-hidden="true">·</span>}
              <span>{spec}</span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
