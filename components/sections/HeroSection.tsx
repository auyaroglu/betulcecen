"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animasyon varyantları
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.7 }
  }
};

// Animasyonlu elips bileşeni
const AnimatedBlob = ({ className }: { className: string }) => {
  return (
    <motion.div 
      className={`absolute rounded-full blur-3xl opacity-30 ${className}`}
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, 0],
        opacity: [0.3, 0.35, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20">
      {/* Animated background blobs */}
      <AnimatedBlob className="w-[500px] h-[500px] bg-primary/30 top-[-250px] right-[-100px]" />
      <AnimatedBlob className="w-[600px] h-[600px] bg-secondary/20 bottom-[-300px] left-[-200px]" />
      <AnimatedBlob className="w-[300px] h-[300px] bg-accent/20 top-[30%] left-[20%]" />
      
      <div className="container px-4 mx-auto z-10 relative">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-8">
            <motion.div className="flex items-center space-x-2 mb-4" variants={itemVariants}>
              <div className="w-12 h-0.5 bg-primary"></div>
              <p className="text-sm font-medium uppercase tracking-widest text-primary">Grafik Tasarımcı</p>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold"
              variants={itemVariants}
            >
              Yaratıcı <span className="text-gradient">Tasarım</span> Çözümleri
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground"
              variants={itemVariants}
            >
              Markanızı öne çıkaracak, etkileyici ve akılda kalıcı tasarımlar için doğru adrestesiniz.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <Link href="/projeler" 
                className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
              >
                Projelerim
              </Link>
              <Link href="/iletisim" 
                className="px-8 py-3 border border-border text-foreground font-medium rounded-full hover:bg-muted transition-colors"
              >
                İletişime Geç
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative h-[500px] w-full glow"
            variants={itemVariants}
          >
            {/* 3D Card Effect */}
            <div className="group perspective w-full h-full">
              <motion.div 
                className="w-full h-full relative preserve-3d transition-all duration-500 hover:rotate-y-10 hover:rotate-x-10"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, rotateX: 10, rotateY: -10 }}
                animate={{ opacity: 1, rotateX: 0, rotateY: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="absolute inset-4 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl transform rotate-3 z-10"></div>
                <div className="absolute inset-4 glassmorphism rounded-2xl transform -rotate-3 z-20"></div>
                <div className="absolute inset-0 flex items-center justify-center z-30">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary mb-6 flex items-center justify-center">
                      <span className="text-4xl text-white">BC</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Betül Çeçen</h3>
                    <p className="text-muted-foreground">Grafik Tasarımcı & İllüstratör</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-0 right-0 mx-auto w-6 h-10 rounded-full border-2 border-muted-foreground flex items-start justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.5 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-primary rounded-full"
          animate={{ 
            y: [0, 12, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop" 
          }}
        />
      </motion.div>
    </section>
  );
} 