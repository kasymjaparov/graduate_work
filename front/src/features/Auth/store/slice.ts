import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getProfileInfo, login, logout, registration } from "./actions"
import { StatusResponse } from "@/shared/enums"
import { IProfile } from "../type"

interface Login {
    status: StatusResponse
    token: string
    message?: string
}
interface Registration {
    status: StatusResponse
    message?: string
}

interface GetProfile {
    status: StatusResponse
    user: IProfile
    message?: string
}
interface InitialState {
    login: Login
    getProfile: GetProfile
    registration: Registration
    logout: Registration
}

const initialState: InitialState = {
    login: {
        status: StatusResponse.INITIAL,
        token: "",
        message: "",
    },
    registration: {
        status: StatusResponse.INITIAL,
        message: "",
    },
    getProfile: {
        status: StatusResponse.INITIAL,
        user: {} as IProfile,
        message: "",
    },
    logout: {
        status: StatusResponse.INITIAL,
        message: "",
    },
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: {
        // login
        [login.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.login.status = StatusResponse.SUCCESS
            state.login.token = action.payload
        },
        [login.pending.type]: state => {
            state.login.status = StatusResponse.LOADING
        },
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.login.status = StatusResponse.ERROR
            state.login.message = action.payload
        },
        // registration
        [registration.fulfilled.type]: (state) => {
            state.registration.status = StatusResponse.SUCCESS
        },
        [registration.pending.type]: state => {
            state.registration.status = StatusResponse.LOADING
        },
        [registration.rejected.type]: (state, action: PayloadAction<string>) => {
            state.registration.status = StatusResponse.ERROR
            state.registration.message = action.payload
        },

        // get profile info
        [getProfileInfo.fulfilled.type]: (state, action: PayloadAction<IProfile>) => {
            state.getProfile.status = StatusResponse.SUCCESS
            state.getProfile.user = action.payload
            state.getProfile.user.type = action.payload.type

        },
        [getProfileInfo.pending.type]: state => {
            state.getProfile.status = StatusResponse.LOADING
        },
        [getProfileInfo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.getProfile.status = StatusResponse.ERROR
            state.getProfile.message = action.payload
        },
        // logout
        [logout.fulfilled.type]: (state) => {
            state.logout.status = StatusResponse.SUCCESS

        },
        [logout.pending.type]: state => {
            state.logout.status = StatusResponse.LOADING
        },
        [logout.rejected.type]: (state) => {
            state.logout.status = StatusResponse.ERROR
        },
    },
})
export default authSlice.reducer;
