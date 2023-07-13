export interface NotificationRes {
    id: number,
    title: string,
    description?: string,
    order_id: number
    user_id: number
    watched: boolean
}