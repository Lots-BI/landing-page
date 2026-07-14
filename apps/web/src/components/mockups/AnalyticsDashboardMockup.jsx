import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';

export function AnalyticsDashboardMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1625296276703-3fbc924f07b5?q=80&w=800&auto=format&fit=crop" 
        alt="Analytics Dashboard" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 mix-blend-overlay" />
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Animated UI Elements */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Activity className="w-4 h-4 text-accent" />
            <span className="text-xs font-medium text-white">Live ROI</span>
          </div>
          <div className="glass px-3 py-1.5 rounded-lg flex items-center gap-2 bg-secondary/20 border-secondary/30">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-xs font-bold text-white">+342%</span>
          </div>
        </div>
        
        <div className="glass p-4 rounded-xl w-full">
          <div className="flex items-end gap-2 h-16 mt-2">
            {[40, 70, 45, 90, 65, 100, 85].map((height, i) => (
              <div key={i} className="flex-1 bg-white/10 rounded-t-sm relative group-hover:bg-white/20 transition-colors">
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-accent rounded-t-sm transition-all duration-1000"
                  style={{ height: `${height}%`, transitionDelay: `${i * 100}ms` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}