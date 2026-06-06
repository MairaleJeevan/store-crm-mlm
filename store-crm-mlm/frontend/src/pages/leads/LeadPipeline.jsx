import { useEffect, useState } from 'react';

import {
    getLeadPipeline
} from '../../api/leadPipelineApi';

const LeadPipeline = () => {

    const [stats, setStats] =
        useState({});

    useEffect(() => {

        loadPipeline();

    }, []);

    const loadPipeline =
        async () => {

            try {

                const response =
                    await getLeadPipeline();

                setStats(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Lead Pipeline Dashboard
            </h1>

            <div className="grid grid-cols-3 gap-4">

                <div className="bg-white p-5 rounded shadow">
                    <h3>NEW</h3>
                    <p className="text-4xl font-bold">
                        {stats.NEW || 0}
                    </p>
                </div>

                <div className="bg-white p-5 rounded shadow">
                    <h3>CONTACTED</h3>
                    <p className="text-4xl font-bold">
                        {stats.CONTACTED || 0}
                    </p>
                </div>

                <div className="bg-white p-5 rounded shadow">
                    <h3>INTERESTED</h3>
                    <p className="text-4xl font-bold">
                        {stats.INTERESTED || 0}
                    </p>
                </div>

                <div className="bg-white p-5 rounded shadow">
                    <h3>FOLLOWUP</h3>
                    <p className="text-4xl font-bold">
                        {stats.FOLLOWUP || 0}
                    </p>
                </div>

                <div className="bg-white p-5 rounded shadow">
                    <h3>CONVERTED</h3>
                    <p className="text-4xl font-bold">
                        {stats.CONVERTED || 0}
                    </p>
                </div>

                <div className="bg-white p-5 rounded shadow">
                    <h3>LOST</h3>
                    <p className="text-4xl font-bold">
                        {stats.LOST || 0}
                    </p>
                </div>

            </div>

        </div>
    );
};

export default LeadPipeline;