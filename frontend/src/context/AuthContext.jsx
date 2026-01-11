import { createContext, useContext, useState, useEffect } from 'react'
import API from '../utils/api'

const AuthContext = createContext(null)

const CURRENT_USER_KEY = 'restaurantHub_currentUser'
const THEME_KEY = 'restaurantHub_theme'

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [theme, setTheme] = useState('dark')
    const [loading, setLoading] = useState(true)

    // Initialize from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem(CURRENT_USER_KEY)
        const savedTheme = localStorage.getItem(THEME_KEY) || 'dark'

        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser))
            } catch (e) {
                localStorage.removeItem(CURRENT_USER_KEY)
            }
        }
        setTheme(savedTheme)
        setLoading(false)
    }, [])

    // Login function
    const login = async (email, password) => {
        try {
            const { data } = await API.post('/auth/login', { email, password });

            const userData = {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                token: data.token
            }

            setUser(userData)
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData))
            return userData
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Invalid email or password');
        }
    }

    // Signup function
    const signup = async (name, email, password, role) => {
        try {
            const { data } = await API.post('/auth/signup', { name, email, password, role });

            const userData = {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                token: data.token
            }

            setUser(userData)
            localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userData))
            return userData
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Signup failed. Please try again.');
        }
    }

    // Logout function
    const logout = () => {
        setUser(null)
        localStorage.removeItem(CURRENT_USER_KEY)
    }

    // Toggle theme
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
        localStorage.setItem(THEME_KEY, newTheme)
    }

    // Check if user is admin
    const isAdmin = () => user?.role === 'admin'

    // Check if user is staff
    const isStaff = () => user?.role === 'staff'

    const value = {
        user,
        theme,
        loading,
        login,
        signup,
        logout,
        toggleTheme,
        isAdmin,
        isStaff
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
