import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BRAND_ASSETS, BRAND_NAME, BRAND_PRODUCT } from '@/lib/brand';

const lockup = {
  sm: { icon: 'h-6 w-6', lots: 'text-[13px]', bi: 'h-[13px]', gap: 'gap-1.5' },
  md: { icon: 'h-7 w-7', lots: 'text-[15px]', bi: 'h-[15px]', gap: 'gap-2' },
  lg: { icon: 'h-9 w-9', lots: 'text-[17px]', bi: 'h-[17px]', gap: 'gap-2.5' },
  xl: { icon: 'h-11 w-11', lots: 'text-[22px]', bi: 'h-[22px]', gap: 'gap-2.5' },
};

/** Símbolo Lots BI (pétala com gradiente roxo → azul). */
export function LotsBIIcon({ className, size = 'md', ...props }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        aria-hidden
        className={cn(
          'shrink-0 rounded-lg bg-gradient-to-br from-[#A855F7] to-[#60A5FA]',
          lockup[size].icon,
          className,
        )}
      />
    );
  }

  return (
    <img
      src={BRAND_ASSETS.icon}
      alt=""
      aria-hidden
      referrerPolicy="no-referrer"
      decoding="async"
      className={cn('shrink-0 object-contain', lockup[size].icon, className)}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}

/**
 * Lockup oficial do portal: símbolo + "Lots" + BI (imagem).
 * @param {'composed' | 'full'} variant
 */
export function LotsBIWordmark({
  className,
  size = 'md',
  variant = 'composed',
}) {
  const s = lockup[size];
  const [biFailed, setBiFailed] = useState(false);
  const [fullFailed, setFullFailed] = useState(false);

  if (variant === 'full') {
    const fullHeight = { sm: 'h-6', md: 'h-7', lg: 'h-9', xl: 'h-11' }[size];
    if (fullFailed) {
      return (
        <div className={cn('flex items-center gap-2', className)} aria-label={BRAND_PRODUCT}>
          <LotsBIIcon size={size} />
          <span className={cn('font-display font-semibold text-foreground', s.lots)}>
            {BRAND_PRODUCT}
          </span>
        </div>
      );
    }
    return (
      <div className={cn('flex items-center', className)}>
        <img
          src={BRAND_ASSETS.logoFull}
          alt={BRAND_NAME}
          referrerPolicy="no-referrer"
          decoding="async"
          className={cn('w-auto max-w-[168px] object-contain object-left', fullHeight)}
          onError={() => setFullFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={cn('flex items-center', s.gap, className)}
      aria-label={BRAND_NAME}
      role="img"
    >
      <LotsBIIcon size={size} />
      <span
        className={cn(
          'font-display font-semibold leading-none tracking-[-0.02em]',
          'text-[color:var(--lots-wordmark-text)]',
          s.lots,
        )}
      >
        Lots
      </span>
      <img
        src={BRAND_ASSETS.logoBi}
        alt=""
        aria-hidden
        referrerPolicy="no-referrer"
        decoding="async"
        className={cn('w-auto shrink-0 object-contain', s.bi, biFailed && 'hidden')}
        onError={() => setBiFailed(true)}
      />
      {biFailed && (
        <span
          className={cn(
            'font-display font-semibold leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] to-[#60A5FA]',
            s.lots,
          )}
          aria-hidden
        >
          BI
        </span>
      )}
    </div>
  );
}
