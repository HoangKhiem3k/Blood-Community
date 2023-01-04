import axios from "axios";
import { DOMAIN_BACKEND } from "../config/settingSystem";

const instance = axios.create({
    baseURL: `${DOMAIN_BACKEND}/api/`,
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance