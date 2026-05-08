import { useState } from 'react';
import AdminManageAnime from './AdminManageAnime';
import AdminAddAnime from './AdminAddAnime';
import AdminManageEpisodes from './AdminManageEpisodes';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  const renderContent = () => {
    if (activeTab === 'manage') {
      return (
        <AdminManageAnime
          onManageEpisodes={(animeId) => {
            setSelectedAnimeId(animeId);
            setActiveTab('episodes');
          }}
        />
      );
    }
    if (activeTab === 'add') {
      return <AdminAddAnime onSuccess={() => setActiveTab('manage')} />;
    }
    if (activeTab === 'episodes') {
      return (
        <AdminManageEpisodes
          animeId={selectedAnimeId}
          onBack={() => setActiveTab('manage')}
        />
      );
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>👑 Admin Panel</h2>
        </div>
        <nav className="admin-nav">
          <button
            className={`admin-nav-btn ${activeTab === 'manage' || activeTab === 'episodes' ? 'active' : ''}`}
            onClick={() => setActiveTab('manage')}
          >
            Manage Anime
          </button>
          <button
            className={`admin-nav-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add New Anime
          </button>
        </nav>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
