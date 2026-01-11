import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <div className="navbar-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <div className="navbar-info">
                        <h1 className="navbar-title">RestaurantHub</h1>
                        <span className="navbar-subtitle">Inventory Management</span>
                    </div>
                </div>

                <div className="navbar-actions">
                    <ThemeToggle />

                    <div className="navbar-user">
                        <div className="navbar-avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="navbar-user-info">
                            <span className="navbar-user-name">{user?.name}</span>
                            <span className={`badge ${user?.role === 'admin' ? 'badge-admin' : 'badge-staff'} navbar-user-role`}>
                                {user?.role}
                            </span>
                        </div>
                    </div>

                    <button className="btn btn-secondary btn-icon" onClick={handleLogout} title="Logout">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
