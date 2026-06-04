import { useEffect, useState } from 'react';

import {
    stockIn,
    stockOut,
    getLedger
} from '../../api/inventoryApi';

const Inventory = () => {

    const [form, setForm] = useState({
        product_id: '',
        quantity: '',
        remarks: ''
    });

    const [ledger, setLedger] =
        useState([]);

    useEffect(() => {
        loadLedger();
    }, []);

    const loadLedger = async () => {

        try {

            const response =
                await getLedger();

            setLedger(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value
        });
    };

    const handleStockIn =
        async () => {

            try {

                await stockIn(form);

                alert('Stock Added');

                loadLedger();

            } catch (error) {

                console.error(error);
            }
        };

    const handleStockOut =
        async () => {

            try {

                await stockOut(form);

                alert('Stock Removed');

                loadLedger();

            } catch (error) {

                console.error(error);
            }
        };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Inventory
            </h1>

            <div className="bg-white p-5 rounded shadow mb-6">

                <div className="grid grid-cols-3 gap-4">

                    <input
                        name="product_id"
                        placeholder="Product ID"
                        value={form.product_id}
                        onChange={handleChange}
                        className="border p-2"
                    />

                    <input
                        name="quantity"
                        placeholder="Quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        className="border p-2"
                    />

                    <input
                        name="remarks"
                        placeholder="Remarks"
                        value={form.remarks}
                        onChange={handleChange}
                        className="border p-2"
                    />

                </div>

                <div className="mt-4 flex gap-4">

                    <button
                        onClick={handleStockIn}
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Stock In
                    </button>

                    <button
                        onClick={handleStockOut}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Stock Out
                    </button>

                </div>

            </div>

            <table className="w-full bg-white shadow">

                <thead>

                    <tr>

                        <th className="p-3">
                            Type
                        </th>

                        <th className="p-3">
                            Qty
                        </th>

                        <th className="p-3">
                            Before
                        </th>

                        <th className="p-3">
                            After
                        </th>

                        <th className="p-3">
                            Remarks
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {ledger.map(item => (

                        <tr key={item.id}>

                            <td className="p-3">
                                {item.transaction_type}
                            </td>

                            <td className="p-3">
                                {item.quantity}
                            </td>

                            <td className="p-3">
                                {item.stock_before}
                            </td>

                            <td className="p-3">
                                {item.stock_after}
                            </td>

                            <td className="p-3">
                                {item.remarks}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default Inventory;