import React from 'react';
import { Layers, Sparkles } from 'lucide-react';

export function DesignTemplateMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop" 
        alt="Design Templates" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/60 to-transparent mix-blend-multiply" />
      <div className="absolute inset-0 bg-black/30" />
      
      {/* Animated UI Elements */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-32 h-40">
          <div className="absolute inset-0 glass rounded-xl transform -rotate-12 translate-x-4 translate-y-4 border-white/10 transition-transform duration-500 group-hover:-rotate-6 group-hover:translate-x-6" />
          <div className="absolute inset-0 glass rounded-xl transform rotate-6 -translate-x-4 -translate-y-2 border-white/10 transition-transform duration-500 group-hover:rotate-12 group-hover:-translate-x-6" />
          <div className="absolute inset-0 glass-heavy rounded-xl flex flex-col items-center justify-center gap-2 border-primary/30 shadow-[0_0_30px_hsla(var(--primary)/0.3)] z-10">
            <Layers className="w-8 h-8 text-white" />
            <div className="flex items-center gap-1 bg-secondary/20 px-2 py-1 rounded text-[10px] font-bold text-secondary">
              <Sparkles className="w-3 h-3" /> Brand Kit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}