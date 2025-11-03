
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { useCountry } from '../context/CountryContext.jsx'
import './Cart.css'

const Cart = () => {
  const navigate = useNavigate()
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const { convertPrice, getCurrentCountry } = useCountry()

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!')
      return
    }
    navigate('/checkout')
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Your cart is empty</h2>
        <p>Add some products to get started!</p>
        <button onClick={() => navigate('/')} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item._id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>

            <div className="cart-item-quantity">
              <button
                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                className="quantity-btn"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>

            <div className="cart-item-price">
              {getCurrentCountry().symbol}{" "}
              {convertPrice(item.basePrice * item.quantity)}
            </div>

            <button
              onClick={() => removeFromCart(item._id)}
              className="remove-btn"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Total:</h3>
          <h3>
            {getCurrentCountry().symbol} {getCartTotal(convertPrice).toFixed(2)}
          </h3>
        </div>
        <button onClick={handleCheckout} className="checkout-btn">
          Proceed to Checkout
        </button>
        <button onClick={() => navigate("/")} className="continue-shopping-btn">
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default Cart