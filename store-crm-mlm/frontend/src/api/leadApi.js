import api from './axios';

export const getLeads = async () => {

    const res =
        await api.get('/leads');

    return res.data;
};

export const createLead = async (data) => {

    const res =
        await api.post(
            '/leads',
            data
        );

    return res.data;
};

export const convertLead = async (id) => {

    const res =
        await api.post(
            `/leads/convert/${id}`
        );

    return res.data;
};

export const updateLeadStatus = (
    id,
    status
) =>
    api.put(
        `/leads/status/${id}`,
        { status }
    );
