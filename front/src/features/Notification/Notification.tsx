import { useAppDispatch, useAppSelector } from "@/app/store"
import { Box, Button, Divider, Typography } from "@mui/material"
import { watchedNotification } from "./store/actions"
import { selectNotifications } from "./store/selectors"
import "./index.css"
import { useNavigate } from "react-router-dom"

export const Notification = () => {
  const { list: notifications } = useAppSelector(selectNotifications)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const handleWatchNotification = (id: string) => {
    dispatch(watchedNotification(id))
  }
  return (
    <div className="myAppBar__links__profile__tooltip">
      <Box sx={{ p: 2, maxHeight: "300px", overflowY: "auto" }}>
        {notifications.filter(notification => !notification.watched).length >
        0 ? (
          notifications
            .filter(notification => !notification.watched)
            .map(notification => {
              return (
                <Box
                  sx={{
                    mb: "10px",
                  }}
                  key={notification.id}
                >
                  <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
                    {notification.title}
                  </Typography>

                  <Button
                    onClick={() => navigate(`/orders/${notification.order_id}`)}
                    size="small"
                    fullWidth
                    sx={{
                      marginY: "7px",
                      border: "1px solid #64ffda",
                      color: "#64ffda",
                      background: "rgb(100 255 218 / 10%)",
                      "&:hover": {
                        background: "rgb(100 255 218 / 10%)",
                      },
                    }}
                  >
                    Посмотреть заказ
                  </Button>
                  <Button
                    onClick={() =>
                      handleWatchNotification(
                        notification.id as unknown as string
                      )
                    }
                    size="small"
                    fullWidth
                    sx={{
                      marginY: "5px",
                      border: "1px solid #64ffda",
                      color: "#64ffda",
                      background: "rgb(100 255 218 / 10%)",

                      "&:hover": {
                        background: "rgb(100 255 218 / 10%)",
                      },
                    }}
                  >
                    Прочитано
                  </Button>
                  <Divider />
                </Box>
              )
            })
        ) : (
          <Typography sx={{ fontSize: "14px", textAlign: "center" }}>
            У вас нет уведомлений
          </Typography>
        )}
      </Box>
    </div>
  )
}
