import { useAppSelector } from "@/app/store"
import { selectUserProfile } from "@/features/Auth/store/selectors"
import { Roles, StatusResponse } from "@/shared/enums"
import { getFullName, getRole } from "@/shared/libs"
import { Box, Skeleton, Stack, Typography } from "@mui/material"
import Header from "../Header"
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab"
import {
  userTimelines,
  pmTimelines,
  meauserTimelines,
  designerTimelines,
} from "@/shared/data"
import { builderTimelines } from "@/shared/data/timelines"

const Dashboard = () => {
  const { user, status } = useAppSelector(selectUserProfile)
  const loading = status === StatusResponse.LOADING
  let timeline: any[] = []
  switch (user.type) {
    case Roles.CLIENT:
      timeline = userTimelines
      break
    case Roles.PM:
      timeline = pmTimelines
      break
    case Roles.MEASURE:
      timeline = meauserTimelines
      break
    case Roles.DESIGNER:
      timeline = designerTimelines
      break
    case Roles.BUILDER:
      timeline = builderTimelines
      break
    default:
      timeline = []
      break
  }
  return (
    <Box sx={{ paddingBottom: "90px" }}>
      {loading ? (
        <Stack
          alignItems={{
            xl: "flex-start",
            lg: "flex-start",
            md: "flex-start",
            sm: "flex-start",
            xs: "center",
          }}
        >
          <Skeleton variant="text" height={38} width={350} />
          <Skeleton variant="text" height={21} width={100} />
        </Stack>
      ) : (
        <Header
          title={`Добро пожаловать ${getFullName(
            user.first_name || "",
            "",
            user.last_name || ""
          )}`}
          subtitle={`Роль: ${getRole(user.type)}`}
        ></Header>
      )}

      <Timeline position="alternate">
        {timeline.length >= 1 ? (
          <>
            <Typography
              variant="h1"
              textAlign="center"
              my="30px"
              sx={{
                fontSize: "33px",
                fontWeight: 600,
                "@media(max-width:640px)": {
                  fontSize: "23px",
                  my: "16px",
                },
              }}
            >
              Этапы работы
            </Typography>
            {timeline.map((timeline, index) => {
              return (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot
                      sx={{
                        background: timeline.iconBackgroundColor,
                      }}
                    >
                      <timeline.icon />
                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: "12px" }}>
                    <Typography
                      variant="h6"
                      component="span"
                      sx={{
                        fontWeight: 700,
                        fontSize: "19px",
                        "@media(max-width:640px)": {
                          fontSize: "14px",
                        },
                      }}
                    >
                      {timeline.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: "#ccd6f6",
                        "@media(max-width:640px)": {
                          fontSize: "13px",
                        },
                      }}
                    >
                      {timeline.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              )
            })}
          </>
        ) : null}
      </Timeline>
    </Box>
  )
}

export default Dashboard
