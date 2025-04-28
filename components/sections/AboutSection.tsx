'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const skills = [
    'Branding',
    'Logo Tasarımı',
    'İllüstrasyon',
    'UI & UX',
    'Tipografi',
    'Ambalaj Tasarımı',
    'Sosyal Medya',
    'Kurumsal Kimlik',
];

const tools = [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'Adobe InDesign',
    'Figma',
    'Adobe After Effects',
    'Procreate',
    'Cinema 4D',
    'Blender',
];

const AboutSection = () => {
    const ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} id="about" className="py-32 relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    <motion.div
                        className="lg:col-span-3 relative"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <span className="text-gradient-vibrant">Merhaba, Ben </span>
                            <span className="text-gradient-creative">Betül</span>
                        </h2>

                        <div className="space-y-6 mt-8 text-lg">
                            <p>
                                10 yılı aşkın deneyimimle, markaları güçlendiren ve hikayelerini
                                anlatan tasarımlar yaratıyorum. Minimalist yaklaşımım ve modern
                                estetiğimle, her projeye özgün bir bakış açısı getiriyorum.
                            </p>
                            <p>
                                Tasarımlarım, markanızın değerlerini ve vizyonunu yansıtacak şekilde
                                özenle hazırlanıyor. Yaratıcı süreç boyunca işbirliği içinde
                                çalışarak, hedeflerinize ulaşmanızı sağlayacak çözümler sunuyorum.
                            </p>
                            <p>
                                Türkiye ve yurt dışında birçok markayla çalışma fırsatı buldum ve
                                her projeden yeni şeyler öğrendim. Sürekli kendimi geliştirmeye ve
                                tasarım dünyasındaki yenilikleri takip etmeye özen gösteriyorum.
                            </p>
                        </div>

                        <div className="mt-10 flex flex-col md:flex-row gap-8">
                            <div>
                                <h3 className="text-xl font-semibold mb-4">Uzmanlık Alanları</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {skills.map((skill, index) => (
                                        <motion.div
                                            key={skill}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                                            <span>{skill}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-4">Kullandığım Araçlar</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {tools.map((tool, index) => (
                                        <motion.div
                                            key={tool}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: index * 0.05 }}
                                            viewport={{ once: true }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                                            <span>{tool}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-2 relative"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <div className="w-full h-[600px] rounded-xl overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1604881988758-f76ad2f7aac1?q=80&w=1374&auto=format&fit=crop"
                                    alt="Designer at work"
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                            <div className="absolute -top-6 -left-6 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>

                            <motion.div
                                className="absolute -bottom-5 -left-5 bg-card p-6 rounded-lg shadow-lg border border-border max-w-[260px]"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-2xl font-bold mb-2">Deneyim</h3>
                                <p className="text-muted-foreground">
                                    10+ yıl profesyonel tasarım deneyimi
                                </p>
                                <div className="mt-3 flex space-x-1">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <svg
                                            key={star}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="text-primary"
                                        >
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
