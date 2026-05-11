import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <span className="brand-icon">⛩️</span>
          <span className="brand-name">AniStream</span>
        </Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <Link to="/home" className="nav-link">Browse</Link>
            <Link to="/saved" className="nav-link">My List</Link>
            <Link to="/history" className="nav-link">History</Link>
            {user.role === 'admin' && (
              <Link to="/admin" className="nav-link admin-link">Admin Dashboard</Link>
            )}
            <div className="nav-user">
              <span className="nav-role-badge">{user.role}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup-nav-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
