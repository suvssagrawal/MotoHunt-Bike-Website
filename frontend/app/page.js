'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BikeCard from '@/components/BikeCard';
import AnimatedCounter from '@/components/AnimatedCounter';
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import ScrollReveal from '@/components/ScrollReveal';
import { BikeCardSkeleton } from '@/components/LoadingComponents';

export default function HomePage() {
    const [trendingBikes, setTrendingBikes] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchTrendingBikes();
    }, []);

    const fetchTrendingBikes = async () => {
        try {
            const res = await fetch(`${API_URL}/api/bikes/trending`);
            const data = await res.json();
            setTrendingBikes(data.bikes || []);
        } catch (error) {
            console.error('Failed to fetch trending bikes:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section with Showroom Background */}
            <section className="relative h-[700px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80')",
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-orange-900/40" />

                {/* Animated Glow */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent animate-pulse-slow" />

                {/* Content */}
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    {/* Glassmorphic Hero Card */}
                    <div className="glass-3d neon-border rounded-3xl p-12 shadow-glow animate-glow">
                        <div className="inline-block mb-6">
                            <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 text-white px-8 py-3 rounded-full text-sm font-bold tracking-widest shadow-glow animate-float text-glow border-animate">
                                🏍️ INDIA'S #1 PREMIUM BIKE PLATFORM
                            </span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-8 animate-fade-in">
                            <span className="gradient-text text-glow">Find Your Perfect Ride</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-200 mb-12 font-light animate-slide-up leading-relaxed">
                            Explore <span className="text-amber-400 font-semibold">premium motorcycles</span> with detailed specs,
                            <br className="hidden md:block" />
                            side-by-side comparisons, and instant test ride bookings
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-up">
                            <Link
                                href="/bikes"
                                className="group relative gradient-primary text-white px-12 py-5 rounded-xl font-bold text-lg overflow-hidden shadow-glow-hover btn-magnetic"
                            >
                                <span className="relative z-10">Browse Collection</span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                            </Link>

                            <Link
                                href="/compare"
                                className="glass-strong text-white px-12 py-5 rounded-xl font-bold text-lg border-2 border-amber-500/60 hover:border-amber-400 shadow-glow-hover btn-magnetic neon-border"
                            >
                                Compare Bikes
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="glass-strong p-3 rounded-full">
                        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Animated Stats Section */}
            <section className="max-w-7xl mx-auto px-4 py-16 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <ScrollReveal animation="scale" delay={0}>
                        <div className="glass-3d rounded-2xl p-10 text-center card-hover shadow-glow-hover neon-border">
                            <div className="text-6xl mb-4 animate-float">🏍️</div>
                            <div className="text-5xl font-black gradient-text mb-3 text-glow">
                                <AnimatedCounter end={500} suffix="+" />
                            </div>
                            <div className="text-gray-300 font-semibold text-lg">Premium Bikes</div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="scale" delay={100}>
                        <div className="glass-3d rounded-2xl p-10 text-center card-hover shadow-glow-hover neon-border">
                            <div className="text-6xl mb-4 animate-float">⭐</div>
                            <div className="text-5xl font-black gradient-text mb-3 text-glow">
                                <AnimatedCounter end={50} suffix="+" />
                            </div>
                            <div className="text-gray-300 font-semibold text-lg">Top Brands</div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="scale" delay={200}>
                        <div className="glass-3d rounded-2xl p-10 text-center card-hover shadow-glow-hover neon-border">
                            <div className="text-6xl mb-4 animate-float">😊</div>
                            <div className="text-5xl font-black gradient-text mb-3 text-glow">
                                <AnimatedCounter end={10000} suffix="+" />
                            </div>
                            <div className="text-gray-300 font-semibold text-lg">Happy Riders</div>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="scale" delay={300}>
                        <div className="glass-3d rounded-2xl p-10 text-center card-hover shadow-glow-hover neon-border">
                            <div className="text-6xl mb-4 animate-float">🎯</div>
                            <div className="text-5xl font-black gradient-text mb-3 text-glow">
                                <AnimatedCounter end={99} suffix="%" />
                            </div>
                            <div className="text-gray-300 font-semibold text-lg">Satisfaction Rate</div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <ScrollReveal animation="fade-up">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black gradient-text mb-4 text-glow">Why Choose MotoHunt?</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Experience the future of motorcycle buying with our premium platform
                        </p>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ScrollReveal animation="fade-up" delay={0}>
                        <div className="group glass-3d rounded-2xl p-10 card-hover border border-gray-700/50 hover:border-amber-500/70 shadow-glow-hover neon-border">
                            <div className="text-7xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">🔍</div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors gradient-text">
                                Detailed Specs
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-lg">Complete specifications including mileage, top speed, weight, and more for informed decisions</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={100}>
                        <div className="group glass-3d rounded-2xl p-10 card-hover border border-gray-700/50 hover:border-amber-500/70 shadow-glow-hover neon-border">
                            <div className="text-7xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">⚖️</div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors gradient-text">
                                Side-by-Side Comparison
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-lg">Compare multiple bikes with visual indicators to find the perfect match for your needs</p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal animation="fade-up" delay={200}>
                        <div className="group glass-3d rounded-2xl p-10 card-hover border border-gray-700/50 hover:border-amber-500/70 shadow-glow-hover neon-border">
                            <div className="text-7xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">📅</div>
                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-amber-400 transition-colors gradient-text">
                                Instant Test Rides
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-lg">Book test rides instantly with authorized dealers across India</p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Trending Bikes Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <ScrollReveal animation="fade-up">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-5xl font-black gradient-text mb-4 text-glow">Trending Bikes</h2>
                            <p className="text-xl text-gray-300">Most popular motorcycles this month</p>
                        </div>
                        <Link
                            href="/bikes"
                            className="hidden md:block glass-strong px-8 py-4 rounded-xl font-semibold text-white hover:gradient-primary transition-all btn-magnetic"
                        >
                            View All →
                        </Link>
                    </div>
                </ScrollReveal>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map(i => <BikeCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trendingBikes.slice(0, 3).map((bike, index) => (
                            <ScrollReveal key={bike.id} animation="fade-up" delay={index * 100}>
                                <BikeCard bike={bike} />
                            </ScrollReveal>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12 md:hidden">
                    <Link
                        href="/bikes"
                        className="inline-block gradient-primary px-12 py-4 rounded-xl font-semibold text-white shadow-glow-hover btn-magnetic"
                    >
                        View All Bikes →
                    </Link>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="max-w-6xl mx-auto px-4 py-24">
                <ScrollReveal animation="fade-up">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-black gradient-text mb-4 text-glow">What Our Riders Say</h2>
                        <p className="text-xl text-gray-300">Real experiences from satisfied customers across India</p>
                    </div>
                </ScrollReveal>

                <ScrollReveal animation="scale" delay={200}>
                    <TestimonialsCarousel />
                </ScrollReveal>
            </section>

            {/* Final CTA Section */}
            <section className="max-w-7xl mx-auto px-4 py-24">
                <ScrollReveal animation="scale">
                    <div className="glass-3d rounded-3xl p-16 text-center shadow-glow-hover neon-border">
                        <h2 className="text-5xl font-black gradient-text mb-6 text-glow">Ready to Find Your Dream Bike?</h2>
                        <p className="text-2xl text-gray-200 mb-10 max-w-3xl mx-auto">
                            Join thousands of happy riders who found their perfect motorcycle with MotoHunt
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link
                                href="/bikes"
                                className="gradient-primary px-12 py-5 rounded-xl font-bold text-xl shadow-glow-hover btn-magnetic"
                            >
                                Start Exploring →
                            </Link>
                            <Link
                                href="/register"
                                className="glass-strong px-12 py-5 rounded-xl font-bold text-xl border-2 border-amber-500/60 hover:border-amber-400 btn-magnetic"
                            >
                                Create Account
                            </Link>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </div>
    );
}
