import { useEffect, useState } from 'react';

import {
    getBusinessReport,
    getSalesReport
} from '../../api/reportApi';

const Reports = () => {

    const [report, setReport] =
        useState(null);

    const [sales, setSales] =
        useState([]);

    useEffect(() => {

        loadReport();
        loadSales();

    }, []);

    const loadReport = async () => {

        try {

            const response =
                await getBusinessReport();

            setReport(
                response
            );

        } catch (error) {

            console.error(error);
        }
    };

    const loadSales = async () => {

        try {

            const response =
                await getSalesReport();

            setSales(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    const exportCSV = () => {

        const headers =
            [
                'Date',
                'Vehicle',
                'Sale Type',
                'Amount'
            ];

        const rows =
            sales.map(item => [

                new Date(
                    item.created_at
                ).toLocaleDateString(),

                item.vehicle_number,

                item.sale_type,

                item.amount
            ]);

        const csvContent =
            [
                headers,
                ...rows
            ]
                .map(row =>
                    row.join(',')
                )
                .join('\n');

        const blob =
            new Blob(
                [csvContent],
                {
                    type:
                        'text/csv;charset=utf-8;'
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                'a'
            );

        link.href = url;

        link.download =
            'sales-report.csv';

        link.click();
    };

    const totalSales =
        sales.reduce(
            (
                sum,
                item
            ) =>
                sum +
                Number(
                    item.amount
                ),
            0
        );

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Reports Dashboard
            </h1>

            {report && (

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                    <div className="bg-white p-5 rounded shadow">

                        <h3 className="text-gray-500">
                            Customers
                        </h3>

                        <p className="text-4xl font-bold">
                            {report.customers}
                        </p>

                    </div>

                    <div className="bg-white p-5 rounded shadow">

                        <h3 className="text-gray-500">
                            Vehicles
                        </h3>

                        <p className="text-4xl font-bold">
                            {report.vehicles}
                        </p>

                    </div>

                    <div className="bg-white p-5 rounded shadow">

                        <h3 className="text-gray-500">
                            Inventory Logs
                        </h3>

                        <p className="text-4xl font-bold">
                            {report.inventory}
                        </p>

                    </div>

                    <div className="bg-white p-5 rounded shadow">

                        <h3 className="text-gray-500">
                            CRM Status
                        </h3>

                        <p className="text-green-600 text-3xl font-bold">
                            Active
                        </p>

                    </div>

                </div>

            )}

            <div className="bg-white p-6 rounded shadow">

                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-bold">
                        Sales Report
                    </h2>

                    <button
                        onClick={exportCSV}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Export CSV
                    </button>

                </div>

                <div className="mb-4">

                    <span className="font-bold text-lg">
                        Total Sales:
                    </span>

                    <span className="ml-2 text-green-600 font-bold">
                        ₹{totalSales}
                    </span>

                </div>

                <div className="overflow-x-auto">

                    <table className="min-w-full border">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="border p-3 text-left">
                                    Date
                                </th>

                                <th className="border p-3 text-left">
                                    Vehicle
                                </th>

                                <th className="border p-3 text-left">
                                    Sale Type
                                </th>

                                <th className="border p-3 text-left">
                                    Amount
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {sales.map(item => (

                                <tr
                                    key={item.id}
                                >

                                    <td className="border p-3">

                                        {
                                            new Date(
                                                item.created_at
                                            ).toLocaleDateString()
                                        }

                                    </td>

                                    <td className="border p-3">
                                        {
                                            item.vehicle_number
                                        }
                                    </td>

                                    <td className="border p-3">
                                        {
                                            item.sale_type
                                        }
                                    </td>

                                    <td className="border p-3 font-semibold text-green-600">
                                        ₹
                                        {
                                            item.amount
                                        }
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default Reports;