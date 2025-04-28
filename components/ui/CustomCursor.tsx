'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const outlineRef = useRef(null);
    const [cursorVariant, setCursorVariant] = useState('default');

    // Motion değerlerini kullanarak performans optimizasyonu sağlıyoruz
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring animasyonu ile daha akıcı hareketler sağlıyoruz
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);
    const outlineX = useSpring(mouseX, { ...springConfig, stiffness: 100 });
    const outlineY = useSpring(mouseY, { ...springConfig, stiffness: 100 });

    useEffect(() => {
        // Performance için throttling işlemi
        let frameId: number;
        const updateMousePosition = (e: MouseEvent) => {
            cancelAnimationFrame(frameId);
            frameId = requestAnimationFrame(() => {
                mouseX.set(e.clientX);
                mouseY.set(e.clientY);
            });
        };

        window.addEventListener('mousemove', updateMousePosition, { passive: true });

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            cancelAnimationFrame(frameId);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        const handleLinkHover = () => setCursorVariant('link');
        const handleLinkLeave = () => setCursorVariant('default');

        // Tüm interaktif elemanları seçmek için bir seferlik tarama
        const interactiveElements = document.querySelectorAll('a, button');

        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', handleLinkHover);
            element.addEventListener('mouseleave', handleLinkLeave);
        });

        return () => {
            interactiveElements.forEach(element => {
                element.removeEventListener('mouseenter', handleLinkHover);
                element.removeEventListener('mouseleave', handleLinkLeave);
            });
        };
    }, []);

    return (
        <>
            <motion.div
                ref={cursorRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] bg-primary"
                style={{
                    x: cursorX,
                    y: cursorY,
                    width: cursorVariant === 'link' ? 32 : 8,
                    height: cursorVariant === 'link' ? 32 : 8,
                    transform: 'translate(-50%, -50%)',
                    mixBlendMode: 'difference',
                    willChange: 'transform',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 28,
                    mass: 0.5,
                }}
            />
            <motion.div
                ref={outlineRef}
                className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-primary"
                style={{
                    x: outlineX,
                    y: outlineY,
                    width: cursorVariant === 'link' ? 50 : 40,
                    height: cursorVariant === 'link' ? 50 : 40,
                    transform: 'translate(-50%, -50%)',
                    opacity: cursorVariant === 'link' ? 0.8 : 0.5,
                    willChange: 'transform',
                }}
                transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                    mass: 1,
                }}
            />
        </>
    );
};

export default CustomCursor;
