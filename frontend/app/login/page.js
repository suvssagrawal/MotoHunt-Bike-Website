'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { useToast } from '@/components/ToastNotification';
import { ButtonSpinner } from '@/components/LoadingComponents';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const router = useRouter();
    const { addToast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            addToast('Welcome back! Login successful.', 'success');
            router.push('/');
        } else {
            addToast(result.error || 'Login failed', 'error');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            <div className="max-w-md w-full relative z-10 perspective-1000">
                <div className="glass-3d rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl animate-fade-up">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-glow transform rotate-3 hover:rotate-6 transition-transform duration-300">
                            <span className="text-4xl">🏍️</span>
                        </div>
                        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-gray-400">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <FloatingLabelInput
                            id="email"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                            }
                        />

                        <FloatingLabelInput
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                        />

                        <div className="flex items-center justify-between text-sm mb-6">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-gray-800 transition-all" />
                                <span className="text-gray-400 group-hover:text-amber-500 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-amber-500 hover:text-amber-400 font-medium hover:underline transition-all">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? <ButtonSpinner /> : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-white font-bold hover:text-amber-500 transition-colors relative group">
                                Create Account
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
