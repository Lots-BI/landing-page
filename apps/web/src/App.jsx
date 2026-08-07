import React, { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { EditableContentProvider } from './contexts/EditableContent.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import { LightCosmicBackground } from './components/LightCosmicBackground.jsx';
import HomePage from './pages/HomePage.jsx';

const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const CookieBanner = lazy(() => import('./components/CookieBanner.jsx'));

function DeferredChrome() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId;
    let timeoutId;
    const enable = () => setReady(true);
    const start = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(enable, { timeout: 5000 });
      } else {
        timeoutId = window.setTimeout(enable, 2500);
      }
    };

    if (document.readyState === 'complete') {
      timeoutId = window.setTimeout(start, 800);
    } else {
      window.addEventListener('load', () => {
        timeoutId = window.setTimeout(start, 800);
      }, { once: true });
    }

    return () => {
      if (idleId != null && 'cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
      if (timeoutId != null) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!ready) return <div className="min-h-[80px]" aria-hidden="true" />;

  return (
    <Suspense fallback={<div className="min-h-[80px]" aria-hidden="true" />}>
      <Footer />
      <CookieBanner />
    </Suspense>
  );
}

function App() {
  return (
    <HelmetProvider>
      <EditableContentProvider>
        <Router>
          <ScrollToTop />
          <LightCosmicBackground />

          <div className="relative z-0 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                {/* Home is eager — never wrap it in Suspense (avoids full-page "Carregando...") */}
                <Route path="/" element={<HomePage />} />
                <Route
                  path="/servicos"
                  element={
                    <Suspense fallback={null}>
                      <ServicesPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/portfolio"
                  element={
                    <Suspense fallback={null}>
                      <PortfolioPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/contato"
                  element={
                    <Suspense fallback={null}>
                      <ContactPage />
                    </Suspense>
                  }
                />
                <Route
                  path="/privacy-policy"
                  element={
                    <Suspense fallback={null}>
                      <PrivacyPolicy />
                    </Suspense>
                  }
                />
                <Route
                  path="/privacy"
                  element={
                    <Suspense fallback={null}>
                      <PrivacyPolicy />
                    </Suspense>
                  }
                />
                <Route
                  path="/privacypolicy"
                  element={
                    <Suspense fallback={null}>
                      <PrivacyPolicy />
                    </Suspense>
                  }
                />
                <Route
                  path="/terms-of-service"
                  element={
                    <Suspense fallback={null}>
                      <TermsOfService />
                    </Suspense>
                  }
                />
                <Route
                  path="/terms"
                  element={
                    <Suspense fallback={null}>
                      <TermsOfService />
                    </Suspense>
                  }
                />
                <Route
                  path="/termsofservice"
                  element={
                    <Suspense fallback={null}>
                      <TermsOfService />
                    </Suspense>
                  }
                />
                <Route
                  path="/contact"
                  element={
                    <Suspense fallback={null}>
                      <ContactPage />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={null}>
                      <NotFoundPage />
                    </Suspense>
                  }
                />
              </Routes>
            </main>
            <DeferredChrome />
          </div>
        </Router>
      </EditableContentProvider>
    </HelmetProvider>
  );
}

export default App;
