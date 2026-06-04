const UserTable = ({ users }) => {

    return (

        <div className="bg-white p-5 rounded shadow mt-6">

            <h2 className="text-xl font-bold mb-4">
                Users
            </h2>

            <table className="w-full">

                <thead>

                    <tr className="border-b">

                        <th className="text-left p-2">
                            Name
                        </th>

                        <th className="text-left p-2">
                            Email
                        </th>

                        <th className="text-left p-2">
                            Role
                        </th>

                        <th className="text-left p-2">
                            Referral
                        </th>

                        <th className="text-left p-2">
                            Level
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.map(user => (

                        <tr
                            key={user.id}
                            className="border-b"
                        >

                            <td className="p-2">
                                {user.full_name}
                            </td>

                            <td className="p-2">
                                {user.email}
                            </td>

                            <td className="p-2">
                                {user.role}
                            </td>

                            <td className="p-2">
                                {user.referral_code}
                            </td>

                            <td className="p-2">
                                {user.level}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
};

export default UserTable;