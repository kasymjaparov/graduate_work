import { MyFileInput } from "@/shared/ui"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { api } from "../../api"
import { toastError, toastSuccess } from "@/shared/libs"
import { useAppDispatch } from "@/app/store"
import { getById } from "../../store/actions"

interface Props {
  allowAttach: boolean
  allowWatch: boolean
  orderId: number
}
const FinishDocPage = ({ orderId, allowAttach, allowWatch }: Props) => {
  if (!allowWatch) return <></>
  const [doc, setDoc] = useState<any>("")
  const [createLoading, setCreateLoading] = useState(false)
  const dispatch = useAppDispatch()
  const onSendFinishDoc = async () => {
    try {
      setCreateLoading(true)
      const formData = new FormData()
      formData.append("file", doc)
      await api.uploadFinishDoc(orderId, formData)
      toastSuccess("Акт о выполненных работах прикреплен")
      dispatch(getById(orderId.toString()))
    } catch (error) {
      toastError("Ошибка при прикреплении акта о выполненных работах")
    } finally {
      setCreateLoading(false)
    }
  }
  return (
    <Grid item md={12} xs={12}>
      {allowWatch || allowAttach ? (
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          Акт о выполненных работах
        </Typography>
      ) : null}

      {allowAttach ? (
        <Stack sx={{ maxWidth: "500px", mb: "16px" }} spacing={2}>
          <MyFileInput
            multiple={false}
            setFieldTouched={() => {}}
            labelName="Прикрепите акт о выполненных работах"
            name="image"
            accept=".doc,.docx"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.currentTarget.files) return
              setDoc(e.currentTarget.files[0])
            }}
            onBlur={() => {}}
          />
          {doc ? (
            <Typography>Акт о выполненных работах прикреплен</Typography>
          ) : null}
          <Button
            disabled={createLoading || !doc}
            sx={{
              border: "1px solid #64ffda",
              color: "#64ffda",
              "&:hover": {
                background: "rgb(100 255 218 / 20%)",
              },
            }}
            onClick={() => onSendFinishDoc()}
          >
            {createLoading ? "Загрузка..." : "Отправить"}
          </Button>
        </Stack>
      ) : null}
    </Grid>
  )
}

export default FinishDocPage
