import api from './api';

export const createMLMUser = (data) =>
    api.post('/mlm/register', data);

export const getTeamTree = (userId) =>
    api.get(`/mlm/team/${userId}`);

export const getUsers = () =>
    api.get('/users');

export const createUser = (data) =>
    api.post('/users', data);

export const updateUser = (id, data) =>
    api.put(`/users/${id}`, data);

export const deleteUser = (id) =>
    api.delete(`/users/${id}`);