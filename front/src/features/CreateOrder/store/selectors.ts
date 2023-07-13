import { RootState } from "@/app/store";

export const selectCreateOrderStatus = (state: RootState) => state.createOrder.status;
