import { IList, MessageResponse } from "@/shared/types"
import { apiRoot } from "../../app/api"
import { IProfile } from "../Auth/type"
import { AcceptOrder, Comment, CreateStage, DeclineDesign, Design, IHandleOrderReq, ListFilter, Order } from "./type"

export const api = {
    getList: (filter: ListFilter) => apiRoot.get<IList<Order>>(`/orders/`, {
        params: filter.status ? {
            size: 10,
            ...filter
        } : {
            size: 10,
            page: filter.page,
        }
    }),
    getById: (id: string) => apiRoot.get<Order>(`/orders/${id}`),
    delete: (id: string) => apiRoot.delete<MessageResponse>(`/orders/${id}`),
    setTimeMeasure: (id: string, time: string) => apiRoot.post<MessageResponse>(`/measurements/`, { order_id: id, come_date: time }),
    addMeasurement: (id: string, fd: FormData) => apiRoot.patch<MessageResponse>(`/measurements/${id}`, fd),
    handle: (handleReq: IHandleOrderReq) => apiRoot.patch<MessageResponse>(`/orders/${handleReq.id}/decline`, { reason_of_deny: handleReq.reason_of_deny }),
    getUsers: (type: string) => apiRoot.get<IProfile[]>(`/users/`, {
        params: {
            type,
            per_page: 500
        }
    }),
    appoint: (req: AcceptOrder, orderId: number) => apiRoot.patch<MessageResponse>(`/orders/${orderId}/accept`, req),
    setTimeDesign: (order_id: string, deadline_date: string) => apiRoot.post(`/designs/`, { order_id, deadline_date }),
    setDesign: (req: Design, designId: number) => apiRoot.patch<MessageResponse>(`/designs/${designId}/upload_file`, req),
    declineDesign: (handleReq: DeclineDesign) => apiRoot.patch<MessageResponse>(`/designs/${handleReq.design_id}/decline`, { cancel_reason: handleReq.cancel_reason }),
    acceptDesign: (handleReq: DeclineDesign) => apiRoot.patch<MessageResponse>(`/designs/${handleReq.design_id}/accept`),
    attachPrework: (order_id: number, req: FormData) => apiRoot.post(`/preworks/${order_id}`, req),
    reAttachPrework: (order_id: number, req: FormData) => apiRoot.patch(`/preworks/${order_id}`, req),
    handlePrework: (order_id: number, type: "decline" | "accept") => apiRoot.patch(`/preworks/${type}/${order_id}`),
    getComments: (order_id: number) => apiRoot.get<Comment>(`/preworks/comment/${order_id}`),
    addComment: (order_id: number, text: string) => apiRoot.post(`/preworks/comment/${order_id}`, { text }),
    uploadContract: (order_id: number, req: FormData) => apiRoot.patch(`/orders/${order_id}/upload_doc_file`, req),
    createCheck: (order_id: number, req: FormData) => apiRoot.post(`/orders/${order_id}/check`, req),
    approveCheck: (order_id: number) => apiRoot.patch(`/orders/check/${order_id}/approve`),
    declineCheck: (order_id: number) => apiRoot.patch(`/orders/check/${order_id}/decline`),
    createStages: (order_id: number, req: CreateStage) => apiRoot.post(`/stages/stages/${order_id}`, req),

    uploadFinishDoc: (order_id: number, req: FormData) => apiRoot.post(`/orders/orders/${order_id}/finish_doc`, req)
}