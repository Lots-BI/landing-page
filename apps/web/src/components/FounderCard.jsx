import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const FounderCard = ({ name, role, description, image, delay = 0 }) => {
  return (
    <Card
      className="overflow-hidden transition-all duration-300 hover:shadow-lg glass-effect border-primary/20 group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="grid md:grid-cols-2 gap-0 flex-col-reverse">
        <div className="relative h-64 md:h-full overflow-hidden bg-black/20">
          {image ? (
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 filter grayscale contrast-125 group-hover:grayscale-0"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
              <span className="text-6xl font-bold text-primary/50 glass-text-shadow">
                {name.charAt(0)}
              </span>
            </div>
          )}
          {/* Neon overlay line */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
        </div>
        <CardContent className="p-6 md:p-8 flex flex-col justify-center bg-card">
          <h3 className="text-2xl font-bold mb-2 text-white glass-text-shadow">{name}</h3>
          <p className="text-sm md:text-lg font-medium text-primary mb-4 glass-text-shadow group-hover:text-secondary transition-colors">{role}</p>
          <p className="text-sm md:text-base text-gray-300 leading-relaxed glass-text-shadow">{description}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default FounderCard;