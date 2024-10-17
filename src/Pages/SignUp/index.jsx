import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function SignUp() {
  const context = useContext(ShoppingCartContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    context.handleSignUp(formData.email, formData.password, formData.name)
    navigate('/my-account')
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  return (
    <Layout>
      <div className="flex flex-col items-center w-80">
        <h1 className="text-xl font-medium mb-6">Create an account</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="border border-black rounded-lg py-2 px-4"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="border border-black rounded-lg py-2 px-4"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border border-black rounded-lg py-2 px-4"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            className="border border-black rounded-lg py-2 px-4"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-black text-white rounded-lg py-2"
          >
            Create account
          </button>
        </form>
        <div className="flex items-center mt-4">
          <span className="text-sm">Already have an account?</span>
          <Link to="/sign-in" className="text-sm underline ml-2">
            Sign In
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp