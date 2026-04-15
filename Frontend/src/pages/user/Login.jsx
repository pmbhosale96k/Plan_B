import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: 'demo@smartcafe.com',
    password: 'demo123',
  })

  function handleSubmit(event) {
    event.preventDefault()
    login('round-1-demo-token')
    navigate('/menu')
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">User Login</p>
        <h1>Welcome to SmartCafe</h1>
        <div className="demo-credentials">
          <strong>Demo User</strong>
          <span>Email: demo@smartcafe.com</span>
          <span>Password: demo123</span>
        </div>
        <input
          placeholder="Email"
          type="email"
          required
          value={formData.email}
          onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
        />
        <input
          placeholder="Password"
          type="password"
          required
          value={formData.password}
          onChange={(event) =>
            setFormData((current) => ({ ...current, password: event.target.value }))
          }
        />
        <button className="primary-button" type="submit">
          Login
        </button>
        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  )
}

export default Login
