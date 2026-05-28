import React from 'react';

interface SVGProps {
  className?: string;
  color?: string;
  text?: string;
}

export const LogoImage: React.FC<SVGProps> = ({ className = 'h-8 w-auto' }) => {
  return (
    <svg className={className} viewBox="0 0 280 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="48" height="48" rx="12" fill="url(#logo-grad)" stroke="white" strokeWidth="2.5" />
      {/* Graduate Cap Graphic */}
      <path d="M29 16L41 22L29 28L17 22L29 16Z" fill="white" />
      <path d="M21 24.5V33.5C21 33.5 24 37 29 37C34 37 37 33.5 37 33.5V24.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M37 23.5V31L39 32" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Logo Typography */}
      <text x="66" y="32" fill="white" fontSize="22" fontWeight="800" fontFamily="Outfit, Inter, sans-serif" letterSpacing="0.5">CAREER</text>
      <text x="66" y="49" fill="url(#accent-grad)" fontSize="15" fontWeight="700" fontFamily="Outfit, Inter, sans-serif" letterSpacing="2">GRAZERS</text>
      
      <defs>
        <linearGradient id="logo-grad" x1="5" y1="5" x2="53" y2="53" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff451d" />
          <stop offset="0.5" stopColor="#7a00ff" />
          <stop offset="1" stopColor="#0c1730" />
        </linearGradient>
        <linearGradient id="accent-grad" x1="66" y1="40" x2="160" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff5722" />
          <stop offset="1" stopColor="#9c27b0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export const CollegeImage: React.FC<{ name: string; color: string; stream: string; className?: string }> = ({ name, color, stream, className = 'w-full h-48' }) => {
  // Hash characters in name to generate deterministic geometric layouts
  const nameHash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const layoutStyle = nameHash % 3;

  return (
    <div className={`relative overflow-hidden flex items-center justify-center ${className}`} style={{ background: `linear-gradient(135deg, ${color}dd, #0b132b)` }}>
      {/* Abstract Grid background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
      
      {/* Vector Campus Illustrations */}
      <svg className="w-full h-full max-h-32 opacity-20 absolute bottom-0 left-0" viewBox="0 0 400 150" fill="none">
        {layoutStyle === 0 && (
          <>
            <rect x="50" y="50" width="80" height="100" fill="white" />
            <polygon points="50,50 90,10 130,50" fill="white" opacity="0.8" />
            <rect x="65" y="70" width="15" height="25" fill="#0b132b" />
            <rect x="100" y="70" width="15" height="25" fill="#0b132b" />
            
            <rect x="160" y="30" width="120" height="120" fill="white" />
            <rect x="200" y="80" width="40" height="70" fill="#0b132b" />
            <circle cx="220" cy="55" r="12" fill="#0b132b" />
            
            <rect x="300" y="70" width="60" height="80" fill="white" />
            <polygon points="300,70 330,30 360,70" fill="white" opacity="0.8" />
          </>
        )}
        {layoutStyle === 1 && (
          <>
            <rect x="30" y="80" width="340" height="70" fill="white" />
            <rect x="80" y="40" width="50" height="40" fill="white" opacity="0.9" />
            <rect x="270" y="40" width="50" height="40" fill="white" opacity="0.9" />
            <circle cx="200" cy="60" r="30" fill="white" opacity="0.75" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x={50 + i * 40} y="95" width="20" height="30" fill="#0b132b" opacity="0.7" />
            ))}
          </>
        )}
        {layoutStyle === 2 && (
          <>
            <polygon points="200,20 60,150 340,150" fill="white" opacity="0.7" />
            <polygon points="200,35 100,150 300,150" fill="#0b132b" opacity="0.2" />
            <rect x="180" y="100" width="40" height="50" fill="white" />
            <circle cx="200" cy="70" r="10" fill="white" />
          </>
        )}
      </svg>
      
      {/* Stream and Name overlay */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold tracking-wider text-white uppercase backdrop-blur-md border border-white/20" style={{ background: 'rgba(255, 255, 255, 0.15)' }}>
        {stream}
      </div>
      
      <div className="z-10 text-center px-4">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl shadow-xl border border-white/30 text-white font-extrabold text-xl mb-2 backdrop-blur-sm" style={{ background: color }}>
          {name.split('(').pop()?.substring(0,3).toUpperCase() || name.substring(0, 3).toUpperCase()}
        </div>
        <h4 className="text-white font-bold text-sm tracking-wide line-clamp-1 text-shadow drop-shadow-md">{name.split(',')[0]}</h4>
        <p className="text-white/70 text-xs mt-0.5 font-medium">{name.split(',').slice(1).join(',') || 'India'}</p>
      </div>
    </div>
  );
};

