import API from './axios'

export function loginUser(payload) {
  return API.post('/auth/user/login', payload)
}

export function registerUser(payload) {
  return API.post('/auth/user/register', payload)
}

export function getMenu() {
  return API.get('/user/menu')
}

export function getBestSellers() {
  return API.get('/user/menu/best-sellers')
}

export function placeOrder(payload) {
  return API.post('/user/orders', payload)
}

export function getFavourites() {
  return API.get('/user/favourites')
}

export function toggleFavourite(id) {
  return API.post(`/user/favourites/${id}`)
}
