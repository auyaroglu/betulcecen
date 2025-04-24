"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MdArrowOutward } from 'react-icons/md';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

// Örnek proje verileri
const allProjects = [
  {
    id: 1,
    title: 'Marka Kimliği',
    description: 'Yeni bir marka için tam kimlik tasarımı ve uygulama rehberi.',
    image: '/images/project-1.jpg',
    category: 'marka',
    slug: 'marka-kimligi',
    color: 'from-violet-500/20 to-fuchsia-500/20',
  },
  {
    id: 2,
    title: 'Web Arayüzü',
    description: 'Kullanıcı dostu ve modern bir web sitesi tasarımı.',
    image: '/images/project-2.jpg',
    category: 'web',
    slug: 'web-arayuzu',
    color: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 3,
    title: 'Ambalaj Tasarımı',
    description: 'Ürünleri öne çıkaran benzersiz ambalaj tasarımları.',
    image: '/images/project-3.jpg',
    category: 'ambalaj',
    slug: 'ambalaj-tasarimi',
    color: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 4,
    title: 'Sosyal Medya Kampanyası',
    description: 'Etkileşim oranlarını artıran sosyal medya görsel seti.',
    image: '/images/project-4.jpg',
    category: 'sosyal',
    slug: 'sosyal-medya-kampanyasi',
    color: 'from-pink-500/20 to-rose-500/20',
  },
  {
    id: 5,
    title: 'Kurumsal Katalog',
    description: 'Şirketin ürünlerini tanıtan modern tasarımlı katalog.',
    image: '/images/project-5.jpg',
    category: 'baski',
    slug: 'kurumsal-katalog',
    color: 'from-emerald-500/20 to-green-500/20',
  },
  {
    id: 6,
    title: 'Logo Yenileme',
    description: 'Köklü bir markanın modern logo yenileme çalışması.',
    image: '/images/project-6.jpg',
    category: 'marka',
    slug: 'logo-yenileme',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    id: 7,
    title: 'E-ticaret Tasarımı',
    description: 'Kullanıcı deneyimi odaklı online alışveriş sitesi.',
    image: '/images/project-7.jpg',
    category: 'web',
    slug: 'e-ticaret-tasarimi',
    color: 'from-teal-500/20 to-cyan-500/20',
  },
  {
    id: 8,
    title: 'Mobil Uygulama UI',
    description: 'Kullanıcı dostu bir mobil uygulama arayüzü tasarımı.',
    image: '/images/project-8.jpg',
    category: 'web',
    slug: 'mobil-uygulama-ui',
    color: 'from-purple-500/20 to-violet-500/20',
  },
  {
    id: 9,
    title: 'Banner Tasarımları',
    description: 'Yüksek tıklama oranı sağlayan web banner setleri.',
    image: '/images/project-9.jpg',
    category: 'sosyal',
    slug: 'banner-tasarimlari',
    color: 'from-yellow-500/20 to-amber-500/20',
  },
];

// Kategori filtreleri
const categories = [
  { id: 'tumu', name: 'Tümü' },
  { id: 'marka', name: 'Marka Kimliği' },
  { id: 'web', name: 'Web Tasarım' },
  { id: 'ambalaj', name: 'Ambalaj' },
  { id: 'sosyal', name: 'Sosyal Medya' },
  { id: 'baski', name: 'Baskı' },
];

// Öğe varyantları
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
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

const ITEMS_PER_PAGE = 6;

export default function ProjectsGrid() {
  const [activeFilter, setActiveFilter] = useState('tumu');
  const [filteredProjects, setFilteredProjects] = useState(allProjects);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProjects, setPaginatedProjects] = useState<typeof allProjects>([]);
  const [totalPages, setTotalPages] = useState(1);
  
  // Kategori değiştiğinde projeleri filtrele
  const handleFilterChange = (categoryId: string) => {
    setActiveFilter(categoryId);
    setCurrentPage(1); // Kategori değiştiğinde ilk sayfaya dön
    
    if (categoryId === 'tumu') {
      setFilteredProjects(allProjects);
    } else {
      const filtered = allProjects.filter(project => project.category === categoryId);
      setFilteredProjects(filtered);
    }
  };

  // Sayfa değiştirme işlevi
  const handlePageChange = (page: number) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setCurrentPage(page);
  };

  // Filtrelenen projelere göre sayfalama
  useEffect(() => {
    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    setTotalPages(totalPages);
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setPaginatedProjects(filteredProjects.slice(startIndex, endIndex));
  }, [filteredProjects, currentPage]);
  
  return (
    <div className="space-y-12">
      {/* Kategori Filtreleri */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => handleFilterChange(category.id)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === category.id 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Projeler Listesi */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={container}
        initial="hidden"
        animate="show"
        key={`${activeFilter}-${currentPage}`} // Filtreleme veya sayfa değiştiğinde animasyonu yeniden tetikle
      >
        {paginatedProjects.map(project => (
          <motion.div 
            key={project.id}
            className="group relative"
            variants={item}
            whileHover={{ y: -10 }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition-opacity`}></div>
            <div className="glassmorphism h-full relative z-10 p-1">
              <div className="h-48 md:h-56 rounded-xl bg-muted relative overflow-hidden mb-5">
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
      
      {/* Proje bulunamadı mesajı */}
      {filteredProjects.length === 0 && (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold mb-2">Bu kategoride proje bulunamadı</h3>
          <p className="text-muted-foreground mb-4">
            Lütfen başka bir kategori seçin veya tüm projeleri görüntüleyin.
          </p>
          <button
            onClick={() => handleFilterChange('tumu')}
            className="px-5 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
          >
            Tüm Projeleri Göster
          </button>
        </motion.div>
      )}
      
      {/* Sayfalama */}
      {filteredProjects.length > ITEMS_PER_PAGE && (
        <motion.div 
          className="flex justify-center items-center gap-2 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-foreground disabled:opacity-50 disabled:pointer-events-none hover:bg-muted/80 transition-colors"
            aria-label="Önceki sayfa"
          >
            <IoChevronBackOutline className="w-5 h-5" />
          </button>
          
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            // 5'ten fazla sayfa varsa sadece mevcut sayfa etrafındakileri göster
            if (
              totalPages <= 5 ||
              pageNumber === 1 ||
              pageNumber === totalPages ||
              (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
            ) {
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                    currentPage === pageNumber
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            }
            
            // Çok sayfa varsa arada ... göster
            if (
              (pageNumber === 2 && currentPage > 3) ||
              (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
            ) {
              return <span key={pageNumber} className="px-1">...</span>;
            }
            
            return null;
          })}
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-muted text-foreground disabled:opacity-50 disabled:pointer-events-none hover:bg-muted/80 transition-colors"
            aria-label="Sonraki sayfa"
          >
            <IoChevronForwardOutline className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
} 