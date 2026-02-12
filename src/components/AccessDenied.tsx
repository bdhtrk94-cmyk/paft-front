'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface AccessDeniedProps {
  title?: string;
  message?: string;
  showUserInfo?: boolean;
}

export default function AccessDenied({ 
  title = "Access Denied", 
  message = "You don't have permission to access this page.",
  showUserInfo = true 
}: AccessDeniedProps) {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0e1a] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-3">{title}</h1>
        <p className="text-gray-400 mb-6">{message}</p>
        
        {showUserInfo && user && (
          <div className="bg-[#151b2e] border border-white/5 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Logged in as:</p>
            <p className="text-white font-medium">{user.name}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.role === 'admin' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {user.role === 'admin' ? '👑 Admin' : '👤 User'}
              </span>
            </div>
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go to Homepage
          </button>
          
          <button
            onClick={() => {
              logout();
              router.push('/login');
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Switch Account
          </button>
        </div>
      </div>
    </div>
  );
}