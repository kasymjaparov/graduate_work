import { tokensDark } from "@/app/providers/ThemeProvider"
import { getFormatedDate } from "@/shared/libs"
import { Swiper } from "@/shared/ui"
import {
  Grid,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Card,
  Stack,
  Chip,
} from "@mui/material"

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
const CardItem = ({
  design,
  acceptLoading,
  allowHandle,
  onAcceptDesign,
  declineLoading,
  allowWatch,
  openModal,
}: {
  design: Props
  acceptLoading: boolean
  allowHandle: boolean
  declineLoading: boolean
  allowWatch: boolean
  onAcceptDesign: (id: number) => void
  openModal: (id: number, name: string) => void
}) => {
  return (
    <Grid item xl={4} lg={3} md={6} xs={12}>
      <Card
        sx={{
          maxWidth: 300,
          background: tokensDark.primary[500],
          border: "1px solid #7a7f9d",
          borderRadius: "0",
        }}
      >
        <CardContent>
          <Stack spacing={2}>
            {design.description ? (
              <Typography>Описание:{design.description || "-"}</Typography>
            ) : null}
            {design.file ? (
              <Typography>
                <a
                  style={{
                    color: "white",
                    textDecoration: "underline",
                  }}
                  target="_blank"
                  href={design.file}
                  download
                >
                  Скачать визуализацию
                </a>
              </Typography>
            ) : null}
            {design.deadline_date ? (
              <Typography>
                Дата готовности дизайна: &nbsp;
                {getFormatedDate(design.deadline_date)}
              </Typography>
            ) : null}
            {design.cancel_reason ? (
              <Typography>Причина отказа: {design.cancel_reason}</Typography>
            ) : null}
            {design.sample_image?.length ? (
              <Box>
                <Typography>Скрины дизайна</Typography>
                <Swiper
                  images={design.sample_image?.map(image => image.image) || []}
                />
              </Box>
            ) : null}
            {design.is_approved === true ? (
              <Chip
                variant="outlined"
                sx={{
                  border: "1px solid #64ffda",
                  color: "#64ffda",
                }}
                label="Дизайн утвержден"
              />
            ) : null}
            {design.is_approved === false ? (
              <Chip
                variant="outlined"
                sx={{
                  border: "1px solid #DA1026 ",
                  color: "#DA1026 ",
                }}
                label="Дизайн отклонен"
              />
            ) : null}
          </Stack>
        </CardContent>
        <CardActions>
          {design.file && allowHandle && design.is_approved === null ? (
            <Button
              size="small"
              sx={{
                border: "1px solid #64ffda",
                color: "#64ffda",
                "&:hover": {
                  background: "rgb(100 255 218 / 20%)",
                },
              }}
              disabled={acceptLoading}
              onClick={() => onAcceptDesign(design.id)}
            >
              {acceptLoading ? "Загрузка..." : "Утвердить дизайн"}
            </Button>
          ) : null}
          {design.file && allowHandle && design.is_approved === null ? (
            <Button
              onClick={() => openModal(design.id, "decline")}
              size="small"
              sx={{
                border: "1px solid #DA1026",
                color: "#DA1026 ",
                "&:hover": {
                  background: "rgb(255 100 123 / 10%)",
                },
              }}
              disabled={declineLoading}
            >
              {declineLoading ? "Загрузка..." : "Отказать"}
            </Button>
          ) : null}
          {!design.file && allowWatch ? (
            <Button
              size="small"
              onClick={() => openModal(design.id, "attach")}
              sx={{
                border: "1px solid #64ffda",
                color: "#64ffda",
                "&:hover": {
                  background: "rgb(100 255 218 / 20%)",
                },
              }}
            >
              Прикрепить дизайн
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CardItem
