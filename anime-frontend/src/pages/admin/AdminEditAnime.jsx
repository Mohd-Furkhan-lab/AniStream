import { useState } from 'react';
import API from '../../api/axios';

const AdminEditAnime = ({ anime, onSuccess, onBack }) => {
  const [form, setForm] = useState({
    status: anime?.status || 'Ongoing',
    description: anime?.description || '',
    image_url: anime?.image_url || '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [genreInput, setGenreInput] = useState('Action');
  const [genreLoading, setGenreLoading] = useState(false);
  
  const availableGenres = ['Action', 'Adventure', 'Romance', 'Fantasy', 'Horror', 'Comedy', 'Thriller', 'Sci-Fi', 'Slice of Life', 'Drama'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      let imageUrl = form.image_url;

      // Upload new image to Cloudinary if one was selected
      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        const uploadRes = await API.post('/admin/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = uploadRes.data.url;
      }

      await API.put(`/admin/anime/${anime.id}`, {
        status: form.status,
        description: form.description,
        image_url: imageUrl,
      });

      setMessage('Anime updated successfully!');
      setIsError(false);
      setTimeout(() => onSuccess(), 1000);
    } catch (err) {
      setMessage('Failed to update: ' + (err.response?.data?.detail || err.message));
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGenre = async (e) => {
    e.preventDefault();
    setGenreLoading(true);
    try {
      await API.post('/admin/anime/genre', {
        animeid: anime.id.toString(),
        genre: genreInput
      });
      setMessage(`Genre '${genreInput}' added successfully!`);
      setIsError(false);
    } catch (err) {
      setMessage('Failed to add genre: ' + (err.response?.data?.detail || err.message));
      setIsError(true);
    } finally {
      setGenreLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <div className="header-with-actions">
        <h2>✏️ Edit — {anime?.title}</h2>
        <button className="back-link" onClick={onBack}>← Back to list</button>
      </div>

      {/* Current poster preview */}
      {form.image_url && (
        <div style={{ margin: '1.5rem 0', borderRadius: '10px', overflow: 'hidden', maxWidth: '160px' }}>
          <img src={form.image_url} alt="Current poster"
            style={{ width: '100%', borderRadius: '10px', display: 'block' }} />
          <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.4rem' }}>Current poster</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
        <div className="admin-form-group">
          <label>Status</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option>Ongoing</option>
            <option>Completed</option>
            <option>Upcoming</option>
          </select>
        </div>

        <div className="admin-form-group">
          <label>Description</label>
          <textarea
            rows="5"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="admin-form-group">
          <label>Replace Poster Image (optional)</label>
          <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
          <small style={{ color: '#888', display: 'block', marginTop: '0.4rem' }}>
            Leave empty to keep the current image
          </small>
        </div>

        {message && (
          <div style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            background: isError ? 'rgba(248,113,113,0.1)' : 'rgba(16,185,129,0.1)',
            border: `1px solid ${isError ? 'rgba(248,113,113,0.3)' : 'rgba(16,185,129,0.3)'}`,
            color: isError ? '#f87171' : '#34d399',
            fontSize: '0.9rem',
          }}>
            {isError ? '⚠️' : '✅'} {message}
          </div>
        )}

        <button className="admin-submit-btn" type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#ddd' }}>🏷️ Manage Genres</h3>
        <form onSubmit={handleAddGenre} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div className="admin-form-group" style={{ flex: 1, marginBottom: 0 }}>
            <label>Add Genre</label>
            <select value={genreInput} onChange={e => setGenreInput(e.target.value)}>
              {availableGenres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>
          <button className="admin-submit-btn" type="submit" disabled={genreLoading} style={{ padding: '0.75rem 1.5rem', width: 'auto' }}>
            {genreLoading ? 'Adding...' : 'Add'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditAnime;
