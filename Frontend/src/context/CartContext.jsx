import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const CART_KEY = 'cartItems'

function updateItemQuantity(items, id, change) {
  return items
    .map((item) =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + change, 0) } : item,
    )
    .filter((item) => item.quantity > 0)
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem(CART_KEY)
    return storedCart ? JSON.parse(storedCart) : []
  })

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  const value = {
    cartItems,
    addToCart: (item) =>
      setCartItems((currentItems) => {
        const existingItem = currentItems.find((currentItem) => currentItem.id === item.id)

        if (existingItem) {
          return currentItems.map((currentItem) =>
            currentItem.id === item.id
              ? { ...currentItem, quantity: currentItem.quantity + 1 }
              : currentItem,
          )
        }

        return [...currentItems, { ...item, quantity: 1 }]
      }),
    removeFromCart: (id) =>
      setCartItems((currentItems) => currentItems.filter((item) => item.id !== id)),
    increaseQuantity: (id) =>
      setCartItems((currentItems) => updateItemQuantity(currentItems, id, 1)),
    decreaseQuantity: (id) =>
      setCartItems((currentItems) => updateItemQuantity(currentItems, id, -1)),
    clearCart: () => setCartItems([]),
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
