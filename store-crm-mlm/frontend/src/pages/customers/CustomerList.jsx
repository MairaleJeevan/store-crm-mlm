import { useEffect, useState } from 'react';

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

    const loadCustomers = async () => {

        const response =
            await getCustomers();

        setCustomers(response.data.data);
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    const handleCreate = async (data) => {

        await createCustomer(data);

        loadCustomers();
    };

    const handleUpdate = async (data) => {

        await updateCustomer(
            editingCustomer.id,
            data
        );

        setEditingCustomer(null);

        loadCustomers();
    };

    const handleDelete = async (id) => {

        if (
            !window.confirm(
                'Delete customer?'
            )
        ) return;

        await deleteCustomer(id);

        loadCustomers();
    };

    const handleSearch = async () => {

        if (!search) {
            loadCustomers();
            return;
        }

        const response =
            await searchCustomer(search);

        setCustomers(response.data.data);
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
                        className="border p-2"
                    />

                    <button
                        onClick={handleSearch}
                        className="bg-green-600 text-white px-4"
                    >
                        Search
                    </button>

                </div>

                <table className="w-full">

                    <thead>

                        <tr className="border-b">

                            <th>Name</th>
                            <th>Mobile</th>
                            <th>City</th>
                            <th>Card</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {customers.map(customer => (

                            <tr
                                key={customer.id}
                                className="border-b"
                            >

                                <td>
                                    {customer.customer_name}
                                </td>

                                <td>
                                    {customer.mobile}
                                </td>

                                <td>
                                    {customer.city}
                                </td>

                                <td>
                                    {customer.card_type}
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            setEditingCustomer(
                                                customer
                                            )
                                        }
                                        className="bg-yellow-500 text-white px-2 py-1 mr-2"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(
                                                customer.id
                                            )
                                        }
                                        className="bg-red-600 text-white px-2 py-1"
                                    >
                                        Delete
                                    </button>

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