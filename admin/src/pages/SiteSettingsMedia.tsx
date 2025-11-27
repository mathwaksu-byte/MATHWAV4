import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../apiBase';

export default function SiteSettingsMedia() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const formRef = useRef<HTMLFormElement | null>(null);

  const authHeader = () => {
    const t = localStorage.getItem('token');
    return t ? { Authorization: `Bearer ${t}` } : {};
  };

  useEffect(() => {
    axios.get(`${API_URL}/settings/admin`, { headers: authHeader() })
      .then(r => setPreview(r.data.settings || null))
      .catch(() => {});
  }, []);

  const uploadFile = async (file: File, folder: string = 'site/hero') => {
    const fd = new FormData();
    fd.append('file', file);
    fd.append('bucket', 'uploads');
    fd.append('folder', folder);
    const res = await axios.post(`${API_URL}/uploads/single`, fd);
    return res.data?.file?.url as string;
  };

  const deleteFile = async (fileUrl: string) => {
    if (!fileUrl) return;
    const url = new URL(fileUrl);
    const decodedPath = decodeURIComponent(url.pathname);
    const match = decodedPath.match(/\/storage\/v1\/object\/public\/(.*?)\/(.*)$/);
    if (!match) throw new Error('Could not extract bucket/path from URL');
    const bucket = match[1];
    const path = match[2];
    await axios.delete(`${API_URL}/uploads`, {
      data: { bucket, path },
      headers: authHeader()
    });
  };

  const removeVideo = async (videoType: 'mp4' | 'webm' | 'poster') => {
    setLoading(true);
    setMessage(null);
    try {
      const urlKey = videoType === 'poster' ? 'hero_video_poster_url' : `hero_video_${videoType}_url`;
      const currentUrl = preview?.[urlKey];
      
      if (currentUrl) {
        await deleteFile(currentUrl);
      }
      
      // Update settings to remove the URL
      const updates = { [urlKey]: '' };
      const upd = await axios.put(`${API_URL}/settings/admin`, updates, { 
        headers: { 'Content-Type': 'application/json', ...authHeader() } 
      });
      setPreview(upd.data.settings || { ...preview, ...updates });
      setMessage(`${videoType.toUpperCase()} video removed successfully`);
    } catch (err: any) {
      setMessage(err?.message || `Failed to remove ${videoType} video`);
    } finally {
      setLoading(false);
    }
  };

  const removeLogo = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const currentUrl = preview?.logo_url;
      
      if (currentUrl) {
        await deleteFile(currentUrl);
      }
      
      // Update settings to remove the logo URL
      const updates = { logo_url: '' };
      const upd = await axios.put(`${API_URL}/settings/admin`, updates, { 
        headers: { 'Content-Type': 'application/json', ...authHeader() } 
      });
      setPreview(upd.data.settings || { ...preview, ...updates });
      setMessage('Logo removed successfully');
    } catch (err: any) {
      setMessage(err?.message || 'Failed to remove logo');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setLoading(true);
    setMessage(null);
    const fd = new FormData(form);
    try {
      const title = String(fd.get('hero_title') || '');
      const subtitle = String(fd.get('hero_subtitle') || '');
      const mp4 = fd.get('hero_video_mp4') as File | null;
      const webm = fd.get('hero_video_webm') as File | null;
      const poster = fd.get('hero_poster') as File | null;
      const logo = fd.get('site_logo') as File | null;
      const updates: any = { hero_title: title, hero_subtitle: subtitle };
      if (mp4 && mp4.size) {
        updates.hero_video_mp4_url = await uploadFile(mp4);
      }
      if (webm && webm.size) {
        updates.hero_video_webm_url = await uploadFile(webm);
      }
      if (poster && poster.size) {
        updates.hero_video_poster_url = await uploadFile(poster);
      }
      if (logo && logo.size) {
        updates.logo_url = await uploadFile(logo, 'site/logo');
      }
      const bgId = String(fd.get('background_theme_id') || '');
      const bgCss = String(fd.get('background_gradient_css') || '');
      const resetBg = String(fd.get('reset_background') || '');
      if (resetBg) {
        updates.background_theme_id = '';
        updates.background_gradient_css = '';
      } else {
        if (bgId) updates.background_theme_id = bgId;
        if (bgCss) updates.background_gradient_css = bgCss;
      }
      const upd = await axios.put(`${API_URL}/settings/admin`, updates, { headers: { 'Content-Type': 'application/json', ...authHeader() } });
      setPreview(upd.data.settings || updates);
      setMessage('Saved successfully');
      if (form && typeof (form as any).reset === 'function') {
        (form as any).reset();
      }
    } catch (err: any) {
      setMessage(err?.message || 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 720, margin: '32px auto', padding: 16 }}>
      <h2>Site Media Settings</h2>
      <p>Upload your brand logo and hero video content. Update the title/subtitle shown over the hero video.</p>
      {message && <div style={{ margin: '8px 0', color: message.includes('Saved') ? 'green' : 'crimson' }}>{message}</div>}
      <form ref={formRef} onSubmit={onSubmit}>
        <label style={{ display: 'block', marginTop: 12 }}>Hero Title
          <input type="text" name="hero_title" defaultValue={preview?.hero_title || ''} style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>
        <label style={{ display: 'block', marginTop: 12 }}>Hero Subtitle
          <input type="text" name="hero_subtitle" defaultValue={preview?.hero_subtitle || ''} style={{ width: '100%', padding: 8, marginTop: 4 }} />
        </label>

        {/* Logo Upload Section */}
        <div style={{ marginTop: 24, padding: 16, backgroundColor: '#f8fafc', borderRadius: 8 }}>
          <h3 style={{ marginBottom: 12 }}>Brand Logo</h3>
          <label>Upload Logo Image
            <input type="file" name="site_logo" accept="image/png,image/jpeg,image/svg+xml" />
          </label>
          
          {preview?.logo_url && (
            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, backgroundColor: 'white', borderRadius: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <img src={preview.logo_url} alt="Current logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                  <span style={{ fontSize: 14 }}>Current Logo</span>
                </div>
                <button 
                  type="button" 
                  onClick={removeLogo}
                  disabled={loading}
                  style={{ padding: '4px 8px', fontSize: 12, backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 12 }}>
          <label>MP4 Video
            <input type="file" name="hero_video_mp4" accept="video/mp4" />
          </label>
          <label>WEBM Video
            <input type="file" name="hero_video_webm" accept="video/webm" />
          </label>
          <label>Poster Image
            <input type="file" name="hero_poster" accept="image/png,image/jpeg,image/webp" />
          </label>
        </div>

        {preview && (
          <div style={{ marginTop: 16 }}>
            <h4>Current Files:</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {preview.hero_video_mp4_url && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, backgroundColor: '#f8fafc', borderRadius: 6 }}>
                  <span style={{ fontSize: 14 }}>MP4 Video: {preview.hero_video_mp4_url.split('/').pop()}</span>
                  <button 
                    type="button" 
                    onClick={() => removeVideo('mp4')}
                    disabled={loading}
                    style={{ padding: '4px 8px', fontSize: 12, backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              )}
              {preview.hero_video_webm_url && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, backgroundColor: '#f8fafc', borderRadius: 6 }}>
                  <span style={{ fontSize: 14 }}>WEBM Video: {preview.hero_video_webm_url.split('/').pop()}</span>
                  <button 
                    type="button" 
                    onClick={() => removeVideo('webm')}
                    disabled={loading}
                    style={{ padding: '4px 8px', fontSize: 12, backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              )}
              {preview.hero_video_poster_url && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 8, backgroundColor: '#f8fafc', borderRadius: 6 }}>
                  <span style={{ fontSize: 14 }}>Poster Image: {preview.hero_video_poster_url.split('/').pop()}</span>
                  <button 
                    type="button" 
                    onClick={() => removeVideo('poster')}
                    disabled={loading}
                    style={{ padding: '4px 8px', fontSize: 12, backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                  >
                    Remove
                  </button>
                </div>
              )}
              {!preview.hero_video_mp4_url && !preview.hero_video_webm_url && !preview.hero_video_poster_url && (
                <span style={{ fontSize: 14, color: '#64748b' }}>No files uploaded yet</span>
              )}
            </div>
          </div>
        )}

        <input type="hidden" name="background_theme_id" defaultValue={preview?.background_theme_id || ''} />
        <input type="hidden" name="background_gradient_css" defaultValue={preview?.background_gradient_css || ''} />
        <input type="hidden" name="reset_background" defaultValue="" />

        <button type="submit" disabled={loading} style={{ marginTop: 16, padding: '10px 16px' }}>
          {loading ? 'Saving…' : 'Save Settings'}
        </button>
      </form>

      <div style={{ marginTop: 28 }}>
        <h3 style={{ marginBottom: 8 }}>Background Theme</h3>
        <p style={{ color: '#475569', fontSize: 14 }}>The site background is locked to Emerald Teal. Other color selections have been removed.</p>
        {preview && (
          <div style={{ marginTop: 12, border: '1px solid #E2E8F0', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ height: 84, backgroundImage: [
              'radial-gradient(1200px 700px at 8% 0%, rgba(0,128,128,0.44), transparent 65%)',
              'radial-gradient(1100px 640px at 92% 100%, rgba(27,59,156,0.35), transparent 70%)',
              'radial-gradient(900px 520px at 40% 45%, rgba(41,171,226,0.30), transparent 72%)'
            ].join(', '), backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
            <div style={{ padding: 12 }}>
              <div style={{ fontWeight: 600 }}>Emerald Teal</div>
              <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>Locked site-wide</div>
            </div>
          </div>
        )}
        {preview && (
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: '#64748B' }}>Current theme: {preview.background_theme_id || 'emerald-teal'}</div>
          </div>
        )}
      </div>

      {preview && (
        <div style={{ marginTop: 24 }}>
          <h3>Current Preview</h3>
          <video controls muted playsInline preload="metadata" poster={preview.hero_video_poster_url} style={{ width: '100%', borderRadius: 12 }}>
            {preview.hero_video_webm_url && <source src={preview.hero_video_webm_url} type="video/webm" />}
            {preview.hero_video_mp4_url && <source src={preview.hero_video_mp4_url} type="video/mp4" />}
          </video>
          <p><strong>Title:</strong> {preview.hero_title}</p>
          <p><strong>Subtitle:</strong> {preview.hero_subtitle}</p>
        </div>
      )}
    </div>
  );
}
