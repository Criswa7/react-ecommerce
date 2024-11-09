import { useRoutes, BrowserRouter } from 'react-router-dom'
import { ShoppingCartProvider } from '../../Context'
import Home from '../Home'
import MyAccount from '../MyAccount'
import MyOrder from '../MyOrder'
import MyOrders from '../MyOrders'
import NotFound from '../NotFound'
import SignIn from '../SignIn'
import SignUp from '../SignUp'
import Navbar from '../../Components/Navbar'
import CheckoutSideMenu from '../../Components/CheckoutSideMenu'
import ProtectedRoute from '../../Components/ProtectedRoute'
import CartSummary from '../../Components/CartSummary'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/clothes', element: <Home /> },
    { path: '/electronics', element: <Home /> },
    { path: '/furnitures', element: <Home /> },
    { path: '/toys', element: <Home /> },
    { path: '/others', element: <Home /> },
    { path: '/cart-summary', element: <CartSummary /> },
    { 
      path: '/my-account', 
      element: (
        <ProtectedRoute>
          <MyAccount />
        </ProtectedRoute>
      ) 
    },
    { 
      path: '/my-order', 
      element: (
        <ProtectedRoute>
          <MyOrder />
        </ProtectedRoute>
      ) 
    },
    { 
      path: '/my-orders', 
      element: (
        <ProtectedRoute>
          <MyOrders />
        </ProtectedRoute>
      ) 
    },
    { 
      path: '/my-orders/last', 
      element: (
        <ProtectedRoute>
          <MyOrder />
        </ProtectedRoute>
      ) 
    },
    { 
      path: '/my-orders/:id', 
      element: (
        <ProtectedRoute>
          <MyOrder />
        </ProtectedRoute>
      ) 
    },
    { path: '/sign-in', element: <SignIn /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '/*', element: <NotFound /> },
  ])
  return routes
}

const App = () => {
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  )
}

export default App