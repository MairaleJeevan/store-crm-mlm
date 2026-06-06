import { useEffect, useState } from 'react';

import {
    getStockDashboard
} from '../../api/stockDashboardApi';

const StockDashboard = () => {

    const [data, setData] =
        useState(null);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const response =
                await getStockDashboard();

            setData(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    if (!data)
        return <p>Loading...</p>;

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Stock Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded shadow">

                    <h3>Total Products</h3>

                    <p className="text-3xl font-bold">
                        {data.totalProducts}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>Total Stock</h3>

                    <p className="text-3xl font-bold">
                        {data.totalStock}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>Inventory Value</h3>

                    <p className="text-3xl font-bold">
                        ₹{data.inventoryValue}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>Low Stock</h3>

                    <p className="text-3xl font-bold">
                        {data.lowStock}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default StockDashboard;