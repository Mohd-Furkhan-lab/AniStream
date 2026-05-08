import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './Watch.css';

const Watch = () => {
  const { name, epno } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [allEps, setAllEps] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentEp = parseInt(epno);

  useEffect(() => {
    const fetchEp = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/anime/${name}/episodes/${epno}`);
        setEpisode(res.data.message);
        // log watch history
        await API.post('/user/watchistory', { anime_id: name, ep_id: epno }).catch(() => {});
      } catch {
        setEpisode(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllEps = async () => {
      try {
        const res = await API.get(`/anime/${name}/episodes`);
        const data = res.data.message;
        setAllEps(Array.isArray(data) ? data : data ? [data] : []);
      } catch {
        setAllEps([]);
      }
    };

    fetchEp();
    fetchAllEps();
  }, [name, epno]);

  return (
    <div className="watch-page">
      <div className="watch-header">
        <button className="back-btn" onClick={() => navigate(`/anime/${name}`)}>
          ← Back
        </button>
        <div className="watch-title-info">
          <span className="watch-anime-name">{name}</span>
          {episode && <span className="watch-ep-label">Episode {episode.epno} — {episode.arc}</span>}
        </div>
      </div>

      <div className="watch-layout">
        {/* Video Player */}
        <div className="player-section">
          {loading && <div className="player-skeleton"></div>}
          {!loading && !episode && (
            <div className="player-error">
              <span>😕</span>
              <p>Episode not found.</p>
            </div>
          )}
          {!loading && episode && (
            <div className="video-wrapper">
              {episode.ep_url ? (
                <video controls autoPlay key={episode.ep_url}>
                  <source src={episode.ep_url} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="player-no-url">
                  <span>🎬</span>
                  <p>Video URL not available for this episode.</p>
                </div>
              )}
            </div>
          )}

          {/* Nav Buttons */}
          {!loading && episode && (
            <div className="ep-nav-btns">
              <button
                disabled={currentEp <= 1}
                onClick={() => navigate(`/watch/${name}/${currentEp - 1}`)}
              >
                ← Previous
              </button>
              <span>Episode {currentEp}</span>
              <button onClick={() => navigate(`/watch/${name}/${currentEp + 1}`)}>
                Next →
              </button>
            </div>
          )}
        </div>

        {/* Episode Sidebar */}
        <div className="ep-sidebar">
          <h3>Episodes</h3>
          <div className="ep-sidebar-list">
            {allEps.map((ep) => (
              <div
                key={ep.id}
                className={`ep-sidebar-item ${ep.epno === currentEp ? 'active' : ''}`}
                onClick={() => navigate(`/watch/${name}/${ep.epno}`)}
              >
                <span className="ep-s-num">EP {ep.epno}</span>
                <span className="ep-s-arc">{ep.arc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
