import { useState } from 'react'
import { useCart } from '../../context/CartContext'

function Cart() {
  const { cartItems, clearCart, decreaseQuantity, increaseQuantity, removeFromCart } = useCart()
  const [message, setMessage] = useState('')

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handlePlaceOrder() {
    if (!cartItems.length) {
      return
    }

    setMessage('')
    clearCart()
    setMessage('Order placed successfully for demo.')
  }

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">User Module</p>
          <h1>Cart</h1>
        </div>
        <p>Review your selected food items before placing an order.</p>
      </div>

      {!cartItems.length ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add items from the menu to see them here.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="stack-layout">
            {cartItems.map((item) => (
              <article className="card" key={item.id}>
                <div className="card-content">
                  <div className="card-header">
                    <h3>{item.name}</h3>
                    <span>Rs. {item.price}</span>
                  </div>
                  <div className="quantity-row">
                    <button className="secondary-button" onClick={() => decreaseQuantity(item.id)} type="button">
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button className="secondary-button" onClick={() => increaseQuantity(item.id)} type="button">
                      +
                    </button>
                    <button className="secondary-button" onClick={() => removeFromCart(item.id)} type="button">
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="card summary-card">
            <div className="card-content">
              <div className="card-header">
                <h3>Order Summary</h3>
                <span>{cartItems.length} items</span>
              </div>
              <p>Total amount: Rs. {totalAmount}</p>
              {message ? <p className="message success-message">{message}</p> : null}
              <button className="primary-button full-width" onClick={handlePlaceOrder} type="button">
                Place Order
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
