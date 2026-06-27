import { createContext, useContext, useState } from 'react'

// Создаём контекст — глобальное состояние для всего приложения
// Это как useState но доступен в любом компоненте
const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Добавить товар в корзину
  const addToCart = (product) => {
    setCartItems(prev => {
      // Проверяем есть ли уже этот товар
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        // Увеличиваем количество
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      // Добавляем новый товар с quantity: 1
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Убрать товар из корзины
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }

  // Считаем итого
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  )

  // Количество товаров в корзине
  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity, 0
  )

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      totalPrice,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

// Хук для использования корзины в любом компоненте
export const useCart = () => useContext(CartContext)