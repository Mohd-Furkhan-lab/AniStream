import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './SavedAnime.css';

const SavedAnime = () => {
  const [savedList, setSavedList] = useState([]);
  const [animeMap, setAnimeMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/user/savedanime');
        const saved = res.data.message;
        setSavedList(Array.isArray(saved) ? saved : saved ? [saved] : []);
      } catch (err) {
        setError('Failed to load your saved anime.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
            {savedList.map((anime) => {
              return (
                <div
                  key={anime.id}
                  className="saved-card"
                  onClick={() => navigate(`/anime/${anime.title}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="saved-card-img-wrap">
                    {anime.image_url
                      ? <img src={anime.image_url} alt={anime.title} />
                      : <div className="saved-card-img-placeholder">🎬</div>
                    }
                    <div className="saved-card-overlay">
                      <span className="saved-play-btn">▶</span>
                    </div>
                    {anime.status && (
                      <span className={`saved-status-badge ${anime.status.toLowerCase()}`}>
                        {anime.status}
                      </span>
                    )}
                  </div>
                  <div className="saved-card-info">
                    <h3>{anime.title}</h3>
                    <div className="saved-card-meta">
                      <span>📅 {anime.release_year}</span>
                      <span>🎬 {anime.total_episodes} eps</span>
                    </div>
                    {anime.description && (
                      <p className="saved-card-desc">{anime.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedAnime;
