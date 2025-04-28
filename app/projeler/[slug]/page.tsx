'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Örnek proje verileri
const projects = [
    {
        id: 'branding-project',
        title: 'Modern Marka Kimliği',
        client: 'Sunrise Organics',
        date: '2023',
        category: 'Branding / Logo',
        thumbnail:
            'https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1374&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1528&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1374&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1634986666676-ec9f89163b6f?q=80&w=1964&auto=format&fit=crop',
        ],
        description:
            'Sunrise Organics için geliştirilen marka kimliği projesi, şirketin organik ürünler alanındaki misyonunu yansıtacak şekilde tasarlandı. Doğal renkler, sürdürülebilirlik ve sadelik konsepti etrafında oluşturulan marka, şirketin değerlerini başarıyla iletmektedir.',
        challenge:
            'Organik ürünlerin tazeliğini ve doğallığını vurgularken, aynı zamanda modern ve çağdaş bir görünüm elde etmek en büyük zorluklardan biriydi. Markanın hem geleneksel organik tüketicilere hem de yeni nesil bilinçli alışveriş yapanlara hitap etmesi gerekiyordu.',
        solution:
            'Doğadan ilham alan yumuşak formlar ve toprak tonları kullanarak, ürünlerin doğallığını vurgulayan ancak modern bir estetikle tasarlanmış bir marka kimliği oluşturdum. Logo, tipografi ve renk paleti, hem ambalajlarda hem de dijital platformlarda tutarlı bir görünüm sağlayacak şekilde belirlendi.',
    },
    {
        id: 'poster-design',
        title: 'Minimalist Poster Serisi',
        client: 'Sanat Festivali',
        date: '2022',
        category: 'Grafik Tasarım / İllüstrasyon',
        thumbnail:
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1528&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1528&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1456518563096-0ff5ee08204e?q=80&w=1374&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=1470&auto=format&fit=crop',
        ],
        description:
            'Yıllık Sanat Festivali için tasarlanan bu minimalist poster serisi, etkinliğin avant-garde ruhunu yansıtacak şekilde tasarlandı. Geometrik formlar, cesur tipografi ve sınırlı renk paleti kullanılarak festivalin farklı bölümlerini temsil eden beş ayrı poster hazırlandı.',
        challenge:
            'Sanat festivalinin çok çeşitli sanat formlarını (tiyatro, müzik, görsel sanatlar, dans ve sinema) tek bir tutarlı görsel dil ile temsil etmek gerekiyordu. Her poster benzersiz olmalı ancak bir seri olarak da tanınabilir olmalıydı.',
        solution:
            'Her sanat formunu temsil eden soyut geometrik kompozisyonlar oluşturarak bütünlüğü sağladım. Tutarlı tipografi ve renk şeması kullanarak serinin bir parçası olduğunu vurguladım. Minimal yaklaşım sayesinde her poster etkileyici ve akılda kalıcı oldu.',
    },
    {
        id: 'packaging',
        title: 'Ürün Ambalaj Tasarımı',
        client: 'EcoBio Kozmetik',
        date: '2023',
        category: 'Ambalaj / Grafik',
        thumbnail:
            'https://images.unsplash.com/photo-1635405446899-63900fea48f2?ixlib=rb-4.0.3&q=80&w=1528&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1635405446899-63900fea48f2?ixlib=rb-4.0.3&q=80&w=1528&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556229182-d11de5b29935?q=80&w=1528&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1556638318-3a4de38be85e?q=80&w=1557&auto=format&fit=crop',
        ],
        description:
            'EcoBio Kozmetik markası için geliştirilen bu ambalaj tasarımı projesi, şirketin ekolojik değerlerini ve doğal içerikli ürünlerini ön plana çıkaracak şekilde tasarlandı. Geri dönüştürülebilir malzemeler ve minimal baskı teknikleri kullanılarak sürdürülebilirlik ilkesi her aşamada uygulandı.',
        challenge:
            'Hem estetik açıdan çekici hem de sürdürülebilir ambalajlar tasarlarken, markanın premium konumlandırmasından ödün vermemek gerekiyordu. Ayrıca, çeşitli ürün kategorileri arasında tutarlılık sağlarken her ürünün kendi karakterini koruması önemliydi.',
        solution:
            'Geri dönüştürülmüş karton, cam ve biyo-bazlı plastik malzemeler kullanarak lüks hissi veren minimal bir tasarım oluşturdum. Bitki illüstrasyonları ve şeffaf etiketler ile ürünlerin doğallığını vurguladım. Renk kodlaması sistemi sayesinde farklı ürün kategorileri kolayca ayırt edilebilir hale geldi.',
    },
    {
        id: 'website-design',
        title: 'E-Ticaret Web Sitesi',
        client: 'ModaVista',
        date: '2022',
        category: 'Web Tasarım / UI/UX',
        thumbnail:
            'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1528&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1528&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?q=80&w=1470&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1470&auto=format&fit=crop',
        ],
        description:
            'ModaVista için tasarlanan e-ticaret platformu, kullanıcı deneyimini ön planda tutarken markanın lüks konumlandırmasını da yansıtacak şekilde tasarlandı. Minimalist arayüz, gelişmiş filtreleme seçenekleri ve kişiselleştirilmiş öneriler sunan site, dönüşüm oranlarında %40 artış sağladı.',
        challenge:
            'Geniş ürün yelpazesini etkili bir şekilde sergilemek ve kullanıcıların aradıklarını kolayca bulabilmelerini sağlamak gerekiyordu. Ayrıca, mobil alışveriş deneyimini optimize ederek her cihazda mükemmel performans sunmak önemliydi.',
        solution:
            'İnce detaylara odaklanan bir tasarım yaklaşımı benimseyerek, kullanıcı akışını kolaylaştıran intuitif navigasyon sistemi geliştirdim. Görsel odaklı bir düzen ile ürünleri ön plana çıkardım ve tüm cihazlarda tutarlı bir deneyim sağlayan responsive tasarım uyguladım.',
    },
    {
        id: 'social-media',
        title: 'Sosyal Medya Kampanyası',
        client: 'NutriBoost',
        date: '2023',
        category: 'Dijital / Sosyal Medya',
        thumbnail:
            'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1374&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1374&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1579869847557-1f67382cc158?q=80&w=1534&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1560439514-4e9645039924?q=80&w=1470&auto=format&fit=crop',
        ],
        description:
            'NutriBoost sağlıklı içecek markası için geliştirilen sosyal medya kampanyası, markanın genç ve dinamik hedef kitlesine ulaşmak için Instagram ve TikTok platformlarına odaklandı. Canlı renkler, enerjik tipografi ve yüksek kaliteli ürün fotoğrafları ile marka bilinirliğini artırmak amaçlandı.',
        challenge:
            'Rekabetçi sağlıklı içecek pazarında öne çıkmak ve Z kuşağı tüketicilerin dikkatini çekmek için özgün ve paylaşılabilir içerikler oluşturmak gerekiyordu. Aynı zamanda, markanın sağlık odaklı mesajını eğlenceli bir şekilde iletmek önemliydi.',
        solution:
            'Kısa, dinamik video içerikleri ve etkileşimli hikayeler tasarlayarak platformun doğal akışına uyum sağlayan bir strateji geliştirdim. Influencer işbirlikleri için tutarlı görsel yönergeler oluşturarak kampanyanın bütünlüğünü korudum. Kampanya sonucunda takipçi sayısında %75 artış ve etkileşim oranlarında %120 artış elde edildi.',
    },
    {
        id: 'corporate-identity',
        title: 'Kurumsal Kimlik',
        client: 'Horizon Technologies',
        date: '2022',
        category: 'Branding / Kurumsal',
        thumbnail:
            'https://images.unsplash.com/photo-1634986666676-ec9f89163b6f?q=80&w=1964&auto=format&fit=crop',
        images: [
            'https://images.unsplash.com/photo-1634986666676-ec9f89163b6f?q=80&w=1964&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600132806608-231446b2e7af?q=80&w=1374&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540866225557-9e4214f0e694?q=80&w=1414&auto=format&fit=crop',
        ],
        description:
            'Teknoloji şirketi Horizon için geliştirilen kurumsal kimlik projesi, firmanın yenilikçi ve ilerici değerlerini yansıtacak şekilde tasarlandı. Logo, kartvizit, antetli kağıt, dijital varlıklar ve ofis malzemeleri dahil olmak üzere tüm kurumsal kimlik elemanları uyumlu bir şekilde yeniden tasarlandı.',
        challenge:
            'Teknoloji sektöründeki hızlı değişime ayak uydurabilen, zamanın ötesinde bir kimlik yaratmak gerekiyordu. Ayrıca, şirketin farklı bölümlerini (yazılım, donanım, AR/VR) temsil edebilecek esnek bir sistem oluşturmak önemliydi.',
        solution:
            'Modüler bir tasarım sistemi geliştirerek farklı iş birimleri için uyarlanabilir ancak tutarlı bir görsel dil oluşturdum. Geometrik formlar ve dijital gradyanlar kullanarak teknolojik ilerlemeyi simgeleyen modern bir kimlik yarattım. Kapsamlı bir marka kılavuzu ile uygulamanın tutarlılığını garantiledim.',
    },
];

