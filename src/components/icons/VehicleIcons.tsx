import React from 'react';

// Colorful Bike Icon
export const BikeIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="44" r="10" fill="#10B981" stroke="#059669" strokeWidth="2"/>
    <circle cx="50" cy="44" r="10" fill="#10B981" stroke="#059669" strokeWidth="2"/>
    <circle cx="14" cy="44" r="4" fill="#fff"/>
    <circle cx="50" cy="44" r="4" fill="#fff"/>
    <path d="M14 44L24 28H36L42 44" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M36 28L50 44" stroke="#1F2937" strokeWidth="3" strokeLinecap="round"/>
    <path d="M24 28V18C24 16 26 14 28 14H32" stroke="#1F2937" strokeWidth="3" strokeLinecap="round"/>
    <path d="M22 18H30" stroke="#1F2937" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="32" cy="22" r="6" fill="#F59E0B"/>
    <path d="M29 22L31 24L35 20" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Colorful E-Rickshaw Icon
export const ERickshawIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="24" width="40" height="22" rx="4" fill="#3B82F6"/>
    <rect x="12" y="28" width="14" height="10" rx="2" fill="#E0F2FE"/>
    <rect x="30" y="28" width="14" height="10" rx="2" fill="#E0F2FE"/>
    <path d="M48 32H56C58 32 60 34 60 36V44C60 46 58 46 56 46H48" fill="#3B82F6"/>
    <circle cx="16" cy="50" r="6" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
    <circle cx="40" cy="50" r="6" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
    <circle cx="56" cy="50" r="4" fill="#1F2937"/>
    <circle cx="16" cy="50" r="2" fill="#9CA3AF"/>
    <circle cx="40" cy="50" r="2" fill="#9CA3AF"/>
    <rect x="6" y="18" width="8" height="6" rx="2" fill="#22C55E"/>
    <path d="M10 14L10 18" stroke="#22C55E" strokeWidth="2"/>
    <circle cx="10" cy="12" r="2" fill="#FCD34D"/>
    <rect x="44" y="36" width="4" height="6" rx="1" fill="#FCD34D"/>
    <path d="M20 20H36" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Colorful Outstation Cab Icon
export const OutstationIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 38L12 26C13 23 16 22 18 22H46C48 22 51 23 52 26L56 38" fill="#8B5CF6"/>
    <rect x="6" y="38" width="52" height="14" rx="3" fill="#A78BFA"/>
    <rect x="10" y="28" width="12" height="8" rx="2" fill="#E0E7FF"/>
    <rect x="42" y="28" width="12" height="8" rx="2" fill="#E0E7FF"/>
    <rect x="26" y="28" width="12" height="8" rx="2" fill="#E0E7FF"/>
    <circle cx="16" cy="52" r="6" fill="#1F2937" stroke="#4B5563" strokeWidth="2"/>
    <circle cx="48" cy="52" r="6" fill="#1F2937" stroke="#4B5563" strokeWidth="2"/>
    <circle cx="16" cy="52" r="2" fill="#9CA3AF"/>
    <circle cx="48" cy="52" r="2" fill="#9CA3AF"/>
    <rect x="26" y="16" width="12" height="6" rx="2" fill="#FBBF24"/>
    <path d="M32 12L32 16" stroke="#FBBF24" strokeWidth="2"/>
    <rect x="10" y="42" width="6" height="4" rx="1" fill="#FBBF24"/>
    <rect x="48" y="42" width="6" height="4" rx="1" fill="#EF4444"/>
    <path d="M4 38L8 36" stroke="#DDD6FE" strokeWidth="2" strokeLinecap="round"/>
    <path d="M60 38L56 36" stroke="#DDD6FE" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 44H40" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Colorful Ambulance Icon
export const AmbulanceIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="24" width="44" height="22" rx="3" fill="#FEFEFE" stroke="#DC2626" strokeWidth="2"/>
    <path d="M48 32H56C59 32 60 34 60 36V44C60 46 59 46 56 46H48" fill="#FEFEFE" stroke="#DC2626" strokeWidth="2"/>
    <circle cx="14" cy="50" r="6" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
    <circle cx="40" cy="50" r="6" fill="#1F2937" stroke="#374151" strokeWidth="2"/>
    <circle cx="56" cy="50" r="4" fill="#1F2937"/>
    <circle cx="14" cy="50" r="2" fill="#9CA3AF"/>
    <circle cx="40" cy="50" r="2" fill="#9CA3AF"/>
    <rect x="50" y="34" width="6" height="8" rx="1" fill="#BFDBFE"/>
    <rect x="20" y="28" width="4" height="12" rx="1" fill="#DC2626"/>
    <rect x="16" y="32" width="12" height="4" rx="1" fill="#DC2626"/>
    <rect x="4" y="38" width="8" height="3" rx="1" fill="#3B82F6"/>
    <path d="M4 41H12" stroke="#2563EB" strokeWidth="1"/>
    <circle cx="8" cy="20" r="4" fill="#DC2626">
      <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/>
    </circle>
    <circle cx="44" cy="20" r="4" fill="#3B82F6">
      <animate attributeName="opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite"/>
    </circle>
  </svg>
);

// Trust Badge Icons
export const Shield24x7Icon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L6 12V22C6 33 14 42 24 44C34 42 42 33 42 22V12L24 4Z" fill="#10B981" stroke="#059669" strokeWidth="2"/>
    <text x="24" y="28" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">24/7</text>
  </svg>
);

export const FastResponseIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="20" fill="#F59E0B" stroke="#D97706" strokeWidth="2"/>
    <path d="M24 12V24L32 28" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 8L12 4" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
    <path d="M32 8L36 4" stroke="#D97706" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const GPSTrackingIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="18" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2"/>
    <circle cx="24" cy="24" r="10" stroke="#3B82F6" strokeWidth="2"/>
    <circle cx="24" cy="24" r="4" fill="#3B82F6"/>
    <path d="M24 4V10" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M24 38V44" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M4 24H10" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M38 24H44" stroke="#3B82F6" strokeWidth="2"/>
  </svg>
);
