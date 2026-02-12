'use client';

import { useAuth } from '@/context/AuthContext';

interface AdminHeaderProps {
    onMenuToggle: () => void;
}

export default function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
    const { user, logout } = useAuth();

    return (
        <header className="sticky top-0 z-20 h-[70px] bg-[#0f1523]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-6">
            {/* Left side */}
            <div className="flex items-center gap-4">
                {/* Mobile menu toggle */}
                <button
                    onClick={onMenuToggle}
                    className="lg:hidden text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="hidden sm:block">
                    <h2 className="text-white text-sm font-semibold">Welcome back!</h2>
                    <p className="text-gray-500 text-xs">Manage your website content</p>
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
                {/* User info */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                        {user?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-white text-sm font-medium">{user?.name || 'Admin'}</p>
                        <p className="text-gray-500 text-xs capitalize">{user?.role || 'admin'}</p>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={logout}
                    className="ml-2 text-gray-400 hover:text-red-400 p-2 rounded-lg hover:bg-red-500/10 transition-all"
                    title="Logout"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </button>
            </div>
        </header>
    );
}
