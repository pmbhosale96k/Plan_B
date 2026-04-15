import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { registerUser } from '../../api/userApi'
import Loader from '../../components/Loader'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await registerUser(formData)
      setSuccessMessage('Registration successful. You can log in now.')
      navigate('/login')
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          'Registration failed. The backend register endpoint may not be implemented yet.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Create Account</p>
        <h1>Join SmartCafe</h1>
        <input
          placeholder="Name"
          required
          value={formData.name}
          onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
        />
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
        {errorMessage ? <p className="message error-message">{errorMessage}</p> : null}
        {successMessage ? <p className="message success-message">{successMessage}</p> : null}
        {isSubmitting ? (
          <Loader label="Creating account..." />
        ) : (
          <button className="primary-button" type="submit">
            Register
          </button>
        )}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}

export default Register
