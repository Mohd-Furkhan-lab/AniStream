import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './Home.css';

const Home = () => {
  const [animes, setAnimes] = useState([]);
  const [genre, setGenre] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const genres = ['Action', 'Adventure', 'Romance', 'Fantasy', 'Horror', 'Comedy', 'Thriller'];

  const fetchAnimes = async (genreFilter = '', searchQuery = '') => {
    setLoading(true);
    setError('');
    try {
      let url = '/anime/';
      if (searchQuery) {
        url = `/anime/${searchQuery}`;
      } else if (genreFilter) {
        url = `/anime/?genre=${genreFilter}`;
      }
      const res = await API.get(url);
      const data = res.data.message;
      setAnimes(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      setError('Failed to load anime. Make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  const handleGenreClick = (g) => {
    const newGenre = genre === g ? '' : g;
    setGenre(newGenre);
    setSearch('');
    fetchAnimes(newGenre, '');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAnimes('', search.trim());
  };

  return (
    <div className="home-page">
      {/* Hero */}
      <div className="home-hero">
        <div className="hero-content">
          <h1>Watch Anime, <span>Anytime</span></h1>
          <p>Stream thousands of anime titles — new and classic.</p>
          <form onSubmit={handleSearch} className="search-bar">
            <input
              type="text"
              placeholder="Search anime by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      {/* Genre Filters */}
      <div className="genres-section">
        <div className="genre-chips">
          {genres.map((g) => (
            <button
              key={g}
              className={`genre-chip ${genre === g ? 'active' : ''}`}
              onClick={() => handleGenreClick(g)}
            >
              {g}
            </button>
          ))}
          {(genre || search) && (
            <button className="genre-chip clear-chip" onClick={() => { setGenre(''); setSearch(''); fetchAnimes(); }}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Anime Grid */}
      <div className="anime-section">
        <h2 className="section-title">
          {search ? `Results for "${search}"` : genre ? `Genre: ${genre}` : 'All Anime'}
        </h2>

        {loading && (
          <div className="loading-grid">
            {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
          </div>
        )}

        {error && <div className="home-error">⚠️ {error}</div>}

        {!loading && !error && animes.length === 0 && (
          <div className="empty-state">
            <span>🔍</span>
            <p>No anime found. Try a different search or genre.</p>
          </div>
        )}

        {!loading && !error && animes.length > 0 && (
          <div className="anime-grid">
            {animes.map((anime) => (
              <div key={anime.id} className="anime-card" onClick={() => navigate(`/anime/${anime.title}`)}>
                <div className="card-img-wrap">
                  {anime.image_url
                    ? <img src={anime.image_url} alt={anime.title} />
                    : <div className="card-img-placeholder">🎬</div>
                  }
                  <div className="card-overlay">
                    <span className="play-btn">▶</span>
                  </div>
                  <span className={`status-badge ${anime.status?.toLowerCase()}`}>{anime.status}</span>
                </div>
                <div className="card-info">
                  <h3>{anime.title}</h3>
                  <div className="card-meta">
                    <span>📅 {anime.release_year}</span>
                    <span>🎬 {anime.total_episodes} eps</span>
                  </div>
                  <p className="card-desc">{anime.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
