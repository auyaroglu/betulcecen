'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AboutSection from '@/components/sections/AboutSection';
import ContactSection from '@/components/sections/ContactSection';
import SplitSection from '@/components/sections/SplitSection';
import Link from 'next/link';
import { IoMdMail } from 'react-icons/io';

// Görüntü URL'leri için güvenilir kaynaklar
const RELIABLE_IMAGES = [
    'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000',
    'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1000',
    'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1000',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000',
    'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000',
    'https://images.unsplash.com/photo-1629429407759-01cd3d5930e5?q=80&w=1000',
    'https://images.unsplash.com/photo-1618556450991-2f1af64e8191?q=80&w=1000',
    'https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1000',
];

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isReducedMotion, setIsReducedMotion] = useState(false);

    // Performans için useScroll değerlerini memoize et
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Performans için basitleştirilmiş transform değerleri
    const scaleText = useTransform(scrollYProgress, [0, 0.2], [1, 0.7]);
    const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const translateY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

    // Daha az abartılı parallax efektleri
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 15]);
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -10]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

    // Reduced motion tercihi için effect
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = () => setIsReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Yatay kaydırma efekti için
    const horizontalScroll = useTransform(scrollYProgress, [0, 1], ['0%', '-40%']);

    // Marquee metni için
    const words = useMemo(
        () => [
            'Grafik Tasarım',
            'Branding',
            'İllüstrasyon',
            'Web Tasarım',
            'UI/UX',
            'Tipografi',
            'Logo Tasarım',
            'Görsel Kimlik',
        ],
        []
    );

    // Büyük vurgu metni scroll efekti için
    const { scrollYProgress: textScrollProgress } = useScroll({
        target: textRef,
        offset: ['start end', 'end start'],
    });

    const textScale = useTransform(textScrollProgress, [0, 0.5], [0.9, 1.1]);
    const textOpacity = useTransform(textScrollProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const textRotate = useTransform(textScrollProgress, [0, 1], [-5, 5]);

    return (
        <div ref={containerRef} className="h-auto bg-background relative">
            <Navbar />

            {!isReducedMotion && (
                <motion.div
                    className="custom-cursor z-50 fixed top-0 left-0 w-8 h-8 rounded-full bg-primary pointer-events-none mix-blend-difference optimize-animation"
                    animate={{
                        x: mousePosition.x - 16,
                        y: mousePosition.y - 16,
                        scale: cursorVariant === 'hover' ? 2 : 1,
                    }}
                    transition={{
                        type: 'spring',
                        damping: 25,
                        stiffness: 300,
                        mass: 0.5,
                    }}
                />
            )}

            {/* Hero Section */}
            <HeroSection />

            {/* Büyük Dönüşen Vurgu Metni */}
            <div
                ref={textRef}
                className="relative py-32 md:py-40 overflow-hidden flex items-center justify-center"
            >
                <motion.h2
                    className="text-[10vw] font-bold text-center leading-none responsive-text optimize-animation"
                    style={{
                        opacity: textOpacity,
                        scale: textScale,
                        rotateZ: textRotate,
                    }}
                >
                    <span className="text-outline-bold">YARATICI</span> <br />
                    <span className="text-gradient-neon">VİZYON</span>
                </motion.h2>
            </div>

            {/* Yatay Kayan Paralaks Görüntüler - Optimize edilmiş */}
            <div className="relative py-20 overflow-hidden">
                <motion.div className="flex gap-8 w-[300%]" style={{ x: horizontalScroll }}>
                    {[...Array(9)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="w-1/3 h-[40vh] md:h-[50vh] relative rounded-xl overflow-hidden optimize-animation"
                            style={
                                !isReducedMotion
                                    ? {
                                          y: index % 3 === 0 ? y1 : index % 3 === 1 ? y2 : y3,
                                          rotate: index % 2 === 0 ? rotate1 : rotate2,
                                          scale: index % 2 === 0 ? scale : 1,
                                      }
                                    : {}
                            }
                            whileHover={{ scale: 1.03 }}
                            onMouseEnter={() => setCursorVariant('hover')}
                            onMouseLeave={() => setCursorVariant('default')}
                        >
                            <img
                                src={RELIABLE_IMAGES[index % RELIABLE_IMAGES.length]}
                                alt={`Yaratıcı Tasarım Çalışması ${index + 1}`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-bold text-white">
                                    Proje {index + 1}
                                </h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Marquee/Yatay Kayan Yazı - Optimize edilmiş */}
            <div className="relative py-8 md:py-12 overflow-hidden border-t border-b border-border">
                <motion.div
                    className="flex whitespace-nowrap optimize-animation"
                    animate={!isReducedMotion ? { x: ['0%', '-50%'] } : {}}
                    transition={{
                        repeat: Infinity,
                        duration: 30,
                        ease: 'linear',
                    }}
                >
                    {[...Array(2)].map((_, outerIndex) => (
                        <div key={outerIndex} className="flex">
                            {words.map((word, idx) => (
                                <span
                                    key={`${word}-${outerIndex}-${idx}`}
                                    className={`text-4xl md:text-6xl lg:text-7xl font-bold mx-6 md:mx-8 ${
                                        idx % 4 === 0
                                            ? 'text-gradient-vibrant'
                                            : idx % 4 === 1
                                            ? 'text-gradient-creative'
                                            : idx % 4 === 2
                                            ? 'text-gradient-soft'
                                            : 'text-gradient-sunset'
                                    }`}
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    {word}
                                </span>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Split Text Section - Optimize edilmiş */}
            <SplitSection firstText="YARATICI" secondText="TASARIM" thirdText="ÇÖZÜMLERI" />

            {/* 3D Kart Efekti Bölümü */}
            <div className="py-24 md:py-32 relative">
                <div className="container mx-auto px-4 md:px-6">
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 md:mb-16 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-outline-gradient">TASARIM</span>{' '}
                        <span className="text-gradient-rainbow">FELSEFESİ</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {['MİNİMALİZM', 'İNOVASYON', 'ETKİLEŞİM'].map((item, index) => (
                            <motion.div
                                key={item}
                                className="card-3d relative h-[350px] md:h-[400px] rounded-2xl bg-gradient-to-br from-primary/5 to-background border border-primary/10 p-6 md:p-8 flex flex-col justify-between overflow-hidden group"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={!isReducedMotion ? { y: -8 } : {}}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-all duration-700" />

                                <motion.span
                                    className="text-6xl md:text-8xl font-bold text-primary/10"
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    0{index + 1}
                                </motion.span>

                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold mb-3">{item}</h3>
                                    <p className="text-muted-foreground">
                                        Tasarımda {item.toLowerCase()} prensibi, her projenin temel
                                        yapıtaşlarından biridir. Kullanıcı odaklı çözümler için
                                        vazgeçilmez bir yaklaşımdır.
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Projeler Bölümü */}
            <ProjectsSection />

            {/* Hakkımda Bölümü */}
            <AboutSection />

            {/* İletişim Bölümü */}
            <ContactSection />

            {/* İletişim Butonu - Daha anlaşılır */}
            <motion.div
                className="fixed bottom-6 right-6 z-30"
                animate={
                    !isReducedMotion
                        ? {
                              y: [0, -8, 0],
                              rotate: [0, 3, 0],
                          }
                        : {}
                }
                transition={{
                    repeat: Infinity,
                    duration: 3,
                    ease: 'easeInOut',
                }}
            >
                <motion.div
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center cursor-pointer shadow-lg shadow-primary/20 relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                >
                    <Link
                        href="/iletisim"
                        className="flex items-center justify-center w-full h-full"
                    >
                        <IoMdMail className="text-primary-foreground text-2xl" />
                        <span className="absolute -top-10 bg-black text-white text-sm px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            İletişime Geç
                        </span>
                    </Link>
                </motion.div>
            </motion.div>

            <Footer />
        </div>
    );
}
