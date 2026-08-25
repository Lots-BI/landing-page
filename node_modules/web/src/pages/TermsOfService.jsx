import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Serviço | Agência Lots</title>
        <meta name="description" content="Termos de Serviço e condições de uso da Agência Lots." />
        <link rel="canonical" href="https://leandromajr.com/terms-of-service" />
      </Helmet>

      <div className="dark min-h-screen bg-background text-foreground py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost" className="mb-6 -ml-4 text-muted-foreground hover:text-foreground">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o início
              </Link>
            </Button>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Termos de Serviço
            </h1>
            <p className="text-muted-foreground">
              Última atualização: 7 de agosto de 2026
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none space-y-10">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Uso do serviço</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nossos serviços destinam-se a empresas e profissionais que buscam estruturar e operar marketing
                digital, tráfego pago e funis de vendas. Ao usar o site ou contratar a Agência Lots, você concorda
                com estes termos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Responsabilidades do usuário</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                <li>
                  Garantir que produtos e serviços promovidos estejam em conformidade com a lei e com as políticas
                  das plataformas (Google Ads, Meta Ads etc.).
                </li>
                <li>Fornecer acessos e informações necessárias à execução do trabalho.</li>
                <li>
                  Pagar o investimento de mídia diretamente às plataformas e os honorários da agência conforme
                  acordo comercial.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. Propriedade intelectual</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Metodologias, estruturas e materiais estratégicos desenvolvidos pela Agência Lots permanecem de
                nossa propriedade intelectual, salvo disposição contratual em contrário. Criativos e ativos de marca
                fornecidos por você continuam seus.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Limitação de responsabilidade</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Marketing digital depende de variáveis externas. Não garantimos resultados financeiros específicos.
                Comprometemo-nos a aplicar boas práticas para buscar previsibilidade e escala.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Rescisão</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A rescisão segue o aviso prévio e condições do acordo comercial firmado entre as partes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Privacidade</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                O tratamento de dados pessoais segue nossa{' '}
                <Link to="/privacy-policy" className="text-primary hover:underline">
                  Política de Privacidade
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contato</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>
                  <strong className="text-foreground">E-mail:</strong> contato@agencia.lots
                </li>
                <li>
                  <strong className="text-foreground">WhatsApp:</strong> +55 (11) 97329-0438
                </li>
                <li>
                  <strong className="text-foreground">CNPJ:</strong> 65.225.964/0001-83
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
