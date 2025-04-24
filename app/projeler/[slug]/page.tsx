'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { MdArrowBack, MdCalendarToday, MdPerson, MdCategory } from 'react-icons/md';
import { motion } from 'framer-motion';
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

// Örnek projeler
const projects = [
    {
        id: 1,
        title: 'Marka Kimliği',
        description: 'Yeni bir marka için tam kimlik tasarımı ve uygulama rehberi.',
        fullDescription: `Müşterimiz için sıfırdan bir marka kimliği oluşturduk. Bu süreçte, markanın değerlerini ve vizyonunu yansıtan benzersiz bir logo, renk paleti ve tipografi sistemi geliştirdik.

Marka kimliği çalışması kapsamında aşağıdaki unsurlar teslim edildi:
- Logo tasarımı (ana logo, alternatif versiyonlar ve favicon)
- Kurumsal renk paleti ve kullanım kuralları
- Tipografi seçimleri ve uygulamaları
- Antetli kağıt, kartvizit ve zarf tasarımları
- Sosyal medya görselleri
- Tam kapsamlı marka uygulama rehberi

Müşteri ile yakın işbirliği içinde çalışarak, her adımda geri bildirimlerini aldık ve vizyonlarını tam olarak yansıtan bir marka kimliği oluşturduk.`,
        client: 'ABC Şirketi',
        year: '2023',
        category: 'Marka Kimliği',
        images: [
            {
                src: '/images/project-1-1.jpg',
                alt: 'Logo tasarımı',
                caption: 'Ana logo tasarımı',
            },
            {
                src: '/images/project-1-2.jpg',
                alt: 'Renk paleti',
                caption: 'Marka renk paleti',
            },
            {
                src: '/images/project-1-3.jpg',
                alt: 'Uygulama örnekleri',
                caption: 'Marka uygulamaları',
            },
        ],
        slug: 'marka-kimligi',
        color: 'from-violet-500/20 to-fuchsia-500/20',
    },
    {
        id: 2,
        title: 'Web Arayüzü',
        description: 'Kullanıcı dostu ve modern bir web sitesi tasarımı.',
        fullDescription: `Modern ve kullanıcı dostu bir web sitesi tasarımı oluşturduk. Responsive tasarım yaklaşımı ile her cihazda mükemmel görüntülenme sağlayan arayüz, kullanıcı deneyimini ön planda tutuyor.

Proje kapsamında gerçekleştirilen çalışmalar:
- Kullanıcı deneyimi (UX) araştırması ve stratejisi
- Tüm sayfaların görsel tasarımı
- Responsive (mobil uyumlu) tasarım
- İçerik organizasyonu
- Kullanılabilirlik testleri
- Geliştirici el kitabı

Sonuç olarak, dönüşüm oranlarını %30 artıran, hızlı ve kullanıcı dostu bir web arayüzü tasarımı teslim ettik.`,
        client: 'XYZ Teknoloji',
        year: '2023',
        category: 'Web Tasarım',
        images: [
            {
                src: '/images/project-2-1.jpg',
                alt: 'Ana sayfa tasarımı',
                caption: 'Web sitesi ana sayfa',
            },
            {
                src: '/images/project-2-2.jpg',
                alt: 'Mobil görünüm',
                caption: 'Responsive mobil tasarım',
            },
            {
                src: '/images/project-2-3.jpg',
                alt: 'İç sayfalar',
                caption: 'İç sayfa tasarımları',
            },
        ],
        slug: 'web-arayuzu',
        color: 'from-cyan-500/20 to-blue-500/20',
    },
    {
        id: 3,
        title: 'Ambalaj Tasarımı',
        description: 'Ürünleri öne çıkaran benzersiz ambalaj tasarımları.',
        fullDescription: `Yenilikçi bir yiyecek markası için raf etkisi yüksek, dikkat çekici ambalaj tasarımları oluşturduk. Marka kimliğini ürünlere taşıyan bu tasarımlar, satış noktalarında fark edilirliği artırdı.

Proje kapsamında gerçekleştirilen çalışmalar:
- Pazar ve rakip analizi
- Farklı ambalaj formatları için tasarımlar
- Üretim uygunluğu için teknik çizimler
- Prototip üretimi ve test
- Baskı takibi ve kalite kontrolü

İlk 6 ay içinde satışlarda %45 artış sağlayan tasarımlar, markanın pazar payını önemli ölçüde artırdı.`,
        client: 'Organik Lezzetler',
        year: '2022',
        category: 'Ambalaj Tasarımı',
        images: [
            {
                src: '/images/project-3-1.jpg',
                alt: 'Ambalaj serisi',
                caption: 'Ürün serisi ambalajları',
            },
            {
                src: '/images/project-3-2.jpg',
                alt: 'Detay görünüm',
                caption: 'Ambalaj detayları',
            },
            {
                src: '/images/project-3-3.jpg',
                alt: 'Raf düzeni',
                caption: 'Satış noktası raf düzeni',
            },
        ],
        slug: 'ambalaj-tasarimi',
        color: 'from-amber-500/20 to-orange-500/20',
    },
    {
        id: 4,
        title: 'Sosyal Medya Kampanyası',
        description: 'Etkileşim oranlarını artıran sosyal medya görsel seti.',
        fullDescription: `Bir kozmetik markası için sosyal medya platformlarında yüksek etkileşim sağlayan görsel içerik stratejisi ve tasarımları oluşturduk.

Kampanya kapsamında gerçekleştirilen çalışmalar:
- Marka kişiliğine uygun görsel dil geliştirme
- Instagram, Facebook ve Pinterest için içerik üretimi
- Story, feed ve reklam görselleri tasarımı
- İçerik takvimi oluşturma
- Performans analizi ve optimizasyon

Kampanya sonucunda takipçi sayısında %60, etkileşimde %80 artış elde edildi.`,
        client: 'Glow Kozmetik',
        year: '2023',
        category: 'Sosyal Medya',
        images: [
            {
                src: '/images/project-4-1.jpg',
                alt: 'Instagram feed',
                caption: 'Instagram içerikleri',
            },
            {
                src: '/images/project-4-2.jpg',
                alt: 'Stories',
                caption: 'Instagram hikayeleri',
            },
            {
                src: '/images/project-4-3.jpg',
                alt: 'Reklamlar',
                caption: 'Sosyal medya reklamları',
            },
        ],
        slug: 'sosyal-medya-kampanyasi',
        color: 'from-pink-500/20 to-rose-500/20',
    },
    {
        id: 5,
        title: 'Kurumsal Katalog',
        description: 'Şirketin ürünlerini tanıtan modern tasarımlı katalog.',
        fullDescription: `Endüstriyel ekipman üreticisi için ürün kataloğu tasarladık. Teknik detaylar ve ürün görselleri, kolay anlaşılabilir bir düzende sunularak satış süreçlerini destekleyecek şekilde tasarlandı.

Proje kapsamında gerçekleştirilen çalışmalar:
- İçerik stratejisi ve organizasyonu
- Katalog grid sisteminin oluşturulması
- Ürün fotoğraflarının düzenlenmesi
- İnfografik ve şema tasarımları
- Baskı süreci yönetimi

Katalog, şirketin satış ekibi için güçlü bir araç haline geldi ve ilk yılında 250'den fazla yeni müşteri kazanılmasına katkı sağladı.`,
        client: 'Teknik Makina A.Ş.',
        year: '2022',
        category: 'Baskı',
        images: [
            {
                src: '/images/project-5-1.jpg',
                alt: 'Katalog kapağı',
                caption: 'Katalog kapak tasarımı',
            },
            {
                src: '/images/project-5-2.jpg',
                alt: 'İç sayfalar',
                caption: 'Katalog iç sayfa düzeni',
            },
            {
                src: '/images/project-5-3.jpg',
                alt: 'Ürün detayları',
                caption: 'Ürün sayfası detayları',
            },
        ],
        slug: 'kurumsal-katalog',
        color: 'from-emerald-500/20 to-green-500/20',
    },
    {
        id: 6,
        title: 'Logo Yenileme',
        description: 'Köklü bir markanın modern logo yenileme çalışması.',
        fullDescription: `30 yıllık geçmişe sahip bir markanın değerlerini koruyarak modern bir görünüme kavuşturulması için logo yenileme çalışması gerçekleştirdik.

Proje kapsamında gerçekleştirilen çalışmalar:
- Marka tarihçesi ve değerleri analizi
- Alternatif tasarım konseptleri
- Logo varyasyonları ve uygulama kuralları
- Renk paleti ve tipografi güncellemesi
- Yeni logo lansmanı için materyal hazırlığı

Yenilenen logo, markanın geleneksel müşterilerini korurken yeni nesil tüketicilere de hitap etmesini sağladı.`,
        client: 'Taşçıoğlu Mobilya',
        year: '2023',
        category: 'Marka Kimliği',
        images: [
            {
                src: '/images/project-6-1.jpg',
                alt: 'Eski ve yeni logo',
                caption: 'Eski ve yeni logo karşılaştırması',
            },
            {
                src: '/images/project-6-2.jpg',
                alt: 'Logo uygulamaları',
                caption: 'Farklı ortamlarda logo uygulamaları',
            },
            {
                src: '/images/project-6-3.jpg',
                alt: 'Kurumsal kimlik',
                caption: 'Yeni kurumsal kimlik uygulamaları',
            },
        ],
        slug: 'logo-yenileme',
        color: 'from-blue-500/20 to-indigo-500/20',
    },
];

