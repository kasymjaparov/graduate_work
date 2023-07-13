import { tokensDark } from "@/app/providers/ThemeProvider"
import { Box, Modal, Paper } from "@mui/material"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import { useState } from "react"
import { MyTextArea } from "@/shared/ui"

const PromptWithCommentModal = ({
  open,
  handleClose,
  text,
  placeholder,
  agreeCallback,
}: {
  open: boolean
  handleClose: () => void
  text: string
  placeholder: string
  agreeCallback: (text: string) => void
}) => {
  const [message, setMessage] = useState("")
  return (
    <Modal sx={{ overflowY: "scroll" }} open={open} onClose={handleClose}>
      <Box
        sx={{
          maxWidth: "500px",
          margin: "200px auto 10px auto",
          background: tokensDark.primary[500],
          padding: "20px",
          "@media(max-width:640px)": {
            maxWidth: "95%",
          },
        }}
        component={Paper}
      >
        <Typography sx={{ fontSize: "18px", fontWeight: 700 }}>
          {text}
        </Typography>
        <MyTextArea
          value={message}
          placeholder={placeholder}
          name="message"
          onBlur={() => {}}
          labelName=""
          onChange={(e: any) => setMessage(e.target.value)}
        />
        <Stack direction="row" spacing={2} sx={{ mt: "20px" }}>
          <Button sx={{ color: "#fff" }} onClick={handleClose}>
            Отмена
          </Button>
          <Button
            sx={{ color: "#fff" }}
            onClick={() => {
              agreeCallback(message)
              handleClose()
            }}
          >
            Да
          </Button>
        </Stack>
      </Box>
    </Modal>
  )
}

export default PromptWithCommentModal
