import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
    withCredentials: true
});

// Get the CSRF token from the cookie
const getCsrfToken = () => {
    const match = document.cookie.split('; ')
        .find(row => row.startsWith('csrftoken='))
        ?.split('=')[1];
    return match ? decodeURIComponent(match) : null;
};

// Request Interceptor
axiosInstance.interceptors.request.use((config: any) => {
    const csrfToken = getCsrfToken();
    const authToken = localStorage.getItem("authToken");

    // Set the Authorization header if authToken is present
    if (authToken) {
        config.headers['Authorization'] = `Token ${authToken}`;
    }

    // Set the CSRF token header if present
    if (csrfToken) {
        config.headers['X-CSRFToken'] = csrfToken;
    }

    return config;
}, (error: any) => {
    return Promise.reject(error);
});

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response: any) => {
        return response
    },
    (error: any) => {
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