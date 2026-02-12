export default function MarketsLoading() {
    return (
        <div className="min-h-screen" style={{ background: '#0B1121' }}>
            {/* Header skeleton */}
            <div className="h-16" style={{ background: 'rgba(15,23,42,0.97)' }} />

            {/* Hero skeleton */}
            <section className="py-20 lg:py-28">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div
                        className="inline-block h-8 w-40 rounded-full mb-8 animate-pulse"
                        style={{ background: 'rgba(6,182,212,0.1)' }}
                    />
                    <div
                        className="h-16 w-80 mx-auto rounded-xl mb-6 animate-pulse"
                        style={{ background: 'rgba(255,255,255,0.05)' }}
                    />
                    <div
                        className="h-6 w-[500px] max-w-full mx-auto rounded-lg animate-pulse"
                        style={{ background: 'rgba(255,255,255,0.03)' }}
                    />
                </div>
            </section>

            {/* Map skeleton */}
            <div
                className="w-full h-[600px] lg:h-[800px] flex items-center justify-center"
                style={{ background: 'rgba(13,21,41,0.8)' }}
            >
                <div className="text-center">
                    <div
                        className="w-14 h-14 border-4 rounded-full mx-auto mb-4 animate-spin"
                        style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#06B6D4' }}
                    />
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        Loading Markets…
                    </p>
                </div>
            </div>
        </div>
    );
}
