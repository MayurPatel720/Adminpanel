import axios from "axios";
import { getLocalStorage, setLocalStorage } from "./localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const apiClient = axios.create({
  baseURL: "http://192.168.0.104:3000/",
  // baseURL: "http://192.168.5.70:3001/",
  // baseURL: "http://103.26.48.209:3001/",
  // baseURL: "http://192.168.137.1:3000/",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getLocalStorage(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    try {
      const isGenerateRefreshTokenUrl = error.request.responseURL.includes(
        "getAccessAndRefreshToken"
      );
      // if generate refreshtoken api send 401 then redirect to the login page and clear all the tokens
      if (isGenerateRefreshTokenUrl && error.response.status === 401) {
        window.location.href = "/login";
        localStorage.clear();
        return Promise.reject(error);
      }
      if (error.response.status === 401) {
        const originalRequest = error.config;
        const authorization = error.config.headers.Authorization;
        const token = getLocalStorage(ACCESS_TOKEN);
        const refToken = getLocalStorage(REFRESH_TOKEN);
        if (token?.trim() === "" || refToken?.trim() === "") {
          window.location.href = "/login";
          return Promise.reject(error);
        } else if (authorization.includes(token)) {
          const res = await apiClient.post(
            "api/user/getAccessAndRefreshToken",
            {
              refreshToken: refToken,
            }
          );

          if (res.status === 201) {
            const access = res.data.data.accessToken;
            const refresh = res.data.data.refreshToken;
            setLocalStorage(ACCESS_TOKEN, access);
            setLocalStorage(REFRESH_TOKEN, refresh);
            originalRequest.headers.Authorization = `Bearer ${access}`;
            return apiClient(originalRequest);
          }

          if (res.status === 401) {
            window.location.href = "/login";
            return Promise.reject(error);
          } else {
            return Promise.reject(error);
          }
        } else {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        }
      }
      if (error.response.status < 500) {
        error.message = error.response.data.message;
        return Promise.reject(new Error(error.message));
      }
      return Promise.reject(error);
    } catch (_) {
      return Promise.reject(error);
    }
  }
);

export default apiClient;
