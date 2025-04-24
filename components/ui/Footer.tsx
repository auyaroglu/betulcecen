"use client";

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaBehance, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Sosyal medya linkleri
const socialLinks = [
  { icon: <FaInstagram className="w-4 h-4" />, href: "https://instagram.com", label: "Instagram" },
  { icon: <FaBehance className="w-4 h-4" />, href: "https://behance.net", label: "Behance" },
  { icon: <FaLinkedinIn className="w-4 h-4" />, href: "https://linkedin.com", label: "LinkedIn" },
];

// Navigasyon linkleri
const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/projects", label: "Projeler" },
  { href: "/contact", label: "İletişim" },
];

// İletişim bilgileri
const contactInfo = [
  { label: "İzmir, Türkiye", href: null },
  { label: "+90 541 417 39 59", href: "tel:+905414173959" },
  { label: "info@betulcecen.com", href: "mailto:info@betulcecen.com" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden bg-muted/30">
      {/* Dekoratif arka plan */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-30"></div>
      </div>
      
      <div className="container px-4 mx-auto py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Logo ve Açıklama */}
          <div className="md:col-span-1 text-center md:text-left">
            <Link href="/" className="text-2xl font-bold text-gradient mb-6 inline-block">
              BETÜL ÇEÇEN
            </Link>
            <p className="text-muted-foreground mt-4">
              Yaratıcı ve etkileyici grafik tasarım çözümleri ile markanızı bir adım öne çıkarın.
            </p>
            
            {/* Sosyal Medya */}
            <div className="flex space-x-3 mt-6 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <motion.a 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.label} 
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Hızlı Linkler */}
          <div className="md:col-span-1 text-center">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
              Navigasyon
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* İletişim */}
          <div className="md:col-span-1 text-center md:text-right">
            <h3 className="text-sm font-medium text-primary uppercase tracking-wider mb-6">
              İletişim
            </h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index}>
                  {item.href ? (
                    <a 
                      href={item.href} 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-muted-foreground">{item.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border/50 mt-12 pt-8 flex justify-center items-center max-w-6xl mx-auto">
          <p className="text-muted-foreground text-sm text-center">
            &copy; {currentYear} Betül Çeçen. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
} 