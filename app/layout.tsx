import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import CustomCursor from '@/components/ui/CustomCursor';
import { SmoothScrollProvider } from '@/components/ui/SmoothScrollProvider';
import PageTransition from '@/components/ui/PageTransition';

const geistSans = Inter({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

const geistMono = Inter({
    subsets: ['latin'],
    variable: '--font-geist-mono',
});

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
    title: 'Betül Çeçen | Kreatif Grafik Tasarımcı',
    description: 'Yaratıcı ve özgün grafik tasarım çözümleri sunan profesyonel portfolyo sitesi',
    keywords: 'grafik tasarım, portfolyo, kreatif, logo, branding, web tasarım',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr" className="smooth-scroll">
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased relative custom-cursor-active`}
                suppressHydrationWarning
            >
                <SmoothScrollProvider>
                    <PageTransition>{children}</PageTransition>
                    <CustomCursor />
                </SmoothScrollProvider>
            </body>
        </html>
    );
}
