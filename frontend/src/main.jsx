import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './context/CartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* CartProvider оборачивает всё приложение */}
    {/* теперь корзина доступна везде */}
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)