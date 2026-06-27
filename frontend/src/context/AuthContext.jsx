import { createContext, useContext, useState } from 'react'
import API from '../api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Берём токен из localStorage если он есть
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [username, setUsername] = useState(localStorage.getItem('username'))

  const login = async (username, password) => {
    const res = await API.post('/auth/login/', { username, password })
    // Сохраняем токен
    localStorage.setItem('token', res.data.access)
    localStorage.setItem('username', username)
    setToken(res.data.access)
    setUsername(username)
  }

  const register = async (username, password) => {
    const res = await API.post('/auth/register/', { username, password })
    localStorage.setItem('token', res.data.access)
    localStorage.setItem('username', username)
    setToken(res.data.access)
    setUsername(username)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setToken(null)
    setUsername(null)
  }

  return (
    <AuthContext.Provider value={{ token, username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)