import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard/Dashboard';
import CustomerList from './pages/customers/CustomerList';
import SalesList from './pages/sales/SalesList';
import ProductList from './pages/products/ProductList';
import LowStock from './pages/products/LowStock';
import Inventory from './pages/dashboard/Inventory';
import UserManagement from './pages/users/UserManagement';
import MLMTree from './pages/mlm/MLMTree';
import CommissionList from './pages/commissions/CommissionList';
import Exports from './pages/reports/Exports';
import Reports from './pages/reports/Reports';
import ReminderList from './pages/reminders/ReminderList';
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import RoleProtectedRoute from './routes/RoleProtectedRoute';
import VehicleList from './pages/vehicles/VehicleList';
import StockDashboard from './pages/dashboard/StockDashboard';
import FollowupDashboard from './pages/dashboard/FollowupDashboard';
import CustomerProfile from './pages/customers/CustomerProfile';
import LeadList from './pages/leads/LeadList';
import LeadPipeline from './pages/leads/LeadPipeline';
import SalesTargets from './pages/salesTargets/SalesTargets';
import FollowupList from './pages/followups/FollowupList';

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Login */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected Routes */}

                <Route
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/customers"
                        element={<CustomerList />}
                    />

                    <Route
                        path="/sales"
                        element={<SalesList />}
                    />

                    <Route
                        path="/products"
                        element={<ProductList />}
                    />

                    <Route
                        path="/inventory"
                        element={<Inventory />}
                    />

                    <Route
                        path="/low-stock"
                        element={<LowStock />}
                    />

                    <Route
                        path="/commissions"
                        element={<CommissionList />}
                    />

                    <Route
                        path="/exports"
                        element={<Exports />}
                    />

                    <Route
                        path="/reminders"
                        element={<ReminderList />}
                    />

                    <Route
                        path="/mlm-tree"
                        element={<MLMTree />}
                    />

                    <Route
                        path="/users"
                        element={
                            <RoleProtectedRoute
                                path="/users"
                            >
                                <UserManagement />
                            </RoleProtectedRoute>
                        }
                    />

                    <Route
                        path="/reports"
                        element={
                            <RoleProtectedRoute
                                path="/reports"
                            >
                                <Reports />
                            </RoleProtectedRoute>
                        }
                    />

                    <Route
                        path="/vehicles"
                        element={<VehicleList />}
                    />

                    <Route
                        path="/stock-dashboard"
                        element={<StockDashboard />}
                    />

                    <Route
                        path="/followup-dashboard"
                        element={<FollowupDashboard />}
                    />

                    <Route
                        path="/customer-profile/:id"
                        element={<CustomerProfile />}
                    />

                    <Route
                        path="/leads"
                        element={<LeadList />}
                    />

                    <Route
                        path="/lead-pipeline"
                        element={<LeadPipeline />}
                    />

                    <Route
                        path="/sales-targets"
                        element={<SalesTargets />}
                    />

                    <Route
                        path="/followups"
                        element={<FollowupList />}
                    />

                </Route>

                

                {/* Default Redirect */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/login"
                        />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;