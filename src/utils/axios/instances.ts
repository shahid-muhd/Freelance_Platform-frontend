import axios from "axios";
import { jwtDecode } from "jwt-decode";

class UserNotAllowedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

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
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      if (window.location.pathname !== "/auth/login") {
        window.location.replace("/auth/login/");
      }
      console.error("Unauthorized access");
    }

    if (error.response && error.response.status === 402) {
      if (window.location.pathname == "/projects/create")
      window.location.replace("/payments/subscriptions/plans");
    }

    // Return the error
    return Promise.reject(error);
  }
);

unAuthenticatedRequest.interceptors.response.use(
  (response) => {

    if (response.data.access) {
      const decoded_token: any = jwtDecode(response.data.access);
      if (decoded_token.is_blocked == true) {
        throw new UserNotAllowedError(
          "Your account is blocked. Please contact support."
        );
      }
    }
    return response
    
  },

  (error) => {
    // Return the error

    return Promise.reject(error);
  }
);
