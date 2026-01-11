import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from '../components/ThemeToggle'
import '../styles/auth.css'

const Signup = () => {
    const { signup } = useAuth()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'staff'
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        if (error) setError('')
    }

    const handleRoleChange = (role) => {
        setFormData(prev => ({ ...prev, role }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        try {
            await signup(formData.name, formData.email, formData.password, formData.role)
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="auth-page">
            <div className="orb-3"></div>

            <div className="auth-card">
                <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                    <ThemeToggle />
                </div>

                <div className="auth-header">
                    <div className="auth-logo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <h1 className="auth-title">Join RestaurantHub</h1>
                    <p className="auth-subtitle">Create an account and choose your role</p>
                </div>

                {error && (
                    <div className="auth-error">
                        <span className="auth-error-icon">⚠</span>
                        <span className="auth-error-text">{error}</span>
                    </div>
                )}

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <label>Full Name</label>
                        <div className="auth-input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                name="name"
                                className="auth-input"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-input-group">
                        <label>Email Address</label>
                        <div className="auth-input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                                </svg>
                            </span>
                            <input
                                type="email"
                                name="email"
                                className="auth-input"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="auth-input-group">
                        <label>Password</label>
                        <div className="auth-input-wrapper">
                            <span className="input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                            </span>
                            <input
                                type="password"
                                name="password"
                                className="auth-input"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="role-selector">
                        <label className="role-selector-label">Select Your Role</label>
                        <div className="role-options">
                            <div className="role-option">
                                <input
                                    type="radio"
                                    name="role"
                                    id="role-admin"
                                    checked={formData.role === 'admin'}
                                    onChange={() => handleRoleChange('admin')}
                                />
                                <label htmlFor="role-admin" className="role-option-label">
                                    <div className="role-icon">🛡️</div>
                                    <span className="role-name">Admin</span>
                                    <span className="role-desc">Full access to inventory management</span>
                                </label>
                            </div>

                            <div className="role-option">
                                <input
                                    type="radio"
                                    name="role"
                                    id="role-staff"
                                    checked={formData.role === 'staff'}
                                    onChange={() => handleRoleChange('staff')}
                                />
                                <label htmlFor="role-staff" className="role-option-label">
                                    <div className="role-icon">👨‍🍳</div>
                                    <span className="role-name">Staff</span>
                                    <span className="role-desc">View and update stock usage</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="auth-btn" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <>
                                <span className="spinner"></span>
                                Creating account...
                            </>
                        ) : 'Create Account'}
                    </button>
                </form>

                <div className="auth-divider">
                    <span>OR</span>
                </div>

                <div className="auth-footer">
                    <p>Already have an account? <Link to="/login" className="auth-link">Sign In</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Signup
