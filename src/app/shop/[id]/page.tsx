'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { productsApi } from '@/lib/api';
import { Product } from '@/lib/shopData';
import {
    ShoppingCart,
    Check,
    ArrowLeft,
    Truck,
    ShieldCheck,
    RotateCcw,
    Minus,
    Plus,
    Star,
    StarHalf,
    AlertCircle,
    Loader2,
    ChevronRight,
    Home,
    Package,
    Tag,
    Hash,
    BarChart3,
    CheckCircle2,
    Award,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'details'>('description');
    const [imgError, setImgError] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const { addItem } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const data = await productsApi.getOne(Number(id));
                setProduct(data as unknown as Product);
            } catch (err: unknown) {
                const e = err as { message?: string };
                setError(e.message || 'Product not found');
            } finally {
                setIsLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!product) return;
        addItem({
            id: product.id,
            name: product.name,
            price: price,
            image: product.image,
        }, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    const price = product ? Number(product.price) : 0;
    const originalPrice = product?.originalPrice ? Number(product.originalPrice) : undefined;
    const rating = product ? Number(product.rating) : 0;
    const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    const renderStars = (r: number) => {
        const full = Math.floor(r);
        const half = r % 1 >= 0.5;
        return (
            <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, i) => {
                    if (i < full) {
                        return <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />;
                    }
                    if (i === full && half) {
                        return <StarHalf key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />;
                    }
                    return <Star key={i} className="w-5 h-5 text-white/15" />;
                })}
            </div>
        );
    };

    // ── Loading ──
    if (isLoading) {
        return (
            <div className="min-h-screen" style={{ background: '#0B1121' }}>
                <Header currentPage="shop" />
                <div className="flex items-center justify-center py-40">
                    <div className="text-center">
                        <Loader2
                            className="w-14 h-14 animate-spin mx-auto mb-4"
                            style={{ color: '#06B6D4' }}
                        />
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Loading product…</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // ── Error ──
    if (error || !product) {
        return (
            <div className="min-h-screen" style={{ background: '#0B1121' }}>
                <Header currentPage="shop" />
                <div className="flex items-center justify-center py-40">
                    <div className="text-center max-w-md mx-auto">
                        <div
                            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
                            style={{ background: 'rgba(239,68,68,0.1)' }}
                        >
                            <AlertCircle className="w-12 h-12" style={{ color: '#EF4444' }} />
                        </div>
                        <h2 className="text-2xl font-bold mb-3" style={{ color: '#fff' }}>Product Not Found</h2>
                        <p className="text-sm mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>{error || 'This product does not exist.'}</p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                            style={{ background: 'linear-gradient(135deg, #06B6D4, #2563EB)', boxShadow: '0 4px 15px rgba(6,182,212,0.3)' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Shop
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // ── Product Page ──
    return (
        <div className="min-h-screen" style={{ background: '#0B1121' }}>
            <Header currentPage="shop" />

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
                <nav className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                        <Home className="w-3.5 h-3.5" />
                        Home
                    </Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span style={{ color: '#06B6D4' }}>{product.name}</span>
                </nav>
            </div>

            {/* Main Product Section */}
            <section className="py-8 lg:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                        {/* ── Left: Image ── */}
                        <div className="relative">
                            <div
                                className="relative aspect-square rounded-3xl overflow-hidden"
                                style={{
                                    background: 'rgba(30,41,59,0.5)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                }}
                            >
                                {!imgError ? (
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                        priority
                                        onError={() => setImgError(true)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center" style={{ color: 'rgba(255,255,255,0.15)' }}>
                                        <Package className="w-24 h-24" strokeWidth={1} />
                                    </div>
                                )}

                                {/* Badges */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                    {product.badge && (
                                        <span
                                            className="px-4 py-1.5 rounded-full text-xs font-bold text-white"
                                            style={{ background: 'linear-gradient(135deg, #06B6D4, #2563EB)', boxShadow: '0 4px 12px rgba(6,182,212,0.4)' }}
                                        >
                                            {product.badge}
                                        </span>
                                    )}
                                    {discount > 0 && (
                                        <span
                                            className="px-4 py-1.5 rounded-full text-xs font-bold text-white"
                                            style={{ background: '#EF4444', boxShadow: '0 4px 12px rgba(239,68,68,0.4)' }}
                                        >
                                            –{discount}% OFF
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Decorative glow behind image */}
                            <div
                                className="absolute -inset-4 -z-10 rounded-3xl opacity-20 blur-3xl"
                                style={{ background: 'linear-gradient(135deg, #06B6D4, #2563EB)' }}
                            />
                        </div>

                        {/* ── Right: Details ── */}
                        <div className="flex flex-col justify-center">
                            {/* Category */}
                            <div
                                className="inline-flex items-center self-start gap-1.5 px-3 py-1 rounded-full mb-4"
                                style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}
                            >
                                <Tag className="w-3 h-3" style={{ color: '#06B6D4' }} />
                                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#06B6D4' }}>
                                    {product.category}
                                </span>
                            </div>

                            {/* Name */}
                            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-5 leading-tight" style={{ color: '#fff' }}>
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                {renderStars(rating)}
                                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>
                                    {rating} ({product.reviewCount} reviews)
                                </span>
                            </div>

                            {/* Short description */}
                            <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
                                {product.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-baseline gap-4 mb-8">
                                <span
                                    className="text-4xl font-extrabold"
                                    style={{
                                        background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    ${price.toFixed(2)}
                                </span>
                                {originalPrice && (
                                    <span className="text-xl line-through" style={{ color: 'rgba(255,255,255,0.3)' }}>
                                        ${originalPrice.toFixed(2)}
                                    </span>
                                )}
                                {discount > 0 && (
                                    <span
                                        className="px-3 py-1 rounded-lg text-sm font-bold"
                                        style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444' }}
                                    >
                                        Save ${(originalPrice! - price).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            {/* Stock */}
                            <div className="flex items-center gap-2 mb-8">
                                {product.inStock ? (
                                    <CheckCircle2 className="w-4.5 h-4.5" style={{ color: '#10B981' }} />
                                ) : (
                                    <AlertCircle className="w-4.5 h-4.5" style={{ color: '#EF4444' }} />
                                )}
                                <span className="text-sm font-semibold" style={{ color: product.inStock ? '#10B981' : '#EF4444' }}>
                                    {product.inStock ? 'In Stock — Ready to Ship' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="h-px mb-8" style={{ background: 'rgba(255,255,255,0.06)' }} />

                            {/* Quantity + Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                {/* Quantity Selector */}
                                <div
                                    className="flex items-center rounded-xl overflow-hidden"
                                    style={{ background: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.08)' }}
                                >
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-white/5"
                                        style={{ color: quantity > 1 ? '#06B6D4' : 'rgba(255,255,255,0.2)' }}
                                        disabled={quantity <= 1}
                                    >
                                        <Minus className="w-4 h-4" strokeWidth={2.5} />
                                    </button>
                                    <div
                                        className="w-16 h-12 flex items-center justify-center text-lg font-bold"
                                        style={{ color: '#fff', borderLeft: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}
                                    >
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => setQuantity(Math.min(99, quantity + 1))}
                                        className="w-12 h-12 flex items-center justify-center transition-all duration-200 hover:bg-white/5"
                                        style={{ color: '#06B6D4' }}
                                    >
                                        <Plus className="w-4 h-4" strokeWidth={2.5} />
                                    </button>
                                </div>

                                {/* Add to Cart Button */}
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className="flex-1 flex items-center justify-center gap-3 h-12 rounded-xl text-sm font-bold text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                                    style={{
                                        background: addedToCart
                                            ? 'linear-gradient(135deg, #10B981, #059669)'
                                            : 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                        boxShadow: addedToCart
                                            ? '0 6px 20px rgba(16,185,129,0.3)'
                                            : '0 6px 20px rgba(6,182,212,0.3)',
                                    }}
                                    onMouseEnter={(e) => {
                                        if (product.inStock && !addedToCart) {
                                            e.currentTarget.style.boxShadow = '0 8px 30px rgba(6,182,212,0.5)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.boxShadow = addedToCart
                                            ? '0 6px 20px rgba(16,185,129,0.3)'
                                            : '0 6px 20px rgba(6,182,212,0.3)';
                                        e.currentTarget.style.transform = '';
                                    }}
                                >
                                    {addedToCart ? (
                                        <>
                                            <Check className="w-5 h-5" strokeWidth={2.5} />
                                            Added to Cart!
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5" />
                                            Add to Cart — ${(price * quantity).toFixed(2)}
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { icon: <Truck className="w-5 h-5" />, label: 'Free Shipping', color: '#06B6D4' },
                                    { icon: <ShieldCheck className="w-5 h-5" />, label: 'Secure Payment', color: '#2563EB' },
                                    { icon: <RotateCcw className="w-5 h-5" />, label: '30-Day Returns', color: '#10B981' },
                                ].map((badge, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col items-center gap-2 py-3.5 rounded-xl transition-all duration-300"
                                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = `${badge.color}30`;
                                            e.currentTarget.style.background = `${badge.color}08`;
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                                        }}
                                    >
                                        <span style={{ color: badge.color }}>{badge.icon}</span>
                                        <span className="text-[0.65rem] font-medium" style={{ color: 'rgba(255,255,255,0.45)' }}>{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Description Tabs ── */}
            <section className="py-14" style={{ background: 'rgba(15,23,42,0.5)' }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tab Headers */}
                    <div className="flex gap-1 mb-10 p-1 max-w-md rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        {(['description', 'details'] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className="flex-1 py-3 px-6 rounded-lg text-sm font-semibold transition-all duration-300"
                                style={{
                                    background: activeTab === tab ? 'linear-gradient(135deg, #06B6D4, #2563EB)' : 'transparent',
                                    color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.4)',
                                    boxShadow: activeTab === tab ? '0 4px 12px rgba(6,182,212,0.3)' : 'none',
                                }}
                            >
                                {tab === 'description' ? 'Full Description' : 'Specifications'}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div
                        className="rounded-2xl p-8 lg:p-10"
                        style={{
                            background: 'rgba(30,41,59,0.4)',
                            border: '1px solid rgba(255,255,255,0.06)',
                        }}
                    >
                        {activeTab === 'description' ? (
                            <div className="max-w-3xl">
                                {(product.fullDescription || product.description).split('\n\n').map((paragraph, i) => (
                                    <p
                                        key={i}
                                        className="text-base leading-relaxed mb-5 last:mb-0"
                                        style={{ color: 'rgba(255,255,255,0.6)' }}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        ) : (
                            <div className="max-w-2xl">
                                <div className="space-y-0">
                                    {[
                                        { icon: <Hash className="w-4 h-4" />, label: 'Product ID', value: `#${product.id}` },
                                        { icon: <Tag className="w-4 h-4" />, label: 'Category', value: product.category },
                                        { icon: <Package className="w-4 h-4" />, label: 'Price', value: `$${price.toFixed(2)}` },
                                        { icon: <BarChart3 className="w-4 h-4" />, label: 'Rating', value: `${rating} / 5 (${product.reviewCount} reviews)` },
                                        { icon: <CheckCircle2 className="w-4 h-4" />, label: 'Availability', value: product.inStock ? 'In Stock' : 'Out of Stock' },
                                        ...(product.badge ? [{ icon: <Award className="w-4 h-4" />, label: 'Badge', value: product.badge }] : []),
                                    ].map((spec, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center justify-between py-4"
                                            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                                        >
                                            <div className="flex items-center gap-2.5">
                                                <span style={{ color: '#06B6D4' }}>{spec.icon}</span>
                                                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>{spec.label}</span>
                                            </div>
                                            <span className="text-sm font-semibold" style={{ color: '#fff' }}>{spec.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Back to Shop CTA ── */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold text-white transition-all duration-300"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                            e.currentTarget.style.transform = '';
                        }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Continue Shopping
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}
