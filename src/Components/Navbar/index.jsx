import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCartIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const activeStyle = 'underline underline-offset-4'

    // Handle sign out action
    const handleSignOut = (e) => {
        e.preventDefault()
        context.handleSignOut()
        navigate('/sign-in')
        setIsMenuOpen(false)
    }

    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className='fixed z-10 top-0 w-full bg-white shadow-sm'>
            {/* Main navbar container */}
            <div className={`flex justify-between items-center py-5 px-4 md:px-8 ${isMenuOpen ? 'md:flex' : ''}`}>
                {/* Left section: Logo and mobile menu button */}
                <div className='flex items-center gap-4'>
                    <button 
                        className='md:hidden'
                        onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <XMarkIcon className='h-6 w-6' />
                        ) : (
                            <Bars3Icon className='h-6 w-6' />
                        )}
                    </button>
                    <NavLink to='/' className='font-bold text-2xl'>
                        Shopi
                    </NavLink>
                </div>

                {/* Desktop navigation categories */}
                <ul className='hidden md:flex items-center gap-3'>
                </ul>

                {/* Right section: User info, cart and auth buttons */}
                <div className='flex items-center gap-3'>
                    {/* Desktop menu items */}
                    {context.isUserAuthenticated ? (
                        <>
                            <li className='hidden md:block text-black/60'>
                                {context.account?.email}
                            </li>
                            <li className='hidden md:block'>
                                <NavLink
                                    to='/my-orders'
                                    className={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }>
                                    My Orders
                                </NavLink>
                            </li>
                            <li className='hidden md:block'>
                                <NavLink
                                    to='/my-account'
                                    className={({ isActive }) =>
                                        isActive ? activeStyle : undefined
                                    }>
                                    My Account
                                </NavLink>
                            </li>
                            <li className='hidden md:block'>
                                <button
                                    onClick={handleSignOut}
                                    className='hover:text-gray-500'>
                                    Sign Out
                                </button>
                            </li>
                        </>
                    ) : (
                        <li className='list-none'>
                            <NavLink
                                to='/sign-in'
                                className={({ isActive }) =>
                                    `bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 ${
                                        isActive ? 'bg-gray-800' : ''
                                    }`
                                }>
                                Sign In
                            </NavLink>
                        </li>
                    )}
                    
                    {/* Mobile email display */}
                    {context.isUserAuthenticated && (
                        <span className='md:hidden text-sm text-black/60 truncate max-w-[120px]'>
                            {context.account?.email}
                        </span>
                    )}
                    
                    {/* Shopping cart button */}
                    <button 
                        className='flex items-center cursor-pointer'
                        onClick={() => context.openCheckoutSideMenu()}>
                        <ShoppingCartIcon className='h-6 w-6 text-black hover:text-gray-700' />
                        <div className='flex justify-center items-center bg-black text-white rounded-full w-5 h-5 text-xs'>
                            {context.cartProducts.length}
                        </div>
                    </button>
                </div>
            </div>

            {/* Full screen mobile menu */}
            {isMenuOpen && (
                <div className='fixed inset-0 bg-white z-50 md:hidden'>
                    {/* Mobile menu header */}
                    <div className='flex justify-between items-center py-5 px-4 border-b'>
                        <span className='font-bold text-2xl'>Shopi</span>
                        <button onClick={toggleMenu}>
                            <XMarkIcon className='h-6 w-6' />
                        </button>
                    </div>

                    {/* Mobile menu content */}
                    <div className='flex flex-col h-[calc(100%-76px)]'>
                        {/* Categories section */}
                        <div className='flex-1 overflow-y-auto'>
                            <ul className='flex flex-col py-4'>
                                <li className='px-4 py-2'>
                                    <NavLink
                                        to='/'
                                        onClick={() => {
                                            context.setSearchByCategory()
                                            toggleMenu()
                                        }}
                                        className={({ isActive }) =>
                                            `block text-lg ${isActive ? activeStyle : ''}`
                                        }>
                                        All
                                    </NavLink>
                                </li>
                                <li className='px-4 py-2'>
                                    <NavLink
                                        to='/clothes'
                                        onClick={() => {
                                            context.setSearchByCategory('clothes')
                                            toggleMenu()
                                        }}
                                        className={({ isActive }) =>
                                            `block text-lg ${isActive ? activeStyle : ''}`
                                        }>
                                        Clothes
                                    </NavLink>
                                </li>
                                <li className='px-4 py-2'>
                                    <NavLink
                                        to='/electronics'
                                        onClick={() => {
                                            context.setSearchByCategory('electronics')
                                            toggleMenu()
                                        }}
                                        className={({ isActive }) =>
                                            `block text-lg ${isActive ? activeStyle : ''}`
                                        }>
                                        Electronics
                                    </NavLink>
                                </li>
                                <li className='px-4 py-2'>
                                    <NavLink
                                        to='/furnitures'
                                        onClick={() => {
                                            context.setSearchByCategory('furnitures')
                                            toggleMenu()
                                        }}
                                        className={({ isActive }) =>
                                            `block text-lg ${isActive ? activeStyle : ''}`
                                        }>
                                        Furnitures
                                    </NavLink>
                                </li>
                                <li className='px-4 py-2'>
                                    <NavLink
                                        to='/toys'
                                        onClick={() => {
                                            context.setSearchByCategory('toys')
                                            toggleMenu()
                                        }}
                                        className={({ isActive }) =>
                                            `block text-lg ${isActive ? activeStyle : ''}`
                                        }>
                                        Toys
                                    </NavLink>
                                </li>
                                <li className='px-4 py-2'>
                                    <NavLink
                                        to='/others'
                                        onClick={() => {
                                            context.setSearchByCategory('others')
                                            toggleMenu()
                                        }}
                                        className={({ isActive }) =>
                                            `block text-lg ${isActive ? activeStyle : ''}`
                                        }>
                                        Others
                                    </NavLink>
                                </li>
                            </ul>
                        </div>

                        {/* User section at bottom */}
                        {context.isUserAuthenticated && (
                            <div className='border-t py-4'>
                                <ul className='flex flex-col gap-4 px-4'>
                                    <li>
                                        <NavLink 
                                            to='/my-orders'
                                            onClick={toggleMenu}
                                            className={({ isActive }) =>
                                                `block text-lg font-semibold ${isActive ? activeStyle : ''}`
                                            }>
                                            My Orders
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink 
                                            to='/my-account'
                                            onClick={toggleMenu}
                                            className={({ isActive }) =>
                                                `block text-lg font-semibold ${isActive ? activeStyle : ''}`
                                            }>
                                            My Account
                                        </NavLink>
                                    </li>
                                    <li>
                                        <button 
                                            onClick={handleSignOut}
                                            className='text-lg font-semibold text-red-600 hover:text-red-700'>
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar