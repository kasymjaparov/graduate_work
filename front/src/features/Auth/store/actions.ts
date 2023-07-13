import { toastError, toastInfo } from "@/shared/libs"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { NavigateFunction } from "react-router"
import { api } from "../api"
import { LoginReq, RegistratrationReq } from "../type"

/**Получить информацию о профиле*/
export const getProfileInfo = createAsyncThunk(
    "auth/profileInfo",
    async (_, { rejectWithValue }: any) => {
        try {
            const { data } = await api.getProfile()
            return data
        } catch (e: any) {
            localStorage.clear()
            return rejectWithValue(e.response.data.detail)
        }
    },
)


/**Получить информацию о профиле*/
export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }: any) => {
        try {
            localStorage.removeItem("token")
            await api.logout()
        } catch (e: any) {
            localStorage.clear()
            return rejectWithValue(e.response.data.detail)
        }
    },
)
/**Логинка*/
export const login = createAsyncThunk(
    "auth/login",
    async ({ userData, navigate }: { userData: LoginReq, navigate: NavigateFunction }, { rejectWithValue, dispatch }: any) => {
        try {
            const { data } = await api.login(userData)
            dispatch(getProfileInfo())
            navigate("/")
            localStorage.setItem("token", data.access_token)
            return data.access_token
        } catch (e: any) {
            toastError(e.response.data.detail)
            return rejectWithValue(e.response.data.detail)
        }
    },
)

/**Логинка*/
export const registration = createAsyncThunk(
    "auth/registration",
    async ({ navigate, userData }: { navigate: NavigateFunction, userData: RegistratrationReq }, { rejectWithValue }: any) => {
        try {
            await api.registration(userData)
            navigate("/auth/")
            toastInfo("Аккаунт успешно зарегистрирован")
        } catch (e: any) {
            toastError(e.response.data.detail)
            return rejectWithValue(e.response.data.detail)
        }
    },
)