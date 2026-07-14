import React, { Suspense, lazy } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { EditableContentProvider } from './contexts/EditableContent.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton.jsx';
import CookieBanner from './components/CookieBanner.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import EditContentPanel from './components/EditContentPanel.jsx';
import { StarfieldBackground } from './components/StarfieldBackground.jsx';
import { AnimatedParticles } from './components/AnimatedParticles.jsx';
import LoadingFallback from './components/LoadingFallback.jsx';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage.jsx'));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy.jsx'));
const TermsOfService = lazy(() => import('./pages/TermsOfService.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function App() {
  return (
    <HelmetProvider>
      <EditableContentProvider>
        <Router>
          <ScrollToTop />
          
          {/* Fixed Background Layers */}
          <StarfieldBackground />
          <AnimatedParticles />
          
          {/* Main App Content */}
          <div className="relative z-0 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/servicos" element={<ServicesPage />} />
                  <Route path="/portfolio" element={<PortfolioPage />} />
                  <Route path="/contato" element={<ContactPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>

          {/* Overlays & Utilities */}
          <FloatingWhatsAppButton />
          <CookieBanner />
          <EditContentPanel />
        </Router>
      </EditableContentProvider>
    </HelmetProvider>
  );
}

export default App;