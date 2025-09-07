import axios from 'axios';
import { 
  AuthTokens, 
  LoginData, 
  RegisterData, 
  Product, 
  ProductFilters, 
  Cart, 
  Order, 
  OrderData 
} from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  private api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
              const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
                refresh: refreshToken,
              });
              
              const { access } = response.data as { access: string };
              localStorage.setItem('access_token', access);
              
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${access}`;
              }
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Refresh failed, redirect to login
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // Auth endpoints
  async login(data: LoginData): Promise<AuthTokens> {
    const response = await this.api.post('/auth/login/', data);
    const tokens = response.data as AuthTokens;
    
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    localStorage.setItem('user', JSON.stringify(tokens.user));
    
    return tokens;
  }

  async register(data: RegisterData): Promise<AuthTokens> {
    const response = await this.api.post('/auth/register/', data);
    const tokens = response.data as AuthTokens;
    
    localStorage.setItem('access_token', tokens.access);
    localStorage.setItem('refresh_token', tokens.refresh);
    localStorage.setItem('user', JSON.stringify(tokens.user));
    
    return tokens;
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        await this.api.post('/auth/logout/', { refresh: refreshToken });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  async getUserProfile() {
    const response = await this.api.get('/auth/profile/');
    return response.data;
  }

  // Product endpoints
  async getProducts(filters?: ProductFilters): Promise<{ count: number; results: Product[] }> {
    const params = new URLSearchParams();
    
    if (filters?.search) params.append('search', filters.search);
    if (filters?.category) params.append('category', filters.category);
    if (filters?.min_price) params.append('min_price', filters.min_price.toString());
    if (filters?.max_price) params.append('max_price', filters.max_price.toString());
    if (filters?.ordering) params.append('ordering', filters.ordering);
    if (filters?.page) params.append('page', filters.page.toString());

    const response = await this.api.get(`/products/?${params}`);
    return response.data as { count: number; results: Product[] };
  }

  async getProduct(id: number): Promise<Product> {
    const response = await this.api.get(`/products/${id}/`);
    return response.data as Product;
  }

  // Cart endpoints
  async getCart(): Promise<Cart> {
    const response = await this.api.get('/cart/');
    return response.data as Cart;
  }

  async addToCart(productId: number, quantity: number = 1): Promise<void> {
    await this.api.post('/cart/add/', {
      product_id: productId,
      quantity,
    });
  }

  async updateCartItem(itemId: number, quantity: number): Promise<void> {
    await this.api.put(`/cart/update/${itemId}/`, { quantity });
  }

  async removeFromCart(itemId: number): Promise<void> {
    await this.api.delete(`/cart/remove/${itemId}/`);
  }

  async clearCart(): Promise<void> {
    await this.api.delete('/cart/clear/');
  }

  // Order endpoints
  async getOrders(): Promise<Order[]> {
    const response = await this.api.get('/orders/');
    const data = response.data as any;
    return data.results || data;
  }

  async createOrder(data: OrderData): Promise<Order> {
    const response = await this.api.post('/orders/create/', data);
    return response.data as Order;
  }

  async getOrder(id: number): Promise<Order> {
    const response = await this.api.get(`/orders/${id}/`);
    return response.data as Order;
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
}

const apiService = new ApiService();
export default apiService;