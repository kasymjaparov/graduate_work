import { NavigateFunction } from 'react-router';
import { toastError, toastSuccess } from "@/shared/libs"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api"
import { EditProfileReq } from "../type"

export const editProfile = createAsyncThunk(
    "auth/edit_account",
    async ({ userData, navigate }: { userData: EditProfileReq, navigate: NavigateFunction }, { rejectWithValue }: any) => {
        try {
            await api.editProfile(userData)
            navigate(-1)
            toastSuccess("Вы успешно изменили свои данные")
        } catch (e: any) {
            toastError("Ошибка при изменении данных")
            return rejectWithValue(e.response.data.message)
        }
    },
)
