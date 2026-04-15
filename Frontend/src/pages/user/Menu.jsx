import MenuCard from '../../components/MenuCard'
import { useCart } from '../../context/CartContext'

const bestSellerItems = [
  {
    id: 1,
    name: 'Paneer Burger',
    price: 149,
    description: 'Soft bun, crispy paneer, fresh veggies.',
  },
  {
    id: 2,
    name: 'Veg Loaded Pizza',
    price: 249,
    description: 'Cheesy pizza topped with fresh capsicum, onion, and corn.',
  },
]

const menuItems = [
  ...bestSellerItems,
  {
    id: 3,
    name: 'Masala Fries',
    price: 99,
    description: 'Seasoned fries with house masala.',
  },
  {
    id: 4,
    name: 'Cold Coffee',
    price: 89,
    description: 'Chilled coffee with a creamy finish.',
  },
  {
    id: 5,
    name: 'White Sauce Pasta',
    price: 199,
    description: 'Comforting pasta in a rich and creamy white sauce.',
  },
  {
    id: 6,
    name: 'Chocolate Shake',
    price: 119,
    description: 'A quick sweet drink for dessert lovers.',
  },
]

function Menu() {
  const { addToCart } = useCart()

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">User Module</p>
          <h1>Menu</h1>
        </div>
        <p> Sample</p>
      </div>

      <div className="stack-layout">
        <section>
          <div className="subsection-heading">
            <h2>Best Sellers</h2>
          </div>
          <div className="grid-layout">
            {bestSellerItems.map((item) => (
              <MenuCard item={item} key={item.id} onAddToCart={addToCart} />
            ))}
          </div>
        </section>

        <section>
          <div className="subsection-heading">
            <h2>Full Menu</h2>
          </div>
          <div className="grid-layout">
            {menuItems.map((item) => (
              <MenuCard item={item} key={item.id} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Menu
