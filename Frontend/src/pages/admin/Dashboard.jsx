import { useEffect, useState } from 'react'
import { extractPayload } from '../../api/helpers'
import { getAdminOrders, getBestSellingItems, getTodayRevenue } from '../../api/adminApi'
import Loader from '../../components/Loader'

function Dashboard() {
  const [stats, setStats] = useState({
    todayRevenue: 0,
    totalOrders: 0,
    pendingOrders: 0,
    bestSellers: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [revenueResponse, ordersResponse, bestSellerResponse] = await Promise.all([
          getTodayRevenue(),
          getAdminOrders(),
          getBestSellingItems(),
        ])

        const revenueData = extractPayload(revenueResponse)
        const orders = extractPayload(ordersResponse)
        const bestSellers = extractPayload(bestSellerResponse)
        const orderList = Array.isArray(orders) ? orders : []

        setStats({
          todayRevenue: revenueData?.amount ?? revenueData?.todayRevenue ?? revenueData ?? 0,
          totalOrders: orderList.length,
          pendingOrders: orderList.filter((order) => order.status === 'PENDING').length,
          bestSellers: Array.isArray(bestSellers) ? bestSellers.slice(0, 5) : [],
        })
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message ||
            'Admin analytics and orders endpoints are not available in the backend yet.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin Module</p>
          <h1>Dashboard</h1>
        </div>
        <p>Track today's revenue, order activity, and best-selling items.</p>
      </div>

      {isLoading ? (
        <Loader label="Loading dashboard..." />
      ) : errorMessage ? (
        <div className="empty-state">
          <h2>Dashboard backend pending</h2>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="stack-layout">
          <section className="stats-grid">
            <article className="card stat-card">
              <div className="card-content">
                <p className="eyebrow">Revenue</p>
                <h2>Rs. {Number(stats.todayRevenue || 0).toFixed(2)}</h2>
              </div>
            </article>
            <article className="card stat-card">
              <div className="card-content">
                <p className="eyebrow">Orders</p>
                <h2>{stats.totalOrders}</h2>
              </div>
            </article>
            <article className="card stat-card">
              <div className="card-content">
                <p className="eyebrow">Pending</p>
                <h2>{stats.pendingOrders}</h2>
              </div>
            </article>
          </section>

          <section className="card">
            <div className="card-content">
              <div className="subsection-heading">
                <h2>Top Items</h2>
              </div>
              {stats.bestSellers.length ? (
                <div className="list-layout">
                  {stats.bestSellers.map((item, index) => (
                    <div className="list-row" key={item.id || index}>
                      <span>{item.name || item.itemName || `Item ${index + 1}`}</span>
                      <span>{item.quantitySold || item.orderCount || item.totalSold || '-'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="muted-text">No best-seller data available yet.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Dashboard
