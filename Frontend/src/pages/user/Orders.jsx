import { useEffect, useState } from 'react'
import { extractPayload } from '../../api/helpers'
import { getUserOrders } from '../../api/userApi'
import Loader from '../../components/Loader'
import OrderCard from '../../components/OrderCard'

function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await getUserOrders()
        const data = extractPayload(response)
        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || error.message || 'Unable to load your orders right now.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadOrders()
  }, [])

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">User Module</p>
          <h1>Orders</h1>
        </div>
        <p>Track the status and totals of your previous orders.</p>
      </div>

      {errorMessage ? <p className="message warning-message">{errorMessage}</p> : null}

      {isLoading ? (
        <Loader label="Loading orders..." />
      ) : orders.length ? (
        <div className="grid-layout">
          {orders.map((order, index) => (
            <OrderCard key={order.id || index} order={order} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No orders yet</h2>
          <p>Your completed orders will appear here once you place them.</p>
        </div>
      )}
    </section>
  )
}

export default Orders
