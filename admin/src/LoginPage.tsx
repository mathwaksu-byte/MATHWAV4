import { useLogin } from 'react-admin';
import { useState } from 'react';

export default function LoginPage() {
  const login = useLogin();
  const [email, setEmail] = useState('admin@mathwa.com');
  const [password, setPassword] = useState('Admin@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login({ username: email, password });
    } catch (e) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#0f172a,#1e293b)' }}>
      <div style={{ width: 380, background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', padding: 24 }}>
        <h2 style={{ textAlign: 'center', margin: 0, marginBottom: 16 }}>Admin Login</h2>
        <form onSubmit={onSubmit}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid #e2e8f0', borderRadius: 8 }} required />
          <label style={{ display: 'block', fontWeight: 600, marginTop: 12, marginBottom: 6 }}>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: 10, border: '1px solid #e2e8f0', borderRadius: 8 }} required />
          <button type="submit" disabled={loading} style={{ width: '100%', marginTop: 16, padding: 10, background: '#2563eb', color: '#fff', border: 0, borderRadius: 8, cursor: 'pointer' }}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        {error && <div style={{ marginTop: 12, color: '#b91c1c', background: '#fee2e2', padding: 8, borderRadius: 8, textAlign: 'center' }}>{error}</div>}
        <div style={{ marginTop: 12, fontSize: 12, color: '#64748b', textAlign: 'center' }}>Uses the deployed API endpoint.</div>
      </div>
    </div>
  );
}

