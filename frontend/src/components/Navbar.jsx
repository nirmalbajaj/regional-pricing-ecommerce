
import { Link } from 'react-router-dom'
import { useCountry } from '../context/CountryContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import './Navbar.css'

const Navbar = () => {
  const { selectedCountry, setSelectedCountry, countries } = useCountry()
  const { getCartCount } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ RegionalShop
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/cart" className="navbar-link cart-link">
            🛒 Cart
            {getCartCount() > 0 && (
              <span className="cart-badge">{getCartCount()}</span>
            )}
          </Link>

          <div className="country-selector">
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="country-dropdown"
            >
              {Object.entries(countries).map(([code, country]) => (
                <option key={code} value={code}>
                  {country.symbol} {country.currency}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar