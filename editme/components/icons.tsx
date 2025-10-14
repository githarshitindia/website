import React from 'react';

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const HugIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
    <path d="M18 12h-2.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5H18" />
    <path d="M6 12h2.5a.5.5 0 01.5.5v1a.5.5 0 01-.5.5H6" />
  </svg>
);

export const SareeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M3.5 12.5c0-3.3 2.7-6 6-6h2c3.3 0 6 2.7 6 6v3.5c0 .8-.7 1.5-1.5 1.5H5c-.8 0-1.5-.7-1.5-1.5v-3.5z" />
    <path d="M4 17.5c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5V17" />
    <path d="M6 12.5v-5c0-1.1.9-2 2-2h1" />
  </svg>
);

export const SurpriseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 11.5a2.5 2.5 0 010-5" />
    <path d="M12 14v.01" />
  </svg>
);

export const CoupleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <circle cx="9" cy="7" r="4" />
    <path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" />
    <circle cx="16" cy="7" r="4" />
  </svg>
);

export const GirlfriendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M17.5 19H9a7 7 0 110-14h8.5" />
    <circle cx="9" cy="12" r="2" />
    <path d="M19 12h-2" />
    <path d="M13 17.5c-1.5-1-2-2.5-2-4.5" />
    <path d="M12 22V12" />
    <path d="M16 9l-3 3 3 3" />
  </svg>
);

export const BollywoodIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
    <line x1="7" y1="2" x2="7" y2="22" />
    <line x1="17" y1="2" x2="17" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="2" y1="7" x2="7" y2="7" />
    <line x1="2" y1="17" x2="7" y2="17" />
    <line x1="17" y1="17" x2="22" y2="17" />
    <line x1="17" y1="7" x2="22" y2="7" />
  </svg>
);

export const DiwaliIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M8 2c-1.5 2.5-2 6-2 8 0 1.5.5 3 2 4.5V20h8v-5.5c1.5-1.5 2-3 2-4.5 0-2-1-5-2-8" />
    <path d="M12 14.5a2.5 2.5 0 000-5" />
    <path d="M12 4a2 2 0 100-4 2 2 0 000 4z" />
  </svg>
);

export const DressIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M6 2l6 6 6-6" />
    <path d="M12 8v14" />
    <path d="M18 22H6" />
    <path d="M21 14h-6" />
    <path d="M9 14H3" />
  </svg>
);

export const WeddingIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M12 11l-4 4" />
    <path d="M12 11l4 4" />
    <path d="M12 7v4" />
  </svg>
);

export const CarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M14 16H5a2 2 0 01-2-2V8a2 2 0 012-2h9l3 4v6a2 2 0 01-2 2z" />
    <circle cx="6.5" cy="16.5" r="1.5" />
    <circle cx="12.5" cy="16.5" r="1.5" />
  </svg>
);

export const VintageCameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <path d="M14.5 4h-9A2.5 2.5 0 003 6.5v11A2.5 2.5 0 005.5 20h9a2.5 2.5 0 002.5-2.5v-11A2.5 2.5 0 0014.5 4z" />
    <circle cx="12" cy="13" r="3" />
    <line x1="17" y1="5" x2="17" y2="5" />
  </svg>
);

export const PassportIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg {...iconProps} className={className}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <circle cx="12" cy="9" r="3" />
    <path d="M12 12.5c-2 0-4 1.5-4 3.5v.5h8v-.5c0-2-2-3.5-4-3.5z" />
  </svg>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg {...iconProps} className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="17 8 12 3 7 8"></polyline>
        <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
);

export const ArrowLeftIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg {...iconProps} className={className}>
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
);

