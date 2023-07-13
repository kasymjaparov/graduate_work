import { ICommonForm } from "@/shared/types"
import {
  FormHelperText,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material"
import React from "react"

const MyTextArea: React.FC<ICommonForm> = ({
  labelName,
  placeholder = "",
  name,
  value,
  onChange,
  onBlur,
  error = false,
  errorMessage = "",
}) => {
  return (
    <Stack direction="column">
      <Typography sx={{ mb: "7px" }}>{labelName}</Typography>
      <TextareaAutosize
        cols={6}
        name={name}
        value={value}
        minRows={6}
        onChange={onChange}
        onBlur={onBlur}
        style={{
          marginTop: "3px",
          border: error ? "1px solid red" : "1px solid #405b6e",
          color: "#fff",
          borderRadius: "5px",
          padding: "8.5px 14px",
          background: "transparent",
        }}
        placeholder={placeholder}
      />
      {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
    </Stack>
  )
}

export default MyTextArea
