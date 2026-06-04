import api from './api';

export const getMyCommissions = async () => {

    const response = await api.get(
        '/commissions/my'
    );

    return response.data;
};