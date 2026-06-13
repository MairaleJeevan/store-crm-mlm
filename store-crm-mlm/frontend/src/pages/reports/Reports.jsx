import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaUsers,
    FaCar,
    FaWarehouse,
    FaCheckCircle,
    FaFileExport,
    FaRupeeSign
} from 'react-icons/fa';

import {
    getBusinessReport,
    getSalesReport
} from '../../api/reportApi';

const Reports = () => {

    const [report, setReport] =
        useState(null);

    const [sales, setSales] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadReport();
        loadSales();

    }, []);

    const loadReport = async () => {

        try {

            setLoading(true);

            const response =
                await getBusinessReport();

            setReport(response);

        } catch (error) {

            toast.error(
                'Failed To Load Report'
            );

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    const loadSales = async () => {

        try {

            const response =
                await getSalesReport();

            setSales(
                response.data || []
            );

        } catch (error) {

            toast.error(
                'Failed To Load Sales Report'
            );

            console.error(error);
        }
    };

    const exportCSV = () => {

        const headers = [
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

        toast.success(
            'CSV Exported Successfully'
        );
    };

    const totalSales =
        sales.reduce(
            (sum, item) =>
                sum +
                Number(item.amount),
            0
        );

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Reports Dashboard
            </h1>

            {
                loading && (

                    <div className="bg-blue-50 text-blue-600 p-3 rounded">
                        Loading Reports...
                    </div>

                )
            }

            {
                report && (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                        <div className="bg-blue-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                            <FaUsers size={35} />

                            <h3 className="mt-3">
                                Customers
                            </h3>

                            <h2 className="text-4xl font-bold">
                                {report.customers}
                            </h2>

                        </div>

                        <div className="bg-purple-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                            <FaCar size={35} />

                            <h3 className="mt-3">
                                Vehicles
                            </h3>

                            <h2 className="text-4xl font-bold">
                                {report.vehicles}
                            </h2>

                        </div>

                        <div className="bg-orange-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                            <FaWarehouse size={35} />

                            <h3 className="mt-3">
                                Inventory Logs
                            </h3>

                            <h2 className="text-4xl font-bold">
                                {report.inventory}
                            </h2>

                        </div>

                        <div className="bg-green-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                            <FaCheckCircle size={35} />

                            <h3 className="mt-3">
                                CRM Status
                            </h3>

                            <h2 className="text-3xl font-bold">
                                Active
                            </h2>

                        </div>

                    </div>

                )
            }

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <div className="p-6 border-b">

                    <div className="flex justify-between items-center">

                        <h2 className="text-2xl font-bold">
                            Sales Report
                        </h2>

                        <button
                            onClick={exportCSV}
                            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                        >
                            <FaFileExport />
                            Export CSV
                        </button>

                    </div>

                    <div className="mt-4 flex items-center gap-2">

                        <FaRupeeSign
                            className="text-green-600"
                        />

                        <span className="font-bold">
                            Total Sales:
                        </span>

                        <span className="text-green-600 font-bold text-lg">
                            ₹{Number(
                                totalSales
                            ).toLocaleString()}
                        </span>

                    </div>

                </div>

                <div className="overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="bg-gray-100">

                                <th className="p-4 text-left">
                                    Date
                                </th>

                                <th className="p-4 text-left">
                                    Vehicle
                                </th>

                                <th className="p-4 text-left">
                                    Sale Type
                                </th>

                                <th className="p-4 text-left">
                                    Amount
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                sales.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="text-center p-6 text-gray-500"
                                        >
                                            No Sales Records Found
                                        </td>

                                    </tr>

                                ) : (

                                    sales.map(item => (

                                        <tr
                                            key={item.id}
                                            className="border-t hover:bg-gray-50"
                                        >

                                            <td className="p-4">

                                                {
                                                    new Date(
                                                        item.created_at
                                                    ).toLocaleDateString()
                                                }

                                            </td>

                                            <td className="p-4">
                                                {item.vehicle_number}
                                            </td>

                                            <td className="p-4">
                                                {item.sale_type}
                                            </td>

                                            <td className="p-4 text-green-600 font-semibold">
                                                ₹{Number(
                                                    item.amount
                                                ).toLocaleString()}
                                            </td>

                                        </tr>

                                    ))
                                )
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default Reports;