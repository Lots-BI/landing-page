import React from 'react';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';

export function SocialMediaPostMockup() {
  return (
    <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden group">
      <img 
        src="https://images.unsplash.com/photo-1647964186073-51a605191343?q=80&w=800&auto=format&fit=crop" 
        alt="Social Media Post Design" 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Animated UI Elements */}
      <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="flex items-center justify-between mb-3">
          <div className="flex gap-3">
            <Heart className="w-5 h-5 text-secondary animate-pulse" />
            <MessageCircle className="w-5 h-5 text-white" />
            <Send className="w-5 h-5 text-white" />
          </div>
          <Bookmark className="w-5 h-5 text-white" />
        </div>
        <div className="w-3/4 h-2 bg-white/20 rounded-full mb-2 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-r from-primary to-secondary animate-[pulse-glow_2s_infinite]" />
        </div>
        <div className="w-1/2 h-2 bg-white/10 rounded-full" />
      </div>
    </div>
  );
}