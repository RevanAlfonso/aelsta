import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatementSection } from './components/StatementSection';
import { StorytellingSection } from './components/StorytellingSection';
import { StatsSection } from './components/StatsSection';
import { ServicesSection } from './components/ServicesSection';
import { PricingSection } from './components/PricingSection';
import { PortfolioSection } from './components/PortfolioSection';
import { ProcessSection } from './components/ProcessSection';
import { TosSection } from './components/TosSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { TosModal } from './components/TosModal';

export function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [tosModalOpen, setTosModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Business Website');

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setInquiryModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-blue-600 selection:text-white">
      {/* Fixed Navbar */}
      <Header onOpenInquiry={handleOpenInquiry} />

      {/* Main Content Sections */}
      <main>
        {/* Intro / Hero */}
        <Hero onOpenInquiry={() => handleOpenInquiry()} />

        {/* Section 2: Statement */}
        <StatementSection />

        {/* Section 3: Storytelling Journey */}
        <StorytellingSection />

        {/* Section 4: Stats & Lighthouse Scorecard */}
        <StatsSection />

        {/* Section 5: Services */}
        <ServicesSection onSelectService={(service) => handleOpenInquiry(service)} />

        {/* Section 6: Pricing */}
        <PricingSection onOpenInquiry={(plan) => handleOpenInquiry(plan)} />

        {/* Section 7: Sticky Portfolio Showcase */}
        <PortfolioSection />

        {/* Section 8: Development Process Timeline */}
        <ProcessSection />

        {/* TOS Section */}
        <TosSection onOpenTosModal={() => setTosModalOpen(true)} />

        {/* Section 9: Minimal FAQ Accordion */}
        <FaqSection />

        {/* Final CTA */}
        <CtaSection onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* Minimal Footer */}
      <Footer />

      {/* Project Inquiry Modal Drawer */}
      <ProjectInquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        initialService={selectedService}
      />

      {/* TOS Full Document Modal */}
      <TosModal
        isOpen={tosModalOpen}
        onClose={() => setTosModalOpen(false)}
      />
    </div>
  );
}

export default App;
