import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import api from '../../api/api';

import { useAuth } from '../../context/AuthContext';

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                '/auth/login',
                form
            );

            login(
                response.data.token,
                response.data.user
            );

            navigate('/dashboard');

        } catch (error) {

            setError(
                error?.response?.data?.message ||
                'Login Failed'
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-96"
            >

                <h2 className="text-2xl font-bold mb-6">
                    CRM Login
                </h2>

                {error && (
                    <div className="bg-red-100 p-2 mb-4">
                        {error}
                    </div>
                )}

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full border p-2 mb-3"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white w-full p-2"
                >
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;