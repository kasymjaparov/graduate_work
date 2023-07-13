import { Roles } from "@/shared/enums"

export interface RegistratrationReq {
    email: string
    password: string
    type?: string
}
export type LoginReq = Omit<RegistratrationReq, "role">
export type LoginRes = {
    access_token: string
    refresh_token: string
    email: string
    type: Roles
}
export type IProfile = {
    id: number,
    email: string,
    first_name?: string,
    last_name?: string,
    phone_number?: string,
    type: Roles,
    created_at: string
}
