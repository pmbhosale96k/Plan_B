function OrderCard({ order }) {
  return (
    <article className="card">
      <div className="card-content">
        <div className="card-header">
          <h3>Order #{order.id}</h3>
          <span>{order.status || 'Pending'}</span>
        </div>
        <p>Total items: {order.items?.length || 0}</p>
        <p>Total amount: Rs. {order.totalAmount ?? 0}</p>
      </div>
    </article>
  )
}

export default OrderCard
