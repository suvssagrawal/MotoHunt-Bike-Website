import Link from 'next/link';
import Image from 'next/image';

export default function BikeCard({ bike }) {
    return (
        <Link href={`/bikes/${bike.id}`}>
            <div className="group bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 bg-gray-700 overflow-hidden">
                    {bike.image_url ? (
                        <img
                            src={bike.image_url}
                            alt={bike.model_name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                            🏍️
                        </div>
                    )}
                    {bike.is_trending === 1 && (
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                            🔥 TRENDING
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-500 transition-colors">
                        {bike.model_name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">{bike.brand_name}</p>

                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-2xl font-bold text-amber-500">
                                ₹{(bike.price_on_road / 100000).toFixed(2)}L
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-400">Engine</p>
                            <p className="text-white font-semibold">{bike.engine_cc}cc</p>
                        </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-700">
                        <span className="inline-block bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">
                            {bike.type}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
