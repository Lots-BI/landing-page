import { useEffect, useState } from 'react';
import { scrollToFormulario } from '@/components/FlowCtaButton.jsx';
import { useUTMs } from '@/hooks/useUTMs.js';
import { buildWhatsAppHref, WHATSAPP_PRESET_MESSAGE } from '@/lib/whatsapp.js';

const PLATFORMS = [
  {
    name: 'Google Ads',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
        <circle cx="4" cy="18.929" r="4" fill="#FBBC04" />
        <path
          fill="#34A853"
          d="M15.463 3.072C14.359 1.159 11.912.503 9.999 1.607 8.086 2.712 7.43 5.159 8.534 7.072l8.001 13.857c1.105 1.913 3.551 2.568 5.464 1.465 1.914-1.105 2.569-3.551 1.465-5.465L15.463 3.072z"
        />
        <path
          fill="#4285F4"
          d="M7.514 4.844 1.565 15.148A4.5 4.5 0 0 1 4 14.43c2.56-.008 4.625 2.158 4.494 4.715l3.217-5.573-3.61-6.25a4.47 4.47 0 0 0-.587-2.478z"
        />
      </svg>
    ),
  },
  {
    name: 'Meta Ads',
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" aria-hidden="true">
        <path
          fill="#0866FF"
          d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
        />
      </svg>
    ),
  },
];

export function HeroSection() {
  const { appendUtmsToMessage } = useUTMs();
  const [whatsappHref, setWhatsappHref] = useState(buildWhatsAppHref());

  useEffect(() => {
    setWhatsappHref(buildWhatsAppHref(appendUtmsToMessage(WHATSAPP_PRESET_MESSAGE)));
  }, [appendUtmsToMessage]);

  return (
    <section
      id="hero"
      className="relative z-10 flex flex-col overflow-hidden bg-transparent px-4 pb-10 pt-24 md:px-6 md:pb-14 md:pt-28"
    >
      <div className="container mx-auto max-w-4xl pt-2 md:pt-4">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Agência Lots · Gestão de mídia paga
        </p>

        <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground text-balance sm:text-5xl md:text-6xl lg:text-[3.75rem]">
          Tráfego pago com mente de{' '}
          <span className="rgb-gradient-text">empresário</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-balance sm:text-lg md:text-xl">
          Não entro somente na conta de anúncios. Entro no seu negócio!
          <br />
          Preciso saber a etapa que ele está e quais são os gargalos que preciso otimizar antes de
          subir qualquer campanha!
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
          <button
            type="button"
            id="hero-cta-proposta"
            onClick={scrollToFormulario}
            className="inline-flex min-h-[52px] items-center justify-center rounded-none bg-brand-gradient px-6 text-sm font-bold uppercase tracking-wide text-white shadow-md transition-[filter] hover:brightness-110"
          >
            Quero uma proposta →
          </button>

          <a
            id="hero-cta-whatsapp"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center rounded-none border border-white/25 bg-transparent px-6 text-sm font-semibold text-foreground transition-colors hover:border-[#39FF14]/70 hover:text-[#39FF14]"
          >
            Prefiro falar agora no WhatsApp
          </a>
        </div>
      </div>

      <div className="container mx-auto mt-10 max-w-4xl border-t border-white/10 pt-5 md:mt-12 md:pt-6">
        <p className="mb-3 text-sm text-muted-foreground">Operamos mídia paga em</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 md:gap-x-8">
          {PLATFORMS.map((platform) => (
            <li
              key={platform.name}
              className="inline-flex items-center gap-2.5 text-sm font-semibold text-foreground/90"
            >
              {platform.icon}
              <span>{platform.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
