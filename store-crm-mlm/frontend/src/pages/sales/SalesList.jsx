import { useState } from 'react';
import { toast } from 'react-toastify';

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

    const [loading, setLoading] =
        useState(false);

    const handleSearch = async () => {

        try {

            setLoading(true);

            const response =
                await searchCustomer(mobile);

            if (
                response.data.data.length
            ) {

                setCustomer(
                    response.data.data[0]
                );

                toast.success(
                    'Customer Found'
                );

            } else {

                setCustomer(null);

                toast.warning(
                    'Customer Not Found'
                );
            }

        } catch (error) {

            setCustomer(null);

            toast.error(
                'Failed To Search Customer'
            );

        } finally {

            setLoading(false);
        }
    };

    const handleSale = async (
        saleData
    ) => {

        try {

            setLoading(true);

            await createSale(
                saleData
            );

            toast.success(
                'Sale Created Successfully'
            );

            setCustomer(null);
            setMobile('');

        } catch (error) {

            toast.error(
                error?.response?.data?.message ||
                'Failed To Create Sale'
            );

        } finally {

            setLoading(false);
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
                        className="border p-2 rounded w-full"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-green-600 text-white px-4 rounded"
                    >
                        Search Customer
                    </button>

                </div>

            </div>

            {
                loading && (
                    <div className="text-center p-4 text-blue-600 font-semibold">
                        Loading...
                    </div>
                )
            }

            {customer && (

                <div className="bg-blue-100 border border-blue-300 p-4 rounded mb-4">

                    <h2 className="font-bold text-lg mb-2">
                        Customer Found
                    </h2>

                    <p>
                        <strong>Name:</strong>{' '}
                        {customer.customer_name}
                    </p>

                    <p>
                        <strong>Mobile:</strong>{' '}
                        {customer.mobile}
                    </p>

                    <p>
                        <strong>Card:</strong>{' '}
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

        </div>
    );
};

export default SalesList;