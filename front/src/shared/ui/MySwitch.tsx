import React from "react"
import { FormControl, Switch, Typography } from "@mui/material"

interface ISwitch {
  labelName: string
  value: boolean
  handleChange: () => void
}
const MySwitch: React.FC<ISwitch> = ({ labelName, value, handleChange }) => {
  return (
    <FormControl>
      <Typography sx={{ mb: "7px" }}>{labelName}</Typography>

      <Switch checked={value} onChange={handleChange} />
    </FormControl>
  )
}

export default MySwitch
