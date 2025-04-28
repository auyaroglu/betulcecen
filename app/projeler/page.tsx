'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import Image from 'next/image';

// Güvenilir görsel kaynakları
const RELIABLE_IMAGES = [
    'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000',
    'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1000',
    'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1000',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000',
    'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000',
    'https://images.unsplash.com/photo-1629429407759-01cd3d5930e5?q=80&w=1000',
    'https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1000',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000',
];

// Kategoriler
const categories = ['Tümü', 'Branding', 'Ambalaj', 'Grafik Tasarım', 'Web Tasarım', 'UI/UX'];

// Güncellenmiş proje verileri
const projects = [
    {
        id: 'branding-project',
        title: 'Modern Marka Kimliği',
        category: 'Branding',
        image: RELIABLE_IMAGES[0],
        description:
            'Minimalist ve etkili bir marka kimliği tasarımı ile müşterinin vizyonunu hayata geçirdim.',
    },
    {
        id: 'poster-design',
        title: 'Minimalist Poster Serisi',
        category: 'Grafik Tasarım',
        image: RELIABLE_IMAGES[1],
        description: 'Sanat ve tipografiyi birleştiren modern poster serisi.',
    },
    {
        id: 'packaging',
        title: 'Ürün Ambalaj Tasarımı',
        category: 'Ambalaj',
        image: RELIABLE_IMAGES[2],
        description: 'Organik ürünler için sürdürülebilir ve çevre dostu ambalaj tasarımı projesi.',
    },
    {
        id: 'website-design',
        title: 'E-Ticaret Web Sitesi',
        category: 'Web Tasarım',
        image: RELIABLE_IMAGES[3],
        description: 'Kullanıcı deneyimini ön planda tutan modern e-ticaret platformu tasarımı.',
    },
    {
        id: 'social-media',
        title: 'Sosyal Medya Kampanyası',
        category: 'Dijital',
        image: RELIABLE_IMAGES[4],
        description: 'Marka bilinirliğini artırmak için stratejik sosyal medya içerik tasarımları.',
    },
    {
        id: 'corporate-identity',
        title: 'Kurumsal Kimlik',
        category: 'Branding',
        image: RELIABLE_IMAGES[5],
        description:
            'Tutarlı ve profesyonel bir kurumsal kimlik tasarımı ile markanın değerlerini yansıttık.',
    },
    {
        id: 'magazine-layout',
        title: 'Dergi Tasarımı',
        category: 'Grafik Tasarım',
        image: RELIABLE_IMAGES[6],
        description: 'Minimalist yaklaşımla oluşturulmuş modern dergi tasarımı projesi.',
    },
    {
        id: 'ui-design',
        title: 'Mobil Uygulama Arayüzü',
        category: 'UI/UX',
        image: RELIABLE_IMAGES[7],
        description: 'Kullanıcı odaklı, sezgisel arayüz tasarımı.',
    },
    {
        id: 'packaging-premium',
        title: 'Premium Ürün Ambalajı',
        category: 'Ambalaj',
        image: RELIABLE_IMAGES[8],
        description: 'Lüks ürün serisi için özel tasarlanmış premium ambalaj koleksiyonu.',
    },
];

