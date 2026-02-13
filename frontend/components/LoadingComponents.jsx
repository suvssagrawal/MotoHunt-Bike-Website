export default function LoadingSpinner({ size = 'md', color = 'amber' }) {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    const colors = {
        amber: 'border-amber-500',
        white: 'border-white',
        blue: 'border-blue-500',
        gray: 'border-gray-500'
    };

    return (
        <div className={`${sizes[size]} animate-spin rounded-full border-4 border-t-transparent ${colors[color]}`} />
    );
}

export function LoadingSkeleton({ className = '', count = 1 }) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 
                                bg-[length:200%_100%] rounded-lg ${className}`}
                    style={{
                        animation: 'shimmer-skeleton 2s ease-in-out infinite'
                    }}
                />
            ))}
        </>
    );
}

export function BikeCardSkeleton() {
    return (
        <div className="glass-3d rounded-2xl overflow-hidden border border-gray-700/50 p-4">
            <LoadingSkeleton className="h-48 mb-4" />
            <LoadingSkeleton className="h-6 w-3/4 mb-2" />
            <LoadingSkeleton className="h-4 w-1/2 mb-4" />
            <LoadingSkeleton className="h-10 w-full" />
        </div>
    );
}

export function ButtonSpinner() {
    return (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    );
}

export function PageLoader() {
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="glass-strong rounded-3xl p-12 flex flex-col items-center gap-6">
                <LoadingSpinner size="xl" color="amber" />
                <p className="text-white text-xl font-semibold animate-pulse">Loading...</p>
            </div>
        </div>
    );
}
