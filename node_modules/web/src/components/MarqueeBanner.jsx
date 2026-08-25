import React from 'react';
import { Target, Share2, ShoppingBag, TrendingUp } from 'lucide-react';

const ITEMS = [
  { label: 'Tráfego Pago', Icon: Target },
  { label: 'Social Media', Icon: Share2 },
  { label: 'E-commerce', Icon: ShoppingBag },
  { label: 'Escala de Vendas', Icon: TrendingUp },
];

function MarqueeTrack() {
  return (
    <span className="inline-flex items-center gap-8 px-4 text-base md:text-lg font-medium text-slate-200 tracking-wide">
      {ITEMS.map(({ label, Icon }) => (
        <span key={label} className="inline-flex items-center gap-2 whitespace-nowrap">
          <Icon className="w-4 h-4 text-primary shrink-0" aria-hidden="true" strokeWidth={1.75} />
          {label}
          <span className="text-white/25 ml-6" aria-hidden="true">
            •
          </span>
        </span>
      ))}
    </span>
  );
}

const MarqueeBanner = () => {
  const tracks = Array.from({ length: 6 }, (_, i) => <MarqueeTrack key={i} />);

  return (
    <div className="relative flex overflow-x-hidden bg-slate-950 border-y border-white/5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      <style>
        {`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee-scroll {
            animation: marquee-scroll 40s linear infinite;
            will-change: transform;
          }
        `}
      </style>

      <div className="animate-marquee-scroll flex whitespace-nowrap">
        <span className="inline-flex">{tracks}</span>
        <span className="inline-flex" aria-hidden="true">
          {tracks}
        </span>
      </div>
    </div>
  );
};

export default MarqueeBanner;
