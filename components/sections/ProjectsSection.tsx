'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

// Güvenilir görsel kaynakları
const RELIABLE_IMAGES = [
    'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000',
    'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?q=80&w=1000',
    'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=1000',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000',
    'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1000',
    'https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1000',
    'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000',
    'https://images.unsplash.com/photo-1629429407759-01cd3d5930e5?q=80&w=1000',
];

const projects = [
    {
        id: 'branding-project',
        title: 'Modern Marka Kimliği',
        category: 'Branding / Logo',
        image: RELIABLE_IMAGES[0],
        color: 'bg-primary',
    },
    {
        id: 'poster-design',
        title: 'Minimalist Poster Serisi',
        category: 'Grafik Tasarım / İllüstrasyon',
        image: RELIABLE_IMAGES[5],
        color: 'bg-secondary',
    },
    {
        id: 'packaging',
        title: 'Ürün Ambalaj Tasarımı',
        category: 'Ambalaj / Grafik',
        image: RELIABLE_IMAGES[2],
        color: 'bg-accent',
    },
];

const ProjectsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1.05]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);

    return (
        <section ref={sectionRef} className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-gradient-creative">Seçkin</span>{' '}
                        <span className="text-gradient">Projelerim</span>
                    </h2>
                    <p className="text-muted-foreground max-w-xl text-lg">
                        Görsel kimlik, ambalaj tasarımı ve dijital ürün tasarımı alanlarında öne
                        çıkan çalışmalarım.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.43, 0.13, 0.23, 0.96],
                                delay: index * 0.15,
                            }}
                            viewport={{ once: true, margin: '-100px' }}
                            whileHover={{ y: -15, scale: 1.02 }}
                            className="group perspective"
                            style={{
                                transformStyle: 'preserve-3d',
                            }}
                        >
                            <Link href={`/projeler/${project.id}`}>
                                <div className="relative overflow-hidden rounded-2xl transform-gpu group-hover:rotate-y-3 transition-transform duration-700">
                                    <div
                                        className={`absolute inset-0 ${project.color} mix-blend-multiply opacity-0 group-hover:opacity-40 transition-opacity duration-500`}
                                    ></div>
                                    <div className="w-full h-[450px] overflow-hidden">
                                        <motion.div
                                            className="w-full h-full relative"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.7 }}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                style={{ objectFit: 'cover' }}
                                                className="transition-transform duration-700"
                                            />
                                        </motion.div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-background to-transparent">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                                            viewport={{ once: true }}
                                        >
                                            <p className="text-sm font-medium text-primary mb-3 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                                {project.category}
                                            </p>
                                            <h3 className="text-2xl font-bold transform group-hover:translate-y-0 transition-all duration-300">
                                                {project.title}
                                            </h3>
                                        </motion.div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-24 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                    viewport={{ once: true }}
                >
                    <Link href="/projeler" className="inline-block">
                        <motion.span
                            className="relative overflow-hidden group inline-flex items-center px-8 py-4 bg-primary/10 hover:bg-primary/20 backdrop-blur-sm rounded-full transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="text-lg font-medium">Tüm Projeleri Görüntüle</span>
                            <span className="ml-2 text-xl transform group-hover:translate-x-1 transition-transform duration-300">
                                →
                            </span>
                        </motion.span>
                    </Link>
                </motion.div>
            </div>

            {/* Danilodemarco.com stil arka plan efektleri */}
            <div className="absolute -left-64 top-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -right-64 bottom-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-3xl"></div>
            <motion.div
                className="absolute right-20 top-20 w-32 h-32 rounded-full border border-primary/20"
                style={{
                    scale,
                    rotate,
                }}
            ></motion.div>
            <motion.div
                className="absolute left-20 bottom-20 w-24 h-24 rounded-full border border-accent/20"
                style={{
                    scale: useTransform(scrollYProgress, [0, 0.5], [1.1, 0.9]),
                    rotate: useTransform(scrollYProgress, [0, 1], [2, -2]),
                }}
            ></motion.div>
        </section>
    );
};

export default ProjectsSection;
