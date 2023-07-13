import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { acceptDesign, addComment, addMeasurement, appoint, attachPrework, declineDesign, deleteOrder, getById, getComments, getMyOrders, getUsers, handleOrder, handlePrework, reAttachPrework, setDesign, setTimeDesign, setTimeMeasure } from "./actions"
import { StatusResponse } from "@/shared/enums"
import { Comment, Order } from "../type"
import { IEdit, IGetById, IList } from "@/shared/types"
import { IProfile } from "@/features/Auth/type"

interface InitialState {
    list: IList<Order>,
    users: {
        builders: {
            data: IProfile[],
            status: StatusResponse
        },
        designers: {
            data: IProfile[],
            status: StatusResponse
        },
        meausers: {
            data: IProfile[],
            status: StatusResponse
        },
    },
    comments: {
        data: Comment[],
        status: StatusResponse
    },
    addComment: IEdit,

    detail: IGetById<Order>,
    delete: IEdit,
    appoint: IEdit,
    handle: IEdit,
    setTimeMeasure: IEdit,
    addMeauser: IEdit,
    setTimeDesign: IEdit,
    setDesign: IEdit,
    declineDesign: IEdit
    acceptDesign: IEdit
    attachPrework: IEdit
    reAttachPrework: IEdit
    handlePrework: IEdit
}
const initialState: InitialState = {
    list: {
        items: [],
        total: 0,
        message: "",
        status: StatusResponse.INITIAL,
        page: 0,
        size: 0,
        pages: 0
    },
    users: {
        builders: {
            data: [] as IProfile[],
            status: StatusResponse.INITIAL,
        },
        designers: {
            data: [] as IProfile[],
            status: StatusResponse.INITIAL,
        },
        meausers: {
            data: [] as IProfile[],
            status: StatusResponse.INITIAL,
        },
    },
    comments: {
        data: [] as Comment[],
        status: StatusResponse.INITIAL,
    },
    addComment: {
        status: StatusResponse.INITIAL
    },
    detail: {
        data: {} as Order,
        status: StatusResponse.INITIAL
    },
    delete: {
        status: StatusResponse.INITIAL
    },
    appoint: {
        status: StatusResponse.INITIAL
    },
    handle: {
        status: StatusResponse.INITIAL
    },
    setTimeMeasure: {
        status: StatusResponse.INITIAL
    },
    addMeauser: {
        status: StatusResponse.INITIAL
    },
    setTimeDesign: {
        status: StatusResponse.INITIAL
    },
    setDesign: {
        status: StatusResponse.INITIAL
    },
    declineDesign: {
        status: StatusResponse.INITIAL
    },
    acceptDesign: {
        status: StatusResponse.INITIAL
    },
    attachPrework: {
        status: StatusResponse.INITIAL
    },
    reAttachPrework: {
        status: StatusResponse.INITIAL
    },
    handlePrework: {
        status: StatusResponse.INITIAL
    },
}

