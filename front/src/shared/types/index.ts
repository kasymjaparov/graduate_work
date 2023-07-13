
import { AxiosRequestHeaders } from "axios"
import { SvgIconTypeMap } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { Roles, StatusResponse } from "../enums"
export interface IGetById<T> {
    data: T,
    message?: string,
    status: StatusResponse
}
export interface IEdit {
    message?: string,
    status: StatusResponse
}

export interface ICommonForm {
    labelName: string
    name: string
    onChange: any
    onBlur: (e: React.FocusEvent<any>) => void
    error?: boolean
    errorMessage?: string
    value?: string | number
    placeholder?: string
}

export interface IHeaders { headers: AxiosRequestHeaders }
export interface IRoute {
    path: string
    element: JSX.Element
    children?: IRoute[]
}
export interface IAppBarLink {
    text: string;
    href: string;
    roles: Roles[];
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    }
}
export interface MessageResponse {
    message: string
}

export interface IList<T> {
    items: T[],
    message?: string,
    total: number,
    size: number,
    page: number
    pages: number
    status: StatusResponse
}
export type Status = "init" | "success" | "error" | "loading"