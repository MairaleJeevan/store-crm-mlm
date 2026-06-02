import { useState } from 'react';

const SaleForm = ({
    customerId,
    onSubmit
}) => {

    const [form, setForm] = useState({
        sale_type: 'VEHICLE',
        vehicle_number: '',
        number_plate_in: true,
        number_plate_out: false,
        quantity: 1,
        amount: ''
    });

    const handleChange = (e) => {

        const { name, value, type, checked } =
            e.target;

        setForm({
            ...form,
            [name]:
                type === 'checkbox'
                    ? checked
                    : value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            ...form,
            customer_id: customerId
        });
    };

    const incentive =
        Number(form.amount || 0) * 0.10;

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow"
        >

            <div className="grid grid-cols-2 gap-4">

                <input
                    name="vehicle_number"
                    placeholder="Vehicle Number"
                    value={form.vehicle_number}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <input
                    type="number"
                    name="quantity"
                    value={form.quantity}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={form.amount}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

            </div>

            <div className="flex gap-4 mt-4">

                <label>

                    <input
                        type="checkbox"
                        name="number_plate_in"
                        checked={
                            form.number_plate_in
                        }
                        onChange={handleChange}
                    />

                    <span className="ml-2">
                        Number Plate IN
                    </span>

                </label>

                <label>

                    <input
                        type="checkbox"
                        name="number_plate_out"
                        checked={
                            form.number_plate_out
                        }
                        onChange={handleChange}
                    />

                    <span className="ml-2">
                        Number Plate OUT
                    </span>

                </label>

            </div>

            <div className="mt-4 bg-green-100 p-3 rounded">

                Estimated Incentive:
                ₹ {incentive.toFixed(2)}

            </div>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
            >
                Save Sale
            </button>

        </form>
    );
};

export default SaleForm;