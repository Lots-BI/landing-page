import { cn } from '@/lib/utils.js';

export function scrollToFormulario() {
  document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function FlowCtaButton({ id, className, children }) {
  return (
    <button
      type="button"
      id={id}
      onClick={scrollToFormulario}
      className={cn(
        'inline-flex min-h-[52px] items-center justify-center rounded-lg bg-brand-gradient px-8 text-base font-semibold text-white shadow-md hover:brightness-110 active:scale-[0.98]',
        className,
      )}
    >
      {children}
    </button>
  );
}
