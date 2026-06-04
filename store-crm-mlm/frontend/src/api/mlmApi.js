import api from './api';

export const getMLMTree = async (userId) => {

    const response = await api.get(
        `/mlm/team/${userId}`
    );

    return response.data;
};