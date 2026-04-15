import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { placeOrder } from '../../api/userApi'
import Loader from '../../components/Loader'
import { useCart } from '../../context/CartContext'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, clearCart, decreaseQuantity, increaseQuantity, removeFromCart } = useCart()
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)

  async function handlePlaceOrder() {
    if (!cartItems.length) {
      return
    }

    setIsSubmitting(true)
    setMessage('')
    setErrorMessage('')

    try {
      await placeOrder({
        items: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
        })),
      })

      clearCart()
      setMessage('Order placed successfully.')
      navigate('/orders')
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Unable to place the order.')
    } finally {
      setIsSubmitting(false)
    }
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

      {message ? <p className="message success-message">{message}</p> : null}
      {errorMessage ? <p className="message error-message">{errorMessage}</p> : null}

      {!cartItems.length ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add items from the menu to see them here.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="stack-layout compact-stack">
            {cartItems.map((item) => (
              <article className="card" key={item.id}>
                <div className="card-content">
                  <div className="card-header">
                    <h3>{item.name}</h3>
                    <span>Rs. {Number(item.price || 0).toFixed(2)}</span>
                  </div>
                  <p className="muted-text">Subtotal: Rs. {Number(item.price * item.quantity).toFixed(2)}</p>
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
              <p>Total amount: Rs. {totalAmount.toFixed(2)}</p>
              {isSubmitting ? (
                <Loader label="Placing order..." />
              ) : (
                <button className="primary-button full-width" onClick={handlePlaceOrder} type="button">
                  Place Order
                </button>
              )}
            </div>
          </aside>
        </div>
      )}
    </section>
  )
}

export default Cart
