import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'

import AdminLayout from './layouts/AdminLayout'

import ProtectedRoute from './routes/ProtectedRoute'
import SuperAdminRoute from './routes/SuperAdminRoute'

import Login from './pages/Login'
import Register from './pages/Register'

import Dashboard from './pages/Dashboard'
import CreateAdmin from './pages/CreateAdmin'

import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'

import Drivers from './pages/Drivers'
import DriverDetails from './pages/DriverDetails'

import Documents from './pages/Documents'

import Customers from './pages/Customers'
import CustomerDetails from './pages/CustomerDetails'

import Vehicles from './pages/Vehicles'
import VehicleDetails from './pages/VehicleDetails'

import Payments from './pages/Payments'
import PaymentDetails from './pages/PaymentDetails'

import Complaints from './pages/Complaints'
import ComplaintDetails from './pages/ComplaintDetails'

import Settings from './pages/Settings'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* Inscription publique désactivée */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* Administration protégée */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route
              index
              element={<Dashboard />}
            />

            {/* Courses */}
            <Route
              path="courses"
              element={<Courses />}
            />

            <Route
              path="courses/:courseId"
              element={<CourseDetails />}
            />

            {/* Drivers */}
            <Route
              path="drivers"
              element={<Drivers />}
            />

            <Route
              path="drivers/:driverId"
              element={<DriverDetails />}
            />

            {/* Documents */}
            <Route
              path="documents"
              element={<Documents />}
            />

            {/* Customers */}
            <Route
              path="clients"
              element={<Customers />}
            />

            <Route
              path="clients/:customerId"
              element={<CustomerDetails />}
            />

            {/* Vehicles */}
            <Route
              path="vehicles"
              element={<Vehicles />}
            />

            <Route
              path="vehicles/:vehicleId"
              element={<VehicleDetails />}
            />

            {/* Payments */}
            <Route
              path="payments"
              element={<Payments />}
            />

            <Route
              path="payments/:paymentId"
              element={<PaymentDetails />}
            />

            {/* Complaints */}
            <Route
              path="complaints"
              element={<Complaints />}
            />

            <Route
              path="complaints/:complaintId"
              element={<ComplaintDetails />}
            />

            {/* Settings */}
            <Route
              path="settings"
              element={<Settings />}
            />

            {/* Création d'administrateur :
                uniquement Super Admin */}
            <Route
              path="users/new"
              element={
                <SuperAdminRoute>
                  <CreateAdmin />
                </SuperAdminRoute>
              }
            />
          </Route>

          {/* Racine */}
          <Route
            path="/"
            element={
              <Navigate
                to="/admin"
                replace
              />
            }
          />

          {/* Toute route inconnue */}
          <Route
            path="*"
            element={
              <Navigate
                to="/admin"
                replace
              />
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App