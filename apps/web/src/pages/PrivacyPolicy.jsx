import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Agência Lots</title>
        <meta
          name="description"
          content="Política de Privacidade da Agência Lots — LGPD, cookies, Google Ads, remarketing e dados de formulários."
        />
        <link rel="canonical" href="https://leandromajr.com/privacy-policy" />
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
              Política de Privacidade
            </h1>
            <p className="text-muted-foreground">
              Última atualização: 7 de agosto de 2026
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              URL oficial desta página:{' '}
              <a
                href="https://leandromajr.com/privacy-policy"
                className="text-primary hover:underline break-all"
              >
                https://leandromajr.com/privacy-policy
              </a>
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Controlador dos dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Esta Política de Privacidade descreve como a <strong className="text-foreground">Agência Lots</strong>{' '}
                (“nós”, “nosso” ou “agência”) coleta, usa, compartilha e protege dados pessoais no site{' '}
                <strong className="text-foreground">leandromajr.com</strong> e em canais relacionados (formulários,
                WhatsApp e campanhas publicitárias), em conformidade com a Lei Geral de Proteção de Dados Pessoais
                (LGPD — Lei nº 13.709/2018).
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong className="text-foreground">Razão social / marca:</strong> Agência Lots
                </li>
                <li>
                  <strong className="text-foreground">CNPJ:</strong> 65.225.964/0001-83
                </li>
                <li>
                  <strong className="text-foreground">Site:</strong> https://leandromajr.com
                </li>
                <li>
                  <strong className="text-foreground">E-mail:</strong> contato@agencia.lots
                </li>
                <li>
                  <strong className="text-foreground">WhatsApp:</strong> +55 (11) 97329-0438
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Quais dados coletamos</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong className="text-foreground">Dados de contato:</strong> nome, WhatsApp, e-mail, empresa,
                  segmento, orçamento, objetivo e demais informações enviadas em formulários ou mensagens.
                </li>
                <li>
                  <strong className="text-foreground">Dados de navegação:</strong> endereço IP, tipo de dispositivo e
                  navegador, páginas visitadas, tempo de permanência, origem de tráfego (incluindo UTMs) e eventos de
                  interação no site.
                </li>
                <li>
                  <strong className="text-foreground">Dados de publicidade e conversão:</strong> informações sobre
                  cliques em anúncios, visualizações de páginas, envio de formulários e outras ações usadas para medir
                  campanhas (Google Ads, Meta Ads e ferramentas equivalentes).
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Para que usamos os dados</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Responder solicitações de orçamento e atendimento comercial.</li>
                <li>Prestar serviços de marketing digital, estruturação e operação contratados.</li>
                <li>Medir desempenho do site e de campanhas (conversões, engajamento e origem).</li>
                <li>Melhorar conteúdo, ofertas e experiência de navegação.</li>
                <li>
                  Exibir anúncios relevantes e criar públicos (incluindo remarketing), conforme as políticas das
                  plataformas.
                </li>
                <li>Cumprir obrigações legais e defender direitos em processos administrativos ou judiciais.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">
                4. Publicidade online, Google Ads e remarketing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Usamos tecnologias de publicidade e medição de terceiros, inclusive do <strong className="text-foreground">Google</strong>,
                para:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong className="text-foreground">Google Ads / conversões:</strong> registrar ações relevantes
                  (como envio de formulário) para medir e otimizar campanhas.
                </li>
                <li>
                  <strong className="text-foreground">Remarketing / anúncios personalizados:</strong> exibir anúncios
                  nossos a visitantes que já interagiram com o site ou com nossos anúncios.
                </li>
                <li>
                  <strong className="text-foreground">Google Tag Manager:</strong> gerenciar tags de medição e
                  marketing no site.
                </li>
                <li>
                  <strong className="text-foreground">Google Analytics (quando ativo):</strong> entender tráfego e
                  comportamento de uso de forma agregada.
                </li>
                <li>
                  <strong className="text-foreground">Meta Pixel (Facebook/Instagram):</strong> medir e otimizar
                  campanhas nessas plataformas.
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Esses fornecedores podem processar dados (como identificadores de cookies e eventos de navegação)
                conforme as próprias políticas. O Google pode usar cookies e identificadores semelhantes para
                personalizar anúncios e medir conversões.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você pode gerenciar preferências de anúncios do Google em{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  adssettings.google.com
                </a>
                . Também pode optar por não receber anúncios personalizados de diversos provedores em{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  aboutads.info/choices
                </a>
                .
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Cookies e tecnologias semelhantes</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Usamos cookies e tecnologias equivalentes para funcionamento do site, análise e publicidade. Categorias
                típicas:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>
                  <strong className="text-foreground">Essenciais:</strong> necessários para navegação e segurança
                  básica.
                </li>
                <li>
                  <strong className="text-foreground">Analíticos:</strong> medem uso e desempenho do site.
                </li>
                <li>
                  <strong className="text-foreground">Marketing / publicidade:</strong> medem campanhas, conversões e
                  remarketing (ex.: Google Ads, Meta).
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você pode recusar ou apagar cookies nas configurações do navegador. Isso pode limitar algumas funções
                do site e a personalização de anúncios.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Base legal (LGPD)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Tratamos dados com base em, conforme o caso: execução de medidas pré-contratuais a pedido do titular
                (orçamento), execução de contrato, legítimo interesse (melhoria do site e medição de campanhas, com
                salvaguardas), cumprimento de obrigação legal e consentimento (quando aplicável, inclusive para
                cookies não essenciais).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Compartilhamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Não vendemos seus dados pessoais. Podemos compartilhar dados com:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Plataformas de anúncios e análise (Google, Meta e similares), para medição e veiculação.</li>
                <li>Ferramentas de comunicação (ex.: WhatsApp) quando você inicia o contato.</li>
                <li>Prestadores que nos apoiam tecnicamente (hospedagem, e-mail), sob obrigação de confidencialidade.</li>
                <li>Autoridades, quando houver obrigação legal.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">8. Retenção</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Mantemos dados pelo tempo necessário para as finalidades desta política, para atender solicitações
                comerciais, obrigações legais e defesa de direitos. Dados de formulário e comunicação comercial podem
                ser mantidos enquanto houver relacionamento ou interesse legítimo ativo, ou até solicitação de
                exclusão cabível.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">9. Seus direitos (LGPD)</h2>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Confirmação e acesso aos dados.</li>
                <li>Correção de dados incompletos ou desatualizados.</li>
                <li>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
                <li>Portabilidade, quando aplicável.</li>
                <li>Informação sobre compartilhamentos.</li>
                <li>Revogação de consentimento, quando o tratamento se basear nele.</li>
                <li>Oposição a tratamentos baseados em legítimo interesse, nos termos da lei.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Para exercer direitos, use os canais da seção Contato abaixo. Podemos solicitar confirmação de
                identidade para proteger seus dados.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">10. Segurança e menores</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Adotamos medidas técnicas e organizacionais razoáveis para proteger dados pessoais. Nenhum método de
                transmissão ou armazenamento é 100% seguro. Nosso site e serviços destinam-se a público adulto /
                empresarial; não coletamos dados de menores de 18 anos de forma intencional.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">11. Alterações</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Podemos atualizar esta política periodicamente. A data no topo indica a versão vigente. O uso contínuo
                do site após alterações significa ciência da versão atualizada.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">12. Contato</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Dúvidas sobre privacidade ou exercício de direitos LGPD:
              </p>
              <div className="bg-muted/50 p-6 rounded-xl border border-border/50 mt-4">
                <p className="text-foreground font-medium mb-2">Agência Lots</p>
                <p className="text-muted-foreground mb-1">CNPJ: 65.225.964/0001-83</p>
                <p className="text-muted-foreground mb-1">
                  E-mail:{' '}
                  <a href="mailto:contato@agencia.lots" className="text-primary hover:underline">
                    contato@agencia.lots
                  </a>
                </p>
                <p className="text-muted-foreground mb-1">WhatsApp: +55 (11) 97329-0438</p>
                <p className="text-muted-foreground">
                  Política:{' '}
                  <a href="https://leandromajr.com/privacy-policy" className="text-primary hover:underline">
                    https://leandromajr.com/privacy-policy
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
