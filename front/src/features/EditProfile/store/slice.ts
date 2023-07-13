import { createSlice } from "@reduxjs/toolkit"
import { StatusResponse } from "@/shared/enums"
import { editProfile } from "./actions"

interface InitialState {
    status: StatusResponse,
}

const initialState: InitialState = {
    status: StatusResponse.INITIAL
}

export const editProfileSlice = createSlice({
    name: "editProfileSlice",
    initialState,
    reducers: {
    },
    extraReducers: {
        [editProfile.fulfilled.type]: (state) => {
            state.status = StatusResponse.SUCCESS
        },
        [editProfile.pending.type]: state => {
            state.status = StatusResponse.LOADING
        },
        [editProfile.rejected.type]: (state) => {
            state.status = StatusResponse.ERROR
        },

    },
})
export default editProfileSlice.reducer;
