import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "@/features/Auth/api"
import { RegistratrationReq } from "@/features/Auth/type"
import { toastError, toastSuccess } from "@/shared/libs"

export const createEmployeer = createAsyncThunk(
    "auth/createEmployeer",
    async (userData: RegistratrationReq, { rejectWithValue }: any) => {
        try {
            await api.registration(userData)
            toastSuccess("Вы создали сотрудника")
        } catch (e: any) {
            toastError(e.response.data.message)
            return rejectWithValue(e.response.data.message)
        }
    },
)
