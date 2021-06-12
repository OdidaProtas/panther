import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AUTH_URL = "https://dreamner.herokuapp.com/";

export const existingToken = async () => {
    try {
        return await AsyncStorage.getItem('@access_token');
    } catch (e) {
        console.log(e)
    }
}


const axiosInstance = axios.create({
    baseURL: AUTH_URL,
    timeout: 10000
});

export default axiosInstance;
