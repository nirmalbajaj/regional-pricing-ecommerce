// client/src/services/api.js
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Product API calls
export const getProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const getProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// Payment API calls
export const createCheckoutSession = async (checkoutData) => {
  try {
    const response = await api.post('/payment/create-checkout-session', checkoutData)
    return response.data
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export default api