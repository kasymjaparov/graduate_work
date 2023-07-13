import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import { PromptComment } from "@/widgets"
import FullScreenModal from "@/widgets/FullScreenModal"
import { Typography, Grid } from "@mui/material"
import { useState } from "react"
import { acceptDesign, declineDesign, getById } from "../../store/actions"
import {
  selectAcceptDesignStatus,
  selectDeclineDesignStatus,
} from "../../store/selectors"
import AttachDesign from "./AttachDesign"
import CardItem from "./Card"

interface Props {
  cancel_reason?: string
  deadline_date: string
  description?: string
  file: any
  id: number
  is_approved?: boolean
  order_id: number
  sample_image?: { id: number; image: string }[]
}

const Design = ({
  data,
  allowWatch,
  allowHandle,
  orderId,
}: {
  data: Props[]
  allowWatch: boolean
  allowHandle: boolean
  orderId: number
}) => {
  if (!data) return <></>
  const dispatch = useAppDispatch()
  const declineLoading =
    useAppSelector(selectDeclineDesignStatus) === StatusResponse.LOADING
  const acceptLoading =
    useAppSelector(selectAcceptDesignStatus) === StatusResponse.LOADING
  const [modal, setModal] = useState({
    attach: false,
    decline: false,
  })
  const [designId, setDesignId] = useState(data[0]?.id)

  const openModal = (id: number, name: string) => {
    setModal({ ...modal, [name]: true })
    setDesignId(id)
  }
  const onDeclineDesign = (reason: string) => {
    dispatch(
      declineDesign({ cancel_reason: reason, design_id: Number(designId) })
    ).then(() => {
      dispatch(getById(orderId.toString()))
    })
  }
  const onAcceptDesign = (id: number) => {
    dispatch(acceptDesign({ cancel_reason: "", design_id: id })).then(() => {
      dispatch(getById(orderId.toString()))
    })
  }
  return (
    <Grid item md={12} xs={12}>
      <PromptComment
        agreeCallback={(reason: string) => onDeclineDesign(reason)}
        handleClose={() => {
          setModal({ ...modal, decline: false })
        }}
        open={modal.decline}
        placeholder="Причина отказа"
        text="Укажите причину отказа"
      />
      <FullScreenModal
        open={modal.attach}
        handleClose={() => setModal({ ...modal, attach: false })}
        children={
          <AttachDesign
            closeModal={() => setModal({ ...modal, attach: false })}
            designId={designId}
            orderId={orderId}
          />
        }
      />
      {data.length > 0 ? (
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          Дизайн
        </Typography>
      ) : null}
      <Grid container spacing={1}>
        {data.map(design => {
          return (
            <CardItem
              key={design.id}
              design={design}
              acceptLoading={acceptLoading}
              onAcceptDesign={onAcceptDesign}
              declineLoading={declineLoading}
              allowWatch={allowWatch}
              allowHandle={allowHandle}
              openModal={openModal}
            />
          )
        })}
      </Grid>
    </Grid>
  )
}

export default Design
