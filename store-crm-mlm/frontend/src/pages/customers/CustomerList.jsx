import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import CustomerForm from '../../components/CustomerForm';

import {
    getCustomers,
    createCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomer
} from '../../api/customerApi';

const CustomerList = () => {

    const [customers, setCustomers] = useState([]);

    const [search, setSearch] = useState('');

    const [editingCustomer, setEditingCustomer] =
        useState(null);

    const [loading, setLoading] =
    useState(false);

   const loadCustomers = async () => {

    try {

        setLoading(true);

        const response =
            await getCustomers();

        setCustomers(response.data.data);

    } catch (error) {

        toast.error(
            'Failed To Load Customers'
        );

    } finally {

        setLoading(false);
    }
};

    useEffect(() => {

        loadCustomers();

    }, []);

    const handleCreate = async (data) => {

    try {

        await createCustomer(data);

        toast.success(
            'Customer Created Successfully'
        );

        loadCustomers();

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            'Failed To Create Customer'
        );

        console.error(error);
    }
};

   const handleUpdate = async (data) => {

    try {

        await updateCustomer(
            editingCustomer.id,
            data
        );

        toast.success(
            'Customer Updated Successfully'
        );

        setEditingCustomer(null);

        loadCustomers();

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            'Failed To Update Customer'
        );

        console.error(error);
    }
};

    const handleDelete = async (id) => {

    if (
        !window.confirm(
            'Delete customer?'
        )
    ) return;

    try {

        await deleteCustomer(id);

        toast.success(
            'Customer Deleted Successfully'
        );

        loadCustomers();

    } catch (error) {

        toast.error(
            error.response?.data?.message ||
            'Failed To Delete Customer'
        );

        console.error(error);
    }
};

   const handleSearch = async () => {

    try {

        if (!search) {

            loadCustomers();

            return;
        }

        const response =
            await searchCustomer(search);

        setCustomers(
            response.data.data
        );

        toast.success(
            `${response.data.data.length} Customer(s) Found`
        );

    } catch (error) {

        toast.error(
            'Customer Not Found'
        );

        console.error(error);
    }
};

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                Customers
            </h1>

            <CustomerForm
                initialData={editingCustomer}
                onSubmit={
                    editingCustomer
                        ? handleUpdate
                        : handleCreate
                }
                buttonText={
                    editingCustomer
                        ? 'Update Customer'
                        : 'Add Customer'
                }
            />

            <div className="bg-white p-4 rounded shadow mt-6">

                <div className="flex gap-2 mb-4">

                    <input
                        placeholder="Search Mobile"
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        className="border p-2 rounded"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-green-600 text-white px-4 rounded"
                    >
                        Search
                    </button>

                </div>



                        {
                            loading && (
                                <div className="text-center p-4 text-blue-600 font-semibold">
                                    Loading Customers...
                                </div>
                            )
                        }

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th className="p-3 text-left">
                                Name
                            </th>

                            <th className="p-3 text-left">
                                Mobile
                            </th>

                            <th className="p-3 text-left">
                                City
                            </th>

                            <th className="p-3 text-left">
                                Card
                            </th>

                            <th className="p-3 text-left">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.map(customer => (

                            <tr
                                key={customer.id}
                                className="border-b"
                            >

                                <td className="p-3">
                                    {customer.customer_name}
                                </td>

                                <td className="p-3">
                                    {customer.mobile}
                                </td>

                                <td className="p-3">
                                    {customer.city}
                                </td>

                                <td className="p-3">
                                    {customer.card_type}
                                </td>

                                <td className="p-3">

                                    <div className="flex gap-2">

                                        <Link
                                            to={`/customer-profile/${customer.id}`}
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            View
                                        </Link>

                                        <button
                                            onClick={() =>
                                                setEditingCustomer(
                                                    customer
                                                )
                                            }
                                            className="bg-yellow-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    customer.id
                                                )
                                            }
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default CustomerList;