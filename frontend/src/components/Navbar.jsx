import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Navbar() {
  const { totalItems } = useCart()

  return (
    <nav style={{
      background: '#111',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: '2px solid #6c3aed'
    }}>
      <Link to="/" style={{
        color: '#6c3aed',
        fontSize: '22px',
        fontWeight: 'bold',
        textDecoration: 'none'
      }}>
        TechShop
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Товары
        </Link>
        <Link to="/cart" style={{
          background: '#6c3aed',
          color: 'white',
          padding: '6px 14px',
          borderRadius: '5px',
          textDecoration: 'none',
          position: 'relative'
        }}>
          🛒 Корзина
          {/* Бейдж с количеством товаров */}
          {totalItems > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 'bold'
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  )
}

export default Navbar