import { useEffect, useState } from 'react';

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

    useEffect(() => {

        loadDashboard();
        loadAnalytics();

    }, []);

    const loadDashboard =
        async () => {

            try {

                const response =
                    await getDashboardSummary();

                setSummary(
                    response.data.data
                );

            } catch (error) {

                console.log(error);
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

                console.log(error);
            }
        };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500">
                        Customers
                    </h3>

                    <h2 className="text-3xl font-bold">
                        {summary.customers}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500">
                        Leads
                    </h3>

                    <h2 className="text-3xl font-bold">
                        {summary.leads}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500">
                        Revenue
                    </h3>

                    <h2 className="text-3xl font-bold">
                        ₹{summary.totalSales}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500">
                        Commission
                    </h3>

                    <h2 className="text-3xl font-bold">
                        ₹{summary.totalCommission}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded shadow">
                    <h3 className="text-gray-500">
                        Incentives
                    </h3>

                    <h2 className="text-3xl font-bold">
                        ₹{summary.totalIncentive}
                    </h2>
                </div>

                <div className="bg-white p-6 rounded shadow">

                    <h3 className="text-gray-500 mb-2">
                        Target Achievement
                    </h3>

                    <h2 className="text-3xl font-bold mb-3">
                        {summary.achievement?.toFixed(1)}%
                    </h2>

                    <div className="w-full bg-gray-200 rounded-full h-4">

                        <div
                            className="bg-green-500 h-4 rounded-full"
                            style={{
                                width:
                                    `${summary.achievement}%`
                            }}
                        />

                    </div>

                </div>

            </div>

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-2xl font-bold mb-4">
                    Revenue Analytics
                </h2>

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
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
};

export default Dashboard;