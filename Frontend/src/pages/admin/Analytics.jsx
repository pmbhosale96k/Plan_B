import { useEffect, useState } from 'react'
import { extractErrorMessage, extractPayload } from '../../api/helpers'
import { getBestSellingItems, getTodayRevenue } from '../../api/adminApi'
import Loader from '../../components/Loader'

function Analytics() {
  const [revenue, setRevenue] = useState(0)
  const [bestSellers, setBestSellers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    async function loadAnalytics() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [revenueResponse, bestSellerResponse] = await Promise.all([
          getTodayRevenue(),
          getBestSellingItems(),
        ])

        const revenueData = extractPayload(revenueResponse)
        const bestSellerData = extractPayload(bestSellerResponse)

        setRevenue(revenueData?.amount ?? revenueData?.todayRevenue ?? revenueData ?? 0)
        setBestSellers(Array.isArray(bestSellerData) ? bestSellerData.slice(0, 5) : [])
      } catch (error) {
        setErrorMessage(
          extractErrorMessage(
            error,
            'Unable to load analytics right now.',
            'The current backend does not expose the analytics endpoints yet.',
          ),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadAnalytics()
  }, [])

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin Module</p>
          <h1>Analytics</h1>
        </div>
        <p>Review today's revenue and your highest-performing menu items.</p>
      </div>

      {isLoading ? (
        <Loader label="Loading analytics..." />
      ) : errorMessage ? (
        <div className="empty-state">
          <h2>Analytics backend pending</h2>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <div className="stack-layout">
          <section className="stats-grid single-stat">
            <article className="card stat-card">
              <div className="card-content">
                <p className="eyebrow">Today Revenue</p>
                <h2>Rs. {Number(revenue || 0).toFixed(2)}</h2>
              </div>
            </article>
          </section>

          <section className="card">
            <div className="card-content">
              <div className="subsection-heading">
                <h2>Top Best-Selling Items</h2>
              </div>
              {bestSellers.length ? (
                <div className="list-layout">
                  {bestSellers.map((item, index) => (
                    <div className="list-row" key={item.menuItemId || index}>
                      <span>{item.name || `Item ${index + 1}`}</span>
                      <span>{item.totalCount ?? '-'}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="muted-text">No analytics data available yet.</p>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Analytics
