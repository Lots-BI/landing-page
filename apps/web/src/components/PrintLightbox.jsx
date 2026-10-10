import React, { useEffect, useRef, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog.jsx';
import { cn } from '@/lib/utils.js';

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function clampScale(value) {
  const next = Math.round(value * 100) / 100;
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
}

export default function PrintLightbox({ open, src, alt, onOpenChange }) {
  const scrollerRef = useRef(null);
  const scaleRef = useRef(1);
  const [scale, setScale] = useState(1);

  const applyScale = (value) => {
    const next = clampScale(value);
    scaleRef.current = next;
    setScale(next);
  };

  useEffect(() => {
    if (!open) return undefined;
    scaleRef.current = 1;
    setScale(1);
    return undefined;
  }, [open, src]);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!open || !node) return undefined;

    const onWheel = (event) => {
      event.preventDefault();
      const prev = scaleRef.current;
      const next = clampScale(prev + (event.deltaY < 0 ? 0.25 : -0.25));
      if (next === prev) return;
      const rect = node.getBoundingClientRect();
      const originX = event.clientX - rect.left + node.scrollLeft;
      const originY = event.clientY - rect.top + node.scrollTop;
      const ratio = next / prev;
      scaleRef.current = next;
      setScale(next);
      requestAnimationFrame(() => {
        node.scrollLeft = originX * ratio - (event.clientX - rect.left);
        node.scrollTop = originY * ratio - (event.clientY - rect.top);
      });
    };

    node.addEventListener('wheel', onWheel, { passive: false });
    return () => node.removeEventListener('wheel', onWheel);
  }, [open]);

  const dragRef = useRef(null);

  const onPointerDown = (event) => {
    if (scaleRef.current <= 1 || event.button !== 0) return;
    const node = scrollerRef.current;
    dragRef.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: node.scrollLeft,
      top: node.scrollTop,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;
    const node = scrollerRef.current;
    if (!drag || drag.id !== event.pointerId || !node) return;
    node.scrollLeft = drag.left - (event.clientX - drag.x);
    node.scrollTop = drag.top - (event.clientY - drag.y);
  };

  const onPointerUp = (event) => {
    if (dragRef.current?.id === event.pointerId) dragRef.current = null;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[92vh] max-h-[92vh] w-[96vw] max-w-[96vw] flex-col gap-3 overflow-hidden bg-background p-3 sm:rounded-xl">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <div className="flex items-center justify-center gap-2 pr-8">
          <button
            type="button"
            aria-label="Diminuir zoom"
            onClick={() => applyScale(scaleRef.current - 0.5)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-foreground"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-16 text-center text-sm tabular-nums text-muted-foreground">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            aria-label="Aumentar zoom"
            onClick={() => applyScale(scaleRef.current + 0.5)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-foreground"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div
          ref={scrollerRef}
          className={cn(
            'min-h-0 flex-1 overflow-auto rounded-lg bg-black',
            scale > 1 ? 'cursor-grab' : 'cursor-zoom-in',
          )}
          onDoubleClick={() => applyScale(scaleRef.current > 1 ? 1 : 2)}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            src={src}
            alt={alt}
            draggable={false}
            className="mx-auto h-auto max-w-none select-none"
            style={{ width: `${scale * 100}%` }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
