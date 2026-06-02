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

                </Route>

                <Route
                    path="*"
                    element={
                        <Navigate to="/login" />
                    }
                />

            </Routes>

        </BrowserRouter>

    );
}

export default App;