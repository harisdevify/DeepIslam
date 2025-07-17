import axios from 'axios';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: 'https://api.quranhub.com/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
