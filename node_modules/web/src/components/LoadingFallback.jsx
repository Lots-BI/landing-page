import React from 'react';
import { Loader2 } from 'lucide-react';

export default function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
        <Loader2 className="w-10 h-10 text-primary animate-spin relative z-10" />
      </div>
      <p className="mt-4 text-sm font-medium text-muted-foreground animate-pulse">
        Carregando...
      </p>
    </div>
  );
}