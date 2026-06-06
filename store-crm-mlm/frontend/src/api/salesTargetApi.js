import axios from 'axios';

const API =
    'http://localhost:5000/api/sales-targets';

export const getTargets = () =>
    axios.get(API);

export const createTarget = (data) =>
    axios.post(API, data);