export const CategoryIllustration: React.FC<{ type: string; className?: string }> = ({ type, className = 'w-12 h-12' }) => {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      {type === 'Engineering' && (
        <>
          <circle cx="32" cy="32" r="28" fill="url(#eng-grad)" opacity="0.15" />
          <path d="M42 22H22V42H42V22Z" stroke="#7a00ff" strokeWidth="3" strokeLinejoin="round" />
          <path d="M32 12V22" stroke="#7a00ff" strokeWidth="3" strokeLinecap="round" />
          <path d="M32 42V52" stroke="#7a00ff" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 32H22" stroke="#7a00ff" strokeWidth="3" strokeLinecap="round" />
          <path d="M42 32H52" stroke="#7a00ff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="32" cy="32" r="5" fill="#ff451d" />
          <defs>
            <linearGradient id="eng-grad" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#7a00ff" />
              <stop offset="1" stopColor="#ff451d" />
            </linearGradient>
          </defs>
        </>
      )}
      {type === 'Management' && (
        <>
          <circle cx="32" cy="32" r="28" fill="url(#mgt-grad)" opacity="0.15" />
          <path d="M14 46L24 32L34 38L50 18" stroke="#ff451d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M40 18H50V28" stroke="#ff451d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="46" r="3.5" fill="#7a00ff" />
          <circle cx="24" cy="32" r="3.5" fill="#7a00ff" />
          <circle cx="34" cy="38" r="3.5" fill="#7a00ff" />
          <circle cx="50" cy="18" r="3.5" fill="#7a00ff" />
          <defs>
            <linearGradient id="mgt-grad" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#ff451d" />
              <stop offset="1" stopColor="#7a00ff" />
            </linearGradient>
          </defs>
        </>
      )}
      {type === 'Medical' && (
        <>
          <circle cx="32" cy="32" r="28" fill="url(#med-grad)" opacity="0.15" />
          <path d="M32 14V50" stroke="#00b4d8" strokeWidth="5" strokeLinecap="round" />
          <path d="M14 32H50" stroke="#00b4d8" strokeWidth="5" strokeLinecap="round" />
          <circle cx="32" cy="32" r="7" fill="white" stroke="#ff451d" strokeWidth="3" />
          <defs>
            <linearGradient id="med-grad" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#00b4d8" />
              <stop offset="1" stopColor="#0077b6" />
            </linearGradient>
          </defs>
        </>
      )}
      {type === 'Law' && (
        <>
          <circle cx="32" cy="32" r="28" fill="url(#law-grad)" opacity="0.15" />
          <path d="M32 12V42" stroke="#e0a96d" strokeWidth="3" strokeLinecap="round" />
          <path d="M22 20H42" stroke="#e0a96d" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M22 20C22 32 28 36 28 36" stroke="#e0a96d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M42 20C42 32 36 36 36 36" stroke="#e0a96d" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M24 48H40" stroke="#e0a96d" strokeWidth="4.5" strokeLinecap="round" />
          <defs>
            <linearGradient id="law-grad" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#e0a96d" />
              <stop offset="1" stopColor="#1a1c23" />
            </linearGradient>
          </defs>
        </>
      )}
      {type === 'Science' && (
        <>
          <circle cx="32" cy="32" r="28" fill="url(#sci-grad)" opacity="0.15" />
          <path d="M26 18H38" stroke="#00f5d4" strokeWidth="3" strokeLinecap="round" />
          <path d="M26 18L30 30V48C30 50.2 31.8 52 34 52C36.2 52 38 50.2 38 48V30L42 18" stroke="#00f5d4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="32" y1="36" x2="36" y2="36" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" />
          <line x1="30" y1="42" x2="38" y2="42" stroke="#00f5d4" strokeWidth="2" strokeLinecap="round" />
          <defs>
            <linearGradient id="sci-grad" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#00f5d4" />
              <stop offset="1" stopColor="#00bbf9" />
            </linearGradient>
          </defs>
        </>
      )}
      {type === 'Arts' && (
        <>
          <circle cx="32" cy="32" r="28" fill="url(#art-grad)" opacity="0.15" />
          <path d="M46 16C40 18 36 24 34 32C32 40 24 46 16 46" stroke="#f15bb5" strokeWidth="3" strokeLinecap="round" />
          <path d="M48 18C44 26 38 34 30 38C22 42 18 48 18 48" stroke="#fee440" strokeWidth="3" strokeLinecap="round" />
          <path d="M16 16C26 22 34 32 38 40C42 48 48 48 48 48" stroke="#00f5d4" strokeWidth="3" strokeLinecap="round" />
          <defs>
            <linearGradient id="art-grad" x1="0" y1="0" x2="64" y2="64">
              <stop stopColor="#f15bb5" />
              <stop offset="1" stopColor="#fee440" />
            </linearGradient>
          </defs>
        </>
      )}
    </svg>
  );
};
