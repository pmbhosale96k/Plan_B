import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const userLinks = [
  { to: '/menu', label: 'Menu' },
  { to: '/cart', label: 'Cart' },
  { to: '/orders', label: 'Orders' },
  { to: '/favourites', label: 'Favourites' },
]

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/menu', label: 'Menu Manager' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/analytics', label: 'Analytics' },
]

function Navbar() {
  const { pathname } = useLocation()
  const { isAuthenticated, isAdminAuthenticated, logout, logoutAdmin } = useAuth()
  const isAdminSection = pathname.startsWith('/admin')
  const links = isAdminSection ? adminLinks : userLinks
  const showLogout = isAdminSection ? isAdminAuthenticated : isAuthenticated
  const handleLogout = isAdminSection ? logoutAdmin : logout

  return (
    <header className="navbar">
      <Link className="brand" to={isAdminSection ? '/admin/dashboard' : '/menu'}>
        SmartCafe
      </Link>

      <nav className="nav-links">
        {links.map((link) => (
          <Link
            key={link.to}
            className={pathname === link.to ? 'nav-link active' : 'nav-link'}
            to={link.to}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {showLogout ? (
        <button className="secondary-button" onClick={handleLogout} type="button">
          Logout
        </button>
      ) : null}
    </header>
  )
}

export default Navbar
