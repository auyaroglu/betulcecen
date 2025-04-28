'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface SplitSectionProps {
    firstText: string;
    secondText: string;
    thirdText: string;
}

const SplitSection = ({ firstText, secondText, thirdText }: SplitSectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const x1 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const x2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const x3 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [-5, 5]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [5, -5]);
    const rotate3 = useTransform(scrollYProgress, [0, 1], [-3, 3]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (rect) {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setMousePosition({ x, y });
        }
    };

    return (
        <motion.div
            ref={sectionRef}
            className="relative py-32 md:py-40 overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
            style={{ opacity }}
        >
            {/* Background gradient spotlight effect - optimized */}
            <motion.div
                className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/20 blur-[80px] md:blur-[100px] pointer-events-none optimize-animation"
                animate={{
                    x: mousePosition.x - 150,
                    y: mousePosition.y - 150,
                }}
                transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 200,
                    mass: 0.8,
                }}
            />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6 h-[40vh] md:h-[50vh]">
                    <motion.div className="overflow-hidden" style={{ scale }}>
                        <motion.h2
                            className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold text-gradient-creative leading-none responsive-text optimize-animation"
                            style={{ x: x1, rotateZ: rotate1 }}
                        >
                            {firstText}
                        </motion.h2>
                    </motion.div>

                    <motion.div className="overflow-hidden" style={{ scale }}>
                        <motion.h2
                            className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold text-gradient-sunset leading-none responsive-text optimize-animation"
                            style={{ x: x2, rotateZ: rotate2 }}
                        >
                            {secondText}
                        </motion.h2>
                    </motion.div>

                    <motion.div className="overflow-hidden" style={{ scale }}>
                        <motion.h2
                            className="text-[12vw] md:text-[8vw] lg:text-[6vw] font-bold text-gradient-neon leading-none responsive-text optimize-animation"
                            style={{ x: x3, rotateZ: rotate3 }}
                        >
                            {thirdText}
                        </motion.h2>
                    </motion.div>
                </div>
            </div>

            {/* Decorative elements - optimized for performance */}
            <motion.div
                className="absolute top-[20%] left-[10%] w-12 md:w-20 h-12 md:h-20 rounded-full border-2 border-primary/50 optimize-animation"
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'loop',
                }}
            />

            <motion.div
                className="absolute bottom-[15%] right-[10%] w-16 md:w-32 h-16 md:h-32 rounded-full border-2 border-primary/30 optimize-animation"
                animate={{
                    y: [0, 30, 0],
                    rotate: [360, 180, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'loop',
                }}
            />

            <motion.div
                className="absolute top-[40%] right-[20%] w-6 md:w-10 h-6 md:h-10 bg-primary/20 rounded-full optimize-animation"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'loop',
                }}
            />
        </motion.div>
    );
};

export default SplitSection;
