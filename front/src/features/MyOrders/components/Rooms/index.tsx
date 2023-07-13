import { Grid, Typography } from "@mui/material"
import { Order } from "../../type"
import { Swiper } from "@/shared/ui"

const Rooms = ({ data }: { data: Order }) => {
  return (
    <Grid item md={12} xs={12}>
      {data.order_room ? (
        <div>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              marginBottom: "10px",
            }}
          >
            Подробности по комнатам
          </Typography>
          <Grid container spacing={1}>
            {data.order_room.map(orderRoom => {
              return (
                <Grid
                  key={orderRoom.id}
                  item
                  xl={6}
                  lg={6}
                  md={6}
                  xs={12}
                  sm={12}
                >
                  <table
                    style={{ marginBottom: "10px" }}
                    key={orderRoom.id}
                    className="info_table"
                  >
                    <tbody>
                      <tr>
                        <td>Название комнаты</td>
                        <td>{orderRoom.name}</td>
                      </tr>
                      <tr>
                        <td>Описание</td>
                        <td>{orderRoom.description}</td>
                      </tr>
                      {orderRoom.order_image?.length ? (
                        <tr>
                          <td>Фотографии комнаты</td>
                          <td>
                            <Swiper
                              images={orderRoom.order_image.map(
                                orderImage => orderImage.image
                              )}
                            />
                          </td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </Grid>
              )
            })}
          </Grid>
        </div>
      ) : null}
    </Grid>
  )
}

export default Rooms
