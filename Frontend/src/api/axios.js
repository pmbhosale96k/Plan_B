import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
})

API.interceptors.request.use((request) => {
  const isAdminRequest = request.url?.startsWith('/admin') || request.url?.startsWith('/auth/admin')
  const token = isAdminRequest
    ? localStorage.getItem('adminToken')
    : localStorage.getItem('token')

  if (token && token !== 'session') {
    request.headers.Authorization = `Bearer ${token}`
  }

  return request
})

export default API
