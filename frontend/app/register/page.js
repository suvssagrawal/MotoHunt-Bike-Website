'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FloatingLabelInput from '@/components/FloatingLabelInput';
import { useToast } from '@/components/ToastNotification';
import { ButtonSpinner } from '@/components/LoadingComponents';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const { register } = useAuth();
    const router = useRouter();
    const { addToast } = useToast();

    const validate = () => {
        const newErrors = {};

        if (!username.trim()) newErrors.username = 'Username is required';
        if (!email.includes('@')) newErrors.email = 'Please enter a valid email';
        if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            addToast('Please fix the errors in the form', 'error');
            return;
        }

        setLoading(true);

        const result = await register(username, email, password);

        if (result.success) {
            addToast('Account created successfully! Please login.', 'success');
            router.push('/login');
        } else {
            addToast(result.error || 'Registration failed', 'error');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>

            <div className="max-w-md w-full relative z-10 perspective-1000">
                <div className="glass-3d rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl animate-scale-in">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-glow transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                            <span className="text-4xl">🚀</span>
                        </div>
                        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                            Join MotoHunt
                        </h1>
                        <p className="text-gray-400">
                            Create your account to start your journey
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-2">
                        <FloatingLabelInput
                            id="username"
                            label="Username"
                            type="text"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                if (errors.username) setErrors({ ...errors, username: '' });
                            }}
                            error={errors.username}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            }
                        />

                        <FloatingLabelInput
                            id="email"
                            label="Email Address"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                if (errors.email) setErrors({ ...errors, email: '' });
                            }}
                            error={errors.email}
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
                            onChange={(e) => {
                                setPassword(e.target.value);
                                if (errors.password) setErrors({ ...errors, password: '' });
                            }}
                            error={errors.password}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            }
                        />

                        <FloatingLabelInput
                            id="confirmPassword"
                            label="Confirm Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                            }}
                            error={errors.confirmPassword}
                            required
                            icon={
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        />

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? <ButtonSpinner /> : 'Create Account'}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-gray-400">
                            Already have an account?{' '}
                            <Link href="/login" className="text-white font-bold hover:text-amber-500 transition-colors relative group">
                                Login here
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
