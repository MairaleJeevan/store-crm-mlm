import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaUserPlus,
    FaPhone,
    FaHandshake,
    FaClipboardList,
    FaCheckCircle,
    FaTimesCircle
} from 'react-icons/fa';

import {
    getLeadPipeline
} from '../../api/leadPipelineApi';

const LeadPipeline = () => {

    const [stats, setStats] =
        useState({});

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadPipeline();

    }, []);

    const loadPipeline =
        async () => {

            try {

                setLoading(true);

                const response =
                    await getLeadPipeline();

                setStats(
                    response.data || {}
                );

            } catch (error) {

                toast.error(
                    'Failed To Load Lead Pipeline'
                );

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

    return (

        <div className="space-y-6">

            <h1 className="text-3xl font-bold">
                Lead Pipeline Dashboard
            </h1>

            {
                loading && (

                    <div className="bg-blue-50 text-blue-600 p-3 rounded">
                        Loading Lead Pipeline...
                    </div>

                )
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="bg-blue-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaUserPlus size={35} />

                    <h3 className="mt-3">
                        NEW
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {stats.NEW || 0}
                    </h2>

                </div>

                <div className="bg-cyan-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaPhone size={35} />

                    <h3 className="mt-3">
                        CONTACTED
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {stats.CONTACTED || 0}
                    </h2>

                </div>

                <div className="bg-yellow-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaHandshake size={35} />

                    <h3 className="mt-3">
                        INTERESTED
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {stats.INTERESTED || 0}
                    </h2>

                </div>

                <div className="bg-purple-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaClipboardList size={35} />

                    <h3 className="mt-3">
                        FOLLOWUP
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {stats.FOLLOWUP || 0}
                    </h2>

                </div>

                <div className="bg-green-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaCheckCircle size={35} />

                    <h3 className="mt-3">
                        CONVERTED
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {stats.CONVERTED || 0}
                    </h2>

                </div>

                <div className="bg-red-500 text-white p-6 rounded-xl shadow hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                    <FaTimesCircle size={35} />

                    <h3 className="mt-3">
                        LOST
                    </h3>

                    <h2 className="text-4xl font-bold">
                        {stats.LOST || 0}
                    </h2>

                </div>

            </div>

        </div>
    );
};

export default LeadPipeline;