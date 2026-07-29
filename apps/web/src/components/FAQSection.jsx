import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion.jsx';
import { AnimatedSection } from './AnimatedSection.jsx';
import { WhatsAppButton } from './WhatsAppButton.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';

const PHONE_NUMBER = '5511973290438';
const FAQ_WHATSAPP_MSG =
  'Olá! Vi as perguntas frequentes e quero conversar sobre um orçamento.';

const FAQ_ITEMS = [
  { q: 'q1', a: 'a1' },
  { q: 'q2', a: 'a2' },
  { q: 'q3', a: 'a3' },
  { q: 'q4', a: 'a4' },
  { q: 'q5', a: 'a5' },
  { q: 'q6', a: 'a6' },
];

export default function FAQSection() {
  const { content } = useEditableContent();
  const faq = content.faq;

  return (
    <section
      id="faq"
      className="py-20 md:py-28 relative z-10 border-y border-border bg-transparent"
    >
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <AnimatedSection className="max-w-2xl mx-auto text-center mb-12 md:mb-14">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Antes do orçamento
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-foreground font-display tracking-tight text-balance">
            {faq.title}
          </h2>
          {faq.subtitle ? (
            <p className="mt-5 text-base md:text-lg text-muted-foreground text-balance leading-relaxed">
              {faq.subtitle}
            </p>
          ) : null}
        </AnimatedSection>

        <Accordion
          type="single"
          collapsible
          defaultValue="item-1"
          className="max-w-2xl mx-auto border-t border-white/10"
        >
          {FAQ_ITEMS.map((item, index) => {
            const question = faq[item.q];
            const answer = faq[item.a];
            if (!question) return null;
            const value = `item-${index + 1}`;
            return (
              <AccordionItem
                key={value}
                value={value}
                className="border-b border-white/10 border-t-0"
              >
                <AccordionTrigger className="py-5 md:py-6 text-left hover:no-underline group touch-target">
                  <span className="pr-4 text-base md:text-lg font-semibold text-foreground font-display leading-snug group-hover:text-primary transition-colors">
                    {question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-sm md:text-base text-muted-foreground leading-relaxed pb-5 md:pb-6">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <AnimatedSection className="max-w-2xl mx-auto text-center mt-12 md:mt-14">
          <p className="text-sm md:text-base text-muted-foreground mb-5 text-balance">
            {faq.ctaText || 'Não achou o que precisava? Fale direto conosco.'}
          </p>
          <WhatsAppButton
            phoneNumber={PHONE_NUMBER}
            baseMessage={FAQ_WHATSAPP_MSG}
            className="text-base px-8 py-4 shadow-[0_0_30px_hsla(142,71%,25%,0.35)] hover:shadow-[0_0_40px_hsla(142,71%,25%,0.5)]"
          >
            {faq.ctaLabel || 'Pedir orçamento no WhatsApp'}
          </WhatsAppButton>
        </AnimatedSection>
      </div>
    </section>
  );
}
