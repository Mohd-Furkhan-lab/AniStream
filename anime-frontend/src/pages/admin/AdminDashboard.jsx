import { useState } from 'react';
import AdminManageAnime from './AdminManageAnime';
import AdminAddAnime from './AdminAddAnime';
import AdminManageEpisodes from './AdminManageEpisodes';
import AdminEditAnime from './AdminEditAnime';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('manage');
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);
  const [selectedAnimeName, setSelectedAnimeName] = useState('');
  const [selectedAnime, setSelectedAnime] = useState(null); // full object for edit

  const renderContent = () => {
    if (activeTab === 'manage') {
      return (
        <AdminManageAnime
          onManageEpisodes={(animeId, animeName) => {
            setSelectedAnimeId(animeId);
            setSelectedAnimeName(animeName);
            setActiveTab('episodes');
          }}
          onEditAnime={(anime) => {
            setSelectedAnime(anime);
            setActiveTab('edit');
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
          animeName={selectedAnimeName}
          onBack={() => setActiveTab('manage')}
        />
      );
    }
    if (activeTab === 'edit') {
      return (
        <AdminEditAnime
          anime={selectedAnime}
          onSuccess={() => setActiveTab('manage')}
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
            className={`admin-nav-btn ${activeTab === 'manage' || activeTab === 'episodes' || activeTab === 'edit' ? 'active' : ''}`}
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

