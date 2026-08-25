import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ServiceCard = ({ title, description, icon: Icon, delay = 0 }) => {
  return (
    <Card
      className="group h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-2 glass-effect border-primary/20 hover:border-secondary/50 bg-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardHeader>
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 text-primary transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:scale-110 shadow-sm">
          {Icon && <Icon className="h-7 w-7" />}
        </div>
        <CardTitle className="text-xl font-semibold text-white glass-text-shadow group-hover:text-secondary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="text-sm md:text-base leading-relaxed text-gray-100 glass-text-shadow group-hover:text-white transition-colors">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;