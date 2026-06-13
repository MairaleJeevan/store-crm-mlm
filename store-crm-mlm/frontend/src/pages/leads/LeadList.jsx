import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaUserTie
} from 'react-icons/fa';

import {
    getLeads,
    createLead,
    convertLead,
    updateLeadStatus
} from '../../api/leadApi';

const LeadList = () => {

    const [leads, setLeads] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [formData, setFormData] =
        useState({
            lead_name: '',
            mobile: '',
            source: '',
            remarks: ''
        });

    useEffect(() => {

        loadLeads();

    }, []);

    const loadLeads = async () => {

        try {

            setLoading(true);

            const response =
                await getLeads();

            setLeads(
                response.data || []
            );

        } catch (error) {

            toast.error(
                'Failed To Load Leads'
            );

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await createLead(formData);

            toast.success(
                'Lead Created Successfully'
            );

            setFormData({
                lead_name: '',
                mobile: '',
                source: '',
                remarks: ''
            });

            loadLeads();

        } catch (error) {

            toast.error(
                'Failed To Create Lead'
            );
        }
    };

    const handleConvert = async (id) => {

        try {

            await convertLead(id);

            toast.success(
                'Lead Converted Successfully'
            );

            loadLeads();

        } catch (error) {

            toast.error(
                'Failed To Convert Lead'
            );
        }
    };

    const handleStatus = async (
        id,
        status
    ) => {

        try {

            await updateLeadStatus(
                id,
                status
            );

            toast.success(
                `Lead Marked As ${status}`
            );

            loadLeads();

        } catch (error) {

            toast.error(
                'Failed To Update Lead'
            );
        }
    };

    return (

        <div className="space-y-6">

            <div className="flex items-center gap-3">

                <FaUserTie
                    className="text-blue-600"
                    size={30}
                />

                <h1 className="text-3xl font-bold">
                    Lead Management
                </h1>

            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow"
            >

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        placeholder="Lead Name"
                        value={formData.lead_name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                lead_name:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    />

                    <input
                        placeholder="Mobile"
                        value={formData.mobile}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                mobile:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    />

                    <input
                        placeholder="Source"
                        value={formData.source}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                source:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    />

                    <input
                        placeholder="Remarks"
                        value={formData.remarks}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                remarks:
                                    e.target.value
                            })
                        }
                        className="border p-3 rounded"
                    />

                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Lead
                </button>

            </form>

            {
                loading && (

                    <div className="bg-blue-50 text-blue-600 p-3 rounded">
                        Loading Leads...
                    </div>

                )
            }

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Name
                            </th>

                            <th className="p-4 text-left">
                                Mobile
                            </th>

                            <th className="p-4 text-left">
                                Source
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            leads.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="5"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No Leads Found
                                    </td>

                                </tr>

                            ) : (

                                leads.map((lead) => (

                                    <tr
                                        key={lead.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4">
                                            {lead.lead_name}
                                        </td>

                                        <td className="p-4">
                                            {lead.mobile}
                                        </td>

                                        <td className="p-4">
                                            {lead.source}
                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={
                                                    lead.status === 'CONVERTED'
                                                        ? 'text-green-600 font-semibold'
                                                        : lead.status === 'INTERESTED'
                                                        ? 'text-yellow-600 font-semibold'
                                                        : lead.status === 'FOLLOWUP'
                                                        ? 'text-purple-600 font-semibold'
                                                        : 'text-blue-600 font-semibold'
                                                }
                                            >
                                                {lead.status}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            <div className="flex gap-2 flex-wrap">

                                                <button
                                                    onClick={() =>
                                                        handleStatus(
                                                            lead.id,
                                                            'CONTACTED'
                                                        )
                                                    }
                                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                                >
                                                    Contacted
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleStatus(
                                                            lead.id,
                                                            'INTERESTED'
                                                        )
                                                    }
                                                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                                                >
                                                    Interested
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        handleStatus(
                                                            lead.id,
                                                            'FOLLOWUP'
                                                        )
                                                    }
                                                    className="bg-purple-500 text-white px-2 py-1 rounded"
                                                >
                                                    Followup
                                                </button>

                                                {
                                                    lead.status !== 'CONVERTED' && (

                                                        <button
                                                            onClick={() =>
                                                                handleConvert(
                                                                    lead.id
                                                                )
                                                            }
                                                            className="bg-green-600 text-white px-2 py-1 rounded"
                                                        >
                                                            Convert
                                                        </button>

                                                    )
                                                }

                                            </div>

                                        </td>

                                    </tr>

                                ))
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default LeadList;