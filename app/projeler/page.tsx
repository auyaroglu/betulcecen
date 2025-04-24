import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projeler - Grafik Tasarımcı Portfolyo',
  description: 'Tüm grafik tasarım projelerimi keşfedin.',
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen py-24">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projelerim</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Geçmişten bugüne çalıştığım tüm projeler burada.
          </p>
        </div>
        
        <ProjectsGrid />
      </div>
    </main>
  );
} 