export default function ProjectDetail({ params }: { params: { slug: string } }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Dinamik parametre için
    const { slug } = params;
    const project = projects.find(p => p.slug === slug);

    // Fancybox'ı etkinleştir
    useEffect(() => {
        Fancybox.bind('[data-fancybox]');

        return () => {
            Fancybox.unbind('[data-fancybox]');
            Fancybox.close();
        };
    }, []);

    // Proje bulunamazsa hata mesajı göster
    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Proje Bulunamadı</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                        Aradığınız proje mevcut değil veya kaldırılmış olabilir.
                    </p>
                    <Link
                        href="/projeler"
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                    >
                        <MdArrowBack /> Tüm Projelere Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen pt-20 pb-24 relative overflow-hidden">
            {/* Arka plan efekti */}
            <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 -z-10`}
            ></div>
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
                                onSlideChange={swiper => setActiveImageIndex(swiper.activeIndex)}
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
                                                <p className="font-medium text-lg">
                                                    Büyütmek için tıklayın
                                                </p>
                                            </div>
                                        </a>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <div className="mt-4 px-4">
                                <p className="text-muted-foreground text-sm">
                                    {project.images[activeImageIndex]?.caption}
                                </p>
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
                                    <p className="text-muted-foreground whitespace-pre-line">
                                        {project.fullDescription}
                                    </p>
                                </div>

                                <hr className="border-border" />

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full text-primary">
                                            <MdPerson className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                MÜŞTERİ
                                            </h4>
                                            <p className="font-medium">{project.client}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-secondary/10 p-2 rounded-full text-secondary">
                                            <MdCalendarToday className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                YIL
                                            </h4>
                                            <p className="font-medium">{project.year}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="bg-accent/10 p-2 rounded-full text-accent">
                                            <MdCategory className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                                                KATEGORİ
                                            </h4>
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
                        <NextPrevProject type="prev" project={project} allProjects={projects} />
                        <NextPrevProject type="next" project={project} allProjects={projects} />
                    </div>
                </div>
            </div>
        </main>
    );
}

// Sonraki/Önceki Proje Bileşeni
interface NextPrevProjectProps {
    type: 'next' | 'prev';
    project: (typeof projects)[0];
    allProjects: typeof projects;
}

const NextPrevProject: React.FC<NextPrevProjectProps> = ({ type, project, allProjects }) => {
    // Mevcut projenin indeksini bul
    const currentIndex = allProjects.findIndex(p => p.id === project.id);

    // Sonraki veya önceki projeyi hesapla
    let targetProject;
    if (type === 'next') {
        targetProject =
            currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];
    } else {
        targetProject =
            currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
    }

    return (
        <Link
            href={`/projeler/${targetProject.slug}`}
            className={`group flex items-center gap-2 sm:gap-4 my-2 rounded-xl p-4 transition-colors hover:bg-card ${
                type === 'next' ? 'flex-row' : 'flex-row-reverse'
            }`}
        >
            <div
                className={`w-14 h-14 bg-muted rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden`}
            >
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
