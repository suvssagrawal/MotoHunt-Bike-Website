'use client';
import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, animation = 'fade-up', delay = 0, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setIsVisible(true);
                    }, delay);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [delay]);

    const animations = {
        'fade-up': {
            initial: 'opacity-0 translate-y-12',
            visible: 'opacity-100 translate-y-0'
        },
        'fade-down': {
            initial: 'opacity-0 -translate-y-12',
            visible: 'opacity-100 translate-y-0'
        },
        'fade-left': {
            initial: 'opacity-0 translate-x-12',
            visible: 'opacity-100 translate-x-0'
        },
        'fade-right': {
            initial: 'opacity-0 -translate-x-12',
            visible: 'opacity-100 translate-x-0'
        },
        'scale': {
            initial: 'opacity-0 scale-95',
            visible: 'opacity-100 scale-100'
        },
        'fade': {
            initial: 'opacity-0',
            visible: 'opacity-100'
        }
    };

    const selectedAnimation = animations[animation] || animations['fade-up'];

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? selectedAnimation.visible : selectedAnimation.initial
                } ${className}`}
        >
            {children}
        </div>
    );
}
