import api from './api';

export const createMLMUser = (data) =>
    api.post('/mlm/register', data);

export const getTeamTree = (userId) =>
    api.get(`/mlm/team/${userId}`);

export const getUsers = () =>
    api.get('/users');