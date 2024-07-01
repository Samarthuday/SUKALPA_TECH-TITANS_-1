import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001', // Change to your API base URL
  timeout: 10000, // Timeout after 10 seconds
});

export default axiosInstance;