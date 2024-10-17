import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';

const ProtectedRoute = ({ children }) => {
  const { isUserAuthenticated } = useContext(ShoppingCartContext);

  if (!isUserAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default ProtectedRoute;