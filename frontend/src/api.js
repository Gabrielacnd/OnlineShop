import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/product';

export const productAPI = {
  // Get all products with optional filters
  getAllProducts: async (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    
    const response = await axios.get(`${API_BASE_URL}?${params.toString()}`);
    return response.data;
  },

  // Create a new product
  createProduct: async (product) => {
    const response = await axios.post(API_BASE_URL, product);
    return response.data;
  },

  // Update a product by ID
  updateProduct: async (id, product) => {
    const response = await axios.patch(`${API_BASE_URL}/${id}`, product);
    return response.data;
  },

  // Delete a product by ID
  deleteProduct: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  }
};

