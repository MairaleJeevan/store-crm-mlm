import {
    useEffect,
    useState
} from 'react';

import { toast } from 'react-toastify';

import {
    getFollowups,
    completeFollowup
} from '../../api/followupApi';

const FollowupList = () => {

    const [followups, setFollowups] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadFollowups();

    }, []);

    const loadFollowups =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getFollowups();

                setFollowups(
                    response.data.data
                );

            } catch (error) {

                toast.error(
                    'Failed To Load Followups'
                );

            } finally {

                setLoading(false);
            }
        };

    const handleComplete =
        async (id) => {

            try {

                await completeFollowup(id);

                toast.success(
                    'Followup Completed'
                );

                loadFollowups();

            } catch (error) {

                toast.error(
                    'Failed To Complete Followup'
                );
            }
        };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Followups
            </h1>

            <div className="bg-blue-100 text-blue-700 border border-blue-300 p-3 rounded mb-4 font-semibold">
                📅 Customer Followups
            </div>

            {
                loading && (
                    <div className="text-center p-4 text-blue-600 font-semibold">
                        Loading Followups...
                    </div>
                )
            }

            <div className="bg-white p-6 rounded shadow">

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-3">
                                Date
                            </th>

                            <th className="p-3">
                                Remarks
                            </th>

                            <th className="p-3">
                                Status
                            </th>

                            <th className="p-3">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {followups.map(item => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {item.followup_date}
                                </td>

                                <td className="p-3">
                                    {item.remarks}
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

                                    {item.status ===
                                        'PENDING' && (

                                        <button
                                            onClick={() =>
                                                handleComplete(item.id)
                                            }
                                            className="bg-green-500 text-white px-3 py-1 rounded"
                                        >
                                            Complete
                                        </button>
                                    )}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default FollowupList;