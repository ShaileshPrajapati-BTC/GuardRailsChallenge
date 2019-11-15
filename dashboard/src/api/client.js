import axios from 'axios';
import { toast } from 'react-toastify'

const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

const client = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// For get request ues the client.get(url,{ params: { actions: 'd } })

client.interceptors.request.use(
  config => {
    const token = ''; // getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// For POST request ues the client.post(url,{ params: { actions: 'd } })

client.interceptors.response.use(
  response => {
    const token = response.headers && response.headers.authorization;
    if (response.status === 200) {
      if (!response.data.success) {
        toast.error('Something went wrong. Please try again later.');
      }
    }
    if (token) {
      // saveToken(token)
    }
    return response;
  },
);

export default client;