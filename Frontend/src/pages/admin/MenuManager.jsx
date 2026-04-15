import { useEffect, useState } from 'react'
import { addMenuItem, deleteMenuItem, getAdminMenu, updateMenuItem } from '../../api/adminApi'
import { extractPayload } from '../../api/helpers'
import Loader from '../../components/Loader'

const emptyForm = {
  name: '',
  price: '',
  category: '',
  stockQuantity: '',
}

function normalizeMenu(items) {
  if (!Array.isArray(items)) {
    return []
  }

  return items.map((item) => ({
    id: item.id,
    name: item.name || '',
    price: item.price ?? 0,
    category: item.category || '',
    stockQuantity: item.stockQuantity ?? 0,
  }))
}

function MenuManager() {
  const [menuItems, setMenuItems] = useState([])
  const [formData, setFormData] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    async function loadMenuItems() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const response = await getAdminMenu()
        setMenuItems(normalizeMenu(extractPayload(response)))
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || error.message || 'Unable to load menu items right now.',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadMenuItems()
  }, [])

  function resetForm() {
    setFormData(emptyForm)
    setEditingId(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage('')
    setSuccessMessage('')

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stockQuantity: Number(formData.stockQuantity),
    }

    try {
      if (editingId) {
        await updateMenuItem(editingId, payload)
        setMenuItems((currentItems) =>
          currentItems.map((item) => (item.id === editingId ? { ...item, ...payload } : item)),
        )
        setSuccessMessage('Menu item updated successfully.')
      } else {
        const response = await addMenuItem(payload)
        const createdItem = normalizeMenu([extractPayload(response)])[0] || { id: Date.now(), ...payload }
        setMenuItems((currentItems) => [...currentItems, createdItem])
        setSuccessMessage('Menu item added successfully.')
      }

      resetForm()
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Unable to save this menu item.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleEdit(item) {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category,
      stockQuantity: item.stockQuantity,
    })
  }

  async function handleDelete(id) {
    setErrorMessage('')
    setSuccessMessage('')

    try {
      await deleteMenuItem(id)
      setMenuItems((currentItems) => currentItems.filter((item) => item.id !== id))

      if (editingId === id) {
        resetForm()
      }

      setSuccessMessage('Menu item deleted successfully.')
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message || 'Unable to delete this menu item.')
    }
  }

  return (
    <section className="page-content">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Admin Module</p>
          <h1>Menu Manager</h1>
        </div>
        <p>Create, update, and remove menu items from the live catalog.</p>
      </div>

      {errorMessage ? <p className="message error-message">{errorMessage}</p> : null}
      {successMessage ? <p className="message success-message">{successMessage}</p> : null}

      <div className="admin-grid">
        <section className="card">
          <div className="card-content">
            <div className="subsection-heading">
              <h2>{editingId ? 'Edit Item' : 'Add Item'}</h2>
            </div>
            <form className="form-grid" onSubmit={handleSubmit}>
              <input
                onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
                placeholder="Item name"
                required
                value={formData.name}
              />
              <input
                onChange={(event) => setFormData((current) => ({ ...current, category: event.target.value }))}
                placeholder="Category"
                value={formData.category}
              />
              <input
                min="0"
                onChange={(event) => setFormData((current) => ({ ...current, price: event.target.value }))}
                placeholder="Price"
                required
                type="number"
                value={formData.price}
              />
              <input
                min="0"
                onChange={(event) =>
                  setFormData((current) => ({ ...current, stockQuantity: event.target.value }))
                }
                placeholder="Stock quantity"
                required
                type="number"
                value={formData.stockQuantity}
              />
              <div className="button-row">
                {isSubmitting ? (
                  <Loader label="Saving..." />
                ) : (
                  <button className="primary-button" type="submit">
                    {editingId ? 'Update Item' : 'Add Item'}
                  </button>
                )}
                <button className="secondary-button" onClick={resetForm} type="button">
                  Clear
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="card">
          <div className="card-content">
            <div className="subsection-heading">
              <h2>Current Menu</h2>
            </div>
            {isLoading ? (
              <Loader label="Loading menu items..." />
            ) : menuItems.length ? (
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.category || '-'}</td>
                        <td>Rs. {Number(item.price || 0).toFixed(2)}</td>
                        <td>{item.stockQuantity ?? 0}</td>
                        <td>
                          <div className="table-actions">
                            <button className="secondary-button" onClick={() => handleEdit(item)} type="button">
                              Edit
                            </button>
                            <button className="secondary-button" onClick={() => handleDelete(item.id)} type="button">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <h2>No items yet</h2>
                <p>Create your first menu item using the form.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </section>
  )
}

export default MenuManager
