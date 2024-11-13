import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import Integrations from '../components/Integrations';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Integrations />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;