import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './AnimeDetail.css';

const AnimeDetail = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [epLoading, setEpLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const encodedName = encodeURIComponent(name);

    const fetchAnime = async () => {
      try {
        const res = await API.get(`/anime/${encodedName}`);
        setAnime(res.data.message);
      } catch {
        setAnime(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchEpisodes = async () => {
      try {
        const res = await API.get(`/anime/${encodedName}/episodes`);
        const data = res.data.message;
        setEpisodes(Array.isArray(data) ? data : data ? [data] : []);
      } catch {
        setEpisodes([]);
      } finally {
        setEpLoading(false);
      }
    };

    fetchAnime();
    fetchEpisodes();
  }, [name]);

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-skeleton"></div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="detail-page">
        <div className="detail-not-found">
          <span>😕</span>
          <p>Could not load <strong>"{name}"</strong></p>
          <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.4rem' }}>
            The anime may not exist or there was a connection issue.
          </p>
          <button onClick={() => navigate('/home')}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      {/* Banner */}
      <div className="detail-banner">
        {anime.image_url && (
          <img className="banner-bg" src={anime.image_url} alt="" />
        )}
        <div className="banner-overlay"></div>
        <div className="detail-hero">
          <div className="detail-poster">
            {anime.image_url
              ? <img src={anime.image_url} alt={anime.title} />
              : <div className="poster-placeholder">🎬</div>
            }
          </div>
          <div className="detail-info">
            <h1>{anime.title}</h1>
            <div className="detail-meta">
              <span className={`status-tag ${anime.status?.toLowerCase()}`}>{anime.status}</span>
              <span>📅 {anime.release_year}</span>
              <span>🎬 {anime.total_episodes} episodes</span>
            </div>
            <p className="detail-desc">{anime.description}</p>
            <div className="detail-actions">
              <button
                className="watch-btn"
                onClick={() => episodes.length > 0 && navigate(`/watch/${name}/1`)}
                disabled={episodes.length === 0}
              >
                ▶ Watch Now
              </button>
              <button
                className={`save-btn ${saved ? 'saved' : ''}`}
                onClick={async () => {
                  try {
                    await API.post(`/user/saveanime/${anime.id}`, { anime_id: anime.id });
                    setSaved(true);
                  } catch (err) {
                    console.error("Failed to save anime", err);
                  }
                }}
              >
                {saved ? '✓ Saved' : '+ My List'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Episodes */}
      <div className="episodes-section">
        <h2>Episodes</h2>
        {epLoading && <div className="ep-loading">Loading episodes...</div>}
        {!epLoading && episodes.length === 0 && (
          <div className="ep-empty">
            <span>📭</span>
            <p>No episodes available yet.</p>
            <small>Episodes will appear here once they are uploaded.</small>
          </div>
        )}
        <div className="episodes-grid">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="ep-card"
              onClick={() => navigate(`/watch/${name}/${ep.epno}`)}
            >
              <div className="ep-number">{ep.epno}</div>
              <div className="ep-info">
                <span className="ep-arc">{ep.arc}</span>
                <span className="ep-label">Episode {ep.epno}</span>
              </div>
              <span className="ep-play">▶</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
