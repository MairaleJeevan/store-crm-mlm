import { useEffect, useState } from 'react';

import {
    getBusinessReport
} from '../../api/reportApi';

const Reports = () => {

    const [report, setReport] =
        useState(null);

    useEffect(() => {

        loadReport();

    }, []);

    const loadReport = async () => {

        try {

            const response =
                await getBusinessReport();

            setReport(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Reports Dashboard
            </h1>

            {report && (

                <>

                    <div className="grid grid-cols-4 gap-4 mb-6">

                        <div className="bg-white p-5 rounded shadow">

                            <h3 className="text-gray-500">
                                Customers
                            </h3>

                            <p className="text-4xl font-bold">
                                {report.customers}
                            </p>

                        </div>

                        <div className="bg-white p-5 rounded shadow">

                            <h3 className="text-gray-500">
                                Vehicles
                            </h3>

                            <p className="text-4xl font-bold">
                                {report.vehicles}
                            </p>

                        </div>

                        <div className="bg-white p-5 rounded shadow">

                            <h3 className="text-gray-500">
                                Inventory Logs
                            </h3>

                            <p className="text-4xl font-bold">
                                {report.inventory}
                            </p>

                        </div>

                        <div className="bg-white p-5 rounded shadow">

                            <h3 className="text-gray-500">
                                CRM Status
                            </h3>

                            <p className="text-green-600 text-3xl font-bold">
                                Active
                            </p>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
};

export default Reports;