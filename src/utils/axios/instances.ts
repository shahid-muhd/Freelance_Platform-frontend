import axios from "axios";


export const primaryRequest = axios.create({
  baseURL: "http://localhost:8000/",

  headers: {
    "Content-Type": "application/json",
  },
});

export const unAuthenticatedRequest = axios.create({
  baseURL: "http://localhost:8000",

  headers: {
    "Content-Type": "application/json",
  },
});

primaryRequest.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("access_token");

    if (token) {
      token = JSON.parse(token);
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


primaryRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if the error response has a specific status code
    if (error.response && error.response.status === 401) {
      console.log("error from interceptor");
      if (window.location.pathname!=='/auth/login') {
        
        window.location.replace("/auth/login/");
      }
      console.error("Unauthorized access");
    }

    // Return the error
    return Promise.reject(error);
  }
);
