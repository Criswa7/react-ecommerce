import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../OrderCard'
import { totalPrice } from '../../utils'
import Layout from '../Layout'

const CartSummary = () => {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }
    
    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.setSearchByTitle(null)
    navigate('/my-orders/last')
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-6'>
        <button 
          className='absolute left-0'
          onClick={() => navigate(-1)}>
          <ChevronLeftIcon className='h-6 w-6 text-black cursor-pointer'/>
        </button>
        <h1 className='font-medium text-xl'>Cart Summary</h1>
      </div>
      
      <div className='flex flex-col w-80'>
        {context.cartProducts.map(product => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
          />
        ))}
        
        <div className='px-6 mb-6'>
          <p className='flex justify-between items-center mb-2'>
            <span className='font-light'>Total:</span>
            <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
          </p>
          {context.isUserAuthenticated ? (
            <button
              className='bg-black py-3 text-white w-full rounded-lg'
              onClick={handleCheckout}>
              Checkout
            </button>
          ) : (
            <div className='space-y-2'>
              <button
                className='bg-black py-3 text-white w-full rounded-lg'
                onClick={() => navigate('/sign-in')}>
                Sign In
              </button>
              <button
                className='bg-white py-3 text-black border border-black w-full rounded-lg'
                onClick={() => navigate('/sign-up')}>
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default CartSummary