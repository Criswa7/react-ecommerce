import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../Components/Layout'
import { ShoppingCartContext } from '../../Context'

function MyAccount() {
    const context = useContext(ShoppingCartContext)
    const navigate = useNavigate()

    const handleSignOut = () => {
        context.handleSignOut()
        navigate('/sign-in')
    }

    if (!context.isUserAuthenticated) {
        navigate('/sign-in')
        return null
    }

    if (context.isLoading) {
        return (
            <Layout>
                <div className="animate-pulse p-8">
                    <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
                    <div className="space-y-4">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto p-8">
                <h1 className="text-2xl font-bold mb-6">My Account</h1>
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Name</label>
                            <p className="mt-1 text-gray-900">{context.account?.name || 'Not provided'}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600">Email</label>
                            <p className="mt-1 text-gray-900">{context.account?.email || 'Not provided'}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow rounded-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Order History</h2>
                    {context.order.length > 0 ? (
                        <div className="space-y-4">
                            {context.order.map((order, index) => (
                                <div key={index} className="border rounded-lg p-4">
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">Order Date:</span>
                                        <span>{order.date}</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="font-medium">Total Products:</span>
                                        <span>{order.totalProducts}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Total Amount:</span>
                                        <span>${order.totalPrice}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No orders yet</p>
                    )}
                </div>
                <button
                    onClick={handleSignOut}
                    className="w-full bg-black text-white rounded-lg py-2 px-4 hover:bg-gray-800 transition-colors"
                >
                    Sign Out
                </button>
            </div>
        </Layout>
    )
}

export default MyAccount