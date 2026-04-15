import { useNavigate } from 'react-router-dom'

function AdminLogin() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/admin/dashboard')
  }

  return (
    <section className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Admin Login</p>
        <h1>Manage operations</h1>
        <input placeholder="Admin email" type="email" />
        <input placeholder="Password" type="password" />
        <button className="primary-button" type="submit">
          Login
        </button>
      </form>
    </section>
  )
}

export default AdminLogin
