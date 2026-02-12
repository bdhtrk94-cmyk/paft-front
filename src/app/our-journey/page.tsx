'use client';

import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Milestone {
    number: number;
    year: number;
    title: string;
    era: number;
    color: string;
    accentGlow: string;
}

const milestones: Milestone[] = [
    {
        number: 1,
        year: 2010,
        title: 'Started to own molds design and manufacturing',
        era: 1,
        color: '#10B981',
        accentGlow: 'rgba(16, 185, 129, 0.3)',
    },
    {
        number: 2,
        year: 2012,
        title: 'Started co-manufacturing pallets in China',
        era: 1,
        color: '#06B6D4',
        accentGlow: 'rgba(6, 182, 212, 0.3)',
    },
    {
        number: 3,
        year: 2013,
        title: 'Developed 5th Generation mold for heavy duty steel reinforced plastic pallets with R&D center in UAE',
        era: 1,
        color: '#F97316',
        accentGlow: 'rgba(249, 115, 22, 0.3)',
    },
    {
        number: 4,
        year: 2014,
        title: 'Launched woodchip export pallets production in Egypt',
        era: 2,
        color: '#2563EB',
        accentGlow: 'rgba(37, 99, 235, 0.3)',
    },
    {
        number: 5,
        year: 2017,
        title: 'Replaced woodchip pallets with plastic export pallets',
        era: 2,
        color: '#8B5CF6',
        accentGlow: 'rgba(139, 92, 246, 0.3)',
    },
    {
        number: 6,
        year: 2018,
        title: 'Started manufacturing Plastic Pallets in Morocco while adding new molds to the portfolio',
        era: 2,
        color: '#06B6D4',
        accentGlow: 'rgba(6, 182, 212, 0.3)',
    },
    {
        number: 7,
        year: 2019,
        title: 'Built new manufacturing facility with 7 times production capacity and moved Head Office',
        era: 3,
        color: '#10B981',
        accentGlow: 'rgba(16, 185, 129, 0.3)',
    },
    {
        number: 8,
        year: 2021,
        title: 'Full acquisition of PAFT business by Eng. Ahmed Alhakim',
        era: 3,
        color: '#EF4444',
        accentGlow: 'rgba(239, 68, 68, 0.3)',
    },
    {
        number: 9,
        year: 2022,
        title: 'Expanding production capacity by 300% & Launching Square Pallets',
        era: 3,
        color: '#F59E0B',
        accentGlow: 'rgba(245, 158, 11, 0.3)',
    },
    {
        number: 10,
        year: 2023,
        title: 'PAFT started offering warehousing turnkey solutions and expanding in governmental projects',
        era: 4,
        color: '#2563EB',
        accentGlow: 'rgba(37, 99, 235, 0.3)',
    },
    {
        number: 11,
        year: 2024,
        title: 'Launch NWMS, Technical Schools Expansion, Poly AL Launch',
        era: 4,
        color: '#06B6D4',
        accentGlow: 'rgba(6, 182, 212, 0.3)',
    },
    {
        number: 12,
        year: 2025,
        title: 'Introducing Petrochemicals pallet, Expanding Recycling Line & Setting Full Lab in Place',
        era: 4,
        color: '#8B5CF6',
        accentGlow: 'rgba(139, 92, 246, 0.3)',
    },
];

const eras = [
    { number: 1, label: '1st Era', subtitle: 'Foundation & R&D', range: '2010 – 2013', color: '#10B981' },
    { number: 2, label: '2nd Era', subtitle: 'Expansion & Innovation', range: '2014 – 2018', color: '#06B6D4' },
    { number: 3, label: '3rd Era', subtitle: 'Growth & Acquisition', range: '2019 – 2022', color: '#F59E0B' },
    { number: 4, label: '4th Era', subtitle: 'Scale & Diversification', range: '2023 – 2025', color: '#8B5CF6' },
];

