import { useEffect, useState } from 'react';
import { getReminders } from '../../api/reminderApi';

const ReminderList = () => {

    const [reminders, setReminders] =
        useState([]);

    useEffect(() => {

        loadReminders();

    }, []);

    const loadReminders = async () => {

        try {

            const response =
                await getReminders();

            setReminders(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Reminders
            </h1>

            <table className="w-full bg-white shadow">

                <thead>

                    <tr>

                        <th className="p-3">Title</th>
                        <th className="p-3">Date</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Remarks</th>

                    </tr>

                </thead>

                <tbody>

                    {reminders.map(item => (

                        <tr key={item.id}>

                            <td className="p-3">
                                {item.title}
                            </td>

                            <td className="p-3">
                                {item.reminder_date}
                            </td>

                            <td className="p-3">
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