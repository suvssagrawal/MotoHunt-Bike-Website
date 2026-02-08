'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BikeCard from '@/components/BikeCard';

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
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-orange-500/20" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600')] bg-cover bg-center opacity-20" />

                <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent animate-fade-in">
                        Find Your Perfect Ride
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
                        India's premium motorcycle discovery platform
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                        <Link
                            href="/bikes"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/50 transform hover:scale-105"
                        >
                            Browse Collection
                        </Link>
                        <Link
                            href="/compare"
                            className="bg-gray-800 text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-gray-700 hover:border-amber-500"
                        >
                            Compare Bikes
                        </Link>
                    </div>
                </div>
            </section>

            {/* Trending Bikes Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            🔥 Trending Now
                        </h2>
                        <p className="text-gray-400">The hottest rides this month</p>
                    </div>
                    <Link
                        href="/bikes"
                        className="text-amber-500 hover:text-amber-400 font-semibold"
                    >
                        View All →
                    </Link>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-80 bg-gray-800 rounded-xl animate-pulse" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {trendingBikes.map((bike) => (
                            <BikeCard key={bike.id} bike={bike} />
                        ))}
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="max-w-7xl mx-auto px-4 py-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
                    Why Choose MotoHunt?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <FeatureCard
                        icon="🔍"
                        title="Smart Search"
                        description="Advanced filters for price, engine capacity, and bike type"
                    />
                    <FeatureCard
                        icon="⚖️"
                        title="Easy Comparison"
                        description="Side-by-side spec comparison with visual highlights"
                    />
                    <FeatureCard
                        icon="📅"
                        title="Test Rides"
                        description="Book test rides instantly with nearby dealers"
                    />
                </div>
            </section>
        </div>
    );
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/20 transition-all">
            <div className="text-4xl mb-4">{icon}</div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-gray-400">{description}</p>
        </div>
    );
}
