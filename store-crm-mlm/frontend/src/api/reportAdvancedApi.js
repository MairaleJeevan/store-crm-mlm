import api from './api';

export const getCustomerReport = async () => {
    const response =
        await api.get(
            '/reports-advanced/customers'
        );

    return response.data;
};

export const getSalesReport = async () => {
    const response =
        await api.get(
            '/reports-advanced/sales'
        );

    return response.data;
};

export const getInventoryReport = async () => {
    const response =
        await api.get(
            '/reports-advanced/inventory'
        );

    return response.data;
};