'use client';

import Link from 'next/link';
import HeroSection from '../components/sections/HeroSection';
import FeaturedProjects from '../components/sections/FeaturedProjects';
import AboutSection from '../components/sections/AboutSection';
import ContactSection from '../components/sections/ContactSection';

export default function Home() {
    return (
        <main className="flex flex-col min-h-screen max-lg:pt-4">
            <HeroSection />
            <FeaturedProjects />
            <AboutSection />
            <ContactSection />
        </main>
    );
}
