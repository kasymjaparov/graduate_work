import { toastInfo } from './../../../../shared/libs/utils/toastify';
import { selectUserProfile } from '@/features/Auth/store/selectors'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { selectUserRole } from '@/features/Auth/store/selectors'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { RepairStatus, Roles, StatusResponse } from '@/shared/enums'
import { deleteOrder, getById, handleOrder, setTimeDesign, setTimeMeasure } from '../../store/actions'
import { selectAddMeauserStatus, selectDeleteOrderStatus, selectOrder, selectSetDesignTimeStatus, selectSetMeauserTimeStatus } from '../../store/selectors'
import { compareDates } from '@/shared/libs'

const useDetail = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const [measureDate, setMeasureDate] = useState("")
    const [designDate, setDesignDate] = useState("")
    const [modal, setModal] = useState({
        handle: false,
        deny: false
    })
    let role = useAppSelector(selectUserRole)
    const { data, status } = useAppSelector(selectOrder)
    const { user: me } = useAppSelector(selectUserProfile)
    const isDeleting = useAppSelector(selectDeleteOrderStatus) === StatusResponse.LOADING
    const isLoadingSetTimeDesign =
        useAppSelector(selectSetDesignTimeStatus) === StatusResponse.LOADING
    const isLoadingSetTimeMeauser =
        useAppSelector(selectSetMeauserTimeStatus) === StatusResponse.LOADING
    useAppSelector(selectAddMeauserStatus) === StatusResponse.LOADING
    const isLoading = status === StatusResponse.LOADING
    const isError = status === StatusResponse.ERROR
    const permissions = {
        CAN_DELETE: data.status === RepairStatus.NEW && role === Roles.CLIENT,
        CAN_HANDLE: role === Roles.PM && data.status === RepairStatus.NEW,
        CAN_SET_TIME_MEASURE: role === Roles.MEASURE && data.status === RepairStatus.APPROVED,
        CAN_ATTACH_MEASURE: role === Roles.MEASURE &&
            data.status === RepairStatus.MEASURE_TIME,
        CAN_NOT_SEE: me.type === Roles.CLIENT && me.id !== data.client?.id,
        CAN_SET_TIME_DESIGN: role === Roles.DESIGNER && [RepairStatus.MEASURE_ATTACHED, RepairStatus.DESIGN_TIME, RepairStatus.DESIGN_DENIED].includes(data.status as RepairStatus) && (data.designer.id === me.id && data.design.some((design) => design.is_approved === false) || data.design.length < 1),
        CAN_SET_DESIGN: role === Roles.DESIGNER && data.status === RepairStatus.DESIGN_TIME && data.designer.id === me.id,
        CAN_HANDLE_DESIGN: role === Roles.CLIENT && data.status === RepairStatus.DESIGN_ATTACHED && data.client.id === me.id,
        CAN_WATCH_PREWORK: [RepairStatus.DESIGN_APPROVED, RepairStatus.PREWORK_APPROVED, RepairStatus.PREWORK_ATTACHED, RepairStatus.PREWORK_DENIED,RepairStatus.CONTRACT_ATTACHED,RepairStatus.FINISH_DOC_ATTACHED,RepairStatus.CHECK_APPROVED, RepairStatus.STAGE_REPORT_ATTACHED].includes(data.status as RepairStatus),
        CAN_ATTACH_PREWORK: me.id === data.manager?.id && data.status === RepairStatus.DESIGN_APPROVED && !data.pre_work_doc?.length,
        CAN_REATTACH_PREWORK: me.id === data.manager?.id && data.status === RepairStatus.PREWORK_DENIED,
        CAN_HANDLE_PREWORK: role === Roles.CLIENT && data.status === RepairStatus.PREWORK_ATTACHED && data.client.id === me.id,
        CAN_CREATE_CONTRACT: me.id === data.manager?.id && data.status === RepairStatus.PREWORK_APPROVED && !data.doc_text,
        CAN_CREATE_CHECK: me.id === data.client?.id && [RepairStatus.CONTRACT_ATTACHED, RepairStatus.CHECK_DECLINED, RepairStatus.CHECK_APPROVED,RepairStatus.STAGE_REPORT_ATTACHED].includes(data.status as RepairStatus),
        CAN_WATCH_CHECK: [RepairStatus.CHECK_ATTACHED, RepairStatus.CHECK_DECLINED, RepairStatus.CHECK_APPROVED,RepairStatus.CONTRACT_ATTACHED,RepairStatus.STAGE_REPORT_ATTACHED,RepairStatus.FINISH_DOC_ATTACHED].includes(data.status as RepairStatus),
        CAN_HANDLE_CHECK: role === Roles.PM &&  [RepairStatus.CHECK_ATTACHED,RepairStatus.STAGE_REPORT_ATTACHED].includes(data.status as RepairStatus) && data.manager.id === me.id,
        CAN_CREATE_STAGE: data.builders?.find((builder) => builder.id == me.id) && [RepairStatus.CONTRACT_ATTACHED, RepairStatus.CHECK_APPROVED, RepairStatus.CHECK_ATTACHED, RepairStatus.CHECK_DECLINED,RepairStatus.STAGE_REPORT_ATTACHED].includes(data.status as RepairStatus),
        CAN_WATCH_STAGE: [RepairStatus.CONTRACT_ATTACHED,RepairStatus.STAGE_REPORT_ATTACHED, RepairStatus.CHECK_APPROVED, RepairStatus.CHECK_ATTACHED, RepairStatus.CHECK_DECLINED].includes(data.status as RepairStatus),
        CAN_CREATE_FINISH_DOC: me.id === data.manager?.id && [RepairStatus.CHECK_APPROVED,RepairStatus.STAGE_REPORT_ATTACHED, RepairStatus.CHECK_ATTACHED, RepairStatus.CHECK_DECLINED].includes(data.status as RepairStatus),
        CAN_WATCH_FINISH_DOC: [RepairStatus.CHECK_APPROVED,RepairStatus.STAGE_REPORT_ATTACHED, RepairStatus.CHECK_ATTACHED, RepairStatus.CHECK_DECLINED].includes(data.status as RepairStatus),
    }
    const handleMeasureDate = (value: string) => {
        setMeasureDate(value)
    }
    const handleDesignDate = (value: string) => {
        setDesignDate(value)
    }
    const onDeleteOrder = () => {
        dispatch(deleteOrder(data.id as unknown as string)).then(() => {
            navigate("/orders")
        })
    }
    const onSendMeasureDate = () => {
        if (compareDates(new Date(), new Date(measureDate)) === 1) {
            toastInfo("Выбранная вами дата меньше сегодняшней")
        }
        else {
            dispatch(setTimeMeasure({ id: id as string, time: new Date(measureDate).toISOString() })).then(() => {
                dispatch(getById(id as string))
                window.scrollTo(0, 0)
            })
        }
    }
    const onSendDesignDate = () => {
        if (compareDates(new Date(), new Date(designDate)) === 1) {
            toastInfo("Выбранная вами дата меньше сегодняшней")
        }
        else {
            dispatch(setTimeDesign({ order_id: id as string, deadline_date: new Date(designDate).toISOString() })).then(() => {
                dispatch(getById(id as string))
                window.scrollTo(0, 0)
            })
        }
    }
    const onDeclineOrder = (reason: string) => {
        dispatch(handleOrder({ reason_of_deny: reason, id: id as string })).then(() => {
            dispatch(getById(id?.toString() || ""))
        })
    }
    useEffect(() => {
        dispatch(getById(id?.toString() || ""))
    }, [id])
    return {
        data,
        isLoading,
        onDeleteOrder,
        onSendMeasureDate,
        handleMeasureDate,
        measureDate,
        modal, setModal, isError, isDeleting,
        permissions,
        onDeclineOrder,
        isLoadingSetTimeMeauser,
        isLoadingSetTimeDesign,
        onSendDesignDate,
        handleDesignDate,
        designDate
    }
}

export default useDetail