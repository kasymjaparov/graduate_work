import { apiRoot } from "../../app/api"
import { IProfile, LoginReq, LoginRes, RegistratrationReq } from "./type"

export const api = {
    login: (data: LoginReq) => apiRoot.post<LoginRes>(`/auth/login`, data),
    getProfile: () => apiRoot.get<IProfile>(`/users/me`),
    registration: (data: RegistratrationReq) => apiRoot.post(`/auth/register`, data),
    logout: () => apiRoot.get(`/auth/logout`),

}