'use client';

import { useParams } from 'next/navigation';
import ProjectDetailClient from '@/components/projects/ProjectDetailClient';

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

export default function ProjectDetail() {
    // useParams kullanarak slug'ı al
    const params = useParams();
    const slug = params.slug as string;

    // Projeyi bul
    const project = projects.find(p => p.slug === slug);

    // Proje bulunamazsa null döndür
    if (!project) {
        return null;
    }

    // ProjectDetailClient bileşenini kullanarak detayları göster
    return <ProjectDetailClient project={project} allProjects={projects} />;
}
