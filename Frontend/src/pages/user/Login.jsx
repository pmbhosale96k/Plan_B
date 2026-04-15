import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { extractToken } from '../../api/helpers'
import { loginUser } from '../../api/userApi'
import Loader from '../../components/Loader'
import { useAuth } from '../../context/AuthContext'

const demoUser = {
  email: 'demo@smartcafe.com',
  password: 'demo123',
}

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState(demoUser)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      if (
        formData.email === demoUser.email &&
        formData.password === demoUser.password
      ) {
        login('demo-user-token')
        navigate('/menu')
        return
      }

      const response = await loginUser(formData)
      const token = extractToken(response)

      if (!token) {
        throw new Error('Login succeeded, but no token was returned.')
      }

      login(token)
      navigate('/menu')
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || 'Unable to sign in with these credentials.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">User Login</p>
        <h1>Welcome to SmartCafe</h1>
        <div className="auth-switch">
          <Link className="auth-switch-link active" to="/login">
            Login as User
          </Link>
          <Link className="auth-switch-link" to="/admin/login">
            Login as Admin
          </Link>
        </div>
        <div className="demo-credentials">
          <strong>Demo User</strong>
          <span>Email: {demoUser.email}</span>
          <span>Password: {demoUser.password}</span>
        </div>
        <input
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
          placeholder="Email"
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
          <Loader label="Signing you in..." />
        ) : (
          <button className="primary-button" type="submit">
            Login
          </button>
        )}
        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  )
}

export default Login
