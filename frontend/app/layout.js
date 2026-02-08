'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

function Navigation() {
    const { user, logout } = useAuth();
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    return (
        <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                        🏍️ MotoHunt
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition">Home</Link>
                        <Link href="/bikes" className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition">Browse</Link>
                        <Link href="/compare" className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition">Compare</Link>

                        {user ? (
                            <>
                                <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition">Dashboard</Link>
                                <button
                                    onClick={logout}
                                    className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-amber-500 transition">Login</Link>
                                <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:shadow-lg transition">
                                    Register
                                </Link>
                            </>
                        )}

                        {/* Theme Toggle Button */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? '🌞' : '🌙'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100`}>
                <AuthProvider>
                    <Navigation />
                    <main className="pt-16">
                        {children}
                    </main>

                    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <div>
                                    <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                                        🏍️ MotoHunt
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">Find your perfect ride</p>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h4>
                                    <ul className="space-y-2">
                                        <li><Link href="/bikes" className="text-gray-600 dark:text-gray-400 hover:text-amber-500">Browse Collection</Link></li>
                                        <li><Link href="/compare" className="text-gray-600 dark:text-gray-400 hover:text-amber-500">Compare</Link></li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Support</h4>
                                    <ul className="space-y-2">
                                        <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-500">Help Center</Link></li>
                                        <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-500">Contact Us</Link></li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">Legal</h4>
                                    <ul className="space-y-2">
                                        <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-500">Privacy Policy</Link></li>
                                        <li><Link href="#" className="text-gray-600 dark:text-gray-400 hover:text-amber-500">Terms of Service</Link></li>
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
                                <p>&copy; 2026 MotoHunt. All rights reserved.</p>
                            </div>
                        </div>
                    </footer>
                </AuthProvider>
            </body>
        </html>
    );
}
