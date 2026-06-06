import { useEffect, useState } from 'react';

import {
    getLeads,
    createLead,
    convertLead,
    updateLeadStatus
} from '../../api/leadApi';

const LeadList = () => {

    const [leads, setLeads] =
        useState([]);

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

        const response =
            await getLeads();

        console.log(response.data[0]);

        setLeads(
            response.data || []
        );
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await createLead(formData);

        setFormData({
            lead_name: '',
            mobile: '',
            source: '',
            remarks: ''
        });

        loadLeads();
    };

    const handleConvert = async (id) => {

        await convertLead(id);

        loadLeads();
    };

    const handleStatus = async (
        id,
        status
    ) => {

        await updateLeadStatus(
            id,
            status
        );

        loadLeads();
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Lead Management
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-4 rounded shadow mb-6"
            >

                <div className="grid grid-cols-2 gap-4">

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
                        className="border p-3"
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
                        className="border p-3"
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
                        className="border p-3"
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
                        className="border p-3"
                    />

                </div>

                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Lead
                </button>

            </form>

            <div className="bg-white p-4 rounded shadow">

                <table className="w-full">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Source</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {(leads || []).map((lead) => (

                            <tr
                                key={lead.id}
                                className="border-b"
                            >

                                <td>
                                    {lead.lead_name}
                                </td>

                                <td>
                                    {lead.mobile}
                                </td>

                                <td>
                                    {lead.source}
                                </td>

                                <td>
                                    {lead.status}
                                </td>

                                <td>

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

                                        {lead.status !==
                                            'CONVERTED' && (

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

                                        )}

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default LeadList;