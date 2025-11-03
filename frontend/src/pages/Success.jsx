
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Success.css'

const Success = () => {
  const navigate = useNavigate()
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [])

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✓</div>
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p>Your order has been confirmed and will be processed shortly.</p>
        <button
          onClick={() => navigate('/')}
          className="home-btn"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default Success