export const getMyOrdersSlice = createSlice({
    name: "getMyOrders",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getMyOrders.fulfilled.type]: (state, action: PayloadAction<IList<Order>>) => {
            state.list = action.payload
            state.list.status = StatusResponse.SUCCESS
        },
        [getMyOrders.pending.type]: state => {
            state.list.status = StatusResponse.LOADING
        },
        [getMyOrders.rejected.type]: (state) => {
            state.list.status = StatusResponse.ERROR
        },
        [getUsers.fulfilled.type]: (state, action: PayloadAction<{ designers: IProfile[], meausers: IProfile[], builders: IProfile[], }>) => {
            state.users.builders.data = action.payload.builders
            state.users.builders.status = StatusResponse.SUCCESS
            //
            state.users.designers.data = action.payload.designers
            state.users.designers.status = StatusResponse.SUCCESS
            //
            state.users.meausers.data = action.payload.meausers
            state.users.meausers.status = StatusResponse.SUCCESS

        },
        [getUsers.pending.type]: state => {
            state.users.designers.status = StatusResponse.LOADING
            state.users.meausers.status = StatusResponse.LOADING
            state.users.builders.status = StatusResponse.LOADING
        },
        [getUsers.rejected.type]: (state) => {
            state.users.designers.status = StatusResponse.ERROR
            state.users.meausers.status = StatusResponse.ERROR
            state.users.builders.status = StatusResponse.ERROR
        },
        [getById.fulfilled.type]: (state, action: PayloadAction<Order>) => {
            state.detail.status = StatusResponse.SUCCESS
            state.detail.data = action.payload
        },
        [getById.pending.type]: state => {
            state.detail.status = StatusResponse.LOADING
        },
        [getById.rejected.type]: (state) => {
            state.detail.status = StatusResponse.ERROR
        },
        [deleteOrder.fulfilled.type]: (state) => {
            state.delete.status = StatusResponse.SUCCESS
        },
        [deleteOrder.pending.type]: state => {
            state.delete.status = StatusResponse.LOADING
        },
        [deleteOrder.rejected.type]: (state) => {
            state.delete.status = StatusResponse.ERROR
        },
        [appoint.fulfilled.type]: (state) => {
            state.appoint.status = StatusResponse.SUCCESS
        },
        [appoint.pending.type]: state => {
            state.appoint.status = StatusResponse.LOADING
        },
        [appoint.rejected.type]: (state) => {
            state.appoint.status = StatusResponse.ERROR
        },
        [handleOrder.fulfilled.type]: (state) => {
            state.handle.status = StatusResponse.SUCCESS
        },
        [handleOrder.pending.type]: state => {
            state.handle.status = StatusResponse.LOADING
        },
        [handleOrder.rejected.type]: (state) => {
            state.handle.status = StatusResponse.ERROR
        },
        [setTimeMeasure.fulfilled.type]: (state) => {
            state.setTimeMeasure.status = StatusResponse.SUCCESS
        },
        [setTimeMeasure.pending.type]: state => {
            state.setTimeMeasure.status = StatusResponse.LOADING
        },
        [setTimeMeasure.rejected.type]: (state) => {
            state.setTimeMeasure.status = StatusResponse.ERROR
        },
        [addMeasurement.fulfilled.type]: (state) => {
            state.addMeauser.status = StatusResponse.SUCCESS
        },
        [addMeasurement.pending.type]: state => {
            state.addMeauser.status = StatusResponse.LOADING
        },
        [addMeasurement.rejected.type]: (state) => {
            state.addMeauser.status = StatusResponse.ERROR
        },
        [setTimeDesign.fulfilled.type]: (state) => {
            state.setTimeDesign.status = StatusResponse.SUCCESS
        },
        [setTimeDesign.pending.type]: state => {
            state.setTimeDesign.status = StatusResponse.LOADING
        },
        [setTimeDesign.rejected.type]: (state) => {
            state.setTimeDesign.status = StatusResponse.ERROR
        },
        [setDesign.fulfilled.type]: (state) => {
            state.setDesign.status = StatusResponse.SUCCESS
        },
        [setDesign.pending.type]: state => {
            state.setDesign.status = StatusResponse.LOADING
        },
        [setDesign.rejected.type]: (state) => {
            state.setDesign.status = StatusResponse.ERROR
        },
        [declineDesign.fulfilled.type]: (state) => {
            state.declineDesign.status = StatusResponse.SUCCESS
        },
        [declineDesign.pending.type]: state => {
            state.declineDesign.status = StatusResponse.LOADING
        },
        [declineDesign.rejected.type]: (state) => {
            state.declineDesign.status = StatusResponse.ERROR
        },
        [acceptDesign.fulfilled.type]: (state) => {
            state.acceptDesign.status = StatusResponse.SUCCESS
        },
        [acceptDesign.pending.type]: state => {
            state.acceptDesign.status = StatusResponse.LOADING
        },
        [acceptDesign.rejected.type]: (state) => {
            state.acceptDesign.status = StatusResponse.ERROR
        },
        [attachPrework.fulfilled.type]: (state) => {
            state.attachPrework.status = StatusResponse.SUCCESS
        },
        [attachPrework.pending.type]: state => {
            state.attachPrework.status = StatusResponse.LOADING
        },
        [attachPrework.rejected.type]: (state) => {
            state.attachPrework.status = StatusResponse.ERROR
        },
        [reAttachPrework.fulfilled.type]: (state) => {
            state.reAttachPrework.status = StatusResponse.SUCCESS
        },
        [reAttachPrework.pending.type]: state => {
            state.reAttachPrework.status = StatusResponse.LOADING
        },
        [reAttachPrework.rejected.type]: (state) => {
            state.reAttachPrework.status = StatusResponse.ERROR
        },
        [handlePrework.fulfilled.type]: (state) => {
            state.handlePrework.status = StatusResponse.SUCCESS
        },
        [handlePrework.pending.type]: state => {
            state.handlePrework.status = StatusResponse.LOADING
        },
        [handlePrework.rejected.type]: (state) => {
            state.handlePrework.status = StatusResponse.ERROR
        },
        [addComment.fulfilled.type]: (state) => {
            state.addComment.status = StatusResponse.SUCCESS
        },
        [addComment.pending.type]: state => {
            state.addComment.status = StatusResponse.LOADING
        },
        [addComment.rejected.type]: (state) => {
            state.addComment.status = StatusResponse.ERROR
        },
        [getComments.fulfilled.type]: (state, action: PayloadAction<Comment[]>) => {
            state.comments.status = StatusResponse.SUCCESS
            state.comments.data = action.payload
        },
        [getComments.pending.type]: state => {
            state.comments.status = StatusResponse.LOADING
        },
        [getComments.rejected.type]: (state) => {
            state.comments.status = StatusResponse.ERROR
        }
    },
})
export default getMyOrdersSlice.reducer;