import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function Cart() {
  const { cartItems, removeFromCart, totalPrice } = useCart()

  return (
    <div style={{
      padding: '30px',
      background: '#0a0a0a',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#6c3aed' }}>🛒 Корзина</h1>

      {cartItems.length === 0 ? (
        <div style={{
          background: '#1a1a1a',
          padding: '40px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <p style={{ fontSize: '50px', marginBottom: '15px' }}>🛒</p>
          <p style={{ color: '#aaa', marginBottom: '20px' }}>Корзина пуста</p>
          <Link to="/" style={{
            background: '#6c3aed',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            textDecoration: 'none'
          }}>
            В каталог
          </Link>
        </div>
      ) : (
        <div style={{ maxWidth: '800px' }}>
          {/* Список выбранных товаров */}
          <div style={{ display: 'flex', flexDirection: 'col', gap: '15px', marginBottom: '25px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: '#1a1a1a',
                padding: '15px 20px',
                borderRadius: '8px'
              }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0' }}>{item.name}</h3>
                  <p style={{ margin: 0, color: '#aaa' }}>
                    ${item.price} x {item.quantity} шт.
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <span style={{ fontWeight: 'bold', color: '#6c3aed' }}>
                    ${item.price * item.quantity}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Панель оформления */}
          <div style={{
            background: '#1a1a1a',
            padding: '20px',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '20px' }}>
              Итого: <strong style={{ color: '#6c3aed' }}>${totalPrice}</strong>
            </span>
            <button style={{
              background: '#4ade80',
              color: '#000',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Оформить заказ
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