export default function ProjectsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState('Tümü');
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [cursorVariant, setCursorVariant] = useState('default');
    const [isReducedMotion, setIsReducedMotion] = useState(false);

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

    // Kategori filtreleme
    useEffect(() => {
        if (activeCategory === 'Tümü') {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(projects.filter(project => project.category === activeCategory));
        }
    }, [activeCategory]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Scroll efektleri
    const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const staggerDelay = 0.1;

    // Yatay kaydırma efekti
    const horizontalScroll = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '-50%']);

    return (
        <div ref={containerRef} className="min-h-screen bg-background overflow-hidden">
            <Navbar />

            {!isReducedMotion && (
                <motion.div
                    className="custom-cursor z-50 fixed top-0 left-0 w-8 h-8 rounded-full bg-primary pointer-events-none mix-blend-difference"
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

            <div className="pt-32 pb-20">
                {/* Başlık Bölümü */}
                <motion.div
                    className="container mx-auto px-6 mb-20"
                    style={{ y: headerY, opacity: headerOpacity }}
                >
                    <motion.div
                        className="mb-16 max-w-3xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold mb-6">
                            <span className="text-outline">Proje</span>{' '}
                            <span className="text-gradient">Portfolyo</span>
                        </h1>
                        <p className="text-xl text-muted-foreground">
                            10 yılı aşkın deneyimimle gerçekleştirdiğim seçkin projeler. Her proje
                            benzersiz bir hikaye anlatır.
                        </p>
                    </motion.div>

                    {/* Kategori Filtreleme */}
                    <motion.div
                        className="flex flex-wrap gap-4 mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                className={`px-6 py-2 rounded-full border ${
                                    activeCategory === category
                                        ? 'border-primary bg-primary/10 text-primary'
                                        : 'border-border text-foreground/70 hover:text-primary hover:border-primary/30'
                                } transition-all duration-300`}
                                onClick={() => setActiveCategory(category)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Ana Projeler Bölümü */}
                <div className="mb-32">
                    {/* Büyük İlk Proje */}
                    <motion.div
                        className="container mx-auto px-6 mb-24"
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="order-2 md:order-1">
                                <motion.span
                                    className="inline-block text-primary mb-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    {filteredProjects[0]?.category}
                                </motion.span>
                                <motion.h2
                                    className="text-3xl md:text-5xl font-bold mb-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.6 }}
                                >
                                    {filteredProjects[0]?.title}
                                </motion.h2>
                                <motion.p
                                    className="text-lg text-muted-foreground mb-8"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                >
                                    {filteredProjects[0]?.description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                >
                                    <Link
                                        href={`/projeler/${filteredProjects[0]?.id}`}
                                        className="inline-flex items-center px-6 py-3 bg-primary text-background rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
                                        onMouseEnter={() => setCursorVariant('hover')}
                                        onMouseLeave={() => setCursorVariant('default')}
                                    >
                                        Projeyi İncele
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5 ml-2"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </div>
                            <motion.div
                                className="order-1 md:order-2 relative overflow-hidden rounded-2xl"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                whileHover={{ scale: 1.03 }}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <div className="w-full aspect-[4/3] relative">
                                    <Image
                                        src={filteredProjects[0]?.image || RELIABLE_IMAGES[0]}
                                        alt={filteredProjects[0]?.title || 'Proje'}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        className="rounded-2xl"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Yatay Kayan Galeri */}
                    <div className="relative overflow-hidden py-20">
                        <motion.div className="flex gap-6 md:gap-8" style={{ x: horizontalScroll }}>
                            {filteredProjects.slice(1).map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    className="min-w-[280px] md:min-w-[400px] h-[400px] md:h-[500px] relative rounded-xl overflow-hidden"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * staggerDelay }}
                                    viewport={{ once: true, margin: '-100px' }}
                                    whileHover={{ y: -10 }}
                                    onMouseEnter={() => setCursorVariant('hover')}
                                    onMouseLeave={() => setCursorVariant('default')}
                                >
                                    <Link href={`/projeler/${project.id}`}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className="transition-transform duration-700 hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                            <motion.p
                                                className="text-primary text-sm font-medium mb-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.1 }}
                                            >
                                                {project.category}
                                            </motion.p>
                                            <motion.h3
                                                className="text-2xl font-bold text-white mb-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.2 }}
                                            >
                                                {project.title}
                                            </motion.h3>
                                            <motion.p
                                                className="text-white/80"
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, delay: 0.3 }}
                                            >
                                                {project.description}
                                            </motion.p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* 3D Grid Galeri */}
                <div className="container mx-auto px-6 mb-20">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-16 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="text-outline">Farklı</span>{' '}
                        <span className="text-gradient">Perspektifler</span>
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={`grid-${project.id}`}
                                className="group perspective"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.02 }}
                                onMouseEnter={() => setCursorVariant('hover')}
                                onMouseLeave={() => setCursorVariant('default')}
                            >
                                <Link href={`/projeler/${project.id}`}>
                                    <div className="relative overflow-hidden rounded-xl h-[350px] transform-gpu group-hover:rotate-y-2 group-hover:rotate-x-2 transition-transform duration-500">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            style={{ objectFit: 'cover' }}
                                            className="transition-transform duration-700 group-hover:scale-105"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent flex items-end p-6">
                                            <div>
                                                <p className="text-primary font-medium mb-2 transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                    {project.category}
                                                </p>
                                                <h3 className="text-xl font-bold text-white transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
