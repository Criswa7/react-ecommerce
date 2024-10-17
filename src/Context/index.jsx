import { createContext, useState, useEffect, useMemo } from 'react'

export const ShoppingCartContext = createContext()

export const ShoppingCartProvider = ({children}) => {
    // Cart State
    const [count, setCount] = useState(0)
    const [cartProducts, setCartProducts] = useState([])
    const [order, setOrder] = useState([])

    // UI State
    const [isProductDetailOpen, setIsProductDetailOpen] = useState(false)
    const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false)
    const [productToShow, setProductToShow] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    // Products State
    const [items, setItems] = useState(null)
    const [filteredItems, setFilteredItems] = useState(null)
    const [searchByTitle, setSearchByTitle] = useState(null)
    const [searchByCategory, setSearchByCategory] = useState(null)

    // User State
    const [account, setAccount] = useState(null)
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false)

    // UI Actions
    const openProductDetail = () => setIsProductDetailOpen(true)
    const closeProductDetail = () => setIsProductDetailOpen(false)
    const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true)
    const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false)

    // Initialize user session
    useEffect(() => {
        const loadUserSession = () => {
            const savedAccount = localStorage.getItem('account')
            const savedIsAuth = localStorage.getItem('isUserAuthenticated')
            const savedOrder = localStorage.getItem('order')
            
            if (savedAccount && savedIsAuth === 'true') {
                setAccount(JSON.parse(savedAccount))
                setIsUserAuthenticated(true)
            }
            
            if (savedOrder) {
                setOrder(JSON.parse(savedOrder))
            }

            setIsLoading(false)
        }

        loadUserSession()
    }, [])

    // Save order to localStorage when it changes
    useEffect(() => {
        if (order.length > 0) {
            localStorage.setItem('order', JSON.stringify(order))
        }
    }, [order])

    // Authentication methods
    const handleSignIn = (email, password) => {
        const savedAccount = localStorage.getItem('account')
        if (savedAccount) {
            const acc = JSON.parse(savedAccount)
            if (acc.email === email && acc.password === password) {
                setAccount(acc)
                setIsUserAuthenticated(true)
                localStorage.setItem('isUserAuthenticated', 'true')

                // Recover pending cart if exists
                const pendingCart = localStorage.getItem('pendingCart')
                if (pendingCart) {
                    setCartProducts(JSON.parse(pendingCart))
                    localStorage.removeItem('pendingCart')
                }
                
                return true
            }
        }
        return false
    }

    const handleSignUp = (email, password, name) => {
        const newAccount = { email, password, name }
        setAccount(newAccount)
        setIsUserAuthenticated(true)
        localStorage.setItem('account', JSON.stringify(newAccount))
        localStorage.setItem('isUserAuthenticated', 'true')
    }

    const handleSignOut = () => {
        // Clear user session
        setIsUserAuthenticated(false)
        setAccount(null)
        
        // Clear cart and orders
        setCartProducts([])
        setCount(0)
        
        // Clear localStorage
        localStorage.setItem('isUserAuthenticated', 'false')
        localStorage.removeItem('pendingCart')
        
        // Close any open modals
        closeProductDetail()
        closeCheckoutSideMenu()
    }

    // Fetch products
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://api.escuelajs.co/api/v1/products')
                const data = await response.json()
                setItems(data)
            } catch (error) {
                console.error('Error fetching products:', error)
                setItems([])
            }
        }

        fetchProducts()
    }, [])

    // Memoized filter functions
    const filteredItemsByTitle = useMemo(() => {
        if (!searchByTitle || !items) return items
        return items.filter(item => 
            item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        )
    }, [items, searchByTitle])

    const filteredItemsByCategory = useMemo(() => {
        if (!searchByCategory || !items) return filteredItemsByTitle
        return filteredItemsByTitle?.filter(item => 
            item.category.name.toLowerCase().includes(searchByCategory.toLowerCase())
        )
    }, [filteredItemsByTitle, searchByCategory])

    // Update filtered items when filters change
    useEffect(() => {
        setFilteredItems(filteredItemsByCategory)
    }, [filteredItemsByCategory])

    // Cart methods
    const addToCart = (product) => {
        setCartProducts(prev => [...prev, product])
        setCount(prev => prev + 1)
        openCheckoutSideMenu()
    }

    const removeFromCart = (id) => {
        setCartProducts(prev => prev.filter(product => product.id !== id))
        setCount(prev => prev - 1)
    }

    const contextValue = {
        // Cart
        count,
        setCount,
        cartProducts,
        setCartProducts,
        addToCart,
        removeFromCart,
        order,
        setOrder,

        // UI
        isProductDetailOpen,
        openProductDetail,
        closeProductDetail,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        productToShow,
        setProductToShow,
        isLoading,

        // Products
        items,
        filteredItems,
        searchByTitle,
        setSearchByTitle,
        searchByCategory,
        setSearchByCategory,

        // User
        account,
        isUserAuthenticated,
        handleSignIn,
        handleSignUp,
        handleSignOut
    }

    return (
        <ShoppingCartContext.Provider value={contextValue}>
            {children}
        </ShoppingCartContext.Provider>
    )
}