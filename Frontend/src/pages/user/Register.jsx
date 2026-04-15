import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { extractMessage } from '../../api/helpers'
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
      const response = await registerUser(formData)
      setSuccessMessage(extractMessage(response, 'Registration successful. You can log in now.'))
      navigate('/login')
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || 'Registration failed. Please try again.',
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
          onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
          placeholder="Name"
          required
          value={formData.name}
        />
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
