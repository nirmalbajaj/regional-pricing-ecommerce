
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useCountry } from '../context/CountryContext.jsx'
import { createCheckoutSession } from '../services/api.js'
import './Checkout.css'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal } = useCart()
  const { convertPrice, getCurrentCountry, selectedCountry } = useCountry()
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handlePayment = async () => {
    try {
      setLoading(true)
      setError(null)

      const checkoutData = {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(convertPrice(item.basePrice))
        })),
        currency: getCurrentCountry().currency,
        country: selectedCountry
      }

      const response = await createCheckoutSession(checkoutData)
      
      // Redirect to Stripe Checkout
      if (response.url) {
        window.location.href = response.url
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError('Failed to process payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>No items in cart</h2>
        <button onClick={() => navigate('/')} className="back-btn">
          Go to Home
        </button>
      </div>
    )
  }

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>

      <div className="checkout-content">
        <div className="checkout-items">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div key={item._id} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div className="checkout-item-info">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="checkout-item-price">
                {getCurrentCountry().symbol} {convertPrice(item.basePrice * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-summary">
          <h2>Payment Details</h2>
          
          <div className="summary-row">
            <span>Currency:</span>
            <span>{getCurrentCountry().currency}</span>
          </div>
          
          <div className="summary-row">
            <span>Country:</span>
            <span>{getCurrentCountry().name}</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount:</span>
            <span>
              {getCurrentCountry().symbol} {getCartTotal(convertPrice).toFixed(2)}
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="payment-btn"
          >
            {loading ? 'Processing...' : 'Proceed to Payment'}
          </button>

          <button
            onClick={() => navigate('/cart')}
            className="back-to-cart-btn"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Checkout