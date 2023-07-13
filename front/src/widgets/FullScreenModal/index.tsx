import { tokensDark } from "@/app/providers/ThemeProvider"
import { Box, IconButton, Modal } from "@mui/material"
import Paper from "@mui/material/Paper"
import CloseIcon from "@mui/icons-material/Close"

interface Props {
  open: boolean
  handleClose: () => void
  children: React.ReactNode
}
const FullScreenModal = ({ open, handleClose, children }: Props) => {
  return (
    <Modal sx={{ overflowY: "scroll" }} open={open} onClose={handleClose}>
      <Box
        sx={{
          width: "98vw",
          margin: "10px auto 10px auto",
          padding: "60px 20px",
          minHeight: "calc( 100vh - 20px )",
          background: tokensDark.primary[500],
          position: "relative",
        }}
        component={Paper}
      >
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </Modal>
  )
}

export default FullScreenModal
