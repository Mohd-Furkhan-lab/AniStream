import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Protects admin routes — user must be logged in AND have role === 'admin'
const AdminRoute = ({ children }) => {
  const { token, user } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (user?.role !== 'admin') return <Navigate to="/home" replace />;

  return children;
};

export default AdminRoute;
