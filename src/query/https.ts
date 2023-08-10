import axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';
import Swal from 'sweetalert2';

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { access_token } = JSON.parse(localStorage.getItem('auth_token') || '{}');
  if (access_token && config.headers) {
    config.headers.Authorization= 'Bearer ' + access_token;
  }
  return config;
};

const errorInterceptor = (error: AxiosError<{ errors: string }>): Promise<string> => {
  if (error.response) {
    const statusCode = error.response.status;
    switch (statusCode) {
      case 422:
        // handle validation errors
        Swal.fire({
          title: 'Error !',
          text: error?.response?.data?.errors,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        break;
      case 401:
        localStorage.clear()
        location.assign('/#/auth/login')
        break;
      default:
        // handle other errors
        break;
    }
  }
  return Promise.reject(error.response && error.response.data);
};

const http = axios.create({
  baseURL: import.meta.env.VITE_API_KEY,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

http.interceptors.request.use(authInterceptor);
http.interceptors.response.use((res) => res.data, errorInterceptor);

const httpAuth = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

httpAuth.interceptors.request.use(authInterceptor);
httpAuth.interceptors.response.use((res) => res.data, errorInterceptor);

const httpPos = axios.create({
  baseURL: import.meta.env.VITE_API_POS,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});
httpPos.interceptors.request.use(authInterceptor);
httpPos.interceptors.response.use((res) => res.data, errorInterceptor);

const httpHr = axios.create({
  baseURL: import.meta.env.VITE_API_HR,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 30000
});

httpHr.interceptors.request.use(authInterceptor);
httpHr.interceptors.response.use((res) => res.data, errorInterceptor);

export { http, httpAuth, httpHr, httpPos };
