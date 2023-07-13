export interface CreateOrderReq {
    address: string
    series: string
    room_amount: string
    square: string
    order_room: { name: string, description: string, square: string, order_image: any }[]
}