import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { totalItems } = useCart()
  const { username, logout } = useAuth()

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

        {username ? (
          <>
            <span style={{ color: '#aaa' }}>{username}</span>
            <button
              onClick={logout}
              style={{
                background: 'none',
                border: '1px solid #e74c3c',
                color: '#e74c3c',
                padding: '6px 12px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Выйти
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none' }}>
              Войти
            </Link>
            <Link to="/register" style={{
              background: '#6c3aed',
              color: 'white',
              padding: '6px 14px',
              borderRadius: '5px',
              textDecoration: 'none'
            }}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar