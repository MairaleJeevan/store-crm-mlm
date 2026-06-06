import { useEffect, useState } from 'react';

import {
    getFollowupDashboard
} from '../../api/followupDashboardApi';

const FollowupDashboard = () => {

    const [data, setData] =
        useState(null);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const response =
                await getFollowupDashboard();

            setData(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    if (!data)
        return <p>Loading...</p>;

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Follow-Up Dashboard
            </h1>

            <div className="grid grid-cols-4 gap-4">

                <div className="bg-white p-5 rounded shadow">

                    <h3>
                        Today's Followups
                    </h3>

                    <p className="text-3xl font-bold">
                        {data.todayFollowups}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>
                        Overdue
                    </h3>

                    <p className="text-3xl font-bold text-red-600">
                        {data.overdue}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>
                        Upcoming
                    </h3>

                    <p className="text-3xl font-bold text-blue-600">
                        {data.upcoming}
                    </p>

                </div>

                <div className="bg-white p-5 rounded shadow">

                    <h3>
                        Completed
                    </h3>

                    <p className="text-3xl font-bold text-green-600">
                        {data.completed}
                    </p>

                </div>

            </div>

        </div>
    );
};

export default FollowupDashboard;