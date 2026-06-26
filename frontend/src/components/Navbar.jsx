import { Link } from 'react-router-dom'

function Navbar() {
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
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
          Товары
        </Link>
        <Link to="/cart" style={{
          background: '#6c3aed',
          color: 'white',
          padding: '6px 14px',
          borderRadius: '5px',
          textDecoration: 'none'
        }}>
          🛒 Корзина
        </Link>
      </div>
    </nav>
  )
}

export default Navbar