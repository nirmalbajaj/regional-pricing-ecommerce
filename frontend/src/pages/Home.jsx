
import { useState, useEffect } from 'react'
import { getProducts } from "../services/api.js"
import ProductCard from "../components/ProductCard.jsx"
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      setError('Failed to load products. Please try again later.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading products...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to RegionalShop</h1>
        <p>Shop products with prices in your local currency</p>
      </div>

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="no-products">No products available</p>
        )}
      </div>
    </div>
  )
}

export default Home