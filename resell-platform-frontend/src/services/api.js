// API Service for CampusCycle
// Currently using mock implementations - replace with real Cloudflare Worker calls later
//
// SECURITY IMPROVEMENT: Prepared for HttpOnly cookies instead of localStorage
// - No localStorage token storage (vulnerable to XSS)
// - HttpOnly cookies will be set by server automatically
// - Cookies are immune to XSS attacks
// - No manual Authorization headers needed (sent automatically)

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://your-worker.your-subdomain.workers.dev/api';

// Mock delay to simulate network requests
const MOCK_DELAY = parseInt(import.meta.env.VITE_MOCK_DELAY) || 1000;

class ApiService {
  constructor() {
    this.baseURL = API_BASE;
  }

  // Mock helper function
  async mockRequest(response, shouldFail = false) {
    await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

    if (shouldFail) {
      throw new Error('Mock API Error: Request failed');
    }

    return response;
  }

  // ===== AUTH ENDPOINTS =====

  /**
   * Login user
   * @param {Object} credentials - { identifier: string, password: string }
   * @returns {Promise<Object>} - { token: string, user: Object }
   */
  async login(credentials) {
    console.log('🔶 MOCK API CALL: login', credentials);

    // Mock validation
    if (credentials.identifier === import.meta.env.VITE_TEST_EMAIL && credentials.password === import.meta.env.VITE_TEST_PASSWORD) {
      return this.mockRequest({
        token: 'mock-jwt-token-12345',
        user: {
          id: 1,
          fullName: 'Test Student',
          email: import.meta.env.VITE_TEST_EMAIL,
          collegeName: 'Test College'
        }
      });
    }

    // Mock failure for demo
    return this.mockRequest(
      { message: 'Invalid credentials' },
      true
    );
  }

  /**
   * Register new user
   * @param {Object} userData - Complete signup form data
   * @returns {Promise<Object>} - { token: string, user: Object }
   */
  async signup(userData) {
    console.log('🔶 MOCK API CALL: signup', userData);

    // Mock successful registration
    return this.mockRequest({
      token: 'mock-jwt-token-67890',
      user: {
        id: Date.now(), // Mock ID
        fullName: userData.fullName,
        email: userData.email,
        collegeName: userData.collegeName,
        phone: userData.phone,
        department: userData.department,
        year: userData.year
      }
    });
  }

  /**
   * Logout user (clears HttpOnly cookie on server)
   * @returns {Promise<Object>} - { message: string }
   */
  async logout() {
    console.log('🔶 MOCK API CALL: logout');

    return this.mockRequest({ message: 'Logged out successfully' });
  }

  /**
   * Verify JWT token (will use HttpOnly cookie automatically)
   * @returns {Promise<Object>} - { valid: boolean, user: Object }
   */
  async verifyToken() {
    console.log('🔶 MOCK API CALL: verifyToken (HttpOnly cookie)');

    // Mock token validation - in real implementation, server checks HttpOnly cookie
    return this.mockRequest({
      valid: true,
      user: {
        id: 1,
        fullName: 'Mock User',
        email: 'user@college.edu'
      }
    });
  }

  // ===== USER ENDPOINTS =====

  /**
   * Get user profile
   * @returns {Promise<Object>} - User profile data
   */
  async getUserProfile() {
    console.log('🔶 MOCK API CALL: getUserProfile');

    return this.mockRequest({
      id: 1,
      fullName: 'John Doe',
      email: 'john.doe@college.edu',
      collegeName: 'State University',
      phone: '+91 9876543210',
      department: 'Computer Science',
      year: '3rd Year',
      semester: '6th Semester',
      residence: 'Hostel',
      budget: '₹5000-10000',
      interests: ['Tech', 'Books']
    });
  }

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} - Updated user data
   */
  async updateUserProfile(profileData) {
    console.log('🔶 MOCK API CALL: updateUserProfile', profileData);

    return this.mockRequest({
      ...profileData,
      updatedAt: new Date().toISOString()
    });
  }

  // ===== PRODUCT ENDPOINTS =====

  /**
   * Get products with filters
   * @param {Object} filters - { category, priceRange, condition, search, etc. }
   * @returns {Promise<Array>} - Array of products
   */
  async getProducts(filters = {}) {
    console.log('🔶 MOCK API CALL: getProducts', filters);

    const mockProducts = [
      {
        id: 1,
        title: 'Calculus Textbook',
        description: 'Slightly used calculus book for engineering students',
        price: 800,
        category: 'Books',
        condition: 'Good',
        images: ['/mock-image-1.jpg'],
        seller: {
          id: 1,
          name: 'Alice Johnson',
          rating: 4.5
        },
        createdAt: '2024-01-15T10:00:00Z'
      },
      {
        id: 2,
        title: 'MacBook Pro 2019',
        description: '16GB RAM, 512GB SSD, perfect for coding',
        price: 85000,
        category: 'Electronics',
        condition: 'Excellent',
        images: ['/mock-image-2.jpg'],
        seller: {
          id: 2,
          name: 'Bob Smith',
          rating: 4.8
        },
        createdAt: '2024-01-20T14:30:00Z'
      }
    ];

    return this.mockRequest(mockProducts);
  }

  /**
   * Create new product listing
   * @param {Object} productData - Product data with images
   * @returns {Promise<Object>} - Created product
   */
  async createProduct(productData) {
    console.log('🔶 MOCK API CALL: createProduct', productData);

    return this.mockRequest({
      id: Date.now(),
      ...productData,
      status: 'active',
      createdAt: new Date().toISOString()
    });
  }

  /**
   * Upload product image to R2
   * @param {File} file - Image file
   * @returns {Promise<Object>} - { url: string }
   */
  async uploadProductImage(file) {
    console.log('🔶 MOCK API CALL: uploadProductImage', file.name);

    // Mock R2 upload response
    return this.mockRequest({
      url: `${import.meta.env.VITE_MOCK_R2_BUCKET || 'https://mock-r2-bucket.com'}/images/${Date.now()}-${file.name}`,
      key: `${Date.now()}-${file.name}`
    });
  }

  // ===== FUTURE CLOUDFLARE WORKER INTEGRATION =====
  /*
  // Real implementation for Cloudflare Workers + D1 + R2:

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      // HttpOnly cookies will be sent automatically by browser
      // No need to manually add Authorization header
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  }

  // D1 Database queries would be handled in Worker
  // R2 uploads would use Cloudflare's R2 API
  // JWT validation would happen in Worker middleware using HttpOnly cookies
  */
}

export default new ApiService();