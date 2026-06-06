import api from './api';

export const getDashboardSummary = async () => {

    const response = await api.get(
        '/reports/dashboard'
    );

    return response.data;
};

export const getDashboardCharts =
    async () => {

        const response =
            await api.get(
                '/reports/charts'
            );

        return response.data;
    };

export const getBusinessReport =
async () => {

    const response =
        await api.get(
            '/reports/business'
        );

    return response.data;
};