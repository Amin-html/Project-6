import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(username, password)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка регистрации')
    }
  }

  return (
    <div style={{
      padding: '30px',
      background: '#0a0a0a',
      minHeight: '100vh',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{
        background: '#1a1a1a',
        padding: '30px',
        borderRadius: '10px',
        width: '400px',
        border: '1px solid #222'
      }}>
        <h1 style={{ marginBottom: '20px', color: '#6c3aed' }}>📝 Регистрация</h1>

        {error && (
          <p style={{
            color: '#e74c3c',
            background: '#2a1a1a',
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '15px'
          }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>
            Логин
          </label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #333',
              background: '#111',
              color: 'white',
              marginBottom: '15px',
              fontSize: '15px'
            }}
          />

          <label style={{ color: '#aaa', display: 'block', marginBottom: '5px' }}>
            Пароль
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #333',
              background: '#111',
              color: 'white',
              marginBottom: '20px',
              fontSize: '15px'
            }}
          />

          <button type="submit" style={{
            width: '100%',
            padding: '12px',
            background: '#6c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Зарегистрироваться
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '15px', color: '#aaa' }}>
          Уже есть аккаунт?{' '}
          <Link to="/login" style={{ color: '#6c3aed' }}>
            Войти
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register