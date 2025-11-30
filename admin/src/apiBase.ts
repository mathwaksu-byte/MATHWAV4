// Centralized API configuration
const BASE = import.meta.env.VITE_API_URL ? String(import.meta.env.VITE_API_URL).replace(/\/+$|\\s+$/g, '') : '';
export const API_URL = BASE ? (BASE.endsWith('/api') ? BASE : `${BASE}/api`) : 'http://localhost:3002/api';
