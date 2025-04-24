"use client";

import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  "Logo Tasarımı",
  "Marka Kimliği",
  "Web Tasarım",
  "Ambalaj",
  "İllüstrasyon",
  "UI/UX Tasarım",
  "Tipografi",
  "Sosyal Medya"
];

// Deneyim ve proje bilgileri
const stats = [
  { value: "10+", label: "Yıl Deneyim" },
  { value: "100+", label: "Tamamlanan Proje" },
  { value: "50+", label: "Mutlu Müşteri" },
];

export default function AboutSection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <svg 
          className="absolute top-0 left-0 w-full h-full text-primary/5" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern 
              id="grid-pattern" 
              width="40" 
              height="40" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 40 0 L 0 0 0 40" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            className="relative mx-auto lg:mx-0 w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              {/* Main Profile Image */}
              <motion.div 
                className="aspect-square overflow-hidden rounded-2xl shadow-xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">Profil fotoğrafı</p>
                </div>
                {/* Overlay with gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute top-6 -right-6 w-32 h-32 border-4 border-secondary/30 rounded-2xl -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-primary/30 rounded-2xl -z-10"></div>
            </div>
            
            {/* İstatistikler - profile image'in altına taşındı */}
            <motion.div 
              className="grid grid-cols-3 gap-4 mt-10 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="bg-muted p-4 rounded-lg">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <motion.div 
                className="flex items-center space-x-2 mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity:.7, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-12 h-px bg-primary"></div>
                <p className="text-sm font-medium uppercase tracking-widest text-primary">Hakkımda</p>
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Merhaba, Ben <span className="text-gradient">Betül Çeçen</span>
              </h2>
            </div>
            
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                10 yılı aşkın deneyimle, görsel iletişimin gücünü kullanarak markaların öne çıkmasına yardımcı oluyorum. Grafik tasarım tutkum, sanat ve teknolojiyi bir araya getirerek yaratıcı çözümler üretmeme olanak sağlıyor.
              </p>
              <p>
                Her projeye özgün bir yaklaşım getiriyor ve müşterilerimle yakın işbirliği içinde çalışarak vizyonlarını hayata geçiriyorum. Amacım sadece estetik açıdan çekici değil, aynı zamanda stratejik ve etkili tasarımlar oluşturmak.
              </p>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, staggerChildren: 0.08 }}
            >
              {skills.map((skill, index) => (
                <motion.span 
                  key={index}
                  className="px-4 py-2 bg-muted rounded-full text-sm font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 