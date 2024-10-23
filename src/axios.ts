import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
})

// Request Interceptor
axiosInstance.interceptors.request.use(config => {
    const authToken = localStorage.getItem("authToken")
    if (authToken) {
        config.headers['Authorization'] = `Token ${authToken}`
    }
    return config
})

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response) {
            // Handle HTTP status codes (e.g., show alert for 404)
            switch (error.response.status) {
                case 404:
                    console.log('Resource not found');
                    break;
                case 500:
                    console.log('Server error, please try again later');
                    break;
                default:
                    console.log('An unexpected error occurred');
            }
        }
        return Promise.reject(error);
    }
)

export default axiosInstance