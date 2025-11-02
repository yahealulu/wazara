import api from './axiosConfig';

interface LoginCredentials {
  phone: string;
  password: string;
}

interface AuthResponse {
  refresh: string;
  access: string;
  user: {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    id_number: string | null;
    role: string;
    must_change_password: boolean;
    scopes: string[];
    phone_verified_at: string;
  };
  role: string;
  scopes: string[];
  aud: string[];
}

interface RefreshTokenResponse {
  access: string;
  refresh: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post('/auth/api/login/?actor=superadmin', credentials);
      return response.data;
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    try {
      const response = await api.post('/auth/api/token/refresh/', { refresh: refreshToken });
      return response.data;
    } catch (error) {
      console.error('Token refresh error:', error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const tokens = authService.getTokens();
      if (tokens && tokens.refresh) {
        // Send refresh token in body and access token in header
        await api.post('/auth/api/logout/', 
          { refresh: tokens.refresh },
          { headers: { Authorization: `Bearer ${tokens.access}` } }
        );
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('auth_tokens');
      localStorage.removeItem('user_info');
    }
  },

  saveTokens: (tokens: { access: string; refresh: string }) => {
    localStorage.setItem('auth_tokens', JSON.stringify(tokens));
  },

  saveUserInfo: (user: AuthResponse['user']) => {
    localStorage.setItem('user_info', JSON.stringify(user));
  },

  getTokens: () => {
    const tokens = localStorage.getItem('auth_tokens');
    return tokens ? JSON.parse(tokens) : null;
  },

  getUserInfo: () => {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_tokens');
  }
};

export default authService;