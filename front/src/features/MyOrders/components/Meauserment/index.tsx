import { getFormatedDate } from "@/shared/libs"
import { Grid, Typography } from "@mui/material"
import { IMeauserment } from "../../type"
interface Props {
  data: IMeauserment[]
}
const Meauserment = ({ data }: Props) => {
  if (!data?.[0]) {
    return <></>
  }
  return (
    <Grid item md={6} xs={12}>
      <Typography
        sx={{
          fontSize: "16px",
          fontWeight: 700,
          marginBottom: "10px",
        }}
      >
        Данные по замеру
      </Typography>
      <table className="info_table">
        <tbody>
          <tr>
            <td>Дата и время приезда на объект</td>
            <td>
              <Typography>
                {new Date(data[0]!.come_date).toLocaleString()}
              </Typography>
            </td>
          </tr>

          <tr>
            <td>Комментарий</td>
            <td>
              <Typography>{data[0]?.comment || ""}</Typography>
            </td>
          </tr>
          <tr>
            <td>Дата создания замера</td>
            <td>
              <Typography>{getFormatedDate(data[0]!.created_at)}</Typography>
            </td>
          </tr>
          {data[0]?.file ? (
            <tr>
              <td>Скачать замер</td>
              <td>
                <Typography>
                  <a
                    style={{
                      color: "white",
                      textDecoration: "underline",
                    }}
                    target="_blank"
                    href={data[0]?.file}
                    download
                  >
                    Ссылка
                  </a>
                </Typography>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </Grid>
  )
}

export default Meauserment
