import { ZoomablePrint, printSources } from '@/components/ZoomablePrint.jsx';

const PRINT = printSources('/lots-bi/hero-dashboards');

export function HeroProductShot() {
  return (
    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] bg-brand-gradient opacity-35 blur-3xl"
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0f] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#A855F7]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#60A5FA]" aria-hidden="true" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" aria-hidden="true" />
          <span className="ml-2 truncate font-sans text-[11px] text-white/70">
            lotsbi.leandromajr.com
          </span>
        </div>
        <ZoomablePrint src={PRINT.zoomSrc} alt="Dashboards da plataforma Lots BI">
          <img
            src={PRINT.src}
            srcSet={PRINT.srcSet}
            sizes="(min-width: 1024px) 640px, (min-width: 640px) 576px, 100vw"
            alt=""
            width={4002}
            height={2201}
            loading="lazy"
            decoding="async"
            className="h-auto w-full"
          />
        </ZoomablePrint>
      </div>
    </div>
  );
}
