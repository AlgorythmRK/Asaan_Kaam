import { CATEGORIES } from '../data/mockInventory'

const SearchBar = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, filterStatus, setFilterStatus }) => {
    return (
        <div className="filters-section">
            <div className="filters-container">
                <div className="search-wrapper">
                    <span className="search-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search inventory items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <select
                    className="filter-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>

                <select
                    className="filter-select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                >
                    <option value="All">All Stock Status</option>
                    <option value="In Stock">✓ In Stock</option>
                    <option value="Low Stock">⚠ Low Stock</option>
                </select>
            </div>
        </div>
    )
}

export default SearchBar
