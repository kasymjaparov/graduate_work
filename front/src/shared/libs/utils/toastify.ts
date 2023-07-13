import { toast, ToastOptions } from "react-toastify"
const toastConfig: ToastOptions = {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark"
}

export const toastSuccess = (message: string) => {
    toast.success(message, toastConfig)
}
export const toastError = (message: string) => {
    toast.error(message, toastConfig)
}
export const toastInfo = (message: string) => {
    toast.info(message, toastConfig)
}