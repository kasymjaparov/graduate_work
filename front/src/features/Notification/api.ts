import { MessageResponse } from "@/shared/types"
import { apiRoot } from "../../app/api"
import { NotificationRes } from "./type"

export const api = {
    getNotifications: () => apiRoot.get<NotificationRes[]>(`/notifications/`),
    watched: (id: string) => apiRoot.patch<MessageResponse>(`/notifications/${id}`),
}