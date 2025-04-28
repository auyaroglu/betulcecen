'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-background py-16 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-t border-border pt-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
                        viewport={{ once: true }}
                        className="mb-8 md:mb-0"
                    >
                        <Link
                            href="/"
                            className="text-4xl font-bold text-gradient-rainbow mb-4 inline-block"
                        >
                            BETÜL ÇEÇEN
                        </Link>
                        <p className="text-muted-foreground max-w-xs mt-3">
                            Kreatif tasarım çözümleri ile markanızı öne çıkarıyorum.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.1 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full md:w-auto"
                    >
                        <div>
                            <h3 className="text-lg font-semibold mb-4">İletişim</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li>
                                    <a
                                        href="mailto:hello@betulcecen.com"
                                        className="hover:text-primary transition-colors"
                                    >
                                        hello@betulcecen.com
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="tel:+902123334455"
                                        className="hover:text-primary transition-colors"
                                    >
                                        +90 555 555 55 55
                                    </a>
                                </li>
                                <li>İzmir, Türkiye</li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-4">Bağlantılar</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li>
                                    <a
                                        href="https://instagram.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://behance.net"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Behance
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://dribbble.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="hover:text-primary transition-colors"
                                    >
                                        Dribbble
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
                    viewport={{ once: true }}
                    className="mt-16 pt-8 border-t border-border text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center"
                >
                    <p>© {new Date().getFullYear()} Betül Çeçen. Tüm hakları saklıdır.</p>

                    <div className="mt-4 md:mt-0 flex items-center space-x-6">
                        <Link href="/projeler" className="hover:text-primary transition-colors">
                            Projeler
                        </Link>
                        <Link href="/iletisim" className="hover:text-primary transition-colors">
                            İletişim
                        </Link>
                    </div>
                </motion.div>
            </div>

            <div className="absolute -right-20 top-10 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl"></div>
            <div className="absolute -left-40 bottom-10 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"></div>
        </footer>
    );
};

export default Footer;
