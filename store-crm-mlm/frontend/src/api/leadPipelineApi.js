import api from './axios';

export const getLeadPipeline = async () => {

    const res =
        await api.get(
            '/leads/pipeline'
        );

    return res.data;
};