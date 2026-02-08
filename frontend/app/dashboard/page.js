'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/login');
        } else if (user) {
            fetchBookings();
        }
    }, [user, authLoading]);

    const fetchBookings = async () => {
        try {
            const res = await fetch(`${API_URL}/api/test-rides/user/${user.id}`, {
                credentials: 'include',
            });
            const data = await res.json();
            setBookings(data.bookings || []);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            const res = await fetch(`${API_URL}/api/test-rides/${bookingId}/cancel`, {
                method: 'PATCH',
                credentials: 'include',
            });

            if (res.ok) {
                // Refresh bookings
                fetchBookings();
                alert('Booking cancelled successfully!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to cancel booking');
            }
        } catch (error) {
            console.error('Cancel booking error:', error);
            alert('Failed to cancel booking');
        }
    };

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (authLoading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400 dark:text-gray-500">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black border-b border-gray-700 dark:border-gray-800 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                Dashboard
                            </h1>
                            <p className="text-gray-400 text-lg">Welcome back, {user.username}!</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Profile</h2>
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Username</p>
                                <p className="text-gray-900 dark:text-white font-semibold">{user.username}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                                <p className="text-gray-900 dark:text-white font-semibold">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Role</p>
                                <p className="text-gray-900 dark:text-white font-semibold capitalize">{user.role}</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <StatsCard
                            icon="📅"
                            title="Total Bookings"
                            value={bookings.length}
                            color="amber"
                        />
                        <StatsCard
                            icon="⏳"
                            title="Pending"
                            value={bookings.filter((b) => b.status === 'Pending').length}
                            color="blue"
                        />
                    </div>
                </div>

                {/* Bookings Section */}
                <div className="mt-12">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Your Test Ride Bookings</h2>
                        <Link
                            href="/bikes"
                            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg"
                        >
                            Book Another Ride
                        </Link>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : bookings.length === 0 ? (
                        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                            <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                                You haven't booked any test rides yet
                            </p>
                            <Link
                                href="/bikes"
                                className="text-amber-500 hover:text-amber-400 font-semibold"
                            >
                                Browse Bikes →
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onCancel={handleCancelBooking}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function StatsCard({ icon, title, value, color }) {
    const colorClasses = {
        amber: 'from-amber-500 to-orange-500',
        blue: 'from-blue-500 to-cyan-500',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-500 dark:text-gray-400 mb-2">{title}</p>
                    <p className="text-4xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
                <div className={`text-5xl bg-gradient-to-r ${colorClasses[color]} bg-clip-text text-transparent`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

function BookingCard({ booking, onCancel }) {
    const statusColors = {
        Pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500',
        Confirmed: 'bg-green-500/10 text-green-500 border-green-500',
        Cancelled: 'bg-red-500/10 text-red-500 border-red-500',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-amber-500 transition-all">
            <div className="relative h-40 bg-gray-200 dark:bg-gray-700">
                {booking.bike_image ? (
                    <img
                        src={booking.bike_image}
                        alt={booking.model_name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                        🏍️
                    </div>
                )}
            </div>

            <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    {booking.brand_name} {booking.model_name}
                </h3>

                <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">📅</span>
                        {new Date(booking.booking_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">🏪</span>
                        {booking.dealer_name || 'Dealer Assigned'}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="mr-2">📍</span>
                        {booking.location_area || booking.city || 'Location TBD'}
                    </div>
                    {booking.contact_number && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <span className="mr-2">📞</span>
                            {booking.contact_number}
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${statusColors[booking.status]}`}>
                        {booking.status}
                    </span>

                    {booking.status === 'Pending' && (
                        <button
                            onClick={() => onCancel(booking.id)}
                            className="text-red-500 hover:text-red-400 font-semibold text-sm"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
