import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import API from '../api'

function ProductList() {
  // useState — состояние компонента
  const [products, setProducts] = useState([])   // список товаров
  const [categories, setCategories] = useState([]) // список категорий
  const [loading, setLoading] = useState(true)   // идёт ли загрузка
  const [query, setQuery] = useState('')          // поисковый запрос
  const [category, setCategory] = useState('')    // выбранная категория

  // useEffect — выполняется при загрузке компонента
  // и при изменении query или category
  useEffect(() => {
    fetchProducts()
  }, [query, category])

  // При первом рендере загружаем категории
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories/')
      setCategories(res.data)
    } catch (err) {
      console.error('Ошибка загрузки категорий:', err)
    }
  }

  const fetchProducts = async () => {
    try {
      setLoading(true)
      // Строим параметры запроса
      const params = {}
      if (query) params.q = query
      if (category) params.category = category

      const res = await API.get('/products/', { params })
      setProducts(res.data)
    } catch (err) {
      console.error('Ошибка загрузки товаров:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      padding: '30px',
      background: '#0a0a0a',
      minHeight: '100vh',
      color: 'white'
    }}>
      <h1 style={{ marginBottom: '20px', color: '#6c3aed' }}>📱 Магазин техники</h1>

      {/* Поиск */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Поиск товаров..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #333',
            background: '#1a1a1a',
            color: 'white',
            width: '300px',
            fontSize: '15px'
          }}
        />
      </div>

      {/* Фильтр по категориям */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setCategory('')}
          style={{
            padding: '7px 16px',
            borderRadius: '20px',
            border: 'none',
            cursor: 'pointer',
            background: category === '' ? '#6c3aed' : '#222',
            color: 'white'
          }}
        >
          Все
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.slug)}
            style={{
              padding: '7px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer',
              background: category === cat.slug ? '#6c3aed' : '#222',
              color: 'white'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Товары */}
      {loading ? (
        <p style={{ color: '#aaa' }}>Загрузка...</p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px'
        }}>
          {products.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              style={{ textDecoration: 'none', color: 'white' }}
            >
              <div style={{
                background: '#1a1a1a',
                borderRadius: '10px',
                overflow: 'hidden',
                border: '1px solid #222',
                transition: 'transform 0.2s',
              }}
                onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {/* Картинка */}
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{
                    height: '200px',
                    background: '#222',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '50px'
                  }}>📱</div>
                )}

                {/* Инфо */}
                <div style={{ padding: '15px' }}>
                  <p style={{ color: '#6c3aed', fontSize: '12px', marginBottom: '5px' }}>
                    {product.category_name}
                  </p>
                  <h3 style={{ fontSize: '15px', marginBottom: '10px' }}>
                    {product.name}
                  </h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <p style={{ color: '#6c3aed', fontSize: '20px', fontWeight: 'bold' }}>
                      ${product.price}
                    </p>
                    <span style={{ color: product.stock > 0 ? '#4ade80' : '#e74c3c', fontSize: '13px' }}>
                      {product.stock > 0 ? '✓ В наличии' : '✗ Нет'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList