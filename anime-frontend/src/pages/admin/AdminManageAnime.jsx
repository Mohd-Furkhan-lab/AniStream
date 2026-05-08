import { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminManageAnime = ({ onManageEpisodes }) => {
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

  if (loading) return <div>Loading...</div>;

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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {animes.map((anime) => (
              <tr key={anime.id}>
                <td>{anime.id}</td>
                <td>{anime.title}</td>
                <td>{anime.status}</td>
                <td>{anime.total_ep}</td>
                <td>
                  <button className="admin-action-btn episodes" onClick={() => onManageEpisodes(anime.id)}>
                    Episodes
                  </button>
                  <button className="admin-action-btn delete" onClick={() => handleDelete(anime.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {animes.length === 0 && (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No anime found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManageAnime;
