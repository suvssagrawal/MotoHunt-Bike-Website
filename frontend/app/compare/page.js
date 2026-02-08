'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ComparePage() {
    const searchParams = useSearchParams();
    const [bikes, setBikes] = useState([]);
    const [selectedBike1, setSelectedBike1] = useState(searchParams.get('id1') || '');
    const [selectedBike2, setSelectedBike2] = useState(searchParams.get('id2') || '');
    const [bike1Data, setBike1Data] = useState(null);
    const [bike2Data, setBike2Data] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    useEffect(() => {
        fetchAllBikes();
        if (selectedBike1 && selectedBike2) {
            compareBikes();
        }
    }, []);

    const fetchAllBikes = async () => {
        try {
            const res = await fetch(`${API_URL}/api/bikes`);
            const data = await res.json();
            setBikes(data.bikes || []);
        } catch (error) {
            console.error('Failed to fetch bikes:', error);
        }
    };

    const compareBikes = async () => {
        if (!selectedBike1 || !selectedBike2) {
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(
                `${API_URL}/api/bikes/compare/data?id1=${selectedBike1}&id2=${selectedBike2}`
            );
            const data = await res.json();
            setBike1Data(data.bike1);
            setBike2Data(data.bike2);
        } catch (error) {
            console.error('Failed to compare bikes:', error);
        } finally {
            setLoading(false);
        }
    };

    const getBetterValue = (bike1Val, bike2Val, lowerIsBetter = false) => {
        if (bike1Val === bike2Val) return 'equal';
        if (lowerIsBetter) {
            return bike1Val < bike2Val ? 'bike1' : 'bike2';
        }
        return bike1Val > bike2Val ? 'bike1' : 'bike2';
    };

    return (
        <div className="min-h-screen">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 border-b border-gray-700 py-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Compare Motorcycles
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Side-by-side spec comparison
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Bike Selectors */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div>
                        <label className="block text-gray-300 mb-3 font-medium text-lg">
                            Select First Bike
                        </label>
                        <select
                            value={selectedBike1}
                            onChange={(e) => setSelectedBike1(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                        >
                            <option value="">Choose a bike...</option>
                            {bikes.map((bike) => (
                                <option key={bike.id} value={bike.id}>
                                    {bike.brand_name} {bike.model_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-3 font-medium text-lg">
                            Select Second Bike
                        </label>
                        <select
                            value={selectedBike2}
                            onChange={(e) => setSelectedBike2(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-amber-500 focus:outline-none"
                        >
                            <option value="">Choose a bike...</option>
                            {bikes.map((bike) => (
                                <option key={bike.id} value={bike.id}>
                                    {bike.brand_name} {bike.model_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="text-center mb-8">
                    <button
                        onClick={compareBikes}
                        disabled={!selectedBike1 || !selectedBike2 || loading}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Comparing...' : 'Compare'}
                    </button>
                </div>

                {/* Comparison Table */}
                {bike1Data && bike2Data && (
                    <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-900">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-gray-400 font-semibold">
                                            Specification
                                        </th>
                                        <th className="px-6 py-4 text-center">
                                            <div className="text-white font-bold text-lg">
                                                {bike1Data.brand_name} {bike1Data.model_name}
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center">
                                            <div className="text-white font-bold text-lg">
                                                {bike2Data.brand_name} {bike2Data.model_name}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <CompareRow
                                        label="Price (On-Road)"
                                        value1={`₹${(bike1Data.price_on_road / 100000).toFixed(2)}L`}
                                        value2={`₹${(bike2Data.price_on_road / 100000).toFixed(2)}L`}
                                        better={getBetterValue(bike1Data.price_on_road, bike2Data.price_on_road, true)}
                                    />
                                    <CompareRow
                                        label="Engine Capacity"
                                        value1={`${bike1Data.engine_cc}cc`}
                                        value2={`${bike2Data.engine_cc}cc`}
                                        better={getBetterValue(bike1Data.engine_cc, bike2Data.engine_cc)}
                                    />
                                    <CompareRow
                                        label="Body Type"
                                        value1={bike1Data.type}
                                        value2={bike2Data.type}
                                        better="equal"
                                    />
                                    <CompareRow
                                        label="Trending Status"
                                        value1={bike1Data.is_trending === 1 ? '🔥 Yes' : 'No'}
                                        value2={bike2Data.is_trending === 1 ? '🔥 Yes' : 'No'}
                                        better="equal"
                                    />
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {!bike1Data && !bike2Data && !loading && (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg">
                            Select two bikes to compare their specifications
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

function CompareRow({ label, value1, value2, better }) {
    return (
        <tr className="border-t border-gray-700">
            <td className="px-6 py-4 text-gray-400 font-medium">{label}</td>
            <td
                className={`px-6 py-4 text-center font-semibold ${better === 'bike1' ? 'bg-green-500/10 text-green-500' : 'text-white'
                    }`}
            >
                {value1}
            </td>
            <td
                className={`px-6 py-4 text-center font-semibold ${better === 'bike2' ? 'bg-green-500/10 text-green-500' : 'text-white'
                    }`}
            >
                {value2}
            </td>
        </tr>
    );
}
