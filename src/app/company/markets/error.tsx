'use client';

export default function MarketsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ background: '#0B1121' }}
        >
            <div className="text-center max-w-md">
                <div
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                    style={{ background: 'rgba(239,68,68,0.1)' }}
                >
                    <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-bold mb-3" style={{ color: '#fff' }}>
                    Something Went Wrong
                </h2>
                <p className="mb-8 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    {error.message || 'Failed to load the Markets page. Please try again.'}
                </p>

                <button
                    onClick={reset}
                    className="px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300"
                    style={{
                        background: 'linear-gradient(135deg, #06B6D4, #2563EB)',
                        boxShadow: '0 4px 15px rgba(6,182,212,0.3)',
                    }}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
