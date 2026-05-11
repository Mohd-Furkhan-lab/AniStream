import { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminManageAnime = ({ onManageEpisodes, onEditAnime }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnimes = async () => {
    try {
      const res = await API.get('/admin/anime');
      const data = res.data.message;
      setAnimes(Array.isArray(data) ? data : data ? [data] : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimes();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this anime?")) return;
    try {
      await API.delete(`/admin/anime/${id}`);
      fetchAnimes();
    } catch (err) {
      alert("Failed to delete anime");
    }
  };

  if (loading) return <div style={{ color: '#888', padding: '2rem' }}>Loading...</div>;

  return (
    <div>
      <div className="header-with-actions">
        <h2>Manage Anime</h2>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Eps</th>
              <th>Year</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {animes.map((anime) => (
              <tr key={anime.id}>
                <td>{anime.id}</td>
                <td>{anime.title}</td>
                <td>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    background: anime.status === 'Ongoing'
                      ? 'rgba(16,185,129,0.2)'
                      : anime.status === 'Completed'
                        ? 'rgba(139,92,246,0.2)'
                        : 'rgba(245,158,11,0.2)',
                    color: anime.status === 'Ongoing'
                      ? '#34d399'
                      : anime.status === 'Completed'
                        ? '#a78bfa'
                        : '#fbbf24',
                  }}>
                    {anime.status}
                  </span>
                </td>
                <td>{anime.total_episodes}</td>
                <td>{anime.release_year}</td>
                <td>
                  <button
                    className="admin-action-btn episodes"
                    onClick={() => onManageEpisodes(anime.id, anime.title)}
                  >
                    Episodes
                  </button>
                  <button
                    className="admin-action-btn"
                    style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', borderColor: 'rgba(59,130,246,0.3)', marginLeft: '0.4rem' }}
                    onClick={() => onEditAnime(anime)}
                  >
                    Edit
                  </button>
                  <button
                    className="admin-action-btn delete"
                    style={{ marginLeft: '0.4rem' }}
                    onClick={() => handleDelete(anime.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {animes.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                  No anime found. Add one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageAnime;

