import { toastError } from './../shared/libs/utils/toastify';
import { getProfileInfo } from '@/features/Auth/store/actions';
import axios from "axios"
import { store } from "./store"
export const apiRoot = axios.create({
    baseURL: "https://vkr-adilet.com.kg/api",
    withCredentials: true
})

apiRoot.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    if (error.response.code === "ERR_NETWORK" && !error.response.status) {
        toastError("Проблемы с интернетом.Пожалуйста проверьте свое соединение.")
    }
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const { data } = await axios.get(`https://vkr-adilet.com.kg/api/auth/refresh`, { withCredentials: true })
            localStorage.setItem('token', data.access_token)
            store.dispatch(getProfileInfo())
            return apiRoot.request(originalRequest);
        } catch (e) {
            localStorage.clear()
            if (document.location.pathname === "/auth" || document.location.pathname === "/auth/registration") {
                console.log("no refresh but in auth page")
            }
            else {
                document.location.href = "/auth"
            }
        }
    }
    throw error;
})