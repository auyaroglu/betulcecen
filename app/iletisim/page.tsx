import React from 'react';
import { Metadata } from 'next';
import ContactSection from '@/components/sections/ContactSection';

export const metadata: Metadata = {
  title: 'İletişim - Grafik Tasarımcı Portfolyo',
  description: 'Grafik tasarım projeleri için benimle iletişime geçin.',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-24">
      <ContactSection />
    </main>
  );
} 