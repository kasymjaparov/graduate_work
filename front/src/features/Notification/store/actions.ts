import { toastError } from "@/shared/libs"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api"

export const getNotifications = createAsyncThunk(
    "dashboard/getNotifications",
    async () => {
        try {
            const { data } = await api.getNotifications()
            return data
        } catch (e: any) {
            toastError(e.response.data.message)
            return ""
        }
    },
)

export const watchedNotification = createAsyncThunk(
    "dashboard/watchNotifications",
    async (id: string, { dispatch }: any) => {
        try {
            const { data } = await api.watched(id)
            dispatch(getNotifications())
            return data
        } catch (e: any) {
            toastError(e.response.data.detail)
            dispatch(getNotifications())
            return ""
        }
    },
)