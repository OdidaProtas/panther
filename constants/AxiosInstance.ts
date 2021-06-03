import axios from "axios";

const AUTH_URL = "https://dreamner.herokuapp.com/";


const axiosInstance = axios.create({
    baseURL: AUTH_URL,
    timeout: 10000,
});

export default axiosInstance;
