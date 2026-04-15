function OrderCard({ order }) {
  const orderId = order.orderId ?? order.id
  const items = order.items || order.orderItems || []
  const totalItems = Array.isArray(items)
    ? items.reduce((sum, item) => sum + Number(item.quantity || 0), 0) || items.length
    : order.totalItems || 0

  return (
    <article className="card">
      <div className="card-content">
        <div className="card-header">
          <h3>Order #{orderId || 'N/A'}</h3>
          <span>{order.status || 'Recorded'}</span>
        </div>
        {order.userId ? <p>User ID: {order.userId}</p> : null}
        <p>Total items: {totalItems}</p>
        <p>Total amount: Rs. {Number(order.totalAmount || 0).toFixed(2)}</p>
        {order.createdAt ? (
          <p className="muted-text">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
        ) : null}
      </div>
    </article>
  )
}

export default OrderCard
