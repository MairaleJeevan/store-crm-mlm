import { useState } from 'react';
import { createMLMUser } from '../api/userApi';

const UserForm = ({ onSuccess }) => {

    const [form, setForm] = useState({
        full_name: '',
        email: '',
        password: '',
        sponsor_referral_code: ''
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createMLMUser(form);

            alert('MLM User Created');

            setForm({
                full_name: '',
                email: '',
                password: '',
                sponsor_referral_code: ''
            });

            onSuccess?.();

        } catch (error) {

            alert(
                error?.response?.data?.message ||
                'Failed'
            );
        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="bg-white p-5 rounded shadow"
        >

            <h2 className="text-xl font-bold mb-4">
                Create MLM User
            </h2>

            <input
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
            />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
            />

            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
            />

            <input
                name="sponsor_referral_code"
                placeholder="Sponsor Referral Code"
                value={form.sponsor_referral_code}
                onChange={handleChange}
                className="border p-2 w-full mb-3"
            />

            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Create User
            </button>

        </form>
    );
};

export default UserForm;