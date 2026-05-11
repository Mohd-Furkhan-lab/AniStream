import { useState, useEffect } from 'react';
import API from '../../api/axios';

const AdminManageEpisodes = ({ animeId, animeName, onBack }) => {
  const [episodes, setEpisodes] = useState([]);
  const [epLoading, setEpLoading] = useState(true);
  const [form, setForm] = useState({ epno: 1, arc: '' });
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');

  const fetchEpisodes = async () => {
    if (!animeName) return;
    setEpLoading(true);
    try {
      const res = await API.get(`/anime/${encodeURIComponent(animeName)}/episodes`);
      const data = res.data.message;
      const eps = Array.isArray(data) ? data : data ? [data] : [];
      setEpisodes(eps);
      // Auto-set next episode number
      if (eps.length > 0) {
        const maxEp = Math.max(...eps.map(e => e.epno));
        setForm(f => ({ ...f, epno: maxEp + 1 }));
      }
    } catch {
      setEpisodes([]);
    } finally {
      setEpLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, [animeName]);

  const handleDeleteEp = async (epno) => {
    if (!window.confirm(`Are you sure you want to delete episode ${epno}?`)) return;
    try {
      await API.delete(`/admin/anime/${animeId}/episode/${epno}`);
      fetchEpisodes();
    } catch (err) {
      alert('Failed to delete episode: ' + (err.response?.data?.detail || err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      alert("Please select a video file first.");
      return;
    }
    setLoading(true);
    setUploadProgress('Uploading video to Cloudinary...');
    try {
      // 1. Upload the video
      const formData = new FormData();
      formData.append('file', videoFile);
      const uploadRes = await API.post('/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const videoUrl = uploadRes.data.url;

      setUploadProgress('Saving episode details...');
      // 2. Save the episode
      await API.post('/admin/anime/episode', { animeid: animeId, ...form, ep_url: videoUrl });
      
      alert('Episode added successfully!');
      setForm(f => ({ ...f, epno: f.epno + 1, arc: '' }));
      setVideoFile(null);
      // Reset file input manually
      document.getElementById('video-upload').value = '';
      fetchEpisodes(); // Refresh list
    } catch (err) {
      alert('Failed to add episode: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
      setUploadProgress('');
    }
  };

  return (
    <div style={{ maxWidth: '700px' }}>
      <div className="header-with-actions">
        <h2>📺 Episodes — {animeName}</h2>
        <button className="back-link" onClick={onBack}>← Back to list</button>
      </div>

      {/* Existing episodes list */}
      <div style={{ margin: '1.5rem 0', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: '0.85rem', color: '#888', fontWeight: 600 }}>
          EXISTING EPISODES ({episodes.length})
        </div>
        {epLoading && (
          <div style={{ padding: '1.5rem', color: '#666', textAlign: 'center' }}>Loading episodes...</div>
        )}
        {!epLoading && episodes.length === 0 && (
          <div style={{ padding: '1.5rem', color: '#666', textAlign: 'center' }}>No episodes yet. Add the first one below!</div>
        )}
        {!epLoading && episodes.length > 0 && (
          <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
            {episodes.map((ep) => (
              <div key={ep.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.7rem 1rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                gap: '1rem',
              }}>
                <span style={{
                  minWidth: '36px', height: '36px',
                  background: 'rgba(139,92,246,0.15)',
                  color: '#a78bfa',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '0.85rem',
                }}>
                  {ep.epno}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#ddd', fontSize: '0.9rem', fontWeight: 500 }}>{ep.arc || 'No arc'}</div>
                  <div style={{ color: '#555', fontSize: '0.75rem', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }}>
                    {ep.ep_url}
                  </div>
                </div>
                <button 
                  onClick={() => handleDeleteEp(ep.epno)}
                  style={{ 
                    background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)', 
                    padding: '0.3rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' 
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add new episode form */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.5rem' }}>
        <h3 style={{ color: '#ddd', marginBottom: '1rem', fontSize: '1rem' }}>➕ Add New Episode</h3>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Episode Number</label>
            <input required type="number" min="1" value={form.epno}
              onChange={e => setForm({ ...form, epno: parseInt(e.target.value) })} />
          </div>
          <div className="admin-form-group">
            <label>Story Arc Name</label>
            <input type="text" value={form.arc} placeholder="e.g. Chunin Exams Arc"
              onChange={e => setForm({ ...form, arc: e.target.value })} />
          </div>
          <div className="admin-form-group">
            <label>Video File (Uploads to Cloudinary)</label>
            <input id="video-upload" required type="file" accept="video/*" 
              onChange={e => setVideoFile(e.target.files[0])} />
          </div>
          <button className="admin-submit-btn" type="submit" disabled={loading}>
            {loading ? uploadProgress || 'Adding...' : 'Add Episode'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminManageEpisodes;

