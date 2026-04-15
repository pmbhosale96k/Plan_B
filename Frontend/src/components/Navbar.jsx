import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const userLinks = [
  { to: '/menu', label: 'Menu' },
  { to: '/cart', label: 'Cart' },
]

const adminLinks = [
  { to: '/admin/dashboard', label: 'Dashboard' },
  { to: '/admin/menu', label: 'Menu Manager' },
  { to: '/admin/orders', label: 'Orders' },
  { to: '/admin/analytics', label: 'Analytics' },
]

function Navbar() {
  const { pathname } = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const links = pathname.startsWith('/admin') ? adminLinks : userLinks

  return (
    <header className="navbar">
      <Link className="brand" to={pathname.startsWith('/admin') ? '/admin/dashboard' : '/menu'}>
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

      {isAuthenticated ? (
        <button className="secondary-button" onClick={logout} type="button">
          Logout
        </button>
      ) : null}
    </header>
  )
}

export default Navbar
