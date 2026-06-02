import api from './api';

export const getCustomers = () => {
    return api.get('/customers');
};

export const getCustomerById = (id) => {
    return api.get(`/customers/${id}`);
};

export const searchCustomer = (mobile) => {
    return api.get(`/customers/search/${mobile}`);
};

export const createCustomer = (data) => {
    return api.post('/customers', data);
};

export const updateCustomer = (id, data) => {
    return api.put(`/customers/${id}`, data);
};

export const deleteCustomer = (id) => {
    return api.delete(`/customers/${id}`);
};