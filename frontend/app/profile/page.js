'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProfilePage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen py-20 px-4">
            <div className="max-w-4xl mx-auto">
                <ScrollReveal animation="fade-up">
                    <div className="glass-3d rounded-3xl overflow-hidden shadow-2xl neon-border">
                        {/* Cover Image */}
                        <div className="h-48 bg-gradient-to-r from-amber-600 to-orange-600 relative">
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        <div className="px-8 pb-8 relative">
                            {/* Avatar */}
                            <div className="absolute -top-16 left-8">
                                <div className="w-32 h-32 rounded-full glass-strong border-4 border-gray-900 flex items-center justify-center text-4xl font-bold text-white shadow-xl">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end pt-6 mb-8">
                                <button
                                    onClick={() => router.push('/dashboard')}
                                    className="glass px-6 py-2 rounded-xl text-gray-300 hover:text-white hover:glass-strong transition-all mr-3"
                                >
                                    Dashboard
                                </button>
                                <button className="gradient-primary px-6 py-2 rounded-xl font-bold shadow-glow-hover btn-magnetic">
                                    Edit Profile
                                </button>
                            </div>

                            {/* User Info */}
                            <div className="mt-4">
                                <h1 className="text-4xl font-black text-white mb-2">{user.username}</h1>
                                <p className="text-gray-400 text-lg mb-6">{user.email}</p>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="glass p-6 rounded-2xl">
                                        <div className="text-gray-400 text-sm mb-1">Member Since</div>
                                        <div className="text-xl font-bold text-white">Feb 2026</div>
                                    </div>
                                    <div className="glass p-6 rounded-2xl">
                                        <div className="text-gray-400 text-sm mb-1">Account Type</div>
                                        <div className="text-xl font-bold text-amber-400">Premium Rider</div>
                                    </div>
                                    <div className="glass p-6 rounded-2xl">
                                        <div className="text-gray-400 text-sm mb-1">Status</div>
                                        <div className="text-xl font-bold text-green-400">Active</div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activity Section */}
                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
                                <div className="space-y-4">
                                    <div className="glass p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                                🔐
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Logged in successfully</div>
                                                <div className="text-xs text-gray-400">Just now</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="glass p-4 rounded-xl flex items-center justify-between hover:bg-white/5 transition-colors cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                                👤
                                            </div>
                                            <div>
                                                <div className="font-semibold text-white">Profile updated</div>
                                                <div className="text-xs text-gray-400">2 days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    );
}
