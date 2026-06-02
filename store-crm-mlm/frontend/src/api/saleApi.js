import api from './api';

export const createSale = (data) => {
    return api.post('/sales', data);
};

export const getSales = () => {
    return api.get('/sales');
};

export const getTodaySales = () => {
    return api.get('/sales/today');
};