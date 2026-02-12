'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { ordersApi } from '@/lib/api';

function generateUUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export default function CheckoutPage() {
    const router = useRouter();
    const { items, totalPrice, clearCart } = useCart();
    const { token, user, isLoading: authLoading } = useAuth();

    const [shippingAddress, setShippingAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [idempotencyKey] = useState(() => generateUUID());
    const [orderSuccess, setOrderSuccess] = useState<{
        id: number;
        totalAmount: number;
    } | null>(null);

    // Redirect if not authenticated
    useEffect(() => {
        if (!authLoading && !token) {
            router.push('/login?redirect=/checkout');
        }
    }, [authLoading, token, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (items.length === 0) {
            setError('Your cart is empty');
            return;
        }

        if (!shippingAddress.trim()) {
            setError('Please enter your shipping address');
            return;
        }

        if (!phone.trim()) {
            setError('Please enter your phone number');
            return;
        }

        setLoading(true);

        try {
            const result = await ordersApi.checkout(
                {
                    // Send ONLY productId + quantity — prices are recalculated on the server
                    items: items.map((item) => ({
                        productId: item.id,
                        quantity: item.quantity,
                    })),
                    shippingAddress: shippingAddress.trim(),
                    phone: phone.trim(),
                    notes: notes.trim() || undefined,
                    idempotencyKey,
                },
                token!,
            );

            setOrderSuccess({
                id: result.order.id,
                totalAmount: result.order.totalAmount,
            });
            clearCart();
        } catch (err: unknown) {
            const apiErr = err as { message?: string };
            setError(apiErr.message || 'Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
        );
    }

    // ── Order Success State ──────────────────────────────────
    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-[#0a0f1e]">
                <Header currentPage="shop" />
                <div className="max-w-lg mx-auto px-4 py-24 text-center">
                    <div className="bg-[#151b2e] border border-white/10 rounded-3xl p-10">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Order Placed Successfully!</h1>
                        <p className="text-gray-400 mb-1">Order #{orderSuccess.id}</p>
                        <p className="text-2xl font-bold text-blue-400 mb-6">
                            EGP {Number(orderSuccess.totalAmount).toLocaleString()}
                        </p>
                        <p className="text-gray-400 text-sm mb-8">
                            Thank you for your order! We&apos;ll contact you soon to confirm delivery details.
                        </p>
                        <div className="flex gap-3">
                            <Link
                                href="/shop"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-all text-center"
                            >
                                Continue Shopping
                            </Link>
                            <Link
                                href="/"
                                className="flex-1 bg-white/5 border border-white/10 text-gray-300 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all text-center"
                            >
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // ── Main Checkout Form ───────────────────────────────────
    return (
        <div className="min-h-screen bg-[#0a0f1e]">
            <Header currentPage="shop" />

            <div className="max-w-5xl mx-auto px-4 py-12 pt-24">
                <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

                {items.length === 0 ? (
                    <div className="bg-[#151b2e] border border-white/10 rounded-2xl p-12 text-center">
                        <p className="text-gray-400 text-lg mb-4">Your cart is empty</p>
                        <Link
                            href="/shop"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Left: Shipping Details */}
                        <div className="lg:col-span-3 space-y-6">
                            <div className="bg-[#151b2e] border border-white/10 rounded-2xl p-6">
                                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Shipping Details
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Full Name</label>
                                        <input
                                            type="text"
                                            value={user?.name || ''}
                                            disabled
                                            className="w-full bg-white/5 border border-white/10 text-gray-400 px-4 py-3 rounded-xl"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            value={user?.email || ''}
                                            disabled
                                            className="w-full bg-white/5 border border-white/10 text-gray-400 px-4 py-3 rounded-xl"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">
                                            Shipping Address <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)}
                                            placeholder="Enter your full shipping address..."
                                            rows={3}
                                            required
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-500 transition-all resize-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">
                                            Phone Number <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="e.g. 01012345678"
                                            required
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-500 transition-all"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-gray-400 mb-1.5">Notes (optional)</label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            placeholder="Any special instructions..."
                                            rows={2}
                                            className="w-full bg-white/5 border border-white/10 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder-gray-500 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Security badge */}
                            <div className="flex items-center gap-3 text-gray-500 text-sm px-2">
                                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                </svg>
                                Your data is encrypted and secure. We never store payment information.
                            </div>
                        </div>

                        {/* Right: Order Summary */}
                        <div className="lg:col-span-2">
                            <div className="bg-[#151b2e] border border-white/10 rounded-2xl p-6 sticky top-24">
                                <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>

                                <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">{item.name}</p>
                                                <p className="text-gray-400 text-xs">
                                                    {item.quantity} × EGP {Number(item.price).toLocaleString()}
                                                </p>
                                            </div>
                                            <p className="text-white text-sm font-semibold whitespace-nowrap">
                                                EGP {(Number(item.price) * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-white/10 pt-4 space-y-2">
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Subtotal ({items.length} items)</span>
                                        <span>EGP {totalPrice.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400 text-sm">
                                        <span>Shipping</span>
                                        <span className="text-green-400">Free</span>
                                    </div>
                                    <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10">
                                        <span>Total</span>
                                        <span className="text-blue-400">EGP {totalPrice.toLocaleString()}</span>
                                    </div>
                                </div>

                                {error && (
                                    <div className="mt-4 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Placing Order...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            Place Secure Order
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-gray-500 text-xs mt-3">
                                    By placing this order you agree to our Terms of Service
                                </p>
                            </div>
                        </div>
                    </form>
                )}
            </div>

            <Footer />
        </div>
    );
}
