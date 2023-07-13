import { useAppDispatch } from '@/app/store'
import { RegistratrationReq } from '@/features/Auth/type'
import * as yup from "yup"
import { createEmployeer } from '../../store/actions'

const useCreateEmployeer = () => {
    const dispatch = useAppDispatch()
    const validationSchema = yup.object().shape({
        email: yup.string().email("Формат почты неверен").required("Обязательное поле"),
        password: yup.string().required("Обязательное поле"),
    })
    const initialValues: RegistratrationReq = {
        email: "",
        password: "",
        type: ""
    }
    const onSubmit = (editData: RegistratrationReq, { resetForm }: any) => {
        dispatch(createEmployeer(editData)).then(() => {
            resetForm({
                email: "",
                password: "",
                type: "0"
            })
        })
    }

    return { validationSchema, initialValues, onSubmit }
}

export default useCreateEmployeer