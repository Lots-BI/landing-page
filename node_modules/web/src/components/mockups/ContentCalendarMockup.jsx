import React from 'react';
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';

export function ContentCalendarMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1649433391719-5f42d6c6426d?q=80&w=800&auto=format&fit=crop" 
        alt="Content Calendar" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Animated UI Elements */}
      <div className="absolute inset-0 p-6 flex flex-col">
        <div className="glass px-4 py-2 rounded-xl flex items-center gap-3 mb-4 w-max">
          <CalendarIcon className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-white">Novembro 2026</span>
        </div>
        
        <div className="grid grid-cols-3 gap-2 flex-1">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="glass rounded-lg p-2 flex flex-col gap-1 relative overflow-hidden">
              <div className="text-[10px] text-white/50">{i + 10}</div>
              {i % 2 === 0 && (
                <div className="w-full h-1.5 bg-primary/50 rounded-full mt-auto animate-pulse" />
              )}
              {i % 3 === 0 && (
                <div className="w-3/4 h-1.5 bg-secondary/50 rounded-full mt-1" />
              )}
              {i === 4 && (
                <div className="absolute top-1 right-1">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}