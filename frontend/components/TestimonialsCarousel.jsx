'use client';
import { useState, useEffect } from 'react';

const testimonials = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        role: 'Software Engineer',
        image: '👨‍💼',
        rating: 5,
        text: 'Found my dream bike in just 2 days! The comparison feature is amazing and helped me make the right choice.',
        location: 'Mumbai, Maharashtra'
    },
    {
        id: 2,
        name: 'Priya Sharma',
        role: 'Marketing Manager',
        image: '👩‍💼',
        rating: 5,
        text: 'Excellent platform with detailed specifications. The test ride booking was super smooth. Highly recommended!',
        location: 'Delhi NCR'
    },
    {
        id: 3,
        name: 'Amit Patel',
        role: 'Business Owner',
        image: '👨‍💻',
        rating: 5,
        text: 'Best motorcycle platform in India! Clean interface, accurate information, and great customer service.',
        location: 'Bangalore, Karnataka'
    },
    {
        id: 4,
        name: 'Sneha Reddy',
        role: 'Student',
        image: '👩‍🎓',
        rating: 5,
        text: 'As a first-time buyer, this platform made everything so easy. Loved the detailed bike comparisons!',
        location: 'Hyderabad, Telangana'
    }
];

export default function TestimonialsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <div className="relative">
            {/* Main Testimonial Card */}
            <div className="glass-3d rounded-3xl p-12 shadow-glow-hover neon-border">
                {/* Stars */}
                <div className="flex gap-2 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <svg
                            key={i}
                            className="w-6 h-6 text-amber-400 animate-pulse"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>

                {/* Quote */}
                <blockquote className="text-2xl text-gray-200 leading-relaxed mb-8 italic">
                    "{currentTestimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                    <div className="text-5xl glass-strong p-4 rounded-2xl">
                        {currentTestimonial.image}
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white">{currentTestimonial.name}</h4>
                        <p className="text-gray-400">{currentTestimonial.role}</p>
                        <p className="text-amber-400 text-sm">📍 {currentTestimonial.location}</p>
                    </div>
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 glass-strong p-4 rounded-full shadow-glow-hover btn-magnetic hover:scale-110 transition-transform"
            >
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 glass-strong p-4 rounded-full shadow-glow-hover btn-magnetic hover:scale-110 transition-transform"
            >
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`transition-all duration-300 rounded-full ${index === currentIndex
                                ? 'w-8 h-3 gradient-primary'
                                : 'w-3 h-3 glass hover:glass-strong'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
