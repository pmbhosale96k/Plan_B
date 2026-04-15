import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { extractToken } from '../../api/helpers'
import { loginAdmin } from '../../api/adminApi'
import Loader from '../../components/Loader'
import { useAuth } from '../../context/AuthContext'

const demoAdmin = {
  email: 'admin@smartcafe.com',
  password: 'admin123',
}

function AdminLogin() {
  const navigate = useNavigate()
  const { loginAdmin: saveAdminToken } = useAuth()
  const [formData, setFormData] = useState(demoAdmin)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      if (
        formData.email === demoAdmin.email &&
        formData.password === demoAdmin.password
      ) {
        saveAdminToken('demo-admin-token')
        navigate('/admin/dashboard')
        return
      }

      const response = await loginAdmin(formData)
      const token = extractToken(response)
      saveAdminToken(token || 'session')
      navigate('/admin/dashboard')
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || 'Unable to sign in as admin right now.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Admin Login</p>
        <h1>Manage SmartCafe</h1>
        <div className="auth-switch">
          <Link className="auth-switch-link" to="/login">
            Login as User
          </Link>
          <Link className="auth-switch-link active" to="/admin/login">
            Login as Admin
          </Link>
        </div>
        <div className="demo-credentials">
          <strong>Demo Admin</strong>
          <span>Email: {demoAdmin.email}</span>
          <span>Password: {demoAdmin.password}</span>
        </div>
        <input
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          placeholder="Admin email"
          required
          type="email"
          value={formData.email}
        />
        <input
          onChange={(event) => setFormData((current) => ({ ...current, password: event.target.value }))}
          placeholder="Password"
          required
          type="password"
          value={formData.password}
        />
        {errorMessage ? <p className="message error-message">{errorMessage}</p> : null}
        {isSubmitting ? (
          <Loader label="Signing in as admin..." />
        ) : (
          <button className="primary-button" type="submit">
            Login
          </button>
        )}
      </form>
    </section>
  )
}

export default AdminLogin
