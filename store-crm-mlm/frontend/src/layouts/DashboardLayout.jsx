import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {

    const { user, logout } = useAuth();

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white">

                <div className="p-5 border-b border-gray-700">

                    <h2 className="text-xl font-bold">
                        Store CRM
                    </h2>

                </div>

                <nav className="p-4">

                    <ul className="space-y-2">

                        <li>
                            <Link
                                to="/dashboard"
                                className="block px-3 py-2 rounded hover:bg-gray-700"
                            >
                                Dashboard
                            </Link>
                        </li>

                        {[
                                'ADMIN',
                                'MANAGER'
                            ].includes(user?.role) && (

                                <li>
                                    <Link
                                        to="/customers"
                                        className="block px-3 py-2 rounded hover:bg-gray-700"
                                    >
                                        Customers
                                    </Link>
                                </li>

                        )}

                        {['ADMIN', 'MANAGER'].includes(user?.role) && (

                            <li>
                                <Link
                                    to="/products"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Products
                                </Link>
                            </li>

                        )}


                         {['ADMIN', 'MANAGER'].includes(user?.role) && (

                            <li>
                                <Link
                                    to="/inventory"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Inventory
                                </Link>
                            </li>

                        )}
                        

                        {['ADMIN', 'MANAGER'].includes(user?.role) && (

                            <li>
                                <Link
                                    to="/low-stock"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Low Stock
                                </Link>
                            </li>

                        )}

                        {['ADMIN', 'MANAGER', 'SALES_EXECUTIVE'].includes(user?.role) && (

                            <li>
                                <Link
                                    to="/sales"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Sales
                                </Link>
                            </li>

                        )}

                        {['ADMIN', 'MLM_USER'].includes(user?.role) && (

                            <li>
                                <Link
                                    to="/commissions"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Commissions
                                </Link>
                            </li>

                        )}
  
                        {user?.role === 'ADMIN' && (

                            <li>
                                <Link
                                    to="/exports"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Exports
                                </Link>
                            </li>

                        )}


                        {['ADMIN', 'MANAGER'].includes(user?.role) && (

                            <li>
                                <Link
                                    to="/reminders"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Reminders
                                </Link>
                            </li>

                        )}

                        {['ADMIN', 'MANAGER'].includes(user?.role) && (

                            <li>
                                <Link
                                    to="/reports"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Reports
                                </Link>
                            </li>

                        )}


                       {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/vehicles"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Vehicles
                                </Link>
                            </li>
                        )}


                       {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/stock-dashboard"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Stock Dashboard
                                </Link>
                            </li>
                        )}


                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/followup-dashboard"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Followup Dashboard
                                </Link>
                            </li>
                        )}

                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/leads"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Leads
                                </Link>
                            </li>
                        )}
                       

                      {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/lead-pipeline"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Lead Pipeline
                                </Link>
                            </li>
                        )}

                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/sales-targets"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    Sales Targets
                                </Link>
                            </li>
                        )}


                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/followups"
                                    className="block px-3 py-2 rounded hover:bg-gray-700"
                                >
                                    All Followups
                                </Link>
                            </li>
                        )}


                        {['ADMIN', 'MANAGER'].includes(user?.role) && (

                            <>
                                <li>
                                    <Link
                                        to="/users"
                                        className="block px-3 py-2 rounded hover:bg-gray-700"
                                    >
                                        User Management
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/mlm-tree"
                                        className="block px-3 py-2 rounded hover:bg-gray-700"
                                    >
                                        MLM Tree
                                    </Link>
                                </li>
                            </>

                        )}

                    </ul>

                </nav>

            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <header className="bg-white shadow px-6 py-4 flex justify-between items-center">

                    <h1 className="text-xl font-semibold">
                        Store CRM + MLM
                    </h1>

                    <div className="flex items-center gap-4">

                        <div>

                            <p className="font-semibold">
                                {user?.full_name}
                            </p>

                            <p className="text-sm text-gray-500">
                                {user?.role}
                            </p>

                        </div>

                        <button
                            onClick={() => {
                                logout();
                                window.location.href = '/login';
                            }}
                            className="bg-red-600 text-white px-4 py-2 rounded"
                        >
                            Logout
                        </button>

                    </div>

                </header>

                {/* Content */}
                <main className="flex-1 p-6">

                    <Outlet />

                </main>

            </div>

        </div>
    );
};

export default DashboardLayout;