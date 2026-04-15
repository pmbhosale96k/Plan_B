import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import Login from '../pages/user/Login'
import Register from '../pages/user/Register'
import Menu from '../pages/user/Menu'
import Cart from '../pages/user/Cart'
import Orders from '../pages/user/Orders'
import Favourites from '../pages/user/Favourites'
import AdminLogin from '../pages/admin/AdminLogin'
import Dashboard from '../pages/admin/Dashboard'
import MenuManager from '../pages/admin/MenuManager'
import AdminOrders from '../pages/admin/Orders'
import Analytics from '../pages/admin/Analytics'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate replace to="/login" />
}

function AppShell({ children }) {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-shell">{children}</main>
    </div>
  )
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <AppShell>
              <Menu />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <AppShell>
              <Cart />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <AppShell>
              <Orders />
            </AppShell>
          </ProtectedRoute>
        }
      />
      <Route
        path="/favourites"
        element={
          <ProtectedRoute>
            <AppShell>
              <Favourites />
            </AppShell>
          </ProtectedRoute>
        }
      />

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AppShell>
            <Dashboard />
          </AppShell>
        }
      />
      <Route
        path="/admin/menu"
        element={
          <AppShell>
            <MenuManager />
          </AppShell>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <AppShell>
            <AdminOrders />
          </AppShell>
        }
      />
      <Route
        path="/admin/analytics"
        element={
          <AppShell>
            <Analytics />
          </AppShell>
        }
      />

      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  )
}

export default AppRoutes
