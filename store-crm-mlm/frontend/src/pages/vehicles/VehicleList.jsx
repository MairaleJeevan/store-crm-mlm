import { useEffect, useState } from 'react';

import {
    getVehicles,
    markVehicleOut
} from '../../api/vehicleApi';

const VehicleList = () => {

    const [vehicles, setVehicles] =
        useState([]);

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {

        const response =
            await getVehicles();

        setVehicles(
            response.data
        );
    };

    const handleOut =
        async (id) => {

            await markVehicleOut(id);

            loadVehicles();
        };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Vehicle Management
            </h1>

            <table className="w-full bg-white shadow">

                <thead>
                    <tr>
                        <th>Vehicle No</th>
                        <th>Model</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {vehicles.map(v => (

                        <tr key={v.id}>

                            <td>
                                {v.vehicle_number}
                            </td>

                            <td>
                                {v.vehicle_model}
                            </td>

                            <td>
                                {v.status}
                            </td>

                            <td>

                                {v.status === 'IN' && (

                                    <button
                                        onClick={() =>
                                            handleOut(
                                                v.id
                                            )
                                        }
                                    >
                                        Mark OUT
                                    </button>

                                )}

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default VehicleList;