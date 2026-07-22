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
import { BlogSection } from './components/BlogSection';
import { TosSection } from './components/TosSection';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ProjectInquiryModal } from './components/ProjectInquiryModal';
import { TosModal } from './components/TosModal';
import { BlogListPage } from './pages/BlogListPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

type RouteState = {
  view: 'home' | 'blog-list' | 'blog-detail' | 'admin';
  slug?: string;
};

export function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [tosModalOpen, setTosModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Business Website');

  // Route State
  const [route, setRoute] = useState<RouteState>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) {
      return { view: 'admin' };
    }
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return { view: 'blog-detail', slug };
    }
    if (path === '/blog') {
      return { view: 'blog-list' };
    }
    return { view: 'home' };
  });

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

    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) {
        setRoute({ view: 'admin' });
      } else if (path.startsWith('/blog/')) {
        const slug = path.replace('/blog/', '');
        setRoute({ view: 'blog-detail', slug });
      } else if (path === '/blog') {
        setRoute({ view: 'blog-list' });
      } else {
        setRoute({ view: 'home' });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      lenis.destroy();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigateToHome = () => {
    window.history.pushState({}, '', '/');
    setRoute({ view: 'home' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlogList = () => {
    window.history.pushState({}, '', '/blog');
    setRoute({ view: 'blog-list' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlogDetail = (slug: string) => {
    window.history.pushState({}, '', `/blog/${slug}`);
    setRoute({ view: 'blog-detail', slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiry = (serviceName?: string) => {
    if (serviceName) {
      setSelectedService(serviceName);
    }
    setInquiryModalOpen(true);
  };

  // Render Admin Dashboard Page
  if (route.view === 'admin') {
    return <AdminDashboardPage onNavigateHome={navigateToHome} />;
  }

  // Render Dedicated Blog List Page
  if (route.view === 'blog-list') {
    return (
      <div className="min-h-screen bg-white text-neutral-900 selection:bg-blue-600 selection:text-white">
        <Header onOpenInquiry={handleOpenInquiry} />
        <BlogListPage
          onNavigateBack={navigateToHome}
          onSelectPost={navigateToBlogDetail}
        />
        <Footer />
        <ProjectInquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          initialService={selectedService}
        />
      </div>
    );
  }

  // Render Dedicated Standalone Blog Detail Article Page
  if (route.view === 'blog-detail' && route.slug) {
    return (
      <div className="min-h-screen bg-white text-neutral-900 selection:bg-blue-600 selection:text-white">
        <Header onOpenInquiry={handleOpenInquiry} />
        <BlogDetailPage
          slug={route.slug}
          onNavigateBack={navigateToBlogList}
          onNavigateToPost={navigateToBlogDetail}
          onOpenInquiry={() => handleOpenInquiry('Custom Website')}
        />
        <Footer />
        <ProjectInquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          initialService={selectedService}
        />
      </div>
    );
  }

  // Render Main Home Page
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

        {/* Decap CMS Blog Section */}
        <BlogSection
          onSelectPost={navigateToBlogDetail}
          onOpenBlogList={navigateToBlogList}
        />

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
