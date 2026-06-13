import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaBoxes,
    FaWarehouse,
    FaRupeeSign,
    FaExclamationTriangle
} from 'react-icons/fa';

import {
    getStockDashboard
} from '../../api/stockDashboardApi';

const StockDashboard = () => {

    const [data, setData] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            setLoading(true);

            const response =
                await getStockDashboard();

            setData(response.data);

        } catch (error) {

            toast.error(
                'Failed To Load Stock Dashboard'
            );

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    if (loading) {

        return (

            <div className="bg-blue-50 text-blue-600 p-4 rounded">
                Loading Stock Dashboard...
            </div>

        );
    }

    if (!data) {

        return (

            <div className="bg-red-50 text-red-600 p-4 rounded">
                No Stock Data Available
            </div>

        );
    }

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Stock Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-blue-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaBoxes size={35} />

                    <h3 className="mt-3">
                        Total Products
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {data.totalProducts}
                    </h2>

                </div>

                <div className="bg-green-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaWarehouse size={35} />

                    <h3 className="mt-3">
                        Total Stock
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {data.totalStock}
                    </h2>

                </div>

                <div className="bg-purple-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaRupeeSign size={35} />

                    <h3 className="mt-3">
                        Inventory Value
                    </h3>

                    <h2 className="text-4xl font-bold">
                        ₹{Number(
                            data.inventoryValue || 0
                        ).toLocaleString()}
                    </h2>

                </div>

                <div className="bg-red-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaExclamationTriangle size={35} />

                    <h3 className="mt-3">
                        Low Stock Items
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {data.lowStock}
                    </h2>

                </div>

            </div>

        </div>
    );
};

export default StockDashboard;