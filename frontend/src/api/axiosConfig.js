import axios from 'axios';
import config from "../config";

const instance = axios.create({
  baseURL: config.SERVER_API_URL,
});

instance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token ? token : ''}`;
  config.headers.ContentType = 'application/json';
  return config;
});

instance.interceptors.response.use((response) => {
  if (response.status === 401) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.reload()
  }
  return response;
}, (error) => {
  if (error.response.status === 401) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.location.reload()
  }
  return Promise.reject(error);
});

export default instance;