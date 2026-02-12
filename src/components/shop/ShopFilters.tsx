'use client';

import { categories, priceRanges, sortOptions } from '@/lib/shopData';

interface ShopFiltersProps {
    search: string;
    onSearchChange: (v: string) => void;
    category: string;
    onCategoryChange: (v: string) => void;
    priceRange: number;
    onPriceRangeChange: (v: number) => void;
    sort: string;
    onSortChange: (v: string) => void;
    resultCount: number;
}

export default function ShopFilters({
    search,
    onSearchChange,
    category,
    onCategoryChange,
    priceRange,
    onPriceRangeChange,
    sort,
    onSortChange,
    resultCount,
}: ShopFiltersProps) {
    return (
        <div className="space-y-6 mb-10">
            {/* Search bar */}
            <div className="relative max-w-2xl mx-auto">
                <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-2xl text-white placeholder-gray-500 outline-none transition-all duration-300 text-base"
                    style={{
                        background: 'rgba(30,41,59,0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(6,182,212,0.1)'; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.boxShadow = ''; }}
                />
                {search && (
                    <button
                        onClick={() => onSearchChange('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }}
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Filter row */}
            <div
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl"
                style={{
                    background: 'rgba(30,41,59,0.4)',
                    border: '1px solid rgba(255,255,255,0.05)',
                }}
            >
                {/* Category pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300"
                            style={
                                category === cat
                                    ? {
                                        background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                        color: '#fff',
                                        boxShadow: '0 4px 12px rgba(6,182,212,0.35)',
                                    }
                                    : {
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'rgba(255,255,255,0.5)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }
                            }
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Right side filters */}
                <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Price */}
                    <select
                        value={priceRange}
                        onChange={(e) => onPriceRangeChange(Number(e.target.value))}
                        className="px-3 py-2.5 rounded-xl text-xs font-medium outline-none cursor-pointer transition-all duration-300"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.7)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        {priceRanges.map((r, i) => (
                            <option key={i} value={i} style={{ background: '#1e293b', color: '#fff' }}>
                                {r.label}
                            </option>
                        ))}
                    </select>

                    {/* Sort */}
                    <select
                        value={sort}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="px-3 py-2.5 rounded-xl text-xs font-medium outline-none cursor-pointer transition-all duration-300"
                        style={{
                            background: 'rgba(255,255,255,0.05)',
                            color: 'rgba(255,255,255,0.7)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        {sortOptions.map((s) => (
                            <option key={s.value} value={s.value} style={{ background: '#1e293b', color: '#fff' }}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Result count */}
            <div className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Showing <span style={{ color: '#06B6D4' }}>{resultCount}</span> product{resultCount !== 1 ? 's' : ''}
            </div>
        </div>
    );
}
