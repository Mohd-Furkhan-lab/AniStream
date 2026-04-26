import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AnimeDetail from './pages/AnimeDetail';
import Watch from './pages/Watch';

import AdminDashboard from './pages/admin/AdminDashboard';
import SavedAnime from './pages/SavedAnime';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/anime/:name" element={<ProtectedRoute><AnimeDetail /></ProtectedRoute>} />
          <Route path="/watch/:name/:epno" element={<ProtectedRoute><Watch /></ProtectedRoute>} />
          <Route path="/saved" element={<ProtectedRoute><SavedAnime /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

          {/* Default */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
