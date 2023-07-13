import { useNavigate } from 'react-router';
import { StatusResponse } from '@/shared/enums';
import { useAppDispatch, useAppSelector } from '@/app/store'
import { getProfileInfo } from '@/features/Auth/store/actions'
import { selectUserProfile } from '@/features/Auth/store/selectors'
import * as yup from "yup"
import { editProfile } from '../../store/actions'
import { selectEditProfile } from '../../store/selectors'
import { EditProfileReq } from '../../type'

const useEditProfile = () => {
    const { user } = useAppSelector(selectUserProfile)
    const isLoading = useAppSelector(selectEditProfile) === StatusResponse.LOADING
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const validationSchema = yup.object().shape({
        first_name: yup.string().required("Обязательное поле"),
        last_name: yup.string().required("Обязательное поле"),
        phone_number: yup.string().required("Обязательное поле").matches(/^\+996(\d{9})$/, 'Заполните по форме +996xxxxxx '),

    })
    const initialValues: EditProfileReq = {
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "+996",
    }
    const onSubmit = (userData: EditProfileReq) => {
        dispatch(editProfile({ userData, navigate })).then(() => {
            dispatch(getProfileInfo())
        })
    }

    return { validationSchema, initialValues, onSubmit, isLoading }
}

export default useEditProfile