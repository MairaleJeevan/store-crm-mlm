import { useState, useEffect } from 'react';

const CustomerForm = ({
    onSubmit,
    initialData,
    buttonText
}) => {

    const [form, setForm] = useState({
        customer_name: '',
        mobile: '',
        alternate_mobile: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        card_type: 'GREEN'
    });

    useEffect(() => {

        if (initialData) {
            setForm(initialData);
        }

    }, [initialData]);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit(form);
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow"
        >

            <div className="grid grid-cols-2 gap-4">

                <input
                    name="customer_name"
                    placeholder="Customer Name"
                    value={form.customer_name}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <input
                    name="mobile"
                    placeholder="Mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="border p-2"
                    required
                />

                <input
                    name="alternate_mobile"
                    placeholder="Alternate Mobile"
                    value={form.alternate_mobile}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="state"
                    placeholder="State"
                    value={form.state}
                    onChange={handleChange}
                    className="border p-2"
                />

                <input
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    className="border p-2"
                />

            </div>

            <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="border p-2 w-full mt-4"
            />

            <select
                name="card_type"
                value={form.card_type}
                onChange={handleChange}
                className="border p-2 w-full mt-4"
            >
                <option value="GREEN">GREEN</option>
                <option value="SILVER">SILVER</option>
                <option value="GOLD">GOLD</option>
            </select>

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
            >
                {buttonText}
            </button>

        </form>
    );
};

export default CustomerForm;