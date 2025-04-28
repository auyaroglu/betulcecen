'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useScroll, useTransform } from 'framer-motion';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    const { scrollYProgress } = useScroll();
    const navBackground = useTransform(
        scrollYProgress,
        [0, 0.05],
        ['rgba(12, 12, 12, 0)', 'rgba(12, 12, 12, 0.8)']
    );

    const navLinks = [
        {
            label: 'Ana Sayfa',
            href: '/',
        },
        {
            label: 'Projeler',
            href: '/projeler',
        },
        {
            label: 'İletişim',
            href: '/iletisim',
        },
    ];

    // İletişim sayfasındaki görsel
    const menuImage = '/images/woman-art-2.svg';

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    // Sayfa değiştiğinde menüyü kapatmak için
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <>
            <motion.header
                className="fixed top-0 left-0 w-full z-50 px-6 py-4 mix-blend-difference"
                style={{ backgroundColor: navBackground }}
            >
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold">
                        <motion.span
                            className="block text-gradient-rainbow"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
                        >
                            BETÜL ÇEÇEN
                        </motion.span>
                    </Link>

                    <div className="flex items-center">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="relative z-50 flex flex-col items-center justify-center w-10 h-10"
                            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                        >
                            <motion.span
                                className="block w-6 h-0.5 bg-white mb-1.5"
                                animate={{
                                    rotate: menuOpen ? 45 : 0,
                                    y: menuOpen ? 6 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="block w-6 h-0.5 bg-white"
                                animate={{
                                    opacity: menuOpen ? 0 : 1,
                                    x: menuOpen ? -10 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="block w-6 h-0.5 bg-white mt-1.5"
                                animate={{
                                    rotate: menuOpen ? -45 : 0,
                                    y: menuOpen ? -6 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                            />
                        </button>
                    </div>
                </div>
            </motion.header>

            <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center"
                initial={{ opacity: 0, visibility: 'hidden' }}
                animate={{
                    opacity: menuOpen ? 1 : 0,
                    visibility: menuOpen ? 'visible' : 'hidden',
                }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
                <div className="absolute inset-0 bg-background opacity-95" />

                <motion.div
                    className="relative z-10 flex flex-col items-center justify-center w-full h-full"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: menuOpen ? 1 : 0,
                        y: menuOpen ? 0 : 20,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: [0.23, 1, 0.32, 1],
                        staggerChildren: 0.1,
                        delayChildren: 0.2,
                    }}
                >
                    <div className="w-full max-w-3xl px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="flex flex-col items-start justify-center">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        className="w-full py-4 border-b border-border"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: menuOpen ? 1 : 0,
                                            y: menuOpen ? 0 : 20,
                                        }}
                                        transition={{
                                            duration: 0.6,
                                            ease: [0.23, 1, 0.32, 1],
                                            delay: 0.1 * index,
                                        }}
                                    >
                                        <Link href={link.href} className="group">
                                            <div className="text-4xl md:text-6xl font-bold transition-all duration-500 relative overflow-hidden">
                                                <span
                                                    className={`block group-hover:translate-y-[-100%] transition-transform duration-500 ${
                                                        pathname === link.href
                                                            ? 'text-primary'
                                                            : 'text-foreground'
                                                    }`}
                                                >
                                                    {link.label}
                                                </span>
                                                <span className="absolute top-full left-0 block group-hover:translate-y-[-100%] transition-transform duration-500 text-primary">
                                                    {link.label}
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="hidden md:flex flex-col items-start justify-center">
                                <motion.div
                                    className="overflow-hidden rounded-xl w-full h-[300px] relative"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{
                                        opacity: menuOpen ? 1 : 0,
                                        y: menuOpen ? 0 : 30,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.23, 1, 0.32, 1],
                                        delay: 0.4,
                                    }}
                                >
                                    {/* Her sayfa için tek bir görsel kullandık - İletişim sayfasındaki görsel */}
                                    <motion.div
                                        className="absolute inset-0 w-full h-full"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={menuImage}
                                            alt="Menü görseli"
                                            className="w-full h-full object-contain"
                                        />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>

                        <motion.div
                            className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                                opacity: menuOpen ? 1 : 0,
                                y: menuOpen ? 0 : 20,
                            }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
                        >
                            <div className="mb-4 md:mb-0">
                                <p>hello@betulcecen.com</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://instagram.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://behance.net"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Behance
                                </a>
                                <a
                                    href="https://dribbble.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Dribbble
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

export default Navbar;
