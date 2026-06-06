import axios from 'axios';

const API =
    'http://localhost:5000/api/dashboard';

export const getDashboardSummary =
    () =>
        axios.get(
            `${API}/summary`
        );