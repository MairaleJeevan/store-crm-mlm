import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaExclamationTriangle
} from 'react-icons/fa';

import {
    getLowStockProducts
} from '../../api/productApi';

const LowStock = () => {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            setLoading(true);

            const response =
                await getLowStockProducts();

            setProducts(
                response.data
            );

        } catch (error) {

            toast.error(
                'Failed To Load Low Stock Products'
            );

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="space-y-6">

            <div className="flex items-center gap-3">

                <FaExclamationTriangle
                    className="text-red-500"
                    size={30}
                />

                <h1 className="text-3xl font-bold">
                    Low Stock Products
                </h1>

            </div>

            {loading && (

                <div className="bg-blue-50 text-blue-600 p-3 rounded">
                    Loading Products...
                </div>

            )}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Product
                            </th>

                            <th className="p-4 text-left">
                                Current Stock
                            </th>

                            <th className="p-4 text-left">
                                Minimum Stock
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            products.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No Low Stock Products
                                    </td>

                                </tr>

                            ) : (

                                products.map(product => (

                                    <tr
                                        key={product.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4 font-medium">
                                            {product.product_name}
                                        </td>

                                        <td className="p-4">
                                            {product.stock_quantity}
                                        </td>

                                        <td className="p-4">
                                            {product.min_stock}
                                        </td>

                                        <td className="p-4">

                                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                                                LOW STOCK
                                            </span>

                                        </td>

                                    </tr>

                                ))
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default LowStock;