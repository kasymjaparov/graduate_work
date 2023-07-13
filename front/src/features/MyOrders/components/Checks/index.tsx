import { MyFileInput } from "@/shared/ui"
import { Button, Grid, Stack, Typography } from "@mui/material"
import { useState } from "react"
import { Check } from "../../type"
import { api } from "../../api"
import { toastError, toastSuccess } from "@/shared/libs"
import { useAppDispatch } from "@/app/store"
import { getById } from "../../store/actions"

interface Props {
  data: Check[]
  allowHandle: boolean
  allowAttach: boolean
  allowWatch: boolean
  orderId: number
}
const ChecksPage = ({
  data,
  allowHandle,
  orderId,
  allowAttach,
  allowWatch,
}: Props) => {
  if (!allowWatch) return <></>
  const [doc, setDoc] = useState<any>("")
  const [createLoading, setCreateLoading] = useState(false)
  const [handleLoading, setHandleLoading] = useState(false)

  const dispatch = useAppDispatch()

  const onAttachPreWork = async () => {
    try {
      setCreateLoading(true)
      const formData = new FormData()
      formData.append("image", doc)
      await api.createCheck(orderId, formData)
      toastSuccess("Чек прикреплен")
      dispatch(getById(orderId.toString()))
    } catch (error) {
      toastError("Ошибка при прикреплении чека")
    } finally {
      setCreateLoading(false)
    }
  }
  const handlePreWork = async (type: "decline" | "accept", checkId: string) => {
    try {
      setHandleLoading(true)
      if (type === "accept") {
        await api.approveCheck(Number(checkId))
        toastSuccess("Чек утвержден")
      } else {
        await api.declineCheck(Number(checkId))
        toastSuccess("Чек отклонен")
      }
      dispatch(getById(orderId.toString()))
    } catch (error) {
      toastError("Ошибка при обработке чека")
    } finally {
      setHandleLoading(false)
    }
  }
  return (
    <Grid item md={12} xs={12}>
      {allowWatch || allowAttach || allowHandle || data?.length ? (
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          Чеки
        </Typography>
      ) : null}

      {allowAttach ? (
        <Stack sx={{ maxWidth: "500px", mb: "16px" }} spacing={2}>
          <MyFileInput
            multiple={false}
            setFieldTouched={() => {}}
            labelName="Прикрепите чек"
            name="image"
            accept="image/jpeg,image/png"
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.currentTarget.files) return
              setDoc(e.currentTarget.files[0])
            }}
            onBlur={() => {}}
          />
          {doc ? <Typography>Чек прикреплен</Typography> : null}
          <Button
            disabled={createLoading || !doc}
            sx={{
              border: "1px solid #64ffda",
              color: "#64ffda",
              "&:hover": {
                background: "rgb(100 255 218 / 20%)",
              },
            }}
            onClick={() => onAttachPreWork()}
          >
            {createLoading ? "Загрузка..." : "Отправить"}
          </Button>
        </Stack>
      ) : null}
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {data?.length
          ? data.map((check, index) => {
              return (
                <table key={check.id} className="info_table">
                  <tbody>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        padding: "10px",
                        textAlign: "center",
                      }}
                    >
                      Чек {index + 1}
                    </Typography>
                    <tr>
                      <td>Скачать чек</td>
                      <td>
                        <Typography>
                          <a
                            style={{
                              color: "white",
                              textDecoration: "underline",
                            }}
                            target="_blank"
                            href={check?.image}
                            download
                          >
                            Ссылка
                          </a>
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>Статус чека</td>
                      <td>
                        {check.is_approved === null ? "Чек не обработан" : null}
                        {check.is_approved === false ? "Чек отклонен" : null}
                        {check.is_approved === true ? "Чек утвержден" : null}
                      </td>
                    </tr>

                    {allowHandle && check.is_approved === null ? (
                      <tr>
                        <td>Примите решение по чеку</td>
                        <td>
                          <Stack direction="row" spacing={1}>
                            <Button
                              onClick={() =>
                                handlePreWork("accept", check.id!.toString())
                              }
                              sx={{
                                border: "1px solid #64ffda",
                                color: "#64ffda",
                                "&:hover": {
                                  background: "rgb(100 255 218 / 20%)",
                                },
                              }}
                              disabled={handleLoading}
                            >
                              {handleLoading ? "Загрузка..." : "Принять"}
                            </Button>
                            <Button
                              onClick={() =>
                                handlePreWork("decline", check.id!.toString())
                              }
                              sx={{
                                border: "1px solid #DA1026 ",
                                color: "#DA1026 ",
                                "&:hover": {
                                  background: "rgb(255 100 123 / 10%)",
                                },
                              }}
                              disabled={handleLoading}
                            >
                              {handleLoading ? "Загрузка..." : "Отклонить"}
                            </Button>
                          </Stack>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              )
            })
          : null}
      </Stack>
    </Grid>
  )
}

export default ChecksPage
