import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Política de Privacidade | Leandro MAJR</title>
        <meta name="description" content="Política de Privacidade e termos de uso dos dados coletados pela Agência Leandro MAJR, em conformidade com a LGPD." />
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
              Última atualização: 27 de Março de 2026
            </p>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">1. Introdução</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                A Agência Leandro MAJR ("nós", "nosso" ou "agência") está comprometida em proteger a sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você visita nosso site e utiliza nossos serviços, em total conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">2. Coleta de Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Podemos coletar os seguintes tipos de informações:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Dados de Contato:</strong> Nome, endereço de e-mail, número de telefone (WhatsApp) e nome da empresa, fornecidos voluntariamente ao preencher formulários ou entrar em contato conosco.</li>
                <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, sistema operacional, páginas visitadas, tempo gasto no site e outras estatísticas de uso.</li>
                <li><strong>Dados de Interação:</strong> Informações sobre como você interage com nossos anúncios e campanhas de marketing.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">3. Uso dos Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos as informações coletadas para as seguintes finalidades:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li>Fornecer, operar e manter nossos serviços de marketing e consultoria.</li>
                <li>Melhorar, personalizar e expandir nosso site e ofertas.</li>
                <li>Compreender e analisar como você utiliza nosso site.</li>
                <li>Desenvolver novos produtos, serviços, recursos e funcionalidades.</li>
                <li>Comunicar-nos com você, diretamente ou através de um de nossos parceiros, para atendimento ao cliente, atualizações e fins promocionais.</li>
                <li>Processar suas transações e gerenciar sua conta.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">4. Cookies e Tecnologias de Rastreamento</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Utilizamos cookies e tecnologias semelhantes de rastreamento para rastrear a atividade em nosso site e armazenar certas informações. As tecnologias que utilizamos incluem:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Google Analytics & Tag Manager:</strong> Para entender o comportamento do usuário, origens de tráfego e métricas de engajamento.</li>
                <li><strong>Pixel do Meta (Facebook/Instagram):</strong> Para medir a eficácia de nossas campanhas publicitárias, otimizar anúncios e construir públicos direcionados.</li>
                <li><strong>Cookies Essenciais:</strong> Necessários para o funcionamento básico do site.</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Você pode instruir seu navegador a recusar todos os cookies ou a indicar quando um cookie está sendo enviado. No entanto, se você não aceitar cookies, talvez não consiga usar algumas partes do nosso site.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">5. Seus Direitos (Conformidade com a LGPD)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                De acordo com a LGPD, você tem os seguintes direitos em relação aos seus dados pessoais:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-4">
                <li><strong>Confirmação e Acesso:</strong> Direito de confirmar a existência de tratamento e acessar seus dados.</li>
                <li><strong>Correção:</strong> Direito de corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li><strong>Anonimização, Bloqueio ou Eliminação:</strong> Direito de solicitar a anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos.</li>
                <li><strong>Portabilidade:</strong> Direito de solicitar a transferência dos seus dados para outro fornecedor de serviço.</li>
                <li><strong>Revogação do Consentimento:</strong> Direito de revogar o consentimento a qualquer momento, sem afetar a legalidade do tratamento baseado no consentimento antes da revogação.</li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">6. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Não vendemos, trocamos ou alugamos suas informações pessoais para terceiros. Podemos compartilhar informações genéricas agregadas não vinculadas a nenhuma informação de identificação pessoal com nossos parceiros de negócios e anunciantes confiáveis para os fins descritos acima.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">7. Contato</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Se você tiver alguma dúvida sobre esta Política de Privacidade ou desejar exercer seus direitos sob a LGPD, entre em contato conosco:
              </p>
              <div className="bg-muted/50 p-6 rounded-xl border border-border/50 mt-4">
                <p className="text-foreground font-medium mb-2">Agência Leandro MAJR</p>
                <p className="text-muted-foreground mb-1">Email: leandromajr@gmail.com</p>
                <p className="text-muted-foreground">WhatsApp: +55 (11) 97329-0438</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;