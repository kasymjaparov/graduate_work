import { getRole } from "@/shared/libs"
import { Grid, Typography, Stack } from "@mui/material"
import { Order } from "../../type"

const Workers = ({ data }: { data: Order }) => {
  if (
    !data.client?.id ||
    !data.manager?.id ||
    !data.designer?.id ||
    !data.meauser?.id ||
    data.builders.length < 1
  ) {
    return <></>
  }
  return (
    <Grid item md={6} xs={12}>
      <Typography sx={{ fontSize: "16px", fontWeight: 700, marginY: "10px" }}>
        Ответственные
      </Typography>
      <table style={{ marginBottom: "10px" }} className="info_table">
        <tbody>
          <tr>
            <td>{getRole(data.manager?.type)}</td>
            <td>
              <Stack alignItems="flex-start">
                {data.manager?.email ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Почта: &nbsp;</Typography>
                    <Typography>{data.manager?.email}</Typography>
                  </Stack>
                ) : null}
                {data.manager?.phone_number ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Номер телефона: &nbsp;</Typography>
                    <Typography>{data.manager?.phone_number}</Typography>
                  </Stack>
                ) : null}
                {data.manager?.last_name ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>ФИО: &nbsp;</Typography>
                    <Typography>
                      {`${data.manager?.last_name} ${data.manager?.first_name}`}
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>
            </td>
          </tr>
          <tr>
            <td>{getRole(data.meauser?.type)}</td>
            <td>
              <Stack alignItems="flex-start">
                {data.meauser?.email ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Почта: &nbsp;</Typography>
                    <Typography>{data.meauser?.email}</Typography>
                  </Stack>
                ) : null}
                {data.meauser?.phone_number ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Номер телефона: &nbsp;</Typography>
                    <Typography>{data.meauser?.phone_number}</Typography>
                  </Stack>
                ) : null}
                {data.meauser?.last_name ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>ФИО: &nbsp;</Typography>
                    <Typography>
                      {`${data.meauser?.last_name} ${data.meauser?.first_name}`}
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>
            </td>
          </tr>
          <tr>
            <td>{getRole(data.designer?.type)}</td>
            <td>
              <Stack alignItems="flex-start">
                {data.designer?.email ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Почта: &nbsp;</Typography>
                    <Typography>{data.designer?.email}</Typography>
                  </Stack>
                ) : null}
                {data.designer?.phone_number ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>Номер телефона: &nbsp;</Typography>
                    <Typography>{data.designer?.phone_number}</Typography>
                  </Stack>
                ) : null}
                {data.designer?.last_name ? (
                  <Stack direction="row" alignItems="center" flexWrap="wrap">
                    <Typography>ФИО: &nbsp;</Typography>
                    <Typography>
                      {`${data.designer?.last_name} ${data.designer?.first_name}`}
                    </Typography>
                  </Stack>
                ) : null}
              </Stack>
            </td>
          </tr>
          {data.builders.length > 0
            ? data.builders.map(builder => {
                return (
                  <tr key={builder?.id}>
                    <td>{getRole(builder?.type)}</td>
                    <td>
                      <Stack alignItems="flex-start">
                        {builder?.email ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="wrap"
                          >
                            <Typography>Почта: &nbsp;</Typography>
                            <Typography>{builder?.email}</Typography>
                          </Stack>
                        ) : null}
                        {builder?.phone_number ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="wrap"
                          >
                            <Typography>Номер телефона: &nbsp;</Typography>
                            <Typography>{builder?.phone_number}</Typography>
                          </Stack>
                        ) : null}
                        {builder?.last_name ? (
                          <Stack
                            direction="row"
                            alignItems="center"
                            flexWrap="wrap"
                          >
                            <Typography>ФИО: &nbsp;</Typography>
                            <Typography>
                              {`${builder?.last_name} ${builder?.first_name}`}
                            </Typography>
                          </Stack>
                        ) : null}
                      </Stack>
                    </td>
                  </tr>
                )
              })
            : null}
        </tbody>
      </table>
    </Grid>
  )
}

export default Workers
