'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
    const ref = useRef<HTMLDivElement>(null);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = () => setIsReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    // Daha hafif paralaks efektleri
    const y1 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, 300]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Güvenilir ve optimize edilmiş görsel URL'leri
    const mainImage = 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000';
    const secondaryImage = 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000';
    const thirdImage = 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000';

    // Client-side rendering için JSX
    if (!isMounted) {
        return (
            <div className="min-h-screen flex items-center justify-center relative py-20 md:py-32 overflow-hidden noise-bg">
                <div className="container mx-auto px-4 md:px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center">
                        {/* İçerik yüklenene kadar yükleme yertutucu */}
                        <div className="h-[300px] md:h-[400px]"></div>
                        <div className="hidden lg:block h-[500px]"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className="min-h-screen flex items-center justify-center relative py-20 md:py-32 overflow-hidden noise-bg"
        >
            <div className="absolute inset-0 z-0">
                <div className="absolute bg-primary/10 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] top-[-150px] md:top-[-300px] left-[-150px] md:left-[-300px]" />
                <div className="absolute bg-accent/10 w-[300px] md:w-[600px] h-[300px] md:h-[600px] rounded-full blur-[80px] md:blur-[120px] bottom-[-175px] md:bottom-[-350px] right-[-150px] md:right-[-300px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                >
                    <div className="relative z-10">
                        <motion.div
                            className="overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: [0.43, 0.13, 0.23, 0.96] }}
                        >
                            <span className="text-gradient-creative uppercase font-medium tracking-wider">
                                Kreatif Tasarımcı & İllüstratör
                            </span>
                        </motion.div>

                        <div>
                            <div className="overflow-hidden mt-4">
                                <motion.h1
                                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 optimize-animation"
                                    initial={{ y: 80 }}
                                    animate={{ y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.43, 0.13, 0.23, 0.96],
                                        delay: 0.1,
                                    }}
                                    style={!isReducedMotion && isMounted ? { y: y1 } : {}}
                                >
                                    <span className="block text-gradient-soft">Tasarım</span>
                                    <span className="block text-gradient-sunset">Hikayeler</span>
                                    <span className="block text-gradient-vibrant">Anlatır</span>
                                </motion.h1>
                            </div>

                            <motion.p
                                className="text-muted-foreground text-base md:text-lg lg:text-xl max-w-md optimize-animation"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.43, 0.13, 0.23, 0.96],
                                    delay: 0.3,
                                }}
                                style={!isReducedMotion && isMounted ? { y: y2 } : {}}
                            >
                                Markanızın hikayesini etkileyici tasarımlarla göz alıcı hale
                                getiriyorum. Her bir proje, özel hikayesini anlatan benzersiz bir
                                deneyim.
                            </motion.p>

                            <motion.div
                                className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 optimize-animation"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.43, 0.13, 0.23, 0.96],
                                    delay: 0.4,
                                }}
                                style={!isReducedMotion && isMounted ? { y: y3 } : {}}
                            >
                                <Link
                                    href="/projeler"
                                    className="bg-primary text-primary-foreground px-6 md:px-8 py-3 rounded-full inline-block font-medium hover:bg-primary/90 transition-colors"
                                >
                                    Projeleri Keşfet
                                </Link>
                                <Link
                                    href="/iletisim"
                                    className="border border-border text-foreground px-6 md:px-8 py-3 rounded-full inline-block font-medium hover:bg-muted transition-colors"
                                >
                                    İletişime Geç
                                </Link>
                            </motion.div>
                        </div>
                    </div>

                    <motion.div
                        className="relative overflow-hidden hidden lg:block"
                        style={isMounted ? { opacity } : {}}
                    >
                        <motion.div
                            className="relative z-20 optimize-animation"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.43, 0.13, 0.23, 0.96],
                                delay: 0.2,
                            }}
                            style={!isReducedMotion && isMounted ? { y: y2 } : {}}
                        >
                            <div className="relative rounded-xl h-[500px] w-full overflow-hidden">
                                <Image
                                    src={mainImage}
                                    alt="Yaratıcı Tasarım"
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute top-[10%] -right-[5%] md:-right-[10%] z-10 optimize-animation"
                            initial={{ rotate: -5, scale: 0.8, opacity: 0, y: 80 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.43, 0.13, 0.23, 0.96],
                                delay: 0.4,
                            }}
                            style={!isReducedMotion && isMounted ? { y: y1 } : {}}
                        >
                            <div className="relative rounded-xl h-[220px] md:h-[300px] w-[180px] md:w-[250px] overflow-hidden shadow-2xl">
                                <Image
                                    src={secondaryImage}
                                    alt="Tasarım Süreci"
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 768px) 30vw, 20vw"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            className="absolute bottom-[5%] -left-[5%] z-30 optimize-animation"
                            initial={{ rotate: 5, scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.43, 0.13, 0.23, 0.96],
                                delay: 0.6,
                            }}
                            style={!isReducedMotion && isMounted ? { y: y3 } : {}}
                        >
                            <div className="relative rounded-xl h-[150px] md:h-[200px] w-[130px] md:w-[180px] overflow-hidden shadow-2xl">
                                <Image
                                    src={thirdImage}
                                    alt="Yaratıcı Çalışma Alanı"
                                    className="object-cover"
                                    fill
                                    sizes="(max-width: 768px) 20vw, 15vw"
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {isMounted && !isReducedMotion && (
                <motion.div
                    className="absolute bottom-10 md:bottom-20 left-1/2 transform -translate-x-1/2 optimize-animation"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                    style={{ opacity }}
                >
                    <div className="flex flex-col items-center">
                        <span className="text-muted-foreground text-sm mb-2">Aşağı Kaydır</span>
                        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-1">
                            <motion.div
                                className="w-1.5 h-1.5 bg-primary rounded-full"
                                animate={{
                                    y: [0, 12, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default HeroSection;
