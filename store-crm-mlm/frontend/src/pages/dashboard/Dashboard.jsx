import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardSummary } from '../../api/reportApi';
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const Dashboard = () => {

    const { user } = useAuth();

    const [summary, setSummary] =
        useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await getDashboardSummary();

            setSummary(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const salesData = [
        {
            month: 'Jan',
            sales: 4000
        },
        {
            month: 'Feb',
            sales: 6500
        },
        {
            month: 'Mar',
            sales: 5200
        },
        {
            month: 'Apr',
            sales: 8000
        },
        {
            month: 'May',
            sales: 9200
        }
    ];

    const pieData = [
        {
            name: 'Sales',
            value: summary?.totalSales || 0
        },
        {
            name: 'Incentives',
            value: summary?.totalIncentives || 0
        },
        {
            name: 'Commissions',
            value: summary?.totalCommissions || 0
        }
    ];

    const COLORS = [
        '#0088FE',
        '#00C49F',
        '#FFBB28'
    ];

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="bg-white p-5 rounded shadow mb-6">

                <h2 className="text-xl font-semibold">
                    Welcome {user?.full_name}
                </h2>

                <p>
                    Role: {user?.role}
                </p>

            </div>

            {summary && (

                <>
                    <div className="grid grid-cols-4 gap-4 mb-8">

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Total Customers</h3>
                            <p className="text-3xl font-bold">
                                {summary.totalCustomers}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Total Products</h3>
                            <p className="text-3xl font-bold">
                                {summary.totalProducts}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Total Sales</h3>
                            <p className="text-3xl font-bold">
                                ₹{summary.totalSales}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Total MLM Users</h3>
                            <p className="text-3xl font-bold">
                                {summary.totalMLMUsers}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Total Incentives</h3>
                            <p className="text-3xl font-bold">
                                ₹{summary.totalIncentives}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Total Commissions</h3>
                            <p className="text-3xl font-bold">
                                ₹{summary.totalCommissions}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Today's Sales</h3>
                            <p className="text-3xl font-bold">
                                ₹{summary.todaySales}
                            </p>
                        </div>

                        <div className="bg-white p-5 rounded shadow">
                            <h3>Low Stock</h3>
                            <p className="text-3xl font-bold">
                                {summary.lowStockProducts}
                            </p>
                        </div>

                    </div>

                    {/* Charts */}

                    <div className="grid grid-cols-2 gap-6">

                        <div className="bg-white p-5 rounded shadow">

                            <h2 className="text-xl font-bold mb-4">
                                Monthly Sales
                            </h2>

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <BarChart data={salesData}>
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar
                                        dataKey="sales"
                                        fill="#3B82F6"
                                    />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                        <div className="bg-white p-5 rounded shadow">

                            <h2 className="text-xl font-bold mb-4">
                                Revenue Breakdown
                            </h2>

                            <ResponsiveContainer
                                width="100%"
                                height={300}
                            >
                                <PieChart>

                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        dataKey="value"
                                        label
                                    >

                                        {pieData.map(
                                            (
                                                entry,
                                                index
                                            ) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        COLORS[
                                                        index %
                                                        COLORS.length
                                                        ]
                                                    }
                                                />
                                            )
                                        )}

                                    </Pie>

                                    <Tooltip />

                                </PieChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </>
            )}

        </div>
    );
};

export default Dashboard;