import API from './axios'

export function loginAdmin(payload) {
  return API.post('/auth/admin/login', payload)
}

export function getAdminOrders() {
  return API.get('/admin/orders')
}

export function addMenuItem(payload) {
  return API.post('/admin/menu', payload)
}

export function updateMenuItem(id, payload) {
  return API.put(`/admin/menu/${id}`, payload)
}

export function deleteMenuItem(id) {
  return API.delete(`/admin/menu/${id}`)
}

export function getTodayRevenue() {
  return API.get('/admin/revenue/today')
}

export function getBestSellingItems() {
  return API.get('/admin/menu/best-sellers')
}
