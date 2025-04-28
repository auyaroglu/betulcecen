'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const pathname = usePathname();
    const [isFirstMount, setIsFirstMount] = useState(true);

    useEffect(() => {
        setIsFirstMount(false);
    }, []);

    const slideUp = {
        initial: { y: 100, opacity: 0 },
        enter: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 1,
                ease: [0.23, 1, 0.32, 1],
                staggerChildren: 0.1,
            },
        },
        exit: {
            y: 100,
            opacity: 0,
            transition: {
                duration: 0.8,
                ease: [0.43, 0, 0.23, 1],
            },
        },
    };

    const fadeIn = {
        initial: { opacity: 0 },
        enter: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: 'easeInOut',
            },
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={pathname}
                initial={isFirstMount ? 'enter' : 'initial'}
                animate="enter"
                exit="exit"
                variants={fadeIn}
                className="min-h-screen"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

export default PageTransition;
