import { MessageResponse } from "@/shared/types"
import { apiRoot } from "../../app/api"
import { CreateOrderReq } from "./type"

export const api = {
    create: (data: CreateOrderReq) => apiRoot.post<MessageResponse>(`/orders/`, data),
}