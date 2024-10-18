# 🛍️ Shopi

## 📝 Overview
Shopi is a modern e-commerce application built with React. It provides a seamless shopping experience with an elegant user interface designed using Tailwind CSS.

## ✨ Key Features
- 📦 Dynamic product catalog connected to API
- 🛒 Interactive shopping cart
- 🔐 User authentication system
- 📋 Order management
  - Current order view
  - Order history
- 💻 Fully responsive design

## 🚀 Built With
- React.js - JavaScript framework
- Vite - Build tool and development server
- Tailwind CSS - CSS framework
- API Integration - External API connection for products

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone https://github.com/Criswa7/react-ecommerce.git

# Navigate to the directory
cd react-ecommerce

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 Live Demo
Check out the live application here: https://animated-gelato-fe9f23.netlify.app/

## 💻 Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Create production build
npm run preview    # Preview production build
```

## 📦 Project Structure
```
react-ecommerce/
├── node_modules/
├── public/
├── src/
│   ├── Components/
│   │   ├── Card/
│   │   ├── CheckoutSideMenu/
│   │   ├── Layout/
│   │   ├── Navbar/
│   │   ├── OrderCard/
│   │   ├── OrdersCard/
│   │   ├── ProductDetail/
│   │   └── Protect/
│   ├── Context/
│   ├── Pages/
│   │   ├── App/
│   │   ├── Home/
│   │   ├── MyAccount/
│   │   ├── MyOrder/
│   │   ├── MyOrders/
│   │   ├── NotFound/
│   │   ├── SignIn/
│   │   └── SignUp/
│   ├── utils/
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.js
```

## 🔧 Configuration
The project uses environment variables for sensitive configurations. Create a `.env` file in the project root with the following variables:

```env
VITE_API_URL=your_api_url
```

## 🚧 Project Status
The project is currently in active development.

## 🎯 Features Deep Dive
- **Product Catalog**: Browse through a variety of products fetched from an external API
- **Shopping Cart**: Add/remove items, adjust quantities, and view total price
- **Authentication**: Secure user authentication system
- **Order Management**: Track current and past orders
- **Responsive Design**: Seamless experience across all device sizes

## 🔍 Technical Details
- State Management using React Context
- Custom hooks for business logic
- API integration for product data
- Modern ES6+ JavaScript
- Tailwind CSS for styling

## ⚡ Performance Optimizations
- Lazy loading of components
- Optimized images and assets
- Efficient state management
- Fast development server with Vite

## 🤝 Contributing
Contributions are welcome. Please follow these steps:
1. Fork the project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the `LICENSE` file for details.

## 👤 Contact
Cristian Florez
- GitHub: [@Criswa7](https://github.com/Criswa7)

## 💪 Future Improvements
- Payment gateway integration
- Enhanced user profiles
- Product reviews and ratings
- Advanced search functionality
- Performance optimizations
- Mobile
