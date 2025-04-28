'use client';

import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollContextType {
    scrollY: React.MutableRefObject<number>;
    registerScrollSection: (id: string, element: HTMLElement) => void;
    unregisterScrollSection: (id: string) => void;
}

const ScrollContext = createContext<ScrollContextType | null>(null);

export const useScrollContext = () => {
    const context = useContext(ScrollContext);
    if (!context) {
        throw new Error('useScrollContext must be used within a SmoothScrollProvider');
    }
    return context;
};

export const SmoothScrollProvider = ({ children }: { children: ReactNode }) => {
    const scrollY = useRef(0);
    const scrollSections = useRef<{ [key: string]: HTMLElement }>({});
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        offset: ['start start', 'end end'],
    });

    const registerScrollSection = (id: string, element: HTMLElement) => {
        scrollSections.current[id] = element;
    };

    const unregisterScrollSection = (id: string) => {
        delete scrollSections.current[id];
    };

    useEffect(() => {
        const handleScroll = () => {
            scrollY.current = window.scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ scrollY, registerScrollSection, unregisterScrollSection }}>
            <div ref={containerRef} className="smooth-scroll-container">
                {children}
            </div>
        </ScrollContext.Provider>
    );
};

// Scroll bileşeni - scrollun belli bir yüzdelik diliminde tetiklenen animasyonlar için
export const ScrollAnimation = ({
    children,
    animation,
    startAt = 0,
    endAt = 1,
}: {
    children: ReactNode;
    animation: any;
    startAt?: number;
    endAt?: number;
}) => {
    const { scrollYProgress } = useScroll();
    const motionValue = useTransform(scrollYProgress, [startAt, endAt], [0, 1]);

    return <motion.div style={animation(motionValue)}>{children}</motion.div>;
};
