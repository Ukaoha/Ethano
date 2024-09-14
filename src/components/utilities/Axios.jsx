import axios from 'axios';


export const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error?.response?.status) {
        window.location = "/";
    } else if ("Request failed with status code 500" === error.message || error?.response?.status >= 500) {
      return Promise.reject({
        ...error,
        message: "It's not you, it's us. Try again later.",
      });
    } else {
      return Promise.reject(error);
    }
  }
);
