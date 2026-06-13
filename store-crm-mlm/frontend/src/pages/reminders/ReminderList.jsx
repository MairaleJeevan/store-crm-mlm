import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { getReminders } from '../../api/reminderApi';

const ReminderList = () => {

    const [reminders, setReminders] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadReminders();

    }, []);

    const loadReminders = async () => {

        try {

            setLoading(true);

            const response =
                await getReminders();

            setReminders(
                response.data
            );

        } catch (error) {

            toast.error(
                'Failed To Load Reminders'
            );

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Reminders
            </h1>

            <div className="bg-yellow-100 text-yellow-700 border border-yellow-300 p-3 rounded mb-4 font-semibold">
                🔔 Upcoming Reminders
            </div>

            {
                loading && (
                    <div className="text-center p-4 text-blue-600 font-semibold">
                        Loading Reminders...
                    </div>
                )
            }

            <table className="w-full bg-white shadow">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-3">
                            Title
                        </th>

                        <th className="p-3">
                            Date
                        </th>

                        <th className="p-3">
                            Status
                        </th>

                        <th className="p-3">
                            Remarks
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {reminders.map(item => (

                        <tr
                            key={item.id}
                            className="border-b"
                        >

                            <td className="p-3">
                                {item.title}
                            </td>

                            <td className="p-3">
                                {item.reminder_date}
                            </td>

                            <td
                                className={`p-3 font-bold ${
                                    item.status === 'COMPLETED'
                                        ? 'text-green-600'
                                        : 'text-orange-500'
                                }`}
                            >
                                {item.status}
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

export default ReminderList;