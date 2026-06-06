import axios from 'axios';

const API =
    'http://localhost:5000/api/followups';

export const getFollowups = () =>
    axios.get(API);

export const getTodayFollowups = () =>
    axios.get(`${API}/today`);

export const createFollowup = (data) =>
    axios.post(API, data);

export const completeFollowup = (id) =>
    axios.put(`${API}/${id}/complete`);