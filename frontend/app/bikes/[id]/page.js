'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function BikeDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useAuth();

    const [bike, setBike] = useState(null);
    const [bookingDate, setBookingDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchBikeDetails();
    }, [id]);

    const fetchBikeDetails = async () => {
        try {
            const res = await fetch(`${API_URL}/api/bikes/${id}`);
            const data = await res.json();
            setBike(data.bike);
        } catch (error) {
            console.error('Failed to fetch bike details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookTestRide = async (e) => {
        e.preventDefault();

        if (!user) {
            router.push('/login');
            return;
        }

        setBookingLoading(true);
        setBookingError('');

        try {
            const res = await fetch(`${API_URL}/api/test-rides`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    bike_id: id,
                    booking_date: bookingDate,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Booking failed');
            }

            setBookingSuccess(true);
            setTimeout(() => router.push('/dashboard'), 2000);
        } catch (error) {
            setBookingError(error.message);
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">🏍️</div>
                    <p className="text-gray-400">Loading bike details...</p>
                </div>
            </div>
        );
    }

    if (!bike) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-400 text-xl mb-4">Bike not found</p>
                    <Link href="/bikes" className="text-amber-500 hover:text-amber-400">
                        ← Back to Browse
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <Link
                    href="/bikes"
                    className="inline-flex items-center text-gray-400 hover:text-amber-500 mb-8"
                >
                    ← Back to Browse
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left: Image */}
                    <div>
                        <div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
                            {bike.image_url ? (
                                <img
                                    src={bike.image_url}
                                    alt={bike.model_name}
                                    className="w-full h-96 object-cover"
                                />
                            ) : (
                                <div className="w-full h-96 flex items-center justify-center text-9xl">
                                    🏍️
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div>
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">
                                    {bike.model_name}
                                </h1>
                                <p className="text-xl text-gray-400">{bike.brand_name}</p>
                            </div>
                            {bike.is_trending === 1 && (
                                <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                                    🔥 TRENDING
                                </span>
                            )}
                        </div>

                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
                            <p className="text-gray-400 mb-2">On-Road Price</p>
                            <p className="text-5xl font-bold text-amber-500">
                                ₹{(bike.price_on_road / 100000).toFixed(2)}L
                            </p>
                        </div>

                        {/* Specifications */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-6">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Specifications
                            </h2>
                            <div className="space-y-3">
                                <SpecRow label="Engine Capacity" value={`${bike.engine_cc}cc`} />
                                <SpecRow label="Body Type" value={bike.type} />
                                <SpecRow label="Country of Origin" value={bike.country_of_origin} />
                            </div>
                        </div>

                        {/* Test Ride Booking */}
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6">
                            <h2 className="text-2xl font-bold text-white mb-4">
                                Book a Test Ride
                            </h2>

                            {bookingSuccess ? (
                                <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-lg">
                                    ✓ Test ride booked successfully! Redirecting to dashboard...
                                </div>
                            ) : (
                                <form onSubmit={handleBookTestRide}>
                                    {bookingError && (
                                        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg mb-4">
                                            {bookingError}
                                        </div>
                                    )}

                                    <label className="block text-gray-300 mb-2 font-medium">
                                        Select Date
                                    </label>
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none mb-4"
                                        required
                                    />

                                    <button
                                        type="submit"
                                        disabled={bookingLoading}
                                        className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-amber-500/50 disabled:opacity-50"
                                    >
                                        {bookingLoading ? 'Booking...' : 'Book Test Ride'}
                                    </button>

                                    {!user && (
                                        <p className="text-sm text-gray-400 mt-3 text-center">
                                            Please login to book a test ride
                                        </p>
                                    )}
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpecRow({ label, value }) {
    return (
        <div className="flex justify-between items-center py-2 border-b border-gray-700">
            <span className="text-gray-400">{label}</span>
            <span className="text-white font-semibold">{value}</span>
        </div>
    );
}
