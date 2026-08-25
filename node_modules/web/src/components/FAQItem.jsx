import React from 'react';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const FAQItem = ({ value, question, answer, icon: Icon }) => {
  return (
    <AccordionItem value={value} className="glass border-primary/20 mb-4 px-4 md:px-6 rounded-xl overflow-hidden hover:border-secondary/40 transition-colors">
      <AccordionTrigger className="hover:no-underline py-4 text-left touch-target">
        <div className="flex items-center gap-3 md:gap-4 pr-2">
          {Icon && (
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary shadow-sm">
              <Icon className="h-4 w-4" />
            </div>
          )}
          <span className="text-sm md:text-base font-semibold text-white glass-text-shadow">{question}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-sm md:text-base text-gray-100 glass-text-shadow leading-relaxed pb-4 pl-11 md:pl-12">
        {answer}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQItem;