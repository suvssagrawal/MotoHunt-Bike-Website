'use client';

import { useEffect, useState } from 'react';
import BikeCard from '@/components/BikeCard';

export default function BikesPage() {
    const [bikes, setBikes] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [ccRange, setCcRange] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchBrands();
        fetchBikes();
    }, []);

    const fetchBrands = async () => {
        try {
            const res = await fetch(`${API_URL}/api/brands`);
            const data = await res.json();
            setBrands(data.brands || []);
        } catch (error) {
            console.error('Failed to fetch brands:', error);
        }
    };

    const fetchBikes = async () => {
        try {
            setLoading(true);
            let query = `${API_URL}/api/bikes?`;

            if (minPrice) query += `minPrice=${minPrice}&`;
            if (maxPrice) query += `maxPrice=${maxPrice}&`;
            if (selectedBrand) query += `brand=${selectedBrand}&`;
            if (selectedType) query += `type=${selectedType}&`;

            if (ccRange) {
                const [min, max] = ccRange.split('-');
                if (min) query += `minCC=${min}&`;
                if (max && max !== '+') query += `maxCC=${max}&`;
            }

            const res = await fetch(query);
            const data = await res.json();
            setBikes(data.bikes || []);
        } catch (error) {
            console.error('Failed to fetch bikes:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = () => {
        fetchBikes();
    };

    const resetFilters = () => {
        setMinPrice('');
        setMaxPrice('');
        setSelectedBrand('');
        setSelectedType('');
        setCcRange('');
        fetchBikes();
    };

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Browse Motorcycles
                    </h1>
                    <p className="text-gray-400 text-lg">
                        {bikes.length} bikes available
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filter Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 sticky top-20">
                            <h2 className="text-xl font-bold text-white mb-6">Filters</h2>

                            {/* Price Range */}
                            <div className="mb-6">
                                <label className="block text-gray-300 mb-3 font-medium">
                                    Price Range (₹)
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm focus:border-amber-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Engine CC */}
                            <div className="mb-6">
                                <label className="block text-gray-300 mb-3 font-medium">
                                    Engine Capacity
                                </label>
                                <select
                                    value={ccRange}
                                    onChange={(e) => setCcRange(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                                >
                                    <option value="">All CC</option>
                                    <option value="0-200">0-200cc</option>
                                    <option value="200-400">200-400cc</option>
                                    <option value="400-">400cc+</option>
                                </select>
                            </div>

                            {/* Brand */}
                            <div className="mb-6">
                                <label className="block text-gray-300 mb-3 font-medium">
                                    Brand
                                </label>
                                <select
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                                >
                                    <option value="">All Brands</option>
                                    {brands.map((brand) => (
                                        <option key={brand.id} value={brand.name}>
                                            {brand.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Type */}
                            <div className="mb-6">
                                <label className="block text-gray-300 mb-3 font-medium">
                                    Body Type
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white focus:border-amber-500 focus:outline-none"
                                >
                                    <option value="">All Types</option>
                                    <option value="Cruiser">Cruiser</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Naked">Naked</option>
                                    <option value="Tourer">Tourer</option>
                                    <option value="Retro">Retro</option>
                                    <option value="Roadster">Roadster</option>
                                    <option value="Scrambler">Scrambler</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <button
                                    onClick={handleFilterChange}
                                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg"
                                >
                                    Apply Filters
                                </button>
                                <button
                                    onClick={resetFilters}
                                    className="w-full bg-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-gray-600"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bikes Grid */}
                    <div className="lg:col-span-3">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-80 bg-gray-800 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : bikes.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-gray-400 text-xl">No bikes found matching your filters</p>
                                <button
                                    onClick={resetFilters}
                                    className="mt-4 text-amber-500 hover:text-amber-400 font-semibold"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {bikes.map((bike) => (
                                    <BikeCard key={bike.id} bike={bike} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
