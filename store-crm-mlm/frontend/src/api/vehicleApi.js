import api from './api';

export const createVehicle = async (data) => {
    const response =
        await api.post(
            '/vehicles',
            data
        );

    return response.data;
};

export const getVehicles = async () => {
    const response =
        await api.get(
            '/vehicles'
        );

    return response.data;
};

export const markVehicleOut = async (id) => {
    const response =
        await api.put(
            `/vehicles/out/${id}`
        );

    return response.data;
};