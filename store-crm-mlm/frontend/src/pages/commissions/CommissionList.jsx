import { useEffect, useState } from 'react';
import { getMyCommissions } from '../../api/commissionApi';

const CommissionList = () => {

    const [commissions, setCommissions] =
        useState([]);

    const [total, setTotal] =
        useState(0);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const response =
                await getMyCommissions();

            setCommissions(
                response.data
            );

            setTotal(
                response.totalCommission
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                My Commissions
            </h1>

            <div className="bg-green-100 p-4 rounded mb-6">

                <h2 className="text-xl font-bold">

                    Total Earned:
                    ₹{total}

                </h2>

            </div>

            <table className="w-full bg-white shadow">

                <thead>

                    <tr>

                        <th className="p-3">
                            Level
                        </th>

                        <th className="p-3">
                            %
                        </th>

                        <th className="p-3">
                            Amount
                        </th>

                        <th className="p-3">
                            Date
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {commissions.map(item => (

                        <tr key={item.id}>

                            <td className="p-3">
                                {item.commission_level}
                            </td>

                            <td className="p-3">
                                {item.commission_percentage}%
                            </td>

                            <td className="p-3">
                                ₹{item.commission_amount}
                            </td>

                            <td className="p-3">
                                {
                                    new Date(
                                        item.created_at
                                    ).toLocaleDateString()
                                }
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default CommissionList;