import { FileIcon, MyFileInput, MyInput, MyTextArea, Swiper } from "@/shared/ui"
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { CreateStage, Stage } from "../../type"
import { api } from "../../api"
import {
  getFormatedDate,
  toBase64,
  toastError,
  toastSuccess,
} from "@/shared/libs"
import { useAppDispatch } from "@/app/store"
import { getById } from "../../store/actions"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import { ImageModal } from "@/widgets"
import { tokensDark } from "@/app/providers/ThemeProvider"

interface Props {
  data: Stage[]
  allowAttach: boolean
  allowWatch: boolean
  orderId: number
}
const StagesPage = ({ data, orderId, allowAttach, allowWatch }: Props) => {
  if (!allowWatch) return <></>
  const [imageModal, setImageModal] = useState(false)
  const [imageUrl, setImageUrl] = useState("")
  const handleImageModalClick = (url: string) => {
    setImageModal(true)
    setImageUrl(url)
  }
  const [req, setReq] = useState<CreateStage>({
    title: "",
    description: "",
    stage_image: [],
  })
  const [createLoading, setCreateLoading] = useState(false)

  const dispatch = useAppDispatch()

  const onSendStage = async () => {
    try {
      if (!req.title || !req.description || !req.stage_image?.length) {
        toastError("Заполните все поля для создания отчета")
      } else {
        setCreateLoading(true)
        await api.createStages(orderId, req)
        toastSuccess("Отчет успешно создан")
        dispatch(getById(orderId.toString()))
      }
    } catch (error) {
      toastError("Ошибка при отправке отчета")
    } finally {
      setCreateLoading(false)
    }
  }
  return (
    <Grid item md={12} xs={12}>
      <ImageModal
        open={imageModal}
        url={imageUrl}
        onClose={() => setImageModal(false)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      {allowWatch || allowAttach ? (
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 700,
            marginBottom: "10px",
          }}
        >
          Отчеты по строительству
        </Typography>
      ) : null}

      {allowAttach ? (
        <Stack sx={{ maxWidth: "500px", mb: "16px" }} spacing={2}>
          <MyInput
            labelName="Оглавление"
            name="title"
            placeholder="Введите оглавление отчета"
            value={req.title}
            onChange={(e: any) => {
              setReq({ ...req, title: e.target.value })
            }}
            onBlur={() => {}}
          />
          <MyTextArea
            name={"description"}
            value={req.description}
            onChange={(e: any) => {
              setReq({ ...req, description: e.target.value })
            }}
            onBlur={() => {}}
            labelName="Напишите описание отчета"
            placeholder="Напишите описание отчета"
          />
          <MyFileInput
            name={"image"}
            multiple={true}
            accept="image/jpeg,image/png"
            labelName="Прикрепите фотографии для отчета"
            onBlur={() => {}}
            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
              if (!e.currentTarget.files) return
              let arr: { image: string }[] = []
              await Array.from(e.currentTarget.files).forEach(async (item) => {
                const imageInBase64 = await toBase64(item)
                arr.push({
                  image: imageInBase64,
                })
                setReq({ ...req, stage_image: arr })
              })
            }}
            setFieldTouched={() => {}}
          />
          {req.stage_image.length >= 1 ? (
            <>
              <span className="myform__label">Фотографии отчета</span>
              <div style={{ marginTop: "0px" }}>
                {Array.from(req.stage_image).map((doc: any, index) => {
                  return (
                    <FileIcon
                      url={doc.image}
                      handleClick={handleImageModalClick}
                      key={index}
                      icon={<InsertDriveFileIcon />}
                    />
                  )
                })}
              </div>
            </>
          ) : null}
          <Button
            disabled={
              createLoading ||
              !req.title ||
              !req.description ||
              !req.stage_image?.length
            }
            sx={{
              border: "1px solid #64ffda",
              color: "#64ffda",
              "&:hover": {
                background: "rgb(100 255 218 / 20%)",
              },
            }}
            onClick={() => onSendStage()}
          >
            {createLoading ? "Загрузка..." : "Отправить"}
          </Button>
        </Stack>
      ) : null}
      <Stack direction="row" flexWrap="wrap" rowGap={2}>
        {data?.length
          ? data.map((stage, index) => {
              return (
                <Card
                  key={stage.id}
                  sx={{
                    maxWidth: 300,
                    background: tokensDark.primary[500],
                    border: "1px solid #7a7f9d",
                    borderRadius: "0",
                  }}
                >
                  <CardContent>
                    <Stack spacing={2}>
                      <Typography sx={{ fontWeight: 700, textAlign: "center" }}>
                        Отчет № {index + 1}
                      </Typography>

                      {stage.title ? (
                        <Typography>Оглавление:{stage.title || "-"}</Typography>
                      ) : null}
                      {stage.description ? (
                        <Typography>
                          Описание:{stage.description || "-"}
                        </Typography>
                      ) : null}

                      {stage.created_at ? (
                        <Typography>
                          Дата создания отчета: &nbsp;
                          {getFormatedDate(stage.created_at)}
                        </Typography>
                      ) : null}

                      {stage.stage_image?.length ? (
                        <Box>
                          <Typography>Прикрепленные фотографии</Typography>
                          <Swiper
                            images={
                              stage.stage_image?.map((image) => image.image) ||
                              []
                            }
                          />
                        </Box>
                      ) : null}
                    </Stack>
                  </CardContent>
                </Card>
              )
            })
          : null}
      </Stack>
    </Grid>
  )
}

export default StagesPage
