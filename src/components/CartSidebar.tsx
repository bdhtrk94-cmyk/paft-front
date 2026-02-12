'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
    X,
    Minus,
    Plus,
    Trash2,
    ShoppingBag,
    ShoppingCart,
    ArrowRight,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartSidebar() {
    const { items, totalItems, totalPrice, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!mounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[60] transition-all duration-500"
                style={{
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: isOpen ? 'blur(8px)' : 'blur(0px)',
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? 'auto' : 'none',
                }}
                onClick={closeCart}
            />

            {/* Sidebar */}
            <aside
                className="fixed top-0 right-0 z-[70] h-full w-full sm:w-[420px] flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    background: 'linear-gradient(180deg, #0F172A 0%, #0B1121 100%)',
                    borderLeft: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isOpen ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
                }}
            >
                {/* ── Header ── */}
                <div
                    className="flex items-center justify-between px-6 py-5"
                    style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}
                        >
                            <ShoppingBag className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">Your Cart</h2>
                            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                                {totalItems} {totalItems === 1 ? 'item' : 'items'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeCart}
                        className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)' }}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* ── Items ── */}
                {items.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center px-6">
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center mb-6"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                        >
                            <ShoppingCart className="w-10 h-10" style={{ color: 'rgba(255,255,255,0.15)' }} />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                        <p className="text-sm text-center mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
                            Browse our products and add items to your cart
                        </p>
                        <Link
                            href="/shop"
                            onClick={closeCart}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                boxShadow: '0 4px 15px rgba(6,182,212,0.3)',
                            }}
                        >
                            Browse Shop
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-4 space-y-3">
                        {items.map((item) => {
                            const itemPrice = Number(item.price);
                            return (
                                <div
                                    key={item.id}
                                    className="group relative rounded-2xl overflow-hidden transition-all duration-300"
                                    style={{
                                        background: 'rgba(30,41,59,0.4)',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                    }}
                                >
                                    <div className="flex gap-4 p-4">
                                        {/* Image */}
                                        <Link
                                            href={`/shop/${item.id}`}
                                            onClick={closeCart}
                                            className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0"
                                            style={{ background: 'rgba(255,255,255,0.05)' }}
                                        >
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                sizes="80px"
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </Link>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <Link
                                                href={`/shop/${item.id}`}
                                                onClick={closeCart}
                                                className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors line-clamp-2 block mb-1"
                                            >
                                                {item.name}
                                            </Link>
                                            <p
                                                className="text-sm font-bold mb-3"
                                                style={{ color: '#06B6D4' }}
                                            >
                                                ${itemPrice.toFixed(2)}
                                            </p>

                                            {/* Quantity + Remove */}
                                            <div className="flex items-center justify-between">
                                                <div
                                                    className="flex items-center rounded-lg overflow-hidden"
                                                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)' }}
                                                >
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-white/10"
                                                        style={{ color: item.quantity > 1 ? '#06B6D4' : 'rgba(255,255,255,0.2)' }}
                                                    >
                                                        <Minus className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                    </button>
                                                    <span
                                                        className="w-8 h-8 flex items-center justify-center text-xs font-bold text-white"
                                                        style={{ borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
                                                    >
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center transition-colors hover:bg-white/10"
                                                        style={{ color: '#06B6D4' }}
                                                    >
                                                        <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200 hover:scale-110"
                                                    style={{ color: 'rgba(255,255,255,0.3)', background: 'rgba(239,68,68,0.05)' }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.color = '#EF4444';
                                                        e.currentTarget.style.background = 'rgba(239,68,68,0.15)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                                                        e.currentTarget.style.background = 'rgba(239,68,68,0.05)';
                                                    }}
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Line Total */}
                                        <div className="text-right flex-shrink-0">
                                            <span className="text-sm font-bold text-white">
                                                ${(itemPrice * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* ── Footer ── */}
                {items.length > 0 && (
                    <div
                        className="px-6 py-5 space-y-4"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(15,23,42,0.5)' }}
                    >
                        {/* Summary */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Subtotal ({totalItems} items)</span>
                                <span className="font-semibold text-white">${totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span style={{ color: 'rgba(255,255,255,0.5)' }}>Shipping</span>
                                <span className="font-semibold" style={{ color: '#10B981' }}>Free</span>
                            </div>
                            <div
                                className="flex justify-between pt-3"
                                style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                <span className="text-base font-bold text-white">Total</span>
                                <span
                                    className="text-xl font-extrabold"
                                    style={{
                                        background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    ${totalPrice.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Buttons */}
                        <button
                            className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-300"
                            style={{
                                background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                boxShadow: '0 6px 20px rgba(6,182,212,0.3)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,182,212,0.5)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(6,182,212,0.3)';
                                e.currentTarget.style.transform = '';
                            }}
                        >
                            Proceed to Checkout
                        </button>

                        <button
                            onClick={clearCart}
                            className="w-full py-2.5 rounded-xl text-xs font-semibold transition-all duration-200"
                            style={{ color: 'rgba(255,255,255,0.3)', background: 'transparent' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#EF4444';
                                e.currentTarget.style.background = 'rgba(239,68,68,0.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                                e.currentTarget.style.background = 'transparent';
                            }}
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </aside>

            {/* Custom scrollbar styles */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255,255,255,0.2);
                }
            `}</style>
        </>
    );
}
