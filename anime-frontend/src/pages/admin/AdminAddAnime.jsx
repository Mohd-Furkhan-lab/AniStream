import { useState } from 'react';
import API from '../../api/axios';

const AdminAddAnime = ({ onSuccess }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'Ongoing',
    total_episodes: 0,
    release_year: new Date().getFullYear().toString(),
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await API.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        imageUrl = uploadRes.data.url;
      }

      await API.post('/admin/anime', {
        ...form,
        image_url: imageUrl
      });
      alert('Anime added successfully!');
      onSuccess();
    } catch (err) {
      alert('Failed to add anime: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>Add New Anime</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
        <div className="admin-form-group">
          <label>Title</label>
          <input required type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        </div>
        <div className="admin-form-group">
          <label>Description</label>
          <textarea required rows="4" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        </div>
        <div className="admin-form-group">
          <label>Status</label>
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>
        <div className="admin-form-group" style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label>Total Episodes</label>
            <input required type="number" min="0" value={form.total_episodes} onChange={e => setForm({...form, total_episodes: parseInt(e.target.value)})} />
          </div>
          <div style={{ flex: 1 }}>
            <label>Release Year</label>
            <input required type="text" value={form.release_year} onChange={e => setForm({...form, release_year: e.target.value})} />
          </div>
        </div>
        <div className="admin-form-group">
          <label>Poster Image (Cloudinary)</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
        </div>
        <button className="admin-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Anime'}
        </button>
      </form>
    </div>
  );
};

export default AdminAddAnime;
