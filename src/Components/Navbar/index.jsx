import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const navigate = useNavigate()
    const activeStyle = 'underline underline-offset-4'

    const handleSignOut = (e) => {
        e.preventDefault()
        context.handleSignOut()
        navigate('/sign-in')
    }

    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light bg-white'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                    <NavLink to='/'>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/'
                        onClick={() => context.setSearchByCategory()}
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/clothes'
                        onClick={() => context.setSearchByCategory('clothes')}
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/electronics'
                        onClick={() => context.setSearchByCategory('electronics')}
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/furnitures'
                        onClick={() => context.setSearchByCategory('furnitures')}
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/toys'
                        onClick={() => context.setSearchByCategory('toys')}
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/others'
                        onClick={() => context.setSearchByCategory('others')}
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                    }>
                        Others
                    </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                {context.isUserAuthenticated ? (
                    <>
                        <li className='text-black/60'>
                            {context.account?.email || 'email@mail.com'}
                        </li>
                        <li>
                            <NavLink
                                to='/my-orders'
                                className={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }>
                                My Orders
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='/my-account'
                                className={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }>
                                My Account
                            </NavLink>
                        </li>
                        <li>
                        <button
                                onClick={handleSignOut}
                                className='hover:text-gray-500'>
                                Sign Out
                            </button>
                        </li>
                    </>
                ) : (
                    <li>
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
                <li 
                    className='flex items-center cursor-pointer'
                    onClick={() => context.openCheckoutSideMenu()}>
                    <ShoppingCartIcon className='h-6 w-6 text-black hover:text-gray-700'></ShoppingCartIcon>
                    <div className='flex justify-center items-center bg-black text-white rounded-full w-5 h-5 text-xs'>
                        {context.cartProducts.length}
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar