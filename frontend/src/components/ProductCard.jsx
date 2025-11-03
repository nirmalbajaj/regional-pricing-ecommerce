
import { Link } from 'react-router-dom'
import { useCountry } from "../context/CountryContext.jsx"
import { useCart } from "../context/CartContext.jsx"
import './ProductCard.css'

const ProductCard = ({ product }) => {
  const { convertPrice, getCurrentCountry } = useCountry()
  const { addToCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    alert('Product added to cart!')
  }

  return (
    <Link to={`/product/${product._id}`} className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">
            {getCurrentCountry().symbol} {convertPrice(product.basePrice)}
          </span>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard