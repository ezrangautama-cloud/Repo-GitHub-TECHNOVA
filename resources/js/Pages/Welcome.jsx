import React from 'react';
import Navbar from '../Components/Navbar';
import HeroSection from '../Components/HeroSection';
import WhatWeDoSection from '../Components/WhatWeDoSection';
import FeaturedServicesSection from '../Components/FeaturedServicesSection';
import DigitalLearningSection from '../Components/DigitalLearningSection';
import EngineeringToolsSection from '../Components/EngineeringToolsSection';
import CtaSection from '../Components/CtaSection';
import Footer from '../Components/Footer';

export default function Welcome() {
    return (
        <div class="font-sans antialiased bg-slate-900 text-slate-100 min-h-screen flex flex-col m-0 p-0 overflow-x-hidden">
            <Navbar />
            <HeroSection />
            <WhatWeDoSection />
            <FeaturedServicesSection />
            <DigitalLearningSection />
            <EngineeringToolsSection />
            <CtaSection />
            <Footer />
        </div>
    );
}
