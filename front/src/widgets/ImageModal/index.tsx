import React from "react"
import { IconButton, Modal } from "@mui/material"
import { Box } from "@mui/system"
import CloseIcon from "@mui/icons-material/Close"

interface IMyModal {
  open: boolean
  onClose: any
  style: React.CSSProperties
  url: string
}
const ImageModal: React.FC<IMyModal> = ({ open, onClose, style, url }) => {
  return (
    <Modal sx={style} open={open} onClose={onClose}>
      <Box
        sx={{
          width: "70%",
          textAlign: "center",
          "@media(max-width:900px)": {
            width: "95%",
          },
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            background: "rgba(0, 0, 0, 0.04)",
          }}
        >
          <CloseIcon sx={{ fontSize: "25px", color: "#fff" }} />
        </IconButton>
        <img
          style={{ maxWidth: "100%", maxHeight: "90vh" }}
          src={url}
          alt="user file"
        />
      </Box>
    </Modal>
  )
}

export default ImageModal
