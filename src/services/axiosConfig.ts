import axios from 'axios';
import authService from './authService';

// Use environment variable for base URL, with fallback to localhost
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8088";

// Create axios instance with the proxy base URL
const api = axios.create({
  baseURL: API_BASE_URL,     
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const tokens = authService.getTokens();
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh on 401/403 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Prevent infinite loops by checking if we've already retried
    if ((error.response?.status === 401 || error.response?.status === 403) && 
        !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const tokens = authService.getTokens();
        
        if (!tokens?.refresh) {
          // No refresh token available, redirect to login
          authService.logout();
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        // Try to refresh the token through the proxy
        const response = await axios.post(
          '/auth/api/token/refresh/', 
          { refresh: tokens.refresh },
          { headers: { 'Content-Type': 'application/json' } }
        );
        
        // Save the new tokens
        authService.saveTokens({
          access: response.data.access,
          refresh: response.data.refresh
        });
        
        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
        
        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        // If refresh token is invalid, logout and redirect to login
        authService.logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;