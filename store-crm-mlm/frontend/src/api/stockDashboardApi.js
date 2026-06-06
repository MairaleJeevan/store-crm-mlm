import api from './axios';

export const getStockDashboard = async () => {

    const response =
        await api.get(
            '/stock-dashboard'
        );

    return response.data;
};