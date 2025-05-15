import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';

// creating axios instance and set base url of products list
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com',
  timeout: 6000,
});

//creating Request interceptor , for now I have just create this letter we can add info to request so that it goes with request header everytime like token
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error: AxiosError) => {
    console.error('[Request Error]', error.message);
    return Promise.reject(error);
  }
);

// creating  Response interceptor , for now it just return response letter we can implement logout or navigation from here based on status code
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(`[Response] ${response.status} ${response.config.url}`);
    return response;
  },
  (error: AxiosError) => {
    console.error('[Response Error]', error.message);
    return Promise.reject(error);
  }
);

// creating wrapper function so that where api call goes just use get ,del,post and no need to write axios.get or axio.post
export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.get<T>(url, config);
  return response.data;
};

export const post = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.post<T>(url, data, config);
  return response.data;
};

export const put = async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.put<T>(url, data, config);
  return response.data;
};

export const del = async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.delete<T>(url, config);
  return response.data;
};
