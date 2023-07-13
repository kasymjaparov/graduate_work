import { toastError, toastSuccess } from "@/shared/libs"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api"
import { CreateOrderReq } from "../type"

export const createOrder = createAsyncThunk(
    "create_order/create",
    async (userData: CreateOrderReq, { rejectWithValue }: any) => {
        try {
            await api.create(userData)
            toastSuccess("Вы успешно подали заявку")
        } catch (e: any) {
            if (e.response.data.detail === "You have more than 3 new orders") {
                toastError("У вас более 3 необработанных заказов")
            }
            else {
                toastError(e.response.data.detail)
            }
            return rejectWithValue(e.response.data.message)
        }
    },
)

