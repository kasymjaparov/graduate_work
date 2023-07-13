import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { StatusResponse } from "@/shared/enums"
import { getNotifications, watchedNotification } from "./actions"
import { NotificationRes } from "../type"

const initialState = {
    status: StatusResponse.INITIAL,
    list: [] as NotificationRes[],
    watched: StatusResponse.INITIAL
}

export const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
    },
    extraReducers: {
        [getNotifications.fulfilled.type]: (state, action: PayloadAction<NotificationRes[]>) => {
            state.status = StatusResponse.SUCCESS
            state.list = action.payload
        },
        [getNotifications.pending.type]: state => {
            state.status = StatusResponse.LOADING
        },
        [getNotifications.rejected.type]: (state) => {
            state.status = StatusResponse.ERROR
        },
        [watchedNotification.fulfilled.type]: (state) => {
            state.watched = StatusResponse.SUCCESS
        },
        [watchedNotification.pending.type]: state => {
            state.watched = StatusResponse.LOADING
        },
        [watchedNotification.rejected.type]: (state) => {
            state.watched = StatusResponse.ERROR
        },
    },
})
export default notificationSlice.reducer;
