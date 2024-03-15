import { primaryRequest } from "./instances";

primaryRequest.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("access_token");
    console.log(token);
    
    if (token) {
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

      window.location.replace("/auth/login/");
      console.error("Unauthorized access");
    }

    // Return the error
    return Promise.reject(error);
  }
);
