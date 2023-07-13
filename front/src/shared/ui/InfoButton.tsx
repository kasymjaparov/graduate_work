import { Button } from "@mui/material"
import React from "react"

const editBtnStyle = {
  background: "#43a047",
  borderColor: "#43a047",
  color: "#fff",
  "&:hover": {
    background: "#43a047",
    borderColor: "#43a047",
    color: "#fff",
  },
}
const deleteBtnStyle = {
  background: "#fb1c52",
  borderColor: "#fb1c52",
  color: "#fff",
  "&:hover": {
    background: "#fb1c52",
    borderColor: "#fb1c52",
    color: "#fff",
  },
}
interface IInfoButton {
  text: string
  onClickEvent: () => void
  type: number
}
const InfoButton: React.FC<IInfoButton> = ({ onClickEvent, text, type }) => {
  return (
    <Button
      onClick={onClickEvent}
      sx={type === 1 ? editBtnStyle : deleteBtnStyle}
      variant="outlined"
    >
      {text}
    </Button>
  )
}

export default InfoButton
