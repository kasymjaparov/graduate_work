import { Roles } from "@/shared/enums"
import { getFormatedDate, getRole } from "@/shared/libs"
import { Box, Stack, SxProps, Theme } from "@mui/material"

const MessageItem = ({
  text,
  username,
  date,
  userType,
}: {
  text: string
  username: string
  date: string
  userType: string
}) => {
  const style: SxProps<Theme> = {
    background: "#041f31",
    borderRadius: "10px",
    padding: "10px",
    alignSelf: "flex-end",
    mt: "12px",
    wordBreak: "break-all",
    width: "85%",
  }
  return (
    <Stack direction="row" spacing={1} alignItems="flex-end" mb="10px">
      <Box
        sx={{
          background: "#041f31",
          height: "40px",
          width: "40px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textTransform: "uppercase",
          color: "#64ffda",
        }}
      >
        {getRole(userType as Roles)[0]}
      </Box>
      <Box sx={style}>
        <Box
          sx={{
            color: "#a8b2d1",
            fontSize: "12px",
            display: "flex",
            justifyContent: "space-between",
            mb: "10px",
            "@media(max-width:640px)": {
              fontSize: "10px",
            },
          }}
        >
          <Box>{username}</Box>
          <Box>{getFormatedDate(date)}</Box>
        </Box>
        {text}
      </Box>
    </Stack>
  )
}

export default MessageItem
