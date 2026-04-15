import { useEffect, useMemo, useState } from 'react'
import { extractErrorMessage, extractPayload } from '../../api/helpers'
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

function normalizeBestSellerStats(items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item) => ({
    menuItemId: item.menuItemId ?? item.id,
    name: item.name || item.itemName || 'Menu Item',
    totalCount: Number(item.totalCount ?? item.quantitySold ?? item.orderCount ?? 0),
  }))
}

function Menu() {
  const { addToCart } = useCart()
  const [menuItems, setMenuItems] = useState([])
  const [bestSellerStats, setBestSellerStats] = useState([])
  const [favouriteIds, setFavouriteIds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [favouriteLoadingId, setFavouriteLoadingId] = useState(null)
  const [supportsFavourites, setSupportsFavourites] = useState(false)

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
          setBestSellerStats(normalizeBestSellerStats(extractPayload(bestSellerResponse.value)))
        }

        if (favouritesResponse.status === 'fulfilled') {
          const favourites = normalizeMenuItems(extractPayload(favouritesResponse.value))
          setFavouriteIds(favourites.map((item) => item.id))
          setSupportsFavourites(true)
        } else {
          setSupportsFavourites(false)
        }

        if (menuResponse.status !== 'fulfilled') {
          throw menuResponse.reason
        }
      } catch (error) {
        setErrorMessage(
          extractErrorMessage(error, 'Unable to load the menu right now.', 'The menu endpoint is not ready yet.'),
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuData()
  }, [])

  const bestSellerIds = useMemo(
    () => new Set(bestSellerStats.map((item) => item.menuItemId).filter(Boolean)),
    [bestSellerStats],
  )

  async function handleToggleFavourite(item) {
    if (!supportsFavourites) {
      return
    }

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
        extractErrorMessage(
          error,
          'Unable to update favourites right now.',
          'Favourites are not available in the current backend yet.',
        ),
      )
    } finally {
      setFavouriteLoadingId(null)
    }
  }

  const fullMenu = menuItems.length
    ? menuItems
    : []

  const featuredItems = useMemo(() => {
    if (bestSellerStats.length) {
      return bestSellerStats
        .map((item) => {
          const matchedItem = fullMenu.find((menuItem) => menuItem.id === item.menuItemId)

          if (matchedItem) {
            return {
              ...matchedItem,
              description: matchedItem.description || `Ordered ${item.totalCount} times recently.`,
            }
          }

          return {
            id: item.menuItemId,
            name: item.name,
            price: 0,
            description: `Ordered ${item.totalCount} times recently.`,
            category: 'Best Seller',
            imageUrl: '',
          }
        })
        .filter((item, index, items) => items.findIndex((entry) => entry.id === item.id) === index)
        .slice(0, 4)
    }

    return bestSellerIds.size ? fullMenu.filter((item) => bestSellerIds.has(item.id)).slice(0, 4) : fullMenu.slice(0, 4)
  }, [bestSellerIds, bestSellerStats, fullMenu])

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">User Module</p>
          <h1>Menu</h1>
        </div>
        <p>Browse the full menu and add items to your cart.</p>
      </div>

      {errorMessage ? <p className="message warning-message">{errorMessage}</p> : null}
      {!supportsFavourites && !isLoading ? (
        <p className="muted-text">Favourites are not exposed by the current backend yet.</p>
      ) : null}

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
                    onToggleFavourite={supportsFavourites ? handleToggleFavourite : undefined}
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
                    onToggleFavourite={supportsFavourites ? handleToggleFavourite : undefined}
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
