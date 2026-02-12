'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { adminPagesApi, adminProductsApi, siteContentApi } from '@/lib/api';
import Link from 'next/link';

interface Stats {
  pages: number;
  products: number;
  siteContent: number;
}

export default function AdminDashboard() {
  const { token } = useAuth();
  const [stats, setStats] = useState<Stats>({ pages: 0, products: 0, siteContent: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    const fetchStats = async () => {
      try {
        const [pages, products, content] = await Promise.all([
          adminPagesApi.getAll(token),
          adminProductsApi.getAll(token),
          siteContentApi.getAll(token),
        ]);
        setStats({
          pages: pages.length,
          products: products.length,
          siteContent: content.length,
        });
      } catch (e) {
        console.error('Failed to load stats', e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [token]);

  const statCards = [
    {
      label: 'Total Pages',
      value: stats.pages,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
      bgGlow: 'shadow-blue-500/20',
      href: '/admin/pages',
    },
    {
      label: 'Total Products',
      value: stats.products,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'from-emerald-500 to-emerald-600',
      bgGlow: 'shadow-emerald-500/20',
      href: '/admin/products',
    },
    {
      label: 'Content Blocks',
      value: stats.siteContent,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
      bgGlow: 'shadow-purple-500/20',
      href: '/admin/site-content',
    },
  ];

  const quickActions = [
    { label: 'Manage Users', href: '/admin/users', icon: '👥' },
    { label: 'Add New Page', href: '/admin/pages?action=add', icon: '📄' },
    { label: 'Add New Product', href: '/admin/products?action=add', icon: '📦' },
    { label: 'Add Site Content', href: '/admin/site-content?action=add', icon: '🌐' },
    { label: 'Back to Website', href: '/', icon: '🔗' },
  ];

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your website content</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className={`group bg-[#151b2e] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 hover:shadow-xl ${card.bgGlow}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm">{card.label}</p>
                <p className="text-3xl font-bold text-white mt-2">
                  {loading ? (
                    <span className="inline-block w-12 h-8 bg-white/5 rounded animate-pulse" />
                  ) : (
                    card.value
                  )}
                </p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white shadow-lg ${card.bgGlow}`}>
                {card.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
              <span>View all →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="bg-[#151b2e] border border-white/5 rounded-xl p-4 text-center hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-200 group"
            >
              <span className="text-2xl block mb-2">{action.icon}</span>
              <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                {action.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Language Info */}
      <div className="bg-[#151b2e] border border-white/5 rounded-2xl p-5">
        <h2 className="text-lg font-semibold text-white mb-3">Bilingual Content</h2>
        <p className="text-gray-400 text-sm mb-4">
          All content supports English (EN) and Arabic (AR) translations. Use the language tabs when editing content to manage both versions.
        </p>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2">
            <span className="text-blue-400 font-semibold text-sm">EN</span>
            <span className="text-gray-400 text-xs">English</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2">
            <span className="text-emerald-400 font-semibold text-sm">AR</span>
            <span className="text-gray-400 text-xs">العربية</span>
          </div>
        </div>
      </div>
    </div>
  );
}