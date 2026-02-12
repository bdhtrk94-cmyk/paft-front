'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import { useAuth } from '@/context/AuthContext';

interface RegisterErrors {
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<RegisterErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const validate = (): RegisterErrors => {
        const errs: RegisterErrors = {};
        if (!fullName.trim()) errs.fullName = 'Full name is required';
        if (!email.trim()) {
            errs.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errs.email = 'Enter a valid email address';
        }
        if (!password) {
            errs.password = 'Password is required';
        } else if (password.length < 8) {
            errs.password = 'Password must be at least 8 characters';
        }
        if (!confirmPassword) {
            errs.confirmPassword = 'Please confirm your password';
        } else if (password !== confirmPassword) {
            errs.confirmPassword = 'Passwords do not match';
        }
        return errs;
    };

    const clearError = (field: keyof RegisterErrors) => {
        if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setIsSubmitting(true);
        try {
            await register(fullName, email, password);
            router.push('/');
        } catch (err: unknown) {
            const error = err as { message?: string };
            setSubmitError(
                typeof error.message === 'string'
                    ? error.message
                    : 'Registration failed. Please try again.',
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    // Password strength
    const getStrength = () => {
        if (!password) return { label: '', pct: 0, color: '' };
        let score = 0;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (score <= 1) return { label: 'Weak', pct: 25, color: '#EF4444' };
        if (score === 2) return { label: 'Fair', pct: 50, color: '#F59E0B' };
        if (score === 3) return { label: 'Good', pct: 75, color: '#06B6D4' };
        return { label: 'Strong', pct: 100, color: '#10B981' };
    };

    const strength = getStrength();

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Join PAFT and access our products & services"
        >
            {/* Global error */}
            {submitError && (
                <div
                    className="mb-6 px-4 py-3 rounded-xl text-sm flex items-center gap-2"
                    style={{
                        background: 'rgba(239,68,68,0.1)',
                        border: '1px solid rgba(239,68,68,0.2)',
                        color: '#EF4444',
                    }}
                    role="alert"
                >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {submitError}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <AuthInput
                    id="fullName"
                    label="Full Name"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value); clearError('fullName'); }}
                    error={errors.fullName}
                    autoComplete="name"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    }
                />

                <AuthInput
                    id="email"
                    label="Email Address"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
                    error={errors.email}
                    autoComplete="email"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                    }
                />

                <div>
                    <AuthInput
                        id="password"
                        label="Password"
                        type="password"
                        placeholder="Min 8 characters"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); clearError('password'); }}
                        error={errors.password}
                        autoComplete="new-password"
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        }
                    />
                    {/* Password strength bar */}
                    {password && (
                        <div className="mt-2.5 flex items-center gap-2">
                            <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${strength.pct}%`, background: strength.color }}
                                />
                            </div>
                            <span className="text-xs font-medium flex-shrink-0" style={{ color: strength.color }}>
                                {strength.label}
                            </span>
                        </div>
                    )}
                </div>

                <AuthInput
                    id="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value); clearError('confirmPassword'); }}
                    error={errors.confirmPassword}
                    autoComplete="new-password"
                    icon={
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    }
                />

                {/* Terms */}
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    By creating an account, you agree to our{' '}
                    <Link href="#" className="underline" style={{ color: '#06B6D4' }}>Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="#" className="underline" style={{ color: '#06B6D4' }}>Privacy Policy</Link>.
                </p>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold text-base text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                    style={{
                        background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                        boxShadow: '0 4px 15px rgba(6,182,212,0.3)',
                    }}
                    onMouseEnter={(e) => {
                        if (!isSubmitting) {
                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,182,212,0.5)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(6,182,212,0.3)';
                        e.currentTarget.style.transform = '';
                    }}
                >
                    {isSubmitting ? (
                        <>
                            <div
                                className="w-5 h-5 border-2 rounded-full animate-spin"
                                style={{ borderColor: 'rgba(255,255,255,0.3)', borderTopColor: '#fff' }}
                            />
                            Creating account…
                        </>
                    ) : (
                        'Create Account'
                    )}
                </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-3" style={{ background: '#0B1121', color: 'rgba(255,255,255,0.3)' }}>
                        or
                    </span>
                </div>
            </div>

            {/* Login link */}
            <p className="text-center text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="font-semibold transition-colors hover:underline"
                    style={{ color: '#06B6D4' }}
                >
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
}
