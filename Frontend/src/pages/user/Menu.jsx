import { useEffect, useMemo, useState } from 'react'
import { extractPayload } from '../../api/helpers'
import { getBestSellers, getFavourites, getMenu, toggleFavourite } from '../../api/userApi'
import Loader from '../../components/Loader'
import MenuCard from '../../components/MenuCard'
import { useCart } from '../../context/CartContext'

function normalizeMenuItems(items) {
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

function Menu() {
  const { addToCart } = useCart()
  const [menuItems, setMenuItems] = useState([])
  const [bestSellers, setBestSellers] = useState([])
  const [favouriteIds, setFavouriteIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [favouriteLoadingId, setFavouriteLoadingId] = useState(null)

  useEffect(() => {
    async function loadMenuData() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const [menuResponse, bestSellerResponse, favouritesResponse] = await Promise.allSettled([
          getMenu(),
          getBestSellers(),
          getFavourites(),
        ])

        if (menuResponse.status === 'fulfilled') {
          setMenuItems(normalizeMenuItems(extractPayload(menuResponse.value)))
        }

        if (bestSellerResponse.status === 'fulfilled') {
          setBestSellers(normalizeMenuItems(extractPayload(bestSellerResponse.value)))
        }

        if (favouritesResponse.status === 'fulfilled') {
          const favourites = normalizeMenuItems(extractPayload(favouritesResponse.value))
          setFavouriteIds(favourites.map((item) => item.id))
        }

        if (menuResponse.status !== 'fulfilled') {
          throw menuResponse.reason
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || error.message || 'Unable to load the menu right now.')
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuData()
  }, [])

  const bestSellerIds = useMemo(() => new Set(bestSellers.map((item) => item.id)), [bestSellers])

  async function handleToggleFavourite(item) {
    setFavouriteLoadingId(item.id)

    try {
      await toggleFavourite(item.id)
      setFavouriteIds((currentIds) =>
        currentIds.includes(item.id)
          ? currentIds.filter((id) => id !== item.id)
          : [...currentIds, item.id],
      )
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || error.message || 'Unable to update favourites right now.',
      )
    } finally {
      setFavouriteLoadingId(null)
    }
  }

  const fullMenu = menuItems.length
    ? menuItems
    : bestSellers.filter((item, index, items) => items.findIndex((entry) => entry.id === item.id) === index)

  const featuredItems = bestSellers.length
    ? bestSellers
    : fullMenu.filter((item) => bestSellerIds.has(item.id)).slice(0, 4)

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">User Module</p>
          <h1>Menu</h1>
        </div>
        <p>Browse the full menu, save favourites, and add items to your cart.</p>
      </div>

      {errorMessage ? <p className="message warning-message">{errorMessage}</p> : null}

      {isLoading ? (
        <Loader label="Loading menu..." />
      ) : (
        <div className="stack-layout">
          <section>
            <div className="subsection-heading">
              <h2>Best Sellers</h2>
            </div>
            <div className="grid-layout">
              {featuredItems.length ? (
                featuredItems.map((item) => (
                  <MenuCard
                    favouriteLoading={favouriteLoadingId === item.id}
                    isFavourite={favouriteIds.includes(item.id)}
                    item={item}
                    key={item.id}
                    onAddToCart={addToCart}
                    onToggleFavourite={handleToggleFavourite}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <h2>No best sellers yet</h2>
                  <p>Best-selling items will appear here once the backend starts returning them.</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <div className="subsection-heading">
              <h2>Full Menu</h2>
            </div>
            <div className="grid-layout">
              {fullMenu.length ? (
                fullMenu.map((item) => (
                  <MenuCard
                    favouriteLoading={favouriteLoadingId === item.id}
                    isFavourite={favouriteIds.includes(item.id)}
                    item={item}
                    key={item.id}
                    onAddToCart={addToCart}
                    onToggleFavourite={handleToggleFavourite}
                  />
                ))
              ) : (
                <div className="empty-state">
                  <h2>No menu items available</h2>
                  <p>The menu endpoint returned no items.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </section>
  )
}

export default Menu
