import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const InventoryCard = ({ item, onUpdateQuantity, onEdit, onDelete }) => {
    const { isAdmin } = useAuth()
    const [showUseStock, setShowUseStock] = useState(false)
    const [useAmount, setUseAmount] = useState('')
    const [isUpdating, setIsUpdating] = useState(false)
    const [animateQuantity, setAnimateQuantity] = useState(false)

    const isLowStock = item.quantity <= item.reorderLevel
    const stockPercentage = Math.min((item.quantity / (item.reorderLevel * 2)) * 100, 100)

    const getProgressClass = () => {
        if (item.quantity <= item.reorderLevel) return 'low'
        if (item.quantity <= item.reorderLevel * 1.5) return 'medium'
        return 'high'
    }

    const handleUseStock = (e) => {
        e.preventDefault()
        const amount = parseFloat(useAmount)
        if (isNaN(amount) || amount <= 0) return
        if (amount > item.quantity) {
            alert("Cannot use more than available stock")
            return
        }

        setIsUpdating(true)
        setAnimateQuantity(true)

        // Simulate API delay
        setTimeout(() => {
            onUpdateQuantity(item._id || item.id, item.quantity - amount)
            setUseAmount('')
            setShowUseStock(false)
            setIsUpdating(false)
            setTimeout(() => setAnimateQuantity(false), 300)
        }, 500)
    }

    const categoryIcons = {
        Vegetables: '🥬',
        Meat: '🥩',
        Dairy: '🥛',
        Grains: '🌾',
        Spices: '🌶️',
        Beverages: '☕',
        Seafood: '🐟',
        Bakery: '🥐',
        Other: '📦'
    }

    return (
        <div className={`inventory-card ${isLowStock ? 'low-stock' : ''}`}>
            <div className="card-image-wrapper">
                {item.image ? (
                    <img src={item.image} alt={item.name} className="card-image" />
                ) : (
                    <div className="card-image-placeholder">
                        <span>{categoryIcons[item.category] || '📦'}</span>
                        <span className="card-image-placeholder-text">{item.category}</span>
                    </div>
                )}

                <div className={`card-category-badge ${item.category.toLowerCase()}`}>
                    {item.category}
                </div>

                <div className={`card-stock-badge ${isLowStock ? 'low-stock' : 'available'}`}>
                    {isLowStock ? (
                        <>
                            <span className="pulse-dot"></span>
                            ⚠ Low Stock
                        </>
                    ) : (
                        '✓ In Stock'
                    )}
                </div>
            </div>

            <div className="card-content">
                <div className="card-header">
                    <div>
                        <h3 className="card-title">{item.name}</h3>
                        <p className="card-subtitle">Last updated: {new Date(item.updatedAt || item.lastUpdated).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="card-quantity-section">
                    <div className="quantity-info">
                        <span className="quantity-label">Available Stock</span>
                        <div className="quantity-value">
                            <span className={`quantity-number ${animateQuantity ? 'animate' : ''} ${isLowStock ? 'low' : ''}`}>
                                {item.quantity}
                            </span>
                            <span className="quantity-unit">{item.unit}</span>
                        </div>
                    </div>
                    <div className="reorder-info">
                        <span className="reorder-label">Reorder at</span>
                        <span className="reorder-value">{item.reorderLevel} {item.unit}</span>
                    </div>
                </div>

                <div className="stock-progress">
                    <div className="progress-bar-container">
                        <div
                            className={`progress-bar ${getProgressClass()}`}
                            style={{ width: `${stockPercentage}%` }}
                        ></div>
                    </div>
                </div>

                {!showUseStock ? (
                    <div className="card-actions">
                        <button
                            className="card-action-btn use-stock"
                            onClick={() => setShowUseStock(true)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
                            </svg>
                            Use Stock
                        </button>

                        {isAdmin() && (
                            <>
                                <button
                                    className="card-action-btn edit"
                                    onClick={() => onEdit(item)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                    </svg>
                                    Edit
                                </button>
                                <button
                                    className="card-action-btn delete"
                                    onClick={() => onDelete(item._id || item.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ) : (
                    <form className="use-stock-form" onSubmit={handleUseStock}>
                        <input
                            type="number"
                            step="any"
                            className="use-stock-input"
                            placeholder={`Amount (${item.unit})`}
                            value={useAmount}
                            onChange={(e) => setUseAmount(e.target.value)}
                            autoFocus
                            required
                        />
                        <button
                            type="submit"
                            className="use-stock-submit"
                            disabled={isUpdating}
                        >
                            {isUpdating ? <span className="spinner"></span> : 'Apply'}
                        </button>
                        <button
                            type="button"
                            className="use-stock-cancel"
                            onClick={() => setShowUseStock(false)}
                        >
                            ✕
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default InventoryCard
