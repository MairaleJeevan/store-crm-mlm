import {
    useEffect,
    useState
} from 'react';

import {
    getFollowups,
    completeFollowup
} from '../../api/followupApi';

const FollowupList = () => {

    const [followups, setFollowups] =
        useState([]);

    useEffect(() => {

        loadFollowups();

    }, []);

    const loadFollowups =
        async () => {

            const response =
                await getFollowups();

            setFollowups(
                response.data.data
            );
        };

    const handleComplete =
        async (id) => {

            await completeFollowup(id);

            loadFollowups();
        };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Followups
            </h1>

            <div className="bg-white p-6 rounded shadow">

                <table className="w-full">

                    <thead>

                        <tr>
                            <th>Date</th>
                            <th>Remarks</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {followups.map(item => (

                            <tr
                                key={item.id}
                                className="border-b"
                            >

                                <td>
                                    {item.followup_date}
                                </td>

                                <td>
                                    {item.remarks}
                                </td>

                                <td>
                                    {item.status}
                                </td>

                                <td>

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