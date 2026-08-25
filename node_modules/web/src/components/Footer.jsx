import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LotsBIWordmark } from './LotsBIWordmark.jsx';
import { useEditableContent } from '@/contexts/EditableContent.jsx';
import { BRAND_NAME } from '@/lib/brand';
import { goToOrcamento } from './PlanosCtaButton.jsx';

const NAV = [
  { nameKey: 'nav4', id: 'planos' },
  { nameKey: 'nav1', id: 'solucao-section' },
  { nameKey: 'nav2', id: 'metodologia-section' },
  { nameKey: 'nav3', id: 'equipe' },
];

export default function Footer() {
  const { content } = useEditableContent();
  const navigate = useNavigate();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/10 bg-transparent py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col gap-6 md:gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div className="flex flex-col gap-1.5 min-w-0">
              <LotsBIWordmark size="md" />
              <p className="text-xs text-muted-foreground truncate">
                {content.footer.description}
              </p>
            </div>

            <nav
              aria-label="Rodapé"
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
            >
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="hover:text-foreground transition-colors"
                >
                  {content.navigation[item.nameKey]}
                </button>
              ))}
              <button
                type="button"
                onClick={() => goToOrcamento(navigate)}
                className="hover:text-foreground transition-colors"
              >
                Orçamento
              </button>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-5 border-t border-white/10 text-xs text-muted-foreground">
            <p>
              © {year} {content.hero?.brand || BRAND_NAME}
              <span className="mx-2 text-white/20" aria-hidden="true">
                ·
              </span>
              <span className="font-mono tracking-tight">65.225.964/0001-83</span>
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
                Privacidade
              </Link>
              <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
                Termos
              </Link>
              <Link to="/contato" className="hover:text-foreground transition-colors">
                Contato
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
