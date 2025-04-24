"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdArrowBack, MdCalendarToday, MdPerson, MdCategory } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectFade, Autoplay } from 'swiper/modules';

// Swiper stillerini import et
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

// Fancybox'ı etkinleştir (görsele tıklandığında büyütmek için)
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

interface Project {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  client: string;
  year: string;
  category: string;
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
  slug: string;
  color: string;
}

interface ProjectDetailClientProps {
  project: Project;
  allProjects: Project[];
}

export default function ProjectDetailClient({ project, allProjects }: ProjectDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Fancybox'ı etkinleştir
  useEffect(() => {
    Fancybox.bind("[data-fancybox]");
    
    return () => {
      Fancybox.unbind("[data-fancybox]");
      Fancybox.close();
    };
  }, []);
  
  return (
    <main className="min-h-screen pt-20 pb-24 relative overflow-hidden">
      {/* Arka plan efekti */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 -z-10`}></div>
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="grid grid-cols-12 h-full w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-primary/5 h-full"></div>
          ))}
        </div>
      </div>
      
      <div className="container px-4 mx-auto">
        {/* Proje başlığı ve geri dönüş linki */}
        <div className="max-w-4xl mx-auto mb-16">
          <Link
            href="/projeler"
            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <MdArrowBack className="text-lg" /> Tüm Projelere Dön
          </Link>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {project.title}
          </motion.h1>
        </div>
        
        {/* Slider ve Proje Detayları */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Slider Bölümü */}
          <motion.div 
            className="lg:col-span-8 glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="glassmorphism rounded-2xl p-2 h-full">
              <Swiper
                modules={[Pagination, Navigation, EffectFade, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation
                effect="fade"
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                }}
                onSlideChange={(swiper) => setActiveImageIndex(swiper.activeIndex)}
                className="rounded-xl overflow-hidden"
              >
                {project.images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <a 
                      href={image.src} 
                      data-fancybox="gallery"
                      data-caption={image.caption}
                      className="block relative aspect-video overflow-hidden bg-muted cursor-pointer"
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground z-10">
                        <p>Görsel {index + 1}</p>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                        <p className="font-medium text-lg">Büyütmek için tıklayın</p>
                      </div>
                    </a>
                  </SwiperSlide>
                ))}
              </Swiper>
              
              <div className="mt-4 px-4">
                <p className="text-muted-foreground text-sm">{project.images[activeImageIndex]?.caption}</p>
              </div>
            </div>
          </motion.div>
          
          {/* Proje Detayları */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glassmorphism rounded-2xl p-6 h-full">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">Proje Hakkında</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{project.fullDescription}</p>
                </div>
                
                <hr className="border-border" />
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <MdPerson className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">MÜŞTERİ</h4>
                      <p className="font-medium">{project.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                      <MdCalendarToday className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">YIL</h4>
                      <p className="font-medium">{project.year}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-accent/10 p-2 rounded-full text-accent">
                      <MdCategory className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">KATEGORİ</h4>
                      <p className="font-medium">{project.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Sonraki/Önceki Projeler Bölümü */}
        <div className="max-w-6xl mx-auto">
          <hr className="border-border mb-8" />
          
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <NextPrevProject 
              type="prev" 
              project={project} 
              allProjects={allProjects} 
            />
            <NextPrevProject 
              type="next" 
              project={project} 
              allProjects={allProjects} 
            />
          </div>
        </div>
      </div>
    </main>
  );
}

// Sonraki/Önceki Proje Bileşeni
interface NextPrevProjectProps {
  type: 'next' | 'prev';
  project: Project;
  allProjects: Project[];
}

const NextPrevProject: React.FC<NextPrevProjectProps> = ({ type, project, allProjects }) => {
  // Mevcut projenin indeksini bul
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  
  // Sonraki veya önceki projeyi hesapla
  let targetProject;
  if (type === 'next') {
    targetProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];
  } else {
    targetProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  }
  
  return (
    <Link 
      href={`/projeler/${targetProject.slug}`}
      className={`group flex items-center gap-2 sm:gap-4 my-2 rounded-xl p-4 transition-colors hover:bg-card ${type === 'next' ? 'flex-row' : 'flex-row-reverse'}`}
    >
      <div className={`w-14 h-14 bg-muted rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden`}>
        <div className="text-muted-foreground">Görsel</div>
      </div>
      
      <div className={`${type === 'next' ? 'text-left' : 'text-right'}`}>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
          {type === 'next' ? 'Sonraki Proje' : 'Önceki Proje'}
        </p>
        <h4 className="font-medium group-hover:text-primary transition-colors">
          {targetProject.title}
        </h4>
      </div>
    </Link>
  );
}; 