function TimelineCard({ milestone, index }: { milestone: Milestone; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isLeft = index % 2 === 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={cardRef}
            className={`timeline-item flex items-center w-full mb-12 lg:mb-16`}
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible
                    ? 'translateX(0) translateY(0)'
                    : `translateX(${isLeft ? '-60px' : '60px'}) translateY(20px)`,
                transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
            }}
        >
            {/* Desktop: alternating layout */}
            <div className={`hidden lg:flex items-center w-full ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Card */}
                <div className="w-5/12">
                    <div
                        className="relative rounded-2xl p-6 cursor-pointer"
                        style={{
                            background: 'rgba(30, 41, 59, 0.6)',
                            backdropFilter: 'blur(12px)',
                            border: 'none',
                            borderTop: `3px solid ${milestone.color}`,
                            borderLeft: `1px solid ${isHovered ? milestone.color + '50' : 'rgba(255, 255, 255, 0.06)'}`,
                            borderRight: `1px solid ${isHovered ? milestone.color + '50' : 'rgba(255, 255, 255, 0.06)'}`,
                            borderBottom: `1px solid ${isHovered ? milestone.color + '50' : 'rgba(255, 255, 255, 0.06)'}`,
                            boxShadow: isHovered
                                ? `0 25px 50px rgba(0,0,0,0.4), 0 0 40px ${milestone.accentGlow}`
                                : '0 4px 20px rgba(0,0,0,0.2)',
                            transform: isHovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)',
                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Year badge */}
                        <div
                            className="inline-flex items-center px-4 py-1.5 rounded-full mb-4"
                            style={{
                                background: `${milestone.color}15`,
                                border: `1px solid ${milestone.color}30`,
                            }}
                        >
                            <span className="text-sm font-bold" style={{ color: milestone.color }}>
                                {milestone.year}
                            </span>
                        </div>

                        <p className="text-base leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {milestone.title}
                        </p>

                        {/* Decorative corner */}
                        <div
                            className="absolute top-0 right-0 w-20 h-20 opacity-5 rounded-bl-full"
                            style={{ background: milestone.color }}
                        ></div>
                    </div>
                </div>

                {/* Center line connector */}
                <div className="w-2/12 flex justify-center relative">
                    {/* Number circle */}
                    <div
                        className="w-14 h-14 rounded-full flex items-center justify-center z-10 relative"
                        style={{
                            background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}CC)`,
                            boxShadow: isHovered
                                ? `0 0 30px ${milestone.accentGlow}, 0 0 60px ${milestone.accentGlow}`
                                : `0 4px 15px ${milestone.accentGlow}`,
                            transform: isHovered ? 'scale(1.2)' : 'scale(1)',
                            transition: 'all 0.4s ease',
                        }}
                    >
                        <span className="text-white font-bold text-lg">{milestone.number}</span>
                    </div>
                </div>

                {/* Empty space for alternating */}
                <div className="w-5/12"></div>
            </div>

            {/* Mobile/Tablet layout */}
            <div className="flex lg:hidden items-start w-full gap-4">
                {/* Timeline line + circle */}
                <div className="flex flex-col items-center flex-shrink-0">
                    <div
                        className="w-11 h-11 rounded-full flex items-center justify-center z-10 relative"
                        style={{
                            background: `linear-gradient(135deg, ${milestone.color}, ${milestone.color}CC)`,
                            boxShadow: `0 4px 15px ${milestone.accentGlow}`,
                        }}
                    >
                        <span className="text-white font-bold text-sm">{milestone.number}</span>
                    </div>
                    <div
                        className="w-0.5 flex-1 mt-2"
                        style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                    ></div>
                </div>

                {/* Card */}
                <div className="flex-1 pb-4">
                    <div
                        className="rounded-2xl p-5"
                        style={{
                            background: 'rgba(30, 41, 59, 0.6)',
                            backdropFilter: 'blur(12px)',
                            border: 'none',
                            borderTop: `3px solid ${milestone.color}`,
                            borderLeft: '1px solid rgba(255, 255, 255, 0.06)',
                            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        }}
                    >
                        <div
                            className="inline-flex items-center px-3 py-1 rounded-full mb-3"
                            style={{
                                background: `${milestone.color}15`,
                                border: `1px solid ${milestone.color}30`,
                            }}
                        >
                            <span className="text-xs font-bold" style={{ color: milestone.color }}>
                                {milestone.year}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                            {milestone.title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EraSection({ era }: { era: typeof eras[0] }) {
    const eraRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.3 }
        );

        if (eraRef.current) {
            observer.observe(eraRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={eraRef}
            className="flex justify-center my-16 lg:my-20"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
        >
            <div className="text-center relative">
                {/* Background glow */}
                <div
                    className="absolute inset-0 rounded-full opacity-20"
                    style={{
                        background: `radial-gradient(circle, ${era.color}, transparent 70%)`,
                        filter: 'blur(30px)',
                        transform: 'scale(2)',
                    }}
                ></div>

                <div
                    className="relative inline-flex flex-col items-center px-10 py-6 rounded-2xl"
                    style={{
                        background: 'rgba(30, 41, 59, 0.5)',
                        backdropFilter: 'blur(12px)',
                        border: `1px solid ${era.color}30`,
                    }}
                >
                    <div
                        className="text-3xl lg:text-4xl font-black mb-1"
                        style={{ color: era.color }}
                    >
                        {era.label}
                    </div>
                    <div className="text-sm font-semibold mb-1" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {era.subtitle}
                    </div>
                    <div className="text-xs font-medium" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>
                        {era.range}
                    </div>
                    {/* Decorative line */}
                    <div
                        className="w-16 h-0.5 rounded-full mt-3"
                        style={{ background: `linear-gradient(90deg, transparent, ${era.color}, transparent)` }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default function OurJourney() {
    // Group milestones by era
    const era1 = milestones.filter((m) => m.era === 1);
    const era2 = milestones.filter((m) => m.era === 2);
    const era3 = milestones.filter((m) => m.era === 3);
    const era4 = milestones.filter((m) => m.era === 4);
    const eraGroups = [
        { era: eras[0], items: era1 },
        { era: eras[1], items: era2 },
        { era: eras[2], items: era3 },
        { era: eras[3], items: era4 },
    ];

    return (
        <div className="min-h-screen" style={{ background: '#0B1121' }}>
            <Header currentPage="our-journey" />

            {/* Hero Section */}
            <section
                className="relative overflow-hidden py-28 lg:py-36"
                style={{
                    background: 'linear-gradient(135deg, #0B1121 0%, #1a2744 50%, #0B1121 100%)',
                }}
            >
                {/* Background decorations */}
                <div
                    className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #06B6D4, transparent 70%)',
                        filter: 'blur(80px)',
                        transform: 'translate(-30%, -30%)',
                    }}
                ></div>
                <div
                    className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10"
                    style={{
                        background: 'radial-gradient(circle, #2563EB, transparent 70%)',
                        filter: 'blur(80px)',
                        transform: 'translate(30%, 30%)',
                    }}
                ></div>

                {/* Floating particles */}
                <div
                    className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full"
                    style={{ background: '#06B6D4', opacity: 0.3, animation: 'float 6s ease-in-out infinite' }}
                ></div>
                <div
                    className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full"
                    style={{ background: '#2563EB', opacity: 0.2, animation: 'float 8s ease-in-out infinite reverse' }}
                ></div>
                <div
                    className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full"
                    style={{ background: '#8B5CF6', opacity: 0.3, animation: 'float 7s ease-in-out infinite 1s' }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div
                        className="inline-flex items-center px-4 py-2 rounded-full mb-8"
                        style={{
                            background: 'rgba(6, 182, 212, 0.1)',
                            border: '1px solid rgba(6, 182, 212, 0.2)',
                            animation: 'fadeInUp 0.8s ease-out',
                        }}
                    >
                        <svg className="w-4 h-4 mr-2" style={{ color: '#06B6D4' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span style={{ color: '#06B6D4' }} className="text-sm font-semibold tracking-wider uppercase">
                            Our Journey
                        </span>
                    </div>

                    <h1
                        className="text-5xl lg:text-7xl font-bold mb-6"
                        style={{
                            background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            letterSpacing: '-0.03em',
                            animation: 'fadeInUp 0.8s ease-out 0.1s both',
                        }}
                    >
                        Building the Future
                    </h1>

                    <div
                        className="w-24 h-1 mx-auto rounded-full mb-8"
                        style={{
                            background: 'linear-gradient(90deg, #06B6D4, #2563EB)',
                            animation: 'fadeInUp 0.8s ease-out 0.2s both',
                        }}
                    ></div>

                    <p
                        className="text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-medium"
                        style={{
                            color: 'rgba(255, 255, 255, 0.7)',
                            animation: 'fadeInUp 0.8s ease-out 0.3s both',
                        }}
                    >
                        Over a decade of innovation, growth, and relentless pursuit of excellence in industrial packaging solutions.
                    </p>

                    {/* Stats row */}
                    <div
                        className="flex flex-wrap justify-center gap-8 lg:gap-16 mt-12"
                        style={{ animation: 'fadeInUp 0.8s ease-out 0.5s both' }}
                    >
                        {[
                            { value: '15+', label: 'Years of Innovation' },
                            { value: '12', label: 'Key Milestones' },
                            { value: '4', label: 'Growth Eras' },
                            { value: '300%', label: 'Capacity Growth' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div
                                    className="text-3xl lg:text-4xl font-black"
                                    style={{
                                        background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {stat.value}
                                </div>
                                <div className="text-xs lg:text-sm mt-1" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section
                className="py-20 lg:py-28 relative"
                style={{
                    background: 'linear-gradient(180deg, #0B1121 0%, #111d36 50%, #0B1121 100%)',
                }}
            >
                {/* Vertical center line (desktop only) */}
                <div
                    className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5"
                    style={{
                        background: 'linear-gradient(180deg, transparent, rgba(6, 182, 212, 0.2) 10%, rgba(6, 182, 212, 0.2) 90%, transparent)',
                        transform: 'translateX(-50%)',
                    }}
                ></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    {eraGroups.map((group, groupIndex) => (
                        <div key={groupIndex}>
                            <EraSection era={group.era} />
                            {group.items.map((milestone, itemIndex) => {
                                // Calculate the global index for alternating
                                const globalIndex = milestones.findIndex((m) => m.number === milestone.number);
                                return (
                                    <TimelineCard
                                        key={milestone.number}
                                        milestone={milestone}
                                        index={globalIndex}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-20 relative overflow-hidden">
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(37, 99, 235, 0.1))',
                    }}
                ></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-6" style={{ color: '#fff' }}>
                        The Journey{' '}
                        <span
                            style={{
                                background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Continues
                        </span>
                    </h2>
                    <p className="text-xl mb-10" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                        Join us as we shape the future of industrial packaging solutions across the MENA region and beyond.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a
                            href="/contact"
                            className="px-8 py-4 rounded-xl font-semibold text-lg text-white transition-all duration-300 hover:shadow-lg"
                            style={{
                                background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)',
                            }}
                        >
                            Partner With Us →
                        </a>
                        <a
                            href="/about"
                            className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                            style={{
                                border: '2px solid rgba(255, 255, 255, 0.2)',
                                color: 'rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            Learn About PAFT
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
