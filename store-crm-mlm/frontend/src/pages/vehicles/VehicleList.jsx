import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
    FaCar,
    FaSignOutAlt
} from 'react-icons/fa';

import {
    getVehicles,
    markVehicleOut
} from '../../api/vehicleApi';

const VehicleList = () => {

    const [vehicles, setVehicles] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    useEffect(() => {

        loadVehicles();

    }, []);

    const loadVehicles = async () => {

        try {

            setLoading(true);

            const response =
                await getVehicles();

            setVehicles(
                response.data || []
            );

        } catch (error) {

            toast.error(
                'Failed To Load Vehicles'
            );

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    const handleOut =
        async (id) => {

            try {

                await markVehicleOut(id);

                toast.success(
                    'Vehicle Marked OUT Successfully'
                );

                loadVehicles();

            } catch (error) {

                toast.error(
                    'Failed To Update Vehicle'
                );

                console.error(error);
            }
        };

    return (

        <div className="space-y-6">

            <div className="flex items-center gap-3">

                <FaCar
                    className="text-blue-600"
                    size={30}
                />

                <h1 className="text-3xl font-bold">
                    Vehicle Management
                </h1>

            </div>

            {
                loading && (

                    <div className="bg-blue-50 text-blue-600 p-3 rounded">
                        Loading Vehicles...
                    </div>

                )
            }

            <div className="bg-white rounded-xl shadow overflow-hidden">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-4 text-left">
                                Vehicle No
                            </th>

                            <th className="p-4 text-left">
                                Model
                            </th>

                            <th className="p-4 text-left">
                                Status
                            </th>

                            <th className="p-4 text-left">
                                Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {
                            vehicles.length === 0 ? (

                                <tr>

                                    <td
                                        colSpan="4"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No Vehicles Found
                                    </td>

                                </tr>

                            ) : (

                                vehicles.map(v => (

                                    <tr
                                        key={v.id}
                                        className="border-t hover:bg-gray-50"
                                    >

                                        <td className="p-4 font-medium">
                                            {v.vehicle_number}
                                        </td>

                                        <td className="p-4">
                                            {v.vehicle_model}
                                        </td>

                                        <td className="p-4">

                                            <span
                                                className={
                                                    v.status === 'IN'
                                                        ? 'bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold'
                                                        : 'bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold'
                                                }
                                            >
                                                {v.status}
                                            </span>

                                        </td>

                                        <td className="p-4">

                                            {
                                                v.status === 'IN' && (

                                                    <button
                                                        onClick={() =>
                                                            handleOut(
                                                                v.id
                                                            )
                                                        }
                                                        className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-red-700"
                                                    >
                                                        <FaSignOutAlt />
                                                        Mark OUT
                                                    </button>

                                                )
                                            }

                                        </td>

                                    </tr>

                                ))
                            )
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default VehicleList;