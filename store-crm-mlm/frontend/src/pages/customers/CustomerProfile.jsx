import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    getCustomerProfile
} from '../../api/customerApi';

const CustomerProfile = () => {

    const { id } = useParams();

    const [profile, setProfile] =
        useState(null);

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response =
                await getCustomerProfile(id);

            setProfile(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    if (!profile)
        return <div>Loading...</div>;

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Customer Profile
            </h1>

            <div className="bg-white p-5 rounded shadow mb-6">

                <h2 className="text-2xl font-bold">
                    {profile.customer.full_name}
                </h2>

                <p>
                    {profile.customer.mobile}
                </p>

                <p>
                    {profile.customer.city}
                </p>

            </div>

            <div className="grid grid-cols-4 gap-4 mb-6">

                <div className="bg-white p-5 rounded shadow">
                    <h3>Total Sales</h3>
                    <p className="text-3xl font-bold">
                        {profile.sales.length}
                    </p>
                </div>

                <div className="bg-white p-5 rounded shadow">
                    <h3>Vehicles</h3>
                    <p className="text-3xl font-bold">
                        {profile.vehicles.length}
                    </p>
                </div>

                <div className="bg-white p-5 rounded shadow">
                    <h3>Followups</h3>
                    <p className="text-3xl font-bold">
                        {profile.reminders.length}
                    </p>
                </div>

            </div>

            <div className="bg-white p-5 rounded shadow">

                <h2 className="text-xl font-bold mb-4">
                    Vehicles
                </h2>

                <table className="w-full">

                    <thead>

                        <tr>

                            <th>Vehicle No</th>
                            <th>Model</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {profile.vehicles.map(
                            vehicle => (

                                <tr
                                    key={vehicle.id}
                                >
                                    <td>
                                        {vehicle.vehicle_number}
                                    </td>

                                    <td>
                                        {vehicle.vehicle_model}
                                    </td>

                                    <td>
                                        {vehicle.status}
                                    </td>
                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default CustomerProfile;