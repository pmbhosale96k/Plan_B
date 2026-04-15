function MenuCard({
  item,
  onAddToCart,
  onToggleFavourite,
  isFavourite = false,
  favouriteLoading = false,
}) {
  const canToggleFavourite = typeof onToggleFavourite === 'function'

  return (
    <article className="card">
      <div className="card-image">
        {item.imageUrl ? <img alt={item.name} src={item.imageUrl} /> : (item.category || 'Food')}
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3>{item.name}</h3>
          <span>Rs. {Number(item.price || 0).toFixed(2)}</span>
        </div>
        <p>{item.description || 'Tasty and ready to order.'}</p>
        {item.category ? <p className="muted-text">Category: {item.category}</p> : null}
        <div className="card-actions">
          <button className="primary-button" onClick={() => onAddToCart?.(item)} type="button">
            Add to Cart
          </button>
          {canToggleFavourite ? (
            <button
              className="secondary-button"
              disabled={favouriteLoading}
              onClick={() => onToggleFavourite(item)}
              type="button"
            >
              {favouriteLoading ? 'Saving...' : isFavourite ? 'Remove Favourite' : 'Favourite'}
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default MenuCard
