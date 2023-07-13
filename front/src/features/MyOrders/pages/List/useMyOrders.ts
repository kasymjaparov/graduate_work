import { statuses } from '@/shared/data/statuses'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { selectUserProfile } from '@/features/Auth/store/selectors'
import { StatusResponse } from '@/shared/enums'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getMyOrders } from '../../store/actions'
import { selectMyOrders } from '../../store/selectors'
import { ListFilter } from '../../type'

const useMyOrders = () => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector(selectUserProfile)
    const list = useAppSelector(selectMyOrders)
    const [queryParams, setQueryParams] = useSearchParams()
    const [filter, setFilter] = useState<ListFilter>({ page: queryParams.get("page") || '1', status: queryParams.get("status") || "" })
    const handleChangeFilter = (event: any) => {
        setFilter({ ...filter, page: '1', [event.target.name]: event.target.value })
    }
    const tableHeaders = ["Адрес", "Количество комнат", "Статус", "Дата", "Площадь", "Пользователь", ""]
    const isLoading = list.status === StatusResponse.LOADING
    const isSuccess = list.status === StatusResponse.SUCCESS
    const isError = list.status === StatusResponse.ERROR
    const handleChangePage = (_: React.ChangeEvent<HTMLInputElement>, page: number) => {
        setFilter({ ...filter, page: page.toString() })
    }
    useEffect(() => {
        setQueryParams(filter as unknown as Record<string, string>)
        dispatch(getMyOrders(filter))
    }, [filter])
    return { list, isLoading, isError, isSuccess, tableHeaders, role: user.type, handleChangePage, page: Number(filter.page), handleChangeFilter, filter, statuses }
}

export default useMyOrders