import { Box, Grid, Paper, Typography } from "@mui/material"
import useDetail from "./useDetail"
import { Header, PromptComment } from "@/widgets"
import { tokensDark } from "@/app/providers/ThemeProvider"
import HandleOrder from "../../components/HandleOrder"
import FullScreenModal from "@/widgets/FullScreenModal"
import Workers from "../../components/Workers"
import Info from "../../components/Info"
import Rooms from "../../components/Rooms"
import OrderSkeleton from "../../components/OrderSkeleton"
import AddMeauser from "../../components/AddMeauser"
import Meauserment from "../../components/Meauserment"
import DecideButtons from "../../components/DecideButtons"
import DeleteOrder from "../../components/DeleteOrder"
import SetTime from "../../components/SetTime"
import Design from "../../components/Design"
import PreWorkPage from "../../components/PreWork"
import ContractPage from "../../components/Contract"
import Checks from "../../components/Checks"
import StagesPage from "../../components/Stages"
import FinishDocPage from "../../components/FinishDoc"

const Detail = () => {
  const {
    data,
    isLoading,
    onDeleteOrder,
    onSendMeasureDate,
    handleMeasureDate,
    measureDate,
    modal,
    setModal,
    isError,
    isDeleting,
    permissions,
    onDeclineOrder,
    isLoadingSetTimeMeauser,
    handleDesignDate,
    onSendDesignDate,
    isLoadingSetTimeDesign,
    designDate,
  } = useDetail()
  return (
    <Box sx={{ pb: "70px" }}>
      <FullScreenModal
        open={modal.handle}
        handleClose={() => setModal({ ...modal, handle: false })}
      >
        <HandleOrder
          onCloseModal={() => setModal({ ...modal, handle: false })}
        />
      </FullScreenModal>
      <PromptComment
        agreeCallback={(reason: string) => onDeclineOrder(reason)}
        handleClose={() => {
          setModal({ ...modal, deny: false })
        }}
        open={modal.deny}
        placeholder="Причина отказа"
        text="Укажите причину отказа"
      />
      <Header title="Детали заказа" subtitle="Подробная информация по заказу" />
      <Paper sx={{ p: "30px", background: tokensDark.primary[500] }}>
        {isError || permissions.CAN_NOT_SEE ? (
          <Typography fontWeight={600}>Такого заказа не существует</Typography>
        ) : isLoading ? (
          <OrderSkeleton />
        ) : (
          <Grid container spacing={4}>
            <Info data={data} />
            <Workers data={data} />
            <Rooms data={data} />
            <DeleteOrder
              isDeleting={isDeleting}
              onDeleteOrder={onDeleteOrder}
              allow={permissions.CAN_DELETE}
            />
            <DecideButtons
              setModal={setModal}
              modal={modal}
              allow={permissions.CAN_HANDLE}
            />
            <SetTime
              text="Выберите дату и время замера"
              value={measureDate}
              handleForm={handleMeasureDate}
              isLoading={isLoadingSetTimeMeauser}
              onClick={onSendMeasureDate}
              allow={permissions.CAN_SET_TIME_MEASURE}
            />

            <AddMeauser
              id={data.measurement?.[0]?.id.toString() || ""}
              orderId={data.id}
              allow={permissions.CAN_ATTACH_MEASURE}
            />
            <Meauserment data={data.measurement} />
            <SetTime
              text="Выберите дату предварительной готовности дизайна"
              value={designDate}
              handleForm={handleDesignDate}
              isLoading={isLoadingSetTimeDesign}
              onClick={onSendDesignDate}
              allow={permissions.CAN_SET_TIME_DESIGN}
            />
            <Design
              data={data.design}
              orderId={data.id}
              allowWatch={permissions.CAN_SET_DESIGN}
              allowHandle={permissions.CAN_HANDLE_DESIGN}
            />
            <PreWorkPage
              data={data.pre_work_doc?.[0]}
              allowHandle={permissions.CAN_HANDLE_PREWORK}
              allowAttach={permissions.CAN_ATTACH_PREWORK}
              allowWatch={permissions.CAN_WATCH_PREWORK}
              allowReAttach={permissions.CAN_REATTACH_PREWORK}
              orderId={data.id}
            />
            <ContractPage
              allowAttach={permissions.CAN_CREATE_CONTRACT}
              orderId={data.id}
            />
            <Checks
              data={data.order_check}
              allowHandle={permissions.CAN_HANDLE_CHECK}
              allowAttach={permissions.CAN_CREATE_CHECK}
              allowWatch={permissions.CAN_WATCH_CHECK}
              orderId={data.id}
            />
            <StagesPage
              data={data.stage}
              allowAttach={!!permissions.CAN_CREATE_STAGE}
              allowWatch={permissions.CAN_WATCH_STAGE}
              orderId={data.id}
            />
            <FinishDocPage
              allowAttach={!!permissions.CAN_CREATE_FINISH_DOC}
              allowWatch={permissions.CAN_WATCH_FINISH_DOC}
              orderId={data.id}
            />
          </Grid>
        )}
      </Paper>
    </Box>
  )
}

export default Detail
