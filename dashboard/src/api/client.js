import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000';

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
      if (response.data.error !== undefined) {
        toastr.error(response.data.error)
      }
    }
    if (token) {
      // saveToken(token)
    }
    return response;
  },
);

export default client;