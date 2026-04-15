import API from './axios'

export function loginUser(payload) {
  return API.post('/auth/user/login', payload)
}

export function registerUser(payload) {
  return API.post('/auth/user/register', payload)
}

export async function getMenu() {
  try {
    return await API.get('/user/menu')
  } catch (error) {
    return API.get('/admin/menu/allProducts')
  }
}

export async function getBestSellers() {
  try {
    return await API.get('/user/menu/best-sellers')
  } catch (error) {
    return API.get('/admin/best-sellers')
  }
}

export function placeOrder(payload) {
  return API.post('/user/orders', payload)
}

export function getUserOrders() {
  return API.get('/user/orders')
}

export function getFavourites() {
  return API.get('/user/favourites')
}

export function toggleFavourite(id) {
  return API.post(`/user/favourites/${id}`)
}
