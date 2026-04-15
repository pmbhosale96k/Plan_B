function MenuCard({ item, onAddToCart, onToggleFavourite, isFavourite = false }) {
  return (
    <article className="card">
      <div className="card-image">{item.imageUrl ? <img alt={item.name} src={item.imageUrl} /> : 'Food'}</div>
      <div className="card-content">
        <div className="card-header">
          <h3>{item.name}</h3>
          <span>Rs. {item.price}</span>
        </div>
        <p>{item.description || 'Tasty and ready to order.'}</p>
        <div className="card-actions">
          <button className="primary-button" onClick={() => onAddToCart?.(item)} type="button">
            Add to Cart
          </button>
          <button className="secondary-button" onClick={() => onToggleFavourite?.(item)} type="button">
            {isFavourite ? 'Favourited' : 'Favourite'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default MenuCard
