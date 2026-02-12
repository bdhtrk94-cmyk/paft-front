'use client';

import { useState } from 'react';

const businessUnits = [
    {
        title: 'Plastic Pallets',
        description:
            'PAFT heavy-duty plastic pallets are engineered for demanding industrial applications and are backed by a lifetime warranty of up to 10 years. Selected models are designed to handle static loads of up to 10 tons and racked loads of up to 4 tons, delivering exceptional strength, durability, and reliable performance in warehouse and logistics operations.',
        icon: 'https://paft.eg/wp-content/uploads/2025/10/PAFT-Ind.png',
        color: '#2563EB',
        colorLight: 'rgba(37, 99, 235, 0.15)',
        colorGlow: 'rgba(37, 99, 235, 0.4)',
        gradientFrom: '#1E40AF',
        gradientTo: '#3B82F6',
        href: '/products/plastic-pallets',
    },
    {
        title: 'High-Performance Recycled Raw Materials',
        description:
            'Our innovative recycled raw materials enable clients to transition seamlessly from virgin materials to high-grade, consistent recycled alternatives. These materials are engineered to match and in many cases exceed the performance of virgin raw materials, without compromising on quality, reliability, or sustainability.',
        icon: 'https://paft.eg/wp-content/uploads/2025/10/PAFT-Mat.png',
        color: '#16A34A',
        colorLight: 'rgba(22, 163, 74, 0.15)',
        colorGlow: 'rgba(22, 163, 74, 0.4)',
        gradientFrom: '#15803D',
        gradientTo: '#22C55E',
        href: '/products/raw-materials',
    },
    {
        title: 'A New Era of Traceability',
        description:
            'PAFT iWMS utilizes advanced RFID technology to transform warehouses into fully automated environments, delivering real-time traceability of products, equipment, and operators with instant visibility and control across all operations.',
        icon: 'https://paft.eg/wp-content/uploads/2025/10/PAFT-Inn.png',
        color: '#DC2626',
        colorLight: 'rgba(220, 38, 38, 0.15)',
        colorGlow: 'rgba(220, 38, 38, 0.4)',
        gradientFrom: '#B91C1C',
        gradientTo: '#EF4444',
        href: '/products/innovative-solutions',
    },
];

export default function BusinessUnits() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section
            className="py-24 relative overflow-hidden"
            style={{
                background: 'linear-gradient(180deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
            }}
        >
            {/* Animated background decoration */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage:
                        'radial-gradient(circle at 25% 25%, #06B6D4 0%, transparent 50%), radial-gradient(circle at 75% 75%, #2563EB 0%, transparent 50%)',
                }}
            ></div>
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <h2
                        className="text-4xl lg:text-5xl font-bold text-white mb-4"
                        style={{ letterSpacing: '-0.02em' }}
                    >
                        Our Business Units
                    </h2>
                    <div
                        className="w-20 h-1 mx-auto rounded-full"
                        style={{
                            background: 'linear-gradient(90deg, #06B6D4, #2563EB)',
                        }}
                    ></div>
                    <p className="text-lg mt-6" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        Comprehensive solutions across three core divisions
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {businessUnits.map((unit, index) => {
                        const isHovered = hoveredIndex === index;
                        return (
                            <div
                                key={index}
                                className="group rounded-3xl overflow-hidden cursor-pointer relative h-full flex flex-col"
                                style={{
                                    background: 'rgba(30, 41, 59, 0.6)',
                                    backdropFilter: 'blur(20px)',
                                    borderTop: `4px solid ${unit.color}`,
                                    borderLeft: `1px solid ${isHovered ? unit.color + '60' : 'rgba(255, 255, 255, 0.06)'}`,
                                    borderRight: `1px solid ${isHovered ? unit.color + '60' : 'rgba(255, 255, 255, 0.06)'}`,
                                    borderBottom: `1px solid ${isHovered ? unit.color + '60' : 'rgba(255, 255, 255, 0.06)'}`,
                                    transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
                                    boxShadow: isHovered
                                        ? `0 25px 50px rgba(0,0,0,0.4), 0 0 40px ${unit.colorGlow}, 0 0 80px ${unit.colorGlow}`
                                        : '0 4px 20px rgba(0,0,0,0.2)',
                                    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Glow effect overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
                                    style={{
                                        background: `radial-gradient(circle at 50% 0%, ${unit.colorGlow}, transparent 70%)`,
                                    }}
                                ></div>

                                <div className="p-10 relative z-10 flex flex-col flex-grow">
                                    {/* Icon */}
                                    <div className="mb-8 flex justify-center">
                                        <div
                                            className="relative"
                                            style={{
                                                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                                                transform: isHovered ? 'scale(1.15) rotate(3deg)' : 'scale(1) rotate(0deg)',
                                            }}
                                        >
                                            {/* Pulsing ring behind icon */}
                                            <div
                                                className="absolute inset-0 rounded-2xl"
                                                style={{
                                                    background: `linear-gradient(135deg, ${unit.gradientFrom}, ${unit.gradientTo})`,
                                                    opacity: isHovered ? 0.3 : 0,
                                                    filter: 'blur(15px)',
                                                    transform: 'scale(1.5)',
                                                    transition: 'opacity 0.5s ease',
                                                }}
                                            ></div>
                                            <div
                                                className="w-28 h-28 rounded-2xl flex items-center justify-center relative"
                                                style={{
                                                    background: `linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.95))`,
                                                    boxShadow: `0 10px 30px ${unit.colorGlow}, inset 0 1px 0 rgba(255,255,255,0.08)`,
                                                    border: `2px solid ${unit.color}40`,
                                                }}
                                            >
                                                <img
                                                    src={unit.icon}
                                                    alt={unit.title}
                                                    className="w-20 h-20 object-contain"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className="text-2xl font-bold mb-5 text-center transition-all duration-300 flex items-center justify-center"
                                        style={{
                                            color: unit.color,
                                            textShadow: isHovered ? `0 0 20px ${unit.colorGlow}` : 'none',
                                            minHeight: '4rem',
                                        }}
                                    >
                                        {unit.title}
                                    </h3>

                                    {/* Divider */}
                                    <div
                                        className="mx-auto mb-5 rounded-full"
                                        style={{
                                            width: isHovered ? '60%' : '30%',
                                            height: '2px',
                                            background: `linear-gradient(90deg, transparent, ${unit.color}, transparent)`,
                                            transition: 'width 0.5s ease',
                                        }}
                                    ></div>

                                    {/* Description */}
                                    <p
                                        className="text-base leading-relaxed mb-8 text-center"
                                        style={{ color: 'rgba(255, 255, 255, 0.65)' }}
                                    >
                                        {unit.description}
                                    </p>

                                    {/* CTA Button - pushed to bottom */}
                                    <div className="mt-auto">
                                        <a
                                            href={unit.href}
                                            className="inline-flex items-center justify-center w-full px-8 py-4 rounded-xl font-semibold text-white transition-all duration-400 relative overflow-hidden group/btn"
                                            style={{
                                                background: `linear-gradient(135deg, ${unit.gradientFrom}, ${unit.gradientTo})`,
                                                boxShadow: isHovered
                                                    ? `0 8px 30px ${unit.colorGlow}`
                                                    : `0 4px 15px ${unit.colorGlow}`,
                                            }}
                                        >
                                            <span className="relative z-10 flex items-center">
                                                Discover more
                                                <svg
                                                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
