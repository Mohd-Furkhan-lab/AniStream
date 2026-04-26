import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './SavedAnime.css';

const SavedAnime = () => {
  const [savedList, setSavedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await API.get('/user/savedanime');
        const data = res.data.message;
        setSavedList(Array.isArray(data) ? data : data ? [data] : []);
      } catch (err) {
        setError('Failed to load your saved anime.');
      } finally {
        setLoading(false);
      }
    };
    fetchSaved();
  }, []);

  return (
    <div className="saved-page">
      <div className="saved-header">
        <h1>📚 My Saved Anime</h1>
        <p>Your personal anime collection</p>
      </div>

      <div className="saved-content">
        {loading && (
          <div className="saved-loading">
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
          </div>
        )}

        {error && <div className="saved-error">⚠️ {error}</div>}

        {!loading && !error && savedList.length === 0 && (
          <div className="saved-empty">
            <span>🔖</span>
            <h2>No saved anime yet</h2>
            <p>Browse anime and tap "+ My List" to save them here.</p>
            <button onClick={() => navigate('/home')}>Browse Anime</button>
          </div>
        )}

        {!loading && !error && savedList.length > 0 && (
          <div className="saved-grid">
            {savedList.map((item) => (
              <div key={item.saveid} className="saved-card">
                <div className="saved-card-id">
                  <span className="saved-anime-label">Anime ID</span>
                  <span className="saved-anime-id">{item.animeid}</span>
                </div>
                <div className="saved-card-actions">
                  <button className="saved-view-btn" onClick={() => navigate('/home')}>
                    Find Anime
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedAnime;
