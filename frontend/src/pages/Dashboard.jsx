import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import InventoryCard from '../components/InventoryCard'
import AddItemModal from '../components/AddItemModal'
import { MOCK_INVENTORY } from '../data/mockInventory'
import { formatCurrency } from '../utils/currency'
import API from '../utils/api'
import '../styles/dashboard.css'
import '../styles/card.css'
import '../styles/modal.css'

const Dashboard = () => {
    const { user, isAdmin, isStaff } = useAuth()
    const [inventory, setInventory] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [filterStatus, setFilterStatus] = useState('All')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editItem, setEditItem] = useState(null)

    // Fetch inventory from API
    useEffect(() => {
        fetchInventory()
    }, [])

    const fetchInventory = async () => {
        setLoading(true)
        try {
            const { data } = await API.get('/inventory')
            setInventory(data)
            setError(null)
        } catch (err) {
            setError('Failed to fetch inventory. Please check if the server is running.')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    // Statistics calculations
    const totalItems = inventory.length
    const lowStockItems = inventory.filter(item => item.quantity <= item.reorderLevel).length
    const totalValue = inventory.reduce((acc, item) => acc + (item.quantity * 10), 0) // Mock value calculation based on backend logic potentially
    const outOfStockItems = inventory.filter(item => item.quantity === 0).length

    // Filtering logic
    const filteredInventory = inventory.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory
        const isLow = item.quantity <= item.reorderLevel
        const matchesStatus = filterStatus === 'All' ||
            (filterStatus === 'Low Stock' && isLow) ||
            (filterStatus === 'In Stock' && !isLow)

        return matchesSearch && matchesCategory && matchesStatus
    })

    // Handlers
    const handleUpdateQuantity = async (id, newQuantity) => {
        const item = inventory.find(i => i._id === id)
        const amount = newQuantity - item.quantity

        try {
            const { data } = await API.patch(`/inventory/${id}/stock`, { amount })
            setInventory(prev => prev.map(item =>
                item._id === id ? data : item
            ))
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update stock')
        }
    }

    const handleSaveItem = async () => {
        // dashboard now re-fetches to get the latest data from Atlas
        fetchInventory()
    }

    const handleDeleteItem = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await API.delete(`/inventory/${id}`)
                setInventory(prev => prev.filter(item => item._id !== id))
            } catch (err) {
                alert(err.response?.data?.message || 'Failed to delete item')
            }
        }
    }

    const handleEditItem = (item) => {
        setEditItem(item)
        setIsModalOpen(true)
    }

    const openAddModal = () => {
        setEditItem(null)
        setIsModalOpen(true)
    }

    return (
        <div className="dashboard">
            <Navbar />

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <div className="dashboard-header-top">
                        <div>
                            <h1 className="dashboard-title">Inventory Overview</h1>
                            <p className="dashboard-subtitle">
                                Welcome back, {user?.name.split(' ')[0]}! Manage your stock levels efficiently.
                            </p>
                        </div>

                        <div className="dashboard-date">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div className="stat-card-icon">📦</div>
                                <div className="stat-card-trend up">
                                    <span>+2.4%</span>
                                </div>
                            </div>
                            <div className="stat-card-value">{totalItems}</div>
                            <div className="stat-card-label">Total Items</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div className="stat-card-icon">⚡</div>
                                <div className="stat-card-trend down">
                                    <span>-1.2%</span>
                                </div>
                            </div>
                            <div className="stat-card-value">{lowStockItems}</div>
                            <div className="stat-card-label">Low Stock Alerts</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div className="stat-card-icon">💰</div>
                                <div className="stat-card-trend up">
                                    <span>+4.8%</span>
                                </div>
                            </div>
                            <div className="stat-card-value">{formatCurrency(totalValue)}</div>
                            <div className="stat-card-label">Estimated Stock Value</div>
                        </div>

                        <div className="stat-card">
                            <div className="stat-card-header">
                                <div className="stat-card-icon">🚨</div>
                                <div className="stat-card-trend">
                                    <span>Stable</span>
                                </div>
                            </div>
                            <div className="stat-card-value">{outOfStockItems}</div>
                            <div className="stat-card-label">Out of Stock</div>
                        </div>
                    </div>

                    <div className="dashboard-controls">
                        <div className="flex justify-between items-center wrap gap-md">
                            <SearchBar
                                searchQuery={searchQuery}
                                setSearchQuery={setSearchQuery}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                filterStatus={filterStatus}
                                setFilterStatus={setFilterStatus}
                            />

                            {(isAdmin() || isStaff()) && (
                                <button className="add-item-btn" onClick={openAddModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    Add New Item
                                </button>
                            )}
                        </div>
                    </div>
                </header>

                <section className="inventory-section">
                    <div className="inventory-section-header">
                        <h2 className="inventory-section-title">Stock Catalog</h2>
                        <span className="inventory-count">Showing {filteredInventory.length} items</span>
                    </div>

                    <div className="inventory-grid">
                        {filteredInventory.length > 0 ? (
                            filteredInventory.map(item => (
                                <InventoryCard
                                    key={item._id}
                                    item={item}
                                    onUpdateQuantity={handleUpdateQuantity}
                                    onEdit={handleEditItem}
                                    onDelete={handleDeleteItem}
                                />
                            ))
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">🔍</div>
                                <h3 className="empty-state-title">No items found</h3>
                                <p className="empty-state-text">Try adjusting your filters or search query to find what you're looking for.</p>
                                {searchQuery && (
                                    <button className="btn btn-secondary" onClick={() => setSearchQuery('')}>
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveItem}
                editItem={editItem}
            />
        </div>
    )
}

export default Dashboard
