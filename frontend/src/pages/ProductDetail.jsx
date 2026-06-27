import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import API from '../api'
import { useCart } from '../context/CartContext'

function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart() // Логика внутри компонента
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false) // Стейт внутри компонента

  useEffect(() => {
    fetchProduct()
  }, [id])

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}/`)
      setProduct(res.data)
    } catch (err) {
      console.error('Ошибка:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    }
  }

  if (loading) return (
    <div style={{ padding: '30px', background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      Загрузка...
    </div>
  )

  if (!product) return (
    <div style={{ padding: '30px', background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      Товар не найден
    </div>
  )

  return (
    <div style={{ padding: '30px', background: '#0a0a0a', minHeight: '100vh', color: 'white' }}>
      <Link to="/" style={{ color: '#6c3aed', textDecoration: 'none' }}>
        ← Все товары
      </Link>
      <br /><br />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '400px 1fr',
        gap: '30px',
        maxWidth: '900px',
        background: '#1a1a1a',
        borderRadius: '10px',
        overflow: 'hidden'
      }}>
        {/* Картинка */}
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            style={{ width: '100%', height: '400px', objectFit: 'cover' }}
          />
        ) : (
          <div style={{
            height: '400px',
            background: '#222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '80px'
          }}>📱</div>
        )}

        {/* Инфо */}
        <div style={{ padding: '30px' }}>
          <p style={{ color: '#6c3aed', fontSize: '13px' }}>{product.category_name}</p>
          <h1 style={{ fontSize: '24px', margin: '10px 0' }}>{product.name}</h1>
          <p style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '20px' }}>
            {product.description}
          </p>
          <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#6c3aed', marginBottom: '15px' }}>
            ${product.price}
          </p>
          
          {product.stock > 0 ? (
            <>
              <p style={{ color: '#4ade80', marginBottom: '15px' }}>
                ✓ В наличии ({product.stock} шт)
              </p>
              <button
                onClick={handleAddToCart}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: added ? '#4ade80' : '#6c3aed',
                  color: added ? '#000' : 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
              >
                {added ? '✅ Добавлено!' : '🛒 Добавить в корзину'}
              </button>
            </>
          ) : (
            <p style={{ color: '#e74c3c', fontSize: '18px' }}>✗ Нет в наличии</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
