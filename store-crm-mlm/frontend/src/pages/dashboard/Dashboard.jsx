import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaUsers,
    FaUserPlus,
    FaRupeeSign,
    FaCoins,
    FaBullseye
} from 'react-icons/fa';

import {
    getDashboardSummary
} from '../../api/dashboardApi';

import {
    getAnalytics
} from '../../api/analyticsApi';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const Dashboard = () => {

    const [summary, setSummary] =
        useState({
            customers: 0,
            leads: 0,
            totalSales: 0,
            totalCommission: 0,
            totalIncentive: 0,
            totalTarget: 0,
            achievement: 0
        });

    const [chartData, setChartData] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadDashboard();
        loadAnalytics();

    }, []);

    const loadDashboard =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getDashboardSummary();

                setSummary(
                    response.data.data
                );

            } catch (error) {

                toast.error(
                    'Failed To Load Dashboard'
                );

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

    const loadAnalytics =
        async () => {

            try {

                const response =
                    await getAnalytics();

                setChartData(
                    response.data.data
                );

            } catch (error) {

                toast.error(
                    'Failed To Load Analytics'
                );

                console.error(error);
            }
        };

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            {
                loading && (
                    <div className="bg-blue-50 text-blue-600 p-3 rounded mb-4">
                        Loading Dashboard...
                    </div>
                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                <div className="bg-blue-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaUsers size={35} />

                    <h3 className="mt-3">
                        Customers
                    </h3>

                    <h2 className="text-3xl font-bold">
                        {summary.customers}
                    </h2>

                </div>

                <div className="bg-purple-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaUserPlus size={35} />

                    <h3 className="mt-3">
                        Leads
                    </h3>

                    <h2 className="text-3xl font-bold">
                        {summary.leads}
                    </h2>

                </div>

                <div className="bg-green-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaRupeeSign size={35} />

                    <h3 className="mt-3">
                        Revenue
                    </h3>

                    <h2 className="text-3xl font-bold">
                        ₹{Number(
                            summary.totalSales || 0
                        ).toLocaleString()}
                    </h2>

                </div>

                <div className="bg-indigo-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaCoins size={35} />

                    <h3 className="mt-3">
                        Commission
                    </h3>

                    <h2 className="text-3xl font-bold">
                         ₹{Number(
                            summary.totalCommission || 0
                        ).toLocaleString()}
                    </h2>

                </div>

                <div className="bg-orange-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaCoins size={35} />

                    <h3 className="mt-3">
                        Incentives
                    </h3>

                    <h2 className="text-3xl font-bold">
                        ₹{Number(
                            summary.totalIncentive || 0
                        ).toLocaleString()}
                    </h2>

                </div>

                <div className="bg-red-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaBullseye size={35} />

                    <h3 className="mt-3 mb-2">
                        Target Achievement
                    </h3>

                    <h2 className="text-3xl font-bold mb-3">
                        {summary.achievement?.toFixed(1)}%
                    </h2>

                    <div className="w-full bg-white rounded-full h-3">

                        <div
                            className="bg-yellow-300 h-3 rounded-full"
                            style={{
                                width: `${Math.min(
                                    summary.achievement || 0,
                                    100
                                )}%`
                            }}
                        />

                    </div>

                </div>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

                <h2 className="text-2xl font-bold mb-4">
                    Revenue Analytics
                </h2>

                {
                    chartData.length === 0 ? (

                        <div className="text-center py-10 text-gray-500">
                            No Analytics Data Available
                        </div>

                    ) : (

                        <ResponsiveContainer
                            width="100%"
                            height={400}
                        >

                            <BarChart
                                data={chartData}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="month"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="revenue"
                                    fill="#22c55e"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    )
                }

            </div>

        </div>
    );
};

export default Dashboard;