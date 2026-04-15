function OrderCard({ order }) {
  const items = order.items || order.orderItems || []

  return (
    <article className="card">
      <div className="card-content">
        <div className="card-header">
          <h3>Order #{order.id}</h3>
          <span>{order.status || 'Pending'}</span>
        </div>
        <p>Total items: {items.length || order.totalItems || 0}</p>
        <p>Total amount: Rs. {Number(order.totalAmount || 0).toFixed(2)}</p>
        {order.createdAt ? (
          <p className="muted-text">Placed on: {new Date(order.createdAt).toLocaleString()}</p>
        ) : null}
      </div>
    </article>
  )
}

export default OrderCard
