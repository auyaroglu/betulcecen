'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import dynamic from 'next/dynamic';

// Navigasyon linkleri
const navLinks = [
    { href: '/', label: 'Ana Sayfa' },
    { href: '/projeler', label: 'Projeler' },
    { href: '/iletisim', label: 'İletişim' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Sayfa kaydırıldığında navbar'ın görünümünü değiştir
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Menü açıldığında body'nin scroll'unu engelle
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <>
            {/* Standart Header */}
            <header
                className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${
                    isScrolled
                        ? 'py-3 bg-background/95 backdrop-blur-md shadow-lg'
                        : 'py-5 bg-background/80 backdrop-blur-sm'
                }`}
            >
                <div className="container px-4 mx-auto">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link href="/" className="text-2xl font-bold text-gradient">
                                BETÜL ÇEÇEN
                            </Link>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-10">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={`relative text-sm font-medium hover:text-primary transition-colors ${
                                            pathname === link.href
                                                ? 'text-primary'
                                                : 'text-muted-foreground'
                                        }`}
                                    >
                                        {link.label}
                                        {pathname === link.href && (
                                            <motion.div
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                                                layoutId="navbar-indicator"
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 300,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Call to action button */}
                        <motion.div
                            className="hidden md:block"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Link
                                href="/iletisim"
                                className="px-5 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                            >
                                İletişime Geç
                            </Link>
                        </motion.div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                            onClick={() => setIsOpen(true)}
                            whileTap={{ scale: 0.9 }}
                            aria-label="Menüyü aç"
                        >
                            <HiMenu className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </header>

            {/* Yeni Mobil Menü - Animasyonlu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Arkaplan overlay */}
                        <motion.div
                            className="fixed inset-0 bg-background/80 backdrop-blur-md z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Menü içeriği */}
                        <motion.div
                            className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-card z-50 glassmorphism border-l border-border shadow-xl flex flex-col"
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className="flex justify-between items-center p-6 border-b border-border">
                                <h2 className="text-xl font-bold text-gradient">MENÜ</h2>
                                <motion.button
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-muted hover:bg-muted/80 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                    whileTap={{ scale: 0.9 }}
                                    aria-label="Menüyü kapat"
                                >
                                    <IoClose className="w-5 h-5" />
                                </motion.button>
                            </div>

                            <div className="flex-grow overflow-y-auto py-6 px-6">
                                <nav className="flex flex-col space-y-2">
                                    {navLinks.map((link, index) => (
                                        <motion.div
                                            key={link.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`relative block py-3 px-4 rounded-lg text-lg font-medium transition-colors ${
                                                    pathname === link.href
                                                        ? 'bg-primary/10 text-primary'
                                                        : 'hover:bg-muted text-foreground'
                                                }`}
                                            >
                                                {link.label}
                                                {pathname === link.href && (
                                                    <motion.div
                                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"
                                                        layoutId="mobile-nav-indicator"
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
