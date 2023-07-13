import { useAppDispatch, useAppSelector } from "@/app/store"
import { StatusResponse } from "@/shared/enums"
import { getFormatedDate } from "@/shared/libs"
import { MyFileInput } from "@/shared/ui"
import { Button, Grid, Modal, Stack, Typography } from "@mui/material"
import { useState } from "react"
import {
  attachPrework,
  handlePrework,
  reAttachPrework,
} from "../../store/actions"
import {
  selectAttachPreworkStatus,
  selectHandlePreworkStatus,
  selectReAttachPreworkStatus,
} from "../../store/selectors"
import { PreWork } from "../../type"
import Comments from "./Comments"

interface Props {
  data: PreWork | undefined
  allowHandle: boolean
  allowAttach: boolean
  allowWatch: boolean
  allowReAttach: boolean
  orderId: number
}
const PreWorkPage = ({
  data,
  allowHandle,
  orderId,
  allowAttach,
  allowWatch,
  allowReAttach,
}: Props) => {
  if (!allowWatch) return <></>
  const [doc, setDoc] = useState<any>("")
  const [modalComment, setModalComment] = useState(false)
  const dispatch = useAppDispatch()
  const isLoading =
    useAppSelector(selectAttachPreworkStatus) === StatusResponse.LOADING
  const isHandleLoading =
    useAppSelector(selectHandlePreworkStatus) === StatusResponse.LOADING
  const isReAttachLoading =
    useAppSelector(selectReAttachPreworkStatus) === StatusResponse.LOADING
  const onAttachPreWork = (type: "attach" | "reattach" = "attach") => {
    const formData = new FormData()
    formData.append("doc_file", doc)
    if (type === "attach") {
      dispatch(attachPrework({ orderId, req: formData }))
    } else {
      dispatch(reAttachPrework({ orderId, req: formData }))
    }
  }
  const handlePreWork = (type: "decline" | "accept") => {
    dispatch(handlePrework({ orderId, type }))
  }
  return (
    <Grid item md={12} xs={12}>
      <Modal
        sx={{ overflowY: "scroll" }}
        open={modalComment}
        onClose={() => setModalComment(false)}
      >
        <Comments
          orderId={data?.order_id || 0}
          handleClose={() => setModalComment(false)}
        />
      </Modal>
      <Typography
        sx={{
          fontSize: "18px",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        Акт с прейскурантом
      </Typography>

      {allowAttach || allowReAttach ? (
        <Stack sx={{ maxWidth: "500px", mb: "16px" }} spacing={2}>
          <MyFileInput
            multiple={false}
            setFieldTouched={() => {}}
            labelName="Прикрепите акт"
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
            disabled={isLoading || isReAttachLoading || !doc}
            sx={{
              border: "1px solid #64ffda",
              color: "#64ffda",
              "&:hover": {
                background: "rgb(100 255 218 / 20%)",
              },
            }}
            onClick={() =>
              onAttachPreWork(allowReAttach ? "reattach" : "attach")
            }
          >
            {isLoading || isReAttachLoading ? "Загрузка..." : "Отправить"}
          </Button>
        </Stack>
      ) : null}
      {data ? (
        <table className="info_table">
          <tbody>
            <tr>
              <td>Скачать акт</td>
              <td>
                <Typography>
                  <a
                    style={{
                      color: "white",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    href={data?.doc_file}
                    download
                  >
                    Ссылка
                  </a>
                </Typography>
              </td>
            </tr>

            <tr>
              <td>Дата</td>
              <td>{getFormatedDate(data.created_at || "")}</td>
            </tr>
            {allowHandle ? (
              <tr>
                <td>Примите решение по прейскуранту</td>
                <td>
                  <Stack direction="row" spacing={1}>
                    <Button
                      onClick={() => handlePreWork("accept")}
                      sx={{
                        border: "1px solid #64ffda",
                        color: "#64ffda",
                        "&:hover": {
                          background: "rgb(100 255 218 / 20%)",
                        },
                      }}
                      disabled={isHandleLoading}
                    >
                      {isHandleLoading ? "Загрузка..." : "Принять"}
                    </Button>
                    <Button
                      onClick={() => handlePreWork("decline")}
                      sx={{
                        border: "1px solid #DA1026 ",
                        color: "#DA1026 ",
                        "&:hover": {
                          background: "rgb(255 100 123 / 10%)",
                        },
                      }}
                      disabled={isHandleLoading}
                    >
                      {isHandleLoading ? "Загрузка..." : "Отклонить"}
                    </Button>
                  </Stack>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      ) : null}
      {data ? (
        <Button
          onClick={() => setModalComment(true)}
          sx={{
            border: "1px solid #87e1ff",
            color: "#87e1ff",
            my: "10px",
            "&:hover": {
              background: "#085d7a",
            },
          }}
        >
          Открыть комментарии
        </Button>
      ) : null}
    </Grid>
  )
}

export default PreWorkPage
