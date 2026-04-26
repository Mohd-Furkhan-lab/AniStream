import { useState } from 'react';
import API from '../../api/axios';

const AdminManageEpisodes = ({ animeId, onBack }) => {
  const [form, setForm] = useState({
    epno: 1,
    arc: '',
    ep_url: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/admin/anime/episode', {
        anime_id: animeId,
        ...form
      });
      alert('Episode added successfully!');
      setForm({ ...form, epno: form.epno + 1, arc: '', ep_url: '' });
    } catch (err) {
      alert('Failed to add episode: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div className="header-with-actions">
        <h2>Add Episode to Anime #{animeId}</h2>
        <button className="back-link" onClick={onBack}>← Back to list</button>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div className="admin-form-group">
          <label>Episode Number</label>
          <input required type="number" min="1" value={form.epno} onChange={e => setForm({...form, epno: parseInt(e.target.value)})} />
        </div>
        <div className="admin-form-group">
          <label>Story Arc Name (Optional)</label>
          <input type="text" value={form.arc} onChange={e => setForm({...form, arc: e.target.value})} />
        </div>
        <div className="admin-form-group">
          <label>Video URL</label>
          <input required type="url" placeholder="https://..." value={form.ep_url} onChange={e => setForm({...form, ep_url: e.target.value})} />
        </div>
        <button className="admin-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Episode'}
        </button>
      </form>
    </div>
  );
};

export default AdminManageEpisodes;
