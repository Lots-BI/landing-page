import React, { Suspense, lazy, useState } from 'react';
import { cn } from '@/lib/utils.js';

const PrintLightbox = lazy(() => import('./PrintLightbox.jsx'));

const PRINT_WIDTHS = [640, 960, 1280, 1920];

/** Prints live in /public as `${base}-{640,960,1280,1920}.webp` plus the full-res `${base}.webp` for zoom. */
export function printSources(base) {
  return {
    src: `${base}-960.webp`,
    srcSet: PRINT_WIDTHS.map((w) => `${base}-${w}.webp ${w}w`).join(', '),
    zoomSrc: `${base}.webp`,
  };
}

export function ZoomablePrint({ src, alt, className, children }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
        aria-label={`Ampliar: ${alt}`}
        className={cn('block w-full cursor-zoom-in text-left', className)}
      >
        {children}
      </button>
      {mounted ? (
        <Suspense fallback={null}>
          <PrintLightbox open={open} src={src} alt={alt} onOpenChange={setOpen} />
        </Suspense>
      ) : null}
    </>
  );
}
