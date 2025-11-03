
import { useNavigate } from 'react-router-dom'
import './Cancel.css'

const Cancel = () => {
  const navigate = useNavigate()

  return (
    <div className="cancel-container">
      <div className="cancel-card">
        <div className="cancel-icon">✕</div>
        <h1>Payment Cancelled</h1>
        <p>Your payment was not completed.</p>
        <p>You can continue shopping or try again.</p>
        <div className="cancel-actions">
          <button
            onClick={() => navigate('/cart')}
            className="cart-btn"
          >
            Back to Cart
          </button>
          <button
            onClick={() => navigate('/')}
            className="home-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cancel