export default function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = React.use(params);
    const { slug } = resolvedParams;
    const project = projects.find(p => p.id === slug);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

    if (!project) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Navbar />
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Proje Bulunamadı</h1>
                    <p className="text-muted-foreground mb-8">
                        Aradığınız proje mevcut değil veya kaldırılmış olabilir.
                    </p>
                    <Link
                        href="/projeler"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg"
                    >
                        Tüm Projelere Dön
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="min-h-screen bg-background relative">
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                        >
                            <span className="text-primary font-medium">{project.category}</span>
                            <h1 className="text-4xl md:text-6xl font-bold">{project.title}</h1>

                            <div className="grid grid-cols-2 gap-8 text-muted-foreground pt-4">
                                <div>
                                    <p className="text-sm font-medium text-foreground">MÜŞTERİ</p>
                                    <p>{project.client}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">TARİH</p>
                                    <p>{project.date}</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <p className="text-lg text-muted-foreground">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative h-[500px]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.43, 0.13, 0.23, 0.96],
                                delay: 0.2,
                            }}
                        >
                            <img
                                src={project.thumbnail}
                                alt={project.title}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </motion.div>
                    </div>

                    <div className="mb-24">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold mb-6">Zorluk</h2>
                                <p className="text-muted-foreground">{project.challenge}</p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.43, 0.13, 0.23, 0.96],
                                    delay: 0.2,
                                }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-2xl font-bold mb-6">Çözüm</h2>
                                <p className="text-muted-foreground">{project.solution}</p>
                            </motion.div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <h2 className="text-3xl font-bold">Proje Görselleri</h2>

                        <div className="grid grid-cols-1 gap-12">
                            {project.images.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className="h-[600px] w-full rounded-lg overflow-hidden"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.8,
                                        ease: [0.43, 0.13, 0.23, 0.96],
                                        delay: index * 0.1,
                                    }}
                                    viewport={{ once: true, margin: '-100px' }}
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} - Görsel ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div
                        className="flex justify-between items-center mt-24 pt-12 border-t border-border"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                        viewport={{ once: true }}
                    >
                        <Link
                            href="/projeler"
                            className="flex items-center group text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <span className="mr-2 text-xl transform group-hover:-translate-x-1 transition-transform">
                                ←
                            </span>
                            <span>Tüm Projelere Dön</span>
                        </Link>

                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="w-6 h-6 flex items-center justify-center text-primary-foreground"
                            >
                                ✦
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
