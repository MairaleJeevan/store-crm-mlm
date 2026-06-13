import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    FaTachometerAlt,
    FaUsers,
    FaBox,
    FaWarehouse,
    FaChartBar,
    FaBell,
    FaFileExport,
    FaMoneyBillWave,
    FaProjectDiagram,
    FaUserCog,
    FaBullseye,
    FaClipboardList,
    FaCar,
    FaExclamationTriangle,
    FaShoppingCart,
    FaBoxes,
    FaUserTie,
    FaFilter,
    FaClipboardCheck
} from 'react-icons/fa';

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

                        {/* Dashboard */}
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                            >
                                <FaTachometerAlt />
                                Dashboard
                            </Link>
                        </li>

                        {/* Customers */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/customers"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaUsers />
                                    Customers
                                </Link>
                            </li>
                        )}

                        {/* Products */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/products"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaBox />
                                    Products
                                </Link>
                            </li>
                        )}

                        {/* Inventory */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/inventory"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaWarehouse />
                                    Inventory
                                </Link>
                            </li>
                        )}

                        {/* Low Stock */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/low-stock"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaExclamationTriangle />
                                    Low Stock
                                </Link>
                            </li>
                        )}

                        {/* Sales */}
                        {['ADMIN', 'MANAGER', 'SALES_EXECUTIVE'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/sales"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaShoppingCart />
                                    Sales
                                </Link>
                            </li>
                        )}

                        {/* Commissions */}
                        {['ADMIN', 'MLM_USER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/commissions"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaMoneyBillWave />
                                    Commissions
                                </Link>
                            </li>
                        )}

                        {/* Exports */}
                        {user?.role === 'ADMIN' && (
                            <li>
                                <Link
                                    to="/exports"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaFileExport />
                                    Exports
                                </Link>
                            </li>
                        )}

                        {/* Reminders */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/reminders"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaBell />
                                    Reminders
                                </Link>
                            </li>
                        )}

                        {/* Reports */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/reports"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaChartBar />
                                    Reports
                                </Link>
                            </li>
                        )}

                        {/* Vehicles */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/vehicles"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaCar />
                                    Vehicles
                                </Link>
                            </li>
                        )}

                        {/* Stock Dashboard */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/stock-dashboard"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaBoxes />
                                    Stock Dashboard
                                </Link>
                            </li>
                        )}

                        {/* Followup Dashboard */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/followup-dashboard"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaClipboardList />
                                    Followup Dashboard
                                </Link>
                            </li>
                        )}

                        {/* Leads */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/leads"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaUserTie />
                                    Leads
                                </Link>
                            </li>
                        )}

                        {/* Lead Pipeline */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/lead-pipeline"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaFilter />
                                    Lead Pipeline
                                </Link>
                            </li>
                        )}

                        {/* Sales Targets */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/sales-targets"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                     <FaBullseye />
                                    Sales Targets
                                </Link>
                            </li>
                        )}

                        {/* All Followups */}
                        {['ADMIN', 'MANAGER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/followups"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaClipboardCheck />
                                    All Followups
                                </Link>
                            </li>
                        )}

                        {/* User Management */}
                        {user?.role === 'ADMIN' && (
                            <li>
                                <Link
                                    to="/users"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaUserCog />
                                    User Management
                                </Link>
                            </li>
                        )}

                        {/* MLM Tree */}
                        {['ADMIN', 'MLM_USER'].includes(user?.role) && (
                            <li>
                                <Link
                                    to="/mlm-tree"
                                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-blue-600 transition-all duration-200"
                                >
                                    <FaProjectDiagram />
                                    MLM Tree
                                </Link>
                            </li>
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