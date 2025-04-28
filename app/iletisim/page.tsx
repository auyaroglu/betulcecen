'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function ContactPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('form');
    const [letterIndex, setLetterIndex] = useState(0);
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        message: '',
        submitted: false,
        loading: false,
    });

    // "CONTACT" metni için ayrı ayrı animasyon yapmak için harfleri ayırıyoruz
    const contactTitle = 'İLETİŞİM';
    const titleArray = contactTitle.split('');

    useEffect(() => {
        setIsMounted(true);

        // Başlık harflerini sırayla göstermek için zamanlayıcı
        const timer = setInterval(() => {
            setLetterIndex(prev => (prev < titleArray.length - 1 ? prev + 1 : prev));
        }, 150);

        return () => clearInterval(timer);
    }, [titleArray.length]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const y1 = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
    const y2 = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
    const textRotate = useTransform(scrollYProgress, [0, 0.5], [0, 5]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState(prev => ({ ...prev, loading: true }));

        // Form gönderimi simülasyonu
        setTimeout(() => {
            setFormState(prev => ({
                ...prev,
                submitted: true,
                loading: false,
            }));
        }, 1500);
    };

    const socialLinks = [
        { name: 'Instagram', url: 'https://instagram.com' },
        { name: 'Behance', url: 'https://behance.net' },
        { name: 'Dribbble', url: 'https://dribbble.com' },
        { name: 'LinkedIn', url: 'https://linkedin.com' },
    ];

    // Animasyon varyantları
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
        },
    };

    const handleSectionChange = (section: string) => {
        setActiveSection(section);
    };

    if (!isMounted) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse h-10 w-40 bg-muted rounded"></div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden">
            <Navbar />

            {/* İlham verici arka plan */}
            <div className="absolute inset-0 z-0 overflow-hidden bg-noise-pattern">
                <div className="absolute bg-primary/10 w-[600px] h-[600px] rounded-full blur-[180px] top-[-200px] right-[-200px]" />
                <div className="absolute bg-accent/10 w-[600px] h-[600px] rounded-full blur-[180px] bottom-[-200px] left-[-200px]" />
            </div>

            {/* Yatay çizgiler */}
            <div className="fixed inset-0 z-[1] pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-full h-[1px] bg-border/20"
                        style={{ top: `${i * 5}vh`, opacity: 0.5 - i * 0.02 }}
                        initial={{ x: '-100%' }}
                        animate={{ x: '0%' }}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.05,
                            ease: [0.43, 0.13, 0.23, 0.96],
                        }}
                    />
                ))}
            </div>

            <div className="pt-32 pb-24 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 gap-16 mb-20">
                        <motion.div
                            className="flex flex-col"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                            style={{ y: y1 }}
                        >
                            {/* Animasyonlu Başlık */}
                            <div className="overflow-hidden mb-12">
                                <div className="flex items-baseline">
                                    {titleArray.map((letter, index) => (
                                        <motion.div
                                            key={index}
                                            className="inline-block"
                                            initial={{ y: 80 }}
                                            animate={{
                                                y: letterIndex >= index ? 0 : 80,
                                            }}
                                            style={{
                                                rotate: textRotate,
                                            }}
                                            transition={{
                                                duration: 0.5,
                                                ease: [0.43, 0.13, 0.23, 0.96],
                                                delay: index * 0.1,
                                            }}
                                        >
                                            <span className="text-8xl md:text-9xl font-bold text-foreground inline-block mr-1">
                                                {letter}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Sekme navigasyonu */}
                            <motion.div
                                className="flex space-x-8 text-lg md:text-xl mb-16 border-b border-border pb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: 1.5,
                                    ease: [0.43, 0.13, 0.23, 0.96],
                                }}
                            >
                                <button
                                    className={`relative pb-2 ${
                                        activeSection === 'form'
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    } transition-colors`}
                                    onClick={() => handleSectionChange('form')}
                                >
                                    Mesaj Gönder
                                    {activeSection === 'form' && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                                <button
                                    className={`relative pb-2 ${
                                        activeSection === 'info'
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    } transition-colors`}
                                    onClick={() => handleSectionChange('info')}
                                >
                                    İletişim Bilgileri
                                    {activeSection === 'info' && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                                <button
                                    className={`relative pb-2 ${
                                        activeSection === 'social'
                                            ? 'text-primary'
                                            : 'text-muted-foreground hover:text-foreground'
                                    } transition-colors`}
                                    onClick={() => handleSectionChange('social')}
                                >
                                    Sosyal Medya
                                    {activeSection === 'social' && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                            </motion.div>

                            {/* Sekme içeriği */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                                <AnimatePresence mode="wait">
                                    {activeSection === 'form' && (
                                        <motion.div
                                            key="form"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, y: -20 }}
                                            className="col-span-1"
                                        >
                                            <motion.p
                                                variants={itemVariants}
                                                className="text-lg md:text-xl text-muted-foreground mb-8"
                                            >
                                                Projeleriniz için benimle iletişime geçebilirsiniz.
                                                En kısa sürede dönüş yapacağım.
                                            </motion.p>

                                            <motion.form
                                                ref={formRef}
                                                onSubmit={handleSubmit}
                                                variants={containerVariants}
                                                className="space-y-6"
                                            >
                                                <motion.div variants={itemVariants}>
                                                    <label className="block text-foreground mb-2 text-sm">
                                                        İsim
                                                    </label>
                                                    <input
                                                        type="text"
                                                        required
                                                        className="w-full bg-transparent border-b border-border focus:border-primary px-0 py-2 outline-none transition-colors"
                                                        value={formState.name}
                                                        onChange={e =>
                                                            setFormState({
                                                                ...formState,
                                                                name: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <label className="block text-foreground mb-2 text-sm">
                                                        Email
                                                    </label>
                                                    <input
                                                        type="email"
                                                        required
                                                        className="w-full bg-transparent border-b border-border focus:border-primary px-0 py-2 outline-none transition-colors"
                                                        value={formState.email}
                                                        onChange={e =>
                                                            setFormState({
                                                                ...formState,
                                                                email: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <label className="block text-foreground mb-2 text-sm">
                                                        Mesajınız
                                                    </label>
                                                    <textarea
                                                        required
                                                        rows={4}
                                                        className="w-full bg-transparent border-b border-border focus:border-primary px-0 py-2 outline-none transition-colors resize-none"
                                                        value={formState.message}
                                                        onChange={e =>
                                                            setFormState({
                                                                ...formState,
                                                                message: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </motion.div>

                                                <motion.div variants={itemVariants}>
                                                    <button
                                                        type="submit"
                                                        disabled={formState.loading}
                                                        className="inline-block overflow-hidden relative rounded-full group"
                                                    >
                                                        <span className="relative z-10 px-8 py-3 bg-primary text-primary-foreground rounded-full inline-flex items-center justify-center font-medium text-base">
                                                            {formState.loading
                                                                ? 'Gönderiliyor...'
                                                                : 'Gönder'}
                                                            <svg
                                                                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                                />
                                                            </svg>
                                                        </span>
                                                        <span className="absolute inset-0 h-full w-full bg-primary/30 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-full"></span>
                                                    </button>
                                                </motion.div>
                                            </motion.form>
                                        </motion.div>
                                    )}

                                    {activeSection === 'info' && (
                                        <motion.div
                                            key="info"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, y: -20 }}
                                            className="col-span-1"
                                        >
                                            <motion.div variants={itemVariants} className="mb-10">
                                                <h3 className="text-xl font-bold mb-2">Email</h3>
                                                <p className="text-lg text-primary">
                                                    hello@betulcecen.com
                                                </p>
                                            </motion.div>

                                            <motion.div variants={itemVariants} className="mb-10">
                                                <h3 className="text-xl font-bold mb-2">Telefon</h3>
                                                <p className="text-lg text-primary">
                                                    +90 555 123 4567
                                                </p>
                                            </motion.div>

                                            <motion.div variants={itemVariants}>
                                                <h3 className="text-xl font-bold mb-2">Adres</h3>
                                                <p className="text-lg text-muted-foreground">
                                                    İstanbul, Türkiye
                                                </p>
                                                <p className="text-lg text-muted-foreground">
                                                    Kadıköy, 34000
                                                </p>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {activeSection === 'social' && (
                                        <motion.div
                                            key="social"
                                            variants={containerVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit={{ opacity: 0, y: -20 }}
                                            className="col-span-1"
                                        >
                                            <motion.p
                                                variants={itemVariants}
                                                className="text-lg md:text-xl text-muted-foreground mb-8"
                                            >
                                                Sosyal medya üzerinden de benimle iletişime
                                                geçebilirsiniz.
                                            </motion.p>

                                            <motion.div
                                                variants={containerVariants}
                                                className="space-y-6"
                                            >
                                                {socialLinks.map((link, index) => (
                                                    <motion.div
                                                        key={link.name}
                                                        variants={itemVariants}
                                                        whileHover={{ x: 10 }}
                                                        className="border-b border-border pb-4"
                                                    >
                                                        <a
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="flex items-center justify-between text-xl font-medium text-foreground hover:text-primary transition-colors"
                                                        >
                                                            <span>{link.name}</span>
                                                            <svg
                                                                xmlns="http://www.w3.org/2000/svg"
                                                                className="h-5 w-5"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                stroke="currentColor"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                                />
                                                            </svg>
                                                        </a>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {/* Sağ taraf dekoru ve görsel alanı */}
                                    <motion.div
                                        style={{ y: y2 }}
                                        className="relative col-span-1 h-[60vh] rounded-xl overflow-hidden hidden md:block"
                                    >
                                        <div className="h-full w-full relative rounded-lg overflow-hidden">
                                            <Image
                                                src="/images/woman-art.svg"
                                                alt="İletişim Görseli - Sanatsal Kadın"
                                                fill
                                                className="object-contain"
                                                priority
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Hareket eden dekoratif öğeler */}
            <div className="fixed inset-0 z-[1] pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={`circle-${i}`}
                        className="absolute w-4 h-4 rounded-full bg-primary/20"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            x: [
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerWidth,
                                Math.random() * window.innerWidth,
                            ],
                            y: [
                                Math.random() * window.innerHeight,
                                Math.random() * window.innerHeight,
                                Math.random() * window.innerHeight,
                            ],
                        }}
                        transition={{
                            duration: 20 + i * 5,
                            repeat: Infinity,
                            ease: 'linear',
                        }}
                    />
                ))}
            </div>

            <Footer />
        </div>
    );
}
