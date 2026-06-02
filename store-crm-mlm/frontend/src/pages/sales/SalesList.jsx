import { useState } from 'react';

import {
    searchCustomer
} from '../../api/customerApi';

import {
    createSale
} from '../../api/saleApi';

import SaleForm from '../../components/SaleForm';

const SalesList = () => {

    const [mobile, setMobile] =
        useState('');

    const [customer, setCustomer] =
        useState(null);

    const [message, setMessage] =
        useState('');

    const handleSearch = async () => {

        try {

            const response =
                await searchCustomer(mobile);

            if (
                response.data.data.length
            ) {
                setCustomer(
                    response.data.data[0]
                );
            } else {
                setCustomer(null);
            }

        } catch {

            setCustomer(null);
        }
    };

    const handleSale = async (
        saleData
    ) => {

        try {

            await createSale(
                saleData
            );

            setMessage(
                'Sale Created Successfully'
            );

        } catch (error) {

            setMessage(
                error?.response?.data?.message
            );
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Vehicle Sales
            </h1>

            <div className="bg-white p-4 rounded shadow mb-6">

                <div className="flex gap-2">

                    <input
                        placeholder="Search Mobile"
                        value={mobile}
                        onChange={(e) =>
                            setMobile(
                                e.target.value
                            )
                        }
                        className="border p-2"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-green-600 text-white px-4"
                    >
                        Search Customer
                    </button>

                </div>

            </div>

            {customer && (

                <div className="bg-blue-100 p-4 rounded mb-4">

                    <h2 className="font-bold">
                        Customer Found
                    </h2>

                    <p>
                        Name:
                        {customer.customer_name}
                    </p>

                    <p>
                        Mobile:
                        {customer.mobile}
                    </p>

                    <p>
                        Card:
                        {customer.card_type}
                    </p>

                </div>

            )}

            {customer && (

                <SaleForm
                    customerId={
                        customer.id
                    }
                    onSubmit={
                        handleSale
                    }
                />

            )}

            {message && (

                <div className="mt-4 bg-green-100 p-3 rounded">

                    {message}

                </div>

            )}

        </div>

    );
};

export default SalesList;