import api from './api';

// Register MLM User
export const createMLMUser = (data) =>
    api.post('/mlm/register', data);

// Get MLM Team Tree
export const getMLMTree = (userId) =>
    api.get(`/mlm/team/${userId}`);

// Get Downlines
export const getDownlines = (userId) =>
    api.get(`/mlm/downlines/${userId}`);

// MLM Dashboard
export const getMLMDashboard = (userId) =>
    api.get(`/mlm/dashboard/${userId}`);

// Get All Users
export const getUsers = () =>
    api.get('/users');

// Create User
export const createUser = (data) =>
    api.post('/users', data);

// Update User
export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data);

// Delete User
export const deleteUser = (id) =>
    api.delete(`/users/${id}`);