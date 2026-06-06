import { useEffect, useState } from 'react';

import {
    getTargets,
    createTarget
}
from '../../api/salesTargetApi';

const SalesTargets = () => {

    const [targets, setTargets] =
        useState([]);

    const [formData, setFormData] =
        useState({
            user_id: '',
            month: '',
            target_amount: ''
        });

    useEffect(() => {

        loadTargets();

    }, []);

    const loadTargets = async () => {

        const response =
            await getTargets();

        setTargets(
            response.data.data
        );
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await createTarget(formData);

        setFormData({
            user_id: '',
            month: '',
            target_amount: ''
        });

        loadTargets();
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Sales Targets
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow mb-6"
            >

                <div className="grid grid-cols-3 gap-4">

                    <input
                        placeholder="User ID"
                        value={formData.user_id}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                user_id:
                                    e.target.value
                            })
                        }
                        className="border p-2"
                    />

                    <input
                        placeholder="Month"
                        value={formData.month}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                month:
                                    e.target.value
                            })
                        }
                        className="border p-2"
                    />

                    <input
                        placeholder="Target Amount"
                        value={
                            formData.target_amount
                        }
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                target_amount:
                                    e.target.value
                            })
                        }
                        className="border p-2"
                    />

                </div>

                <button
                    className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
                >
                    Save Target
                </button>

            </form>

            <div className="bg-white p-4 rounded shadow">

                <table className="w-full">

                    <thead>

                        <tr>
                            <th>Month</th>
                            <th>Target</th>
                            <th>Achieved</th>
                        </tr>

                    </thead>

                    <tbody>

                        {targets.map(target => (

                            <tr
                                key={target.id}
                                className="border-b"
                            >

                                <td>
                                    {target.month}
                                </td>

                                <td>
                                    ₹
                                    {target.target_amount}
                                </td>

                                <td>
                                    ₹
                                    {target.achieved_amount}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default SalesTargets;