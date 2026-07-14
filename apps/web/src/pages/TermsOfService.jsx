import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Termos de Serviço - Agência Leandro MAJR</title>
        <meta name="description" content="Termos de Serviço e condições de uso da Agência Leandro MAJR." />
      </Helmet>

      <div className="dark min-h-screen flex flex-col text-foreground main-animated-bg">
        <Header />

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Hero Section */}
            <div className="text-center glass-effect p-8 md:p-12 animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white glass-text-shadow" style={{ letterSpacing: '-0.02em' }}>
                Termos de Serviço
              </h1>
              <p className="text-lg text-gray-100 glass-text-shadow leading-relaxed max-w-2xl mx-auto">
                Bem-vindo à Agência Leandro MAJR. Ao acessar e utilizar nossos serviços, você concorda com os termos e condições descritos abaixo. Leia atentamente antes de prosseguir.
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              
              <section className="glass-effect p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-4 text-white glass-text-shadow">1. Uso do Serviço</h2>
                <div className="space-y-4 text-gray-100 glass-text-shadow leading-relaxed">
                  <p>
                    Nossos serviços destinam-se a empresas e empreendedores que buscam otimizar suas operações de marketing digital, tráfego pago e estruturação de funis de vendas.
                  </p>
                  <p>
                    Ao contratar a Agência Leandro MAJR, você concorda em fornecer informações precisas, atualizadas e completas sobre o seu negócio para que possamos executar as estratégias propostas de forma eficaz.
                  </p>
                </div>
              </section>

              <section className="glass-effect p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-4 text-white glass-text-shadow">2. Responsabilidades do Usuário</h2>
                <div className="space-y-4 text-gray-100 glass-text-shadow leading-relaxed">
                  <p>
                    Como cliente ou usuário de nossos serviços, você é responsável por:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Garantir que os produtos ou serviços promovidos estejam em conformidade com as leis locais e as políticas das plataformas de anúncios (Google Ads, Meta Ads, etc.).</li>
                    <li>Fornecer os acessos necessários às contas de anúncios, gerenciadores de negócios e ferramentas de análise.</li>
                    <li>Efetuar os pagamentos dos investimentos em mídia diretamente às plataformas de anúncios, bem como os honorários da agência conforme acordado em contrato.</li>
                  </ul>
                </div>
              </section>

              <section className="glass-effect p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-4 text-white glass-text-shadow">3. Propriedade Intelectual</h2>
                <div className="space-y-4 text-gray-100 glass-text-shadow leading-relaxed">
                  <p>
                    Todo o material estratégico, metodologias, relatórios e estruturas de funil desenvolvidos pela Agência Leandro MAJR durante a prestação do serviço são de propriedade intelectual da agência, a menos que especificado o contrário em contrato.
                  </p>
                  <p>
                    Os criativos, textos e ativos de marca fornecidos por você continuam sendo de sua propriedade exclusiva.
                  </p>
                </div>
              </section>

              <section className="glass-effect p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-4 text-white glass-text-shadow">4. Limitação de Responsabilidade</h2>
                <div className="space-y-4 text-gray-100 glass-text-shadow leading-relaxed">
                  <p>
                    Embora utilizemos metodologias validadas e baseadas em dados para maximizar o Retorno Sobre o Investimento (ROI), o marketing digital está sujeito a variáveis externas (mudanças de algoritmos, comportamento do mercado, etc.).
                  </p>
                  <p>
                    A Agência Leandro MAJR não garante resultados financeiros exatos ou lucros específicos, mas compromete-se a aplicar as melhores práticas do mercado para buscar a previsibilidade e a escala do seu negócio.
                  </p>
                </div>
              </section>

              <section className="glass-effect p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-4 text-white glass-text-shadow">5. Rescisão</h2>
                <div className="space-y-4 text-gray-100 glass-text-shadow leading-relaxed">
                  <p>
                    Trabalhamos com transparência e sem multas abusivas de fidelidade. Qualquer uma das partes pode solicitar a rescisão do contrato de prestação de serviços mediante aviso prévio, conforme os prazos estipulados no acordo comercial firmado entre as partes.
                  </p>
                </div>
              </section>

              <section className="glass-effect p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-4 text-white glass-text-shadow">6. Alterações nos Termos</h2>
                <div className="space-y-4 text-gray-100 glass-text-shadow leading-relaxed">
                  <p>
                    Reservamo-nos o direito de modificar ou substituir estes Termos de Serviço a qualquer momento. Alterações significativas serão comunicadas através de nossos canais oficiais ou diretamente aos clientes ativos. O uso contínuo de nossos serviços após tais alterações constitui a aceitação dos novos termos.
                  </p>
                </div>
              </section>

              <section className="glass-effect p-8 md:p-10">
                <h2 className="text-2xl font-semibold mb-4 text-white glass-text-shadow">7. Informações de Contato</h2>
                <div className="space-y-4 text-gray-100 glass-text-shadow leading-relaxed">
                  <p>
                    Se você tiver alguma dúvida sobre estes Termos de Serviço, entre em contato conosco:
                  </p>
                  <ul className="space-y-2 mt-4">
                    <li><strong>Email:</strong> leandromajr@gmail.com</li>
                    <li><strong>WhatsApp:</strong> +55 (11) 97329-0438</li>
                  </ul>
                </div>
              </section>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default TermsOfService;