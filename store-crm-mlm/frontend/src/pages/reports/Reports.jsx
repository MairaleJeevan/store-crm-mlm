import { useEffect, useState } from 'react';

import {
    getCustomerReport,
    getSalesReport,
    getInventoryReport
}
from '../../api/reportAdvancedApi';

const Reports = () => {

    const [customers, setCustomers] =
        useState(0);

    const [sales, setSales] =
        useState(0);

    const [inventory, setInventory] =
        useState(0);

    const [totalSales, setTotalSales] =
        useState(0);

    useEffect(() => {

        loadReports();

    }, []);

    const loadReports = async () => {

        try {

            const customerData =
                await getCustomerReport();

            const salesData =
                await getSalesReport();

            const inventoryData =
                await getInventoryReport();

            setCustomers(
                customerData.count
            );

            setSales(
                salesData.count
            );

            setInventory(
                inventoryData.count
            );

            setTotalSales(
                salesData.totalSales
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Reports Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded shadow">

                    <h3>Total Customers</h3>

                    <p className="text-3xl font-bold">
                        {customers}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>Total Sales Records</h3>

                    <p className="text-3xl font-bold">
                        {sales}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>Total Inventory Logs</h3>

                    <p className="text-3xl font-bold">
                        {inventory}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>Total Revenue</h3>

                    <p className="text-3xl font-bold">
                        ₹{totalSales}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default Reports;