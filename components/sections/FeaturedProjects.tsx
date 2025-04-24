"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdArrowOutward } from 'react-icons/md';

const projects = [
  {
    id: 1,
    title: 'Marka Kimliği',
    description: 'Yeni bir marka için tam kimlik tasarımı ve uygulama rehberi.',
    image: '/images/project-1.jpg',
    slug: 'marka-kimligi',
    color: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    id: 2,
    title: 'Web Arayüzü',
    description: 'Kullanıcı dostu ve modern bir web sitesi tasarımı.',
    image: '/images/project-2.jpg',
    slug: 'web-arayuzu',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 3,
    title: 'Ambalaj Tasarımı',
    description: 'Ürünleri öne çıkaran benzersiz ambalaj tasarımları.',
    image: '/images/project-3.jpg',
    slug: 'ambalaj-tasarimi',
    color: 'from-amber-500/20 to-orange-500/20',
  },
];

// Öğe varyantları
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function FeaturedProjects() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Arka plan deseni */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-primary/5 h-full"></div>
          ))}
        </div>
      </div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-20"
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <div className="w-8 h-0.5 bg-primary"></div>
              <p className="text-sm font-medium text-primary">PORTFOLYO</p>
              <div className="w-8 h-0.5 bg-primary"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Öne Çıkan <span className="text-gradient">Projeler</span>
            </h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Son dönemde tamamladığım en özel çalışmalarımdan bazıları
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              className="group relative"
              variants={item}
              whileHover={{ y: -10 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity`}></div>
              <div className="glassmorphism h-full relative z-10 p-1">
                <div className="h-48 rounded-xl bg-muted relative overflow-hidden mb-5">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    <p>Görsel</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-5">
                    <Link 
                      href={`/projeler/${project.slug}`}
                      className="text-white text-lg font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Detayları Gör
                    </Link>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-5">{project.description}</p>
                  <Link 
                    href={`/projeler/${project.slug}`}
                    className="inline-flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all"
                  >
                    Daha Fazla <MdArrowOutward className="group-hover:animate-pulse" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Link
            href="/projeler"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors"
          >
            Tüm Projeleri Gör
            <MdArrowOutward className="text-lg" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 