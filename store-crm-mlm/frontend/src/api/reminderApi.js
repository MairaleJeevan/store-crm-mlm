import api from './api';

export const getReminders = async () => {

    const response =
        await api.get('/reminders');

    return response.data;
};