import { toastError, toastSuccess } from "@/shared/libs"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { api } from "../api"
import { AcceptOrder, DeclineDesign, Design, IHandleOrderReq, ListFilter } from "../type"

export const getMyOrders = createAsyncThunk(
    "orders/get",
    async (filter: ListFilter, { rejectWithValue }) => {
        try {
            const { data } = await api.getList(filter)
            return data
        } catch (e: any) {
            toastError(e.response.data.message)
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const getById = createAsyncThunk(
    "orders/getById",
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await api.getById(id)
            return data
        } catch (e: any) {
            toastError(e.response.data.message)
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const deleteOrder = createAsyncThunk(
    "orders/delete",
    async (id: string, { rejectWithValue }) => {
        try {
            const { data } = await api.delete(id)
            toastSuccess("Заказ успешно удален")
            return data
        } catch (e: any) {
            toastError("Ошибка при удалении заказа")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const setTimeMeasure = createAsyncThunk(
    "orders/setTimeMeasure",
    async ({ id, time }: { id: string, time: string }, { rejectWithValue }: any) => {
        try {
            await api.setTimeMeasure(id, time)
            toastSuccess("Вы успешно установили время замера")
        } catch (e: any) {
            toastError("Ошибка при установке времени замера")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const setTimeDesign = createAsyncThunk(
    "orders/setTimeDesign",
    async ({ order_id, deadline_date }: { order_id: string, deadline_date: string }, { rejectWithValue }: any) => {
        try {
            await api.setTimeDesign(order_id, deadline_date)
            toastSuccess("Вы успешно установили время предварительной готовности дизайна")
        } catch (e: any) {
            toastError("Ошибка при установке времени предварительной готовности дизайна")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const addMeasurement = createAsyncThunk(
    "orders/addMeasurement",
    async ({ id, fd, orderId }: { id: string, fd: FormData, orderId: number }, { rejectWithValue, dispatch }: any) => {
        try {
            await api.addMeasurement(id, fd)
            dispatch(getById(orderId.toString()))
            toastSuccess("Добавлены данные по замеру")
        } catch (e: any) {
            toastError("Ошибка при добавлении данных по замеру")
            return rejectWithValue(e.response.data.detail)
        }
    },
)
export const handleOrder = createAsyncThunk(
    "orders/handleOrder",
    async (handleOrderReq: IHandleOrderReq, { rejectWithValue }) => {
        try {
            const { data } = await api.handle(handleOrderReq)
            getById(handleOrderReq.id)
            toastSuccess("Успешный отказ в заказе")
            return data
        } catch (e: any) {
            toastError("Ошибка при попытке в отказе заказа")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const getUsers = createAsyncThunk(
    "orders/getUsers",
    async (_, { rejectWithValue }) => {
        try {
            const { data: builders } = await api.getUsers("builder")
            const { data: designers } = await api.getUsers("designer")
            const { data: meausers } = await api.getUsers("meauser")
            return {
                builders, designers, meausers
            }
        } catch (e: any) {
            toastError(e.response.data.message)
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const appoint = createAsyncThunk(
    "orders/appoint",
    async (req: AcceptOrder, { rejectWithValue }: any) => {
        try {
            await api.appoint(req, req.order_id)
            toastSuccess("Вы успешно назначили ответсвенных за проект")
        } catch (e: any) {
            toastError("Ошибка при назначении ответственных")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const setDesign = createAsyncThunk(
    "orders/handleOrder",
    async ({ designId, req, orderId }: { designId: number, req: Design, orderId: number, }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await api.setDesign(req, designId)
            dispatch(getById(orderId.toString()))
            toastSuccess("Успешное прикрепление дизайна")
            return data
        } catch (e: any) {
            toastError("Ошибка при попытке в прикрепления дизайна")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const attachPrework = createAsyncThunk(
    "orders/attachPrework",
    async ({ req, orderId }: { orderId: number, req: FormData, }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await api.attachPrework(orderId, req)
            dispatch(getById(orderId.toString()))
            toastSuccess("Успешное прикрепление акта")
            return data
        } catch (e: any) {
            toastError("Ошибка при попытке в прикрепления акта")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const reAttachPrework = createAsyncThunk(
    "orders/reAttachPrework",
    async ({ req, orderId }: { orderId: number, req: FormData }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await api.reAttachPrework(orderId, req)
            dispatch(getById(orderId.toString()))
            toastSuccess("Успешное прикрепление акта")
            return data
        } catch (e: any) {
            toastError("Ошибка при попытке в прикрепления акта")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const handlePrework = createAsyncThunk(
    "orders/handlePrework",
    async ({ type, orderId }: { orderId: number, type: "decline" | "accept" }, { rejectWithValue, dispatch }) => {
        try {
            const { data } = await api.handlePrework(orderId, type)
            dispatch(getById(orderId.toString()))
            if (type === "accept") {
                toastSuccess("Вы успешно приняли акт с прейскурантом")
            }
            else {
                toastSuccess("Вы успешно отказали в акте с прейскурантом")
            }
            return data
        } catch (e: any) {
            toastError("Ошибка при попытке в обработки акта")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const declineDesign = createAsyncThunk(
    "orders/declineDesign",
    async (handleOrderReq: DeclineDesign, { rejectWithValue }) => {
        try {
            const { data } = await api.declineDesign(handleOrderReq)
            toastSuccess("Успешный отказ")
            return data
        } catch (e: any) {
            toastError("Ошибка при попытке в отказе дизайна")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const acceptDesign = createAsyncThunk(
    "orders/acceptDesign",
    async (handleOrderReq: DeclineDesign, { rejectWithValue }) => {
        try {
            const { data } = await api.acceptDesign(handleOrderReq)
            toastSuccess("Успешное принятие")
            return data
        } catch (e: any) {
            toastError("Ошибка при попытке принятия дизайна")
            return rejectWithValue(e.response.data.message)
        }
    },
)
export const getComments = createAsyncThunk(
    "orders/getComments",
    async (orderId: number, { rejectWithValue }) => {
        try {
            const { data: comments } = await api.getComments(orderId)
            return comments
        } catch (e: any) {
            return rejectWithValue(e.response.data.detail)
        }
    },
)
export const addComment = createAsyncThunk(
    "orders/addComment",
    async ({ orderId, text }: { orderId: number, text: string }, { rejectWithValue, dispatch }) => {
        try {
            const { data: comments } = await api.addComment(orderId, text)
            dispatch(getComments(orderId))
            return comments
        } catch (e: any) {
            toastError(e.response.data.detail ?? "Ошибка при добавлении комментария")
            return rejectWithValue(e.response.data.detail)
        }
    },
)