import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaWarehouse,
    FaArrowDown,
    FaArrowUp
} from 'react-icons/fa';

import {
    stockIn,
    stockOut,
    getLedger
} from '../../api/inventoryApi';

import {
    getProducts
} from '../../api/productApi';

const Inventory = () => {

    const [form, setForm] = useState({
        product_id: '',
        quantity: '',
        remarks: ''
    });

    const [ledger, setLedger] =
        useState([]);

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadLedger();
        loadProducts();

    }, []);

    const loadLedger = async () => {

        try {

            setLoading(true);

            const response =
                await getLedger();

            setLedger(
                response.data || []
            );

        } catch (error) {

            toast.error(
                'Failed To Load Inventory Ledger'
            );

        } finally {

            setLoading(false);
        }
    };

    const loadProducts = async () => {

        try {

            const response =
                await getProducts();

            setProducts(
                response.data || []
            );

        } catch (error) {

            toast.error(
                'Failed To Load Products'
            );
        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };

    const resetForm = () => {

        setForm({
            product_id: '',
            quantity: '',
            remarks: ''
        });
    };

    const handleStockIn = async () => {

        try {

            await stockIn(form);

            toast.success(
                'Stock Added Successfully'
            );

            resetForm();

            loadLedger();
            loadProducts();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                'Stock In Failed'
            );
        }
    };

    const handleStockOut = async () => {

        try {

            await stockOut(form);

            toast.success(
                'Stock Removed Successfully'
            );

            resetForm();

            loadLedger();
            loadProducts();

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                'Stock Out Failed'
            );
        }
    };

    const selectedProduct =
        products.find(
            p => p.id === form.product_id
        );

    return (

        <div className="space-y-6">

            <div className="flex items-center gap-3">

                <FaWarehouse
                    className="text-blue-600"
                    size={30}
                />

                <h1 className="text-3xl font-bold">
                    Inventory Management
                </h1>

            </div>

            <div className="bg-white p-6 rounded-xl shadow">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    <select
                        name="product_id"
                        value={form.product_id}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    >

                        <option value="">
                            Select Product
                        </option>

                        {products.map(product => (

                            <option
                                key={product.id}
                                value={product.id}
                            >
                                {product.product_name}
                            </option>

                        ))}

                    </select>

                    <input
                        name="quantity"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                    <input
                        name="remarks"
                        placeholder="Remarks"
                        value={form.remarks}
                        onChange={handleChange}
                        className="border p-3 rounded"
                    />

                </div>

                {selectedProduct && (

                    <div className="mt-4 bg-blue-50 text-blue-700 p-3 rounded">

                        Current Stock:

                        <span className="font-bold ml-2">

                            {selectedProduct.stock_quantity}

                        </span>

                    </div>

                )}

                <div className="mt-4 flex gap-4">

                    <button
                        onClick={handleStockIn}
                        className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaArrowDown />
                        Stock In
                    </button>

                    <button
                        onClick={handleStockOut}
                        className="bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <FaArrowUp />
                        Stock Out
                    </button>

                </div>

            </div>

            {loading && (

                <div className="bg-blue-50 text-blue-600 p-3 rounded">
                    Loading Inventory Ledger...
                </div>

            )}

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Type
                            </th>

                            <th className="p-4 text-left">
                                Quantity
                            </th>

                            <th className="p-4 text-left">
                                Before
                            </th>

                            <th className="p-4 text-left">
                                After
                            </th>

                            <th className="p-4 text-left">
                                Remarks
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            ledger.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No Inventory Records Found
                                    </td>

                                </tr>

                            ) : (

                                ledger.map(item => (

                                    <tr
                                        key={item.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4">

                                            <span
                                                className={
                                                    item.transaction_type === 'STOCK_IN'
                                                        ? 'text-green-600 font-semibold'
                                                        : 'text-red-600 font-semibold'
                                                }
                                            >
                                                {item.transaction_type}
                                            </span>

                                        </td>

                                        <td className="p-4">
                                            {item.quantity}
                                        </td>

                                        <td className="p-4">
                                            {item.stock_before}
                                        </td>

                                        <td className="p-4">
                                            {item.stock_after}
                                        </td>

                                        <td className="p-4">
                                            {item.remarks}
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

export default Inventory;