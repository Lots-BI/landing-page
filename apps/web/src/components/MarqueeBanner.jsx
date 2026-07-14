import React from 'react';

const MarqueeBanner = () => {
  const content = "🔥 Tráfego Pago • 📱 Social Media • 🛒 E-commerce • 🚀 Escala de Vendas • ";
  // Repeat the content enough times to ensure it covers ultra-wide screens
  const repeatedContent = content.repeat(8);

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
      
      {/* 
        By translating -50% on a container that holds two identical text blocks,
        we create a perfectly seamless infinite loop.
      */}
      <div className="animate-marquee-scroll flex whitespace-nowrap">
        <span className="text-base md:text-lg font-medium text-slate-200 tracking-wide px-2">
          {repeatedContent}
        </span>
        <span className="text-base md:text-lg font-medium text-slate-200 tracking-wide px-2">
          {repeatedContent}
        </span>
      </div>
    </div>
  );
};

export default MarqueeBanner;