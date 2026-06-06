import api from './axios';

export const getFollowupDashboard =
    async () => {

        const response =
            await api.get(
                '/followup-dashboard'
            );

        return response.data;
    };