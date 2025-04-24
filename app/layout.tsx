import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

const geistSans = Geist({
    subsets: ['latin'],
    variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
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
    title: 'Grafik Tasarımcı Portfolyo',
    description: 'Profesyonel grafik tasarımcı portföy sitesi',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="tr">
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground antialiased overflow-x-hidden`}
            >
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}
