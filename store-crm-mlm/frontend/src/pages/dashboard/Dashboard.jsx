import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getDashboardSummary } from '../../api/reportApi';

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

                <div className="grid grid-cols-4 gap-4">

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

            )}

        </div>
    );
};

export default Dashboard;