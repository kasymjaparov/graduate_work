import { StatusResponse } from '@/shared/enums';
import { useAppDispatch, useAppSelector } from '@/app/store'
import { selectUserProfile } from '@/features/Auth/store/selectors'
import { useNavigate } from 'react-router'
import * as yup from "yup"
import { createOrder } from '../../store/actions'
import { selectCreateOrderStatus } from '../../store/selectors'
import { CreateOrderReq } from '../../type'

const useCreateOrder = () => {
    const navigate = useNavigate()
    const { user, status } = useAppSelector(selectUserProfile)
    const isGetignProfileLoading = status === StatusResponse.LOADING
    const isLoading = useAppSelector(selectCreateOrderStatus) === StatusResponse.LOADING
    const canCreateOrder = !isGetignProfileLoading && user.first_name && user.last_name
    const dispatch = useAppDispatch()
    const validationSchema = yup.object().shape({
        address: yup.string().required("Обязательное поле"),
        series: yup.string().required("Обязательное поле"),
        room_amount: yup.string().required("Обязательное поле"),
        square: yup.string().required("Обязательное поле"),
        order_room: yup.array().of(
            yup.object().shape({
                name: yup.string().required("Обязательное поле"),
                description: yup.string().required("Обязательное поле"),
                square: yup.string().required("Обязательное поле"),
            })
        ),
    })
    const initialValues: CreateOrderReq = {
        address: '',
        series: '',
        room_amount: '',
        square: '',
        order_room: [{ name: "", description: "", square: "", order_image: [] }]
    }
    const onSubmit = (createData: CreateOrderReq) => {
        dispatch(createOrder(createData)).then(() => {
            navigate("/orders")
        })

    }
    return { validationSchema, initialValues, onSubmit, canCreateOrder, isLoading, isGetignProfileLoading }
}

export default useCreateOrder