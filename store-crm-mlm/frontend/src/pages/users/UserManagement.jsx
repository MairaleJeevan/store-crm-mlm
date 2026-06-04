import { useEffect, useState } from 'react';

import UserForm from '../../components/UserForm';

import UserTable from '../../components/UserTable';

import { getUsers } from '../../api/userApi';

const UserManagement = () => {

    const [users, setUsers] =
        useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        try {

            const response =
                await getUsers();

            console.log(
                'USERS RESPONSE:',
                response.data
            );

            setUsers(
                response.data.data
            );

        } catch (error) {

            console.error(
                'USER API ERROR:',
                error
            );
        }
    };

    return (

        <div>

            <h1 className="text-3xl font-bold mb-6">
                User Management
            </h1>

            <UserForm
                onSuccess={loadUsers}
            />

            <UserTable
                users={users}
            />

        </div>

    );
};

export default UserManagement;