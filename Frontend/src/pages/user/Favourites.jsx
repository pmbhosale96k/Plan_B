import { useEffect, useState } from 'react'
import { extractErrorMessage, extractPayload } from '../../api/helpers'
import { getFavourites, toggleFavourite } from '../../api/userApi'
import Loader from '../../components/Loader'
import MenuCard from '../../components/MenuCard'
import { useCart } from '../../context/CartContext'

function normalizeItems(items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item) => ({
    id: item.id,
    name: item.name || item.itemName || 'Menu Item',
    price: item.price ?? item.amount ?? 0,
    description: item.description || '',
    category: item.category || item.type || '',
    imageUrl: item.imageUrl || item.image || '',
  }))
}

function Favourites() {
  const { addToCart } = useCart()
  const [favourites, setFavourites] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingId, setLoadingId] = useState(null)

  useEffect(() => {
    async function loadFavourites() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await getFavourites()
        setFavourites(normalizeItems(extractPayload(response)))
      } catch (error) {
        setErrorMessage(
          extractErrorMessage(
            error,
            'Unable to load favourite items right now.',
            'The current backend does not expose favourites yet.',
          ),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadFavourites()
  }, [])

  async function handleToggleFavourite(item) {
    setLoadingId(item.id)

    try {
      await toggleFavourite(item.id)
      setFavourites((currentItems) => currentItems.filter((currentItem) => currentItem.id !== item.id))
    } catch (error) {
      setErrorMessage(
        extractErrorMessage(
          error,
          'Unable to update favourite items.',
          'The current backend does not expose favourites yet.',
        ),
      )
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">User Module</p>
          <h1>Favourites</h1>
        </div>
        <p>Quickly reorder from the items you have marked as favourites.</p>
      </div>

      {errorMessage ? <p className="message warning-message">{errorMessage}</p> : null}

      {isLoading ? (
        <Loader label="Loading favourites..." />
      ) : favourites.length ? (
        <div className="grid-layout">
          {favourites.map((item) => (
            <MenuCard
              favouriteLoading={loadingId === item.id}
              isFavourite
              item={item}
              key={item.id}
              onAddToCart={addToCart}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No favourites yet</h2>
          <p>Mark items as favourites from the menu page to see them here.</p>
        </div>
      )}
    </section>
  )
}

export default Favourites
