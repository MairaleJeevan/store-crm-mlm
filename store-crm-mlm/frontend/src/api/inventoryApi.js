import api from './api';

// Stock In
export const stockIn = async (data) => {
    const response = await api.post(
        '/inventory/stock-in',
        data
    );

    return response.data;
};

// Stock Out
export const stockOut = async (data) => {
    const response = await api.post(
        '/inventory/stock-out',
        data
    );

    return response.data;
};

// Ledger
export const getLedger = async () => {
    const response = await api.get(
        '/inventory/ledger'
    );

    return response.data;
};