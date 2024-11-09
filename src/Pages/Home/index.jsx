import { useContext } from 'react'
import Layout from '../../Components/Layout'
import Card from '../../Components/Card'
import ProductDetail from '../../Components/ProductDetail'
import { ShoppingCartContext } from '../../Context'

// Componente Skeleton para las cards
const CardSkeleton = () => (
  <div className="bg-white w-56 h-60 rounded-lg animate-pulse">
    <div className="relative mb-2 w-full h-4/5 bg-gray-200 rounded-lg"></div>
    <div className="flex justify-between px-2">
      <div className="w-2/3 h-4 bg-gray-200 rounded"></div>
      <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
    </div>
  </div>
)

function Home() {
  const context = useContext(ShoppingCartContext)

  const renderView = () => {
    // Mostrar skeleton mientras carga
    if (!context.items) {
      return Array.from({ length: 12 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))
    }

    // Mostrar productos filtrados
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map(item => (
        <Card key={item.id} data={item} />
      ))
    }

    // Mensaje cuando no hay resultados
    return (
      <div className="col-span-4 text-center py-4 text-gray-500">
        No products found matching your search
      </div>
    )
  }

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80 mb-4'>
        <h1 className='font-medium text-xl'>Featured Products</h1>
      </div>
      <input 
        type="text" 
        placeholder='Search a product' 
        className='rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none'
        onChange={(event) => context.setSearchByTitle(event.target.value)} />
      <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full max-w-screen-lg px-4 md:px-0'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  )
}

export default Home