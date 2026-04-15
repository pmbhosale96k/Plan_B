import { useEffect, useState } from 'react'
import { extractPayload } from '../../api/helpers'
import { getAdminOrders } from '../../api/adminApi'
import Loader from '../../components/Loader'

function Orders() {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadOrders() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await getAdminOrders()
        const data = extractPayload(response)
        setOrders(Array.isArray(data) ? data : [])
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || 'Admin orders endpoint is not available in the backend yet.',
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
          <p className="eyebrow">Admin Module</p>
          <h1>Orders</h1>
        </div>
        <p>Monitor all customer orders from one place.</p>
      </div>

      {isLoading ? (
        <Loader label="Loading orders..." />
      ) : orders.length ? (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Status</th>
                <th>Total</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order.id || index}>
                  <td>#{order.id || index + 1}</td>
                  <td>{order.status || 'PENDING'}</td>
                  <td>Rs. {Number(order.totalAmount || 0).toFixed(2)}</td>
                  <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : errorMessage ? (
        <div className="empty-state">
          <h2>Orders backend pending</h2>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="empty-state">
          <h2>No orders available</h2>
          <p>Orders will appear here once customers start placing them.</p>
        </div>
      )}
    </section>
  )
}

export default Orders
