import { MyFileInput } from "@/shared/ui"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { toastError, toastSuccess } from "@/shared/libs"
import { Status } from "@/shared/types"
import { api } from "../../api"
import { useAppDispatch } from "@/app/store"
import { getById } from "../../store/actions"

interface Props {
  allowAttach: boolean
  orderId: number
}
const ContractPage = ({ orderId, allowAttach }: Props) => {
  if (!allowAttach) return <></>
  const dispatch = useAppDispatch()
  const [doc, setDoc] = useState<any>("")
  const [createStatus, setCreateStatus] = useState<Status>("init")
  const isAttachLoading = createStatus === "loading"
  const onAttachContract = async () => {
    try {
      setCreateStatus("loading")
      const formData = new FormData()
      formData.append("file", doc)
      await api.uploadContract(orderId, formData)
      toastSuccess("Договор прикреплен")
      setCreateStatus("success")
    } catch (error: any) {
      setCreateStatus("error")
      toastError(error.response.data.detail)
    } finally {
      dispatch(getById(orderId as unknown as string))
    }
  }
  return (
    <Grid item md={12} xs={12}>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        Договор
      </Typography>

      {allowAttach ? (
        <Stack sx={{ maxWidth: "500px", mb: "16px" }} spacing={2}>
          <MyFileInput
            multiple={false}
            setFieldTouched={() => {}}
            labelName="Прикрепите договор"
            name="doc"
            accept=".doc,.docx"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.currentTarget.files) return
              setDoc(e.currentTarget.files[0])
            }}
            onBlur={() => {}}
          />
          {doc ? <Typography>Документ выбран</Typography> : null}
          <Button
            disabled={isAttachLoading || !doc}
            sx={{
              border: "1px solid #64ffda",
              color: "#64ffda",
              "&:hover": {
                background: "rgb(100 255 218 / 20%)",
              },
            }}
            onClick={() => onAttachContract()}
          >
            {isAttachLoading ? "Загрузка..." : "Отправить"}
          </Button>
        </Stack>
      ) : null}
    </Grid>
  )
}

export default ContractPage
