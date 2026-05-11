import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './WatchHistory.css';

const WatchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await API.get('/user/watchistory');
        const data = res.data.message || res.data;
        setHistory(Array.isArray(data) ? data : []);
      } catch (err) {
        setError('Failed to load watch history. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-page">
      <div className="history-header">
        <h1>My Watch History</h1>
        <p>Pick up where you left off.</p>
      </div>

      <div className="history-content">
        {loading && (
          <div className="loading-grid">
            {[...Array(4)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
          </div>
        )}

        {error && <div className="history-error">⚠️ {error}</div>}

        {!loading && !error && history.length === 0 && (
          <div className="empty-state">
            <span>🕰️</span>
            <p>You haven't watched anything yet.</p>
            <button onClick={() => navigate('/home')}>Explore Anime</button>
          </div>
        )}

        {!loading && !error && history.length > 0 && (
          <div className="history-list">
            {history.map((item, idx) => (
              <div 
                key={idx} 
                className="history-card" 
                onClick={() => navigate(`/watch/${encodeURIComponent(item.anime_name)}/${item.epno}`)}
              >
                <div className="history-info">
                  <h3>{item.anime_name}</h3>
                  <span className="history-ep">Episode {item.epno}</span>
                  <span className="history-date">
                    Watched on: {new Date(item.watch_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="history-action">
                  <span>▶ Re-watch</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchHistory;
