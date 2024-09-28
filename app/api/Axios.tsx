import axios from 'axios';

// Tạo một instance của axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080', // URL gốc của backend
  withCredentials: true, // Cho phép gửi cookie kèm theo
  headers: {
    'Content-Type': 'application/json', // Định dạng JSON
  },
});

// Thêm interceptor để tự động thêm token nếu cần
axiosInstance.interceptors.request.use(
  (config) => {
    // Giả sử token được lưu trong localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;