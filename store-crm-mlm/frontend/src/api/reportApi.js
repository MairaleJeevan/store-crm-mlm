import api from './api';

export const getDashboardSummary = async () => {

    const response = await api.get(
        '/reports/dashboard'
    );

    return response.data;
};