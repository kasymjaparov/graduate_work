import { getFormatedDate, getStatusBtn } from "@/shared/libs"
import { Box, Chip, Grid, Stack, Typography } from "@mui/material"
import { Order } from "../../type"

const Info = ({ data }: { data: Order }) => {
  console.log()
  return (
    <Grid item md={6} xs={12}>
      <Typography sx={{ fontSize: "16px", fontWeight: 700, marginY: "10px" }}>
        Общая информация о квартире
      </Typography>
      <table className="info_table">
        <tbody>
          <tr>
            <td>Клиент</td>
            <td>
              <Stack alignItems="flex-start">
                {data.client?.email ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Почта: &nbsp;</Typography>
                    <Typography>{data.client?.email}</Typography>
                  </Stack>
                ) : null}

                {data.client?.phone_number ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Номер телефона: &nbsp;</Typography>
                    <Typography>{data.client?.phone_number}</Typography>
                  </Stack>
                ) : null}
                {data.client?.first_name ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Имя: &nbsp;</Typography>
                    <Typography>{data.client?.first_name}</Typography>
                  </Stack>
                ) : null}
                {data.client?.last_name ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Фамилия: &nbsp;</Typography>
                    <Typography>{data.client?.last_name}</Typography>
                  </Stack>
                ) : null}
              </Stack>
            </td>
          </tr>

          <tr>
            <td>Адрес</td>
            <td>
              <Typography>{data.address}</Typography>
            </td>
          </tr>
          {data.type ? (
            <tr>
              <td>Тип ремонта</td>
              <td>
                <Typography>{data.type}</Typography>
              </td>
            </tr>
          ) : null}
          {data?.doc_text ? (
            <tr>
              <td>Скачать договор</td>
              <td>
                <Typography>
                  <a
                    style={{
                      color: "white",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    href={"https://vkr-adilet.com.kg/" + data?.doc_text}
                    download
                  >
                    Ссылка
                  </a>
                </Typography>
              </td>
            </tr>
          ) : null}
          {data?.finish_doc?.length > 0 ? (
            <tr>
              <td>Скачать акт о выполненных работах</td>
              <td>
                <Typography>
                  <a
                    style={{
                      color: "white",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    href={
                      "https://vkr-adilet.com.kg/" + data?.finish_doc?.[0]?.file
                    }
                    download
                  >
                    Ссылка
                  </a>
                </Typography>
              </td>
            </tr>
          ) : null}
          <tr>
            <td>Серия квартиры</td>
            <td>
              <Typography>{data.series}</Typography>
            </td>
          </tr>
          <tr>
            <td>Статус</td>
            <td>
              <Chip
                variant="outlined"
                sx={{
                  border: "1px solid #64ffda",
                  color: "#64ffda",
                }}
                label={getStatusBtn(data.status)?.text}
              />
            </td>
          </tr>
          <tr>
            <td>Количество комнат</td>
            <td>
              <Typography>{data.room_amount}</Typography>
            </td>
          </tr>
          <tr>
            <td>Площадь</td>
            <td>
              <Box>
                {data.square ? (
                  <div>
                    {data.square}м<sup>2</sup>
                  </div>
                ) : (
                  "-"
                )}
              </Box>
            </td>
          </tr>
          <tr>
            <td>Дата создания заказа</td>
            <td>
              <Typography>{getFormatedDate(data.created_at)}</Typography>
            </td>
          </tr>
          {data.design?.[0]?.deadline_date ? (
            <tr>
              <td>Дата предварительной готовности дизайна: &nbsp;</td>
              <td>
                <Typography>
                  {getFormatedDate(data.design?.[0].deadline_date)}
                </Typography>
              </td>
            </tr>
          ) : null}
          {data.status === "denied" ? (
            <tr>
              <td style={{ color: "#c62828" }}>Причина отмены заказа</td>
              <td style={{ color: "#c62828" }}>
                <Typography>{data.reason_of_deny || "-"}</Typography>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </Grid>
  )
}

export default Info
