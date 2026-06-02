import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {

    const { user } = useAuth();

    return (

        <div>

            <h1 className="text-3xl font-bold mb-4">
                Dashboard
            </h1>

            <div className="bg-white p-6 rounded shadow">

                <h2 className="text-xl font-semibold">
                    Welcome {user?.full_name}
                </h2>

                <p className="mt-2">
                    Role: {user?.role}
                </p>

            </div>

        </div>

    );
};

export default Dashboard;