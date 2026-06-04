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
import DashboardLayout from './layouts/DashboardLayout';
import ProtectedRoute from './routes/ProtectedRoute';
import ProductList from './pages/products/ProductList';
import UserManagement from './pages/users/UserManagement';
import MLMTree from './pages/mlm/MLMTree';
import CommissionList from './pages/commissions/CommissionList';
import LowStock from './pages/products/LowStock';
import Exports from './pages/reports/Exports';
import Inventory from './pages/dashboard/Inventory';


function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<Login />}
                />

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
                        path="/mlm-tree"
                        element={<MLMTree />}
                    />
                    <Route
                        path="/inventory"
                        element={<Inventory />}
                    />

                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate to="/login" />
                    }
                />

                <Route
                    path="/users"
                    element={<UserManagement />}
                />

                <Route
                    path="/mlm-tree"
                    element={<MLMTree />}
                />

                <Route
                    path="/commissions"
                    element={<CommissionList />}
                />
                <Route
                    path="/low-stock"
                    element={<LowStock />}
                />
                <Route
                    path="/exports"
                    element={<Exports />}
                />
                
                <Route
                    path="/inventory"
                    element={<Inventory />}
                />
                
                
            </Routes>

        </BrowserRouter>

    );
}

export default App;