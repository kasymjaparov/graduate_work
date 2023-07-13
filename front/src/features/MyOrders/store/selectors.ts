import { RootState } from "@/app/store"

export const selectMyOrders = (state: RootState) => state.myOrders.list
export const selectOrder = (state: RootState) => state.myOrders.detail
export const selectAddMeauserStatus = (state: RootState) => state.myOrders.addMeauser.status
export const selectSetMeauserTimeStatus = (state: RootState) => state.myOrders.setTimeMeasure.status
export const selectUsers = (state: RootState) => state.myOrders.users
export const selectDeleteOrderStatus = (state: RootState) => state.myOrders.delete.status
export const selectAppointStatus = (state: RootState) => state.myOrders.appoint.status
export const selectSetDesignTimeStatus = (state: RootState) => state.myOrders.setTimeDesign.status
export const selectSetDesignStatus = (state: RootState) => state.myOrders.setDesign.status
export const selectDeclineDesignStatus = (state: RootState) => state.myOrders.declineDesign.status
export const selectAcceptDesignStatus = (state: RootState) => state.myOrders.acceptDesign.status
export const selectAttachPreworkStatus = (state: RootState) => state.myOrders.attachPrework.status
export const selectReAttachPreworkStatus = (state: RootState) => state.myOrders.reAttachPrework.status
export const selectHandlePreworkStatus = (state: RootState) => state.myOrders.handlePrework.status
export const selectAddCommentStatus = (state: RootState) => state.myOrders.addComment.status
export const selectCommentsStatus = (state: RootState) => state.myOrders.comments.status
export const selectCommentsList = (state: RootState) => state.myOrders.comments.data















