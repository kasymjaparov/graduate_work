import { tokensDark } from "@/app/providers/ThemeProvider"
import { ICommonForm } from "@/shared/types"
import { Button, FormControl, FormHelperText, Typography } from "@mui/material"
import React from "react"

interface IFileInput extends ICommonForm {
  multiple: boolean
  buttonLabel?: string
  accept?: string
  setFieldTouched: (field: string) => void
}
const MyFileInput: React.FC<IFileInput> = ({
  setFieldTouched,
  error = false,
  errorMessage = "",
  name,
  onChange,
  labelName,
  multiple = false,
  buttonLabel = labelName,
  accept = "image/*",
}) => {
  let random = Math.random() * 1000
  return (
    <FormControl>
      <Typography sx={{ mb: "7px" }}>{labelName}</Typography>

      <input
        name={name}
        onChange={onChange}
        type="file"
        accept={accept}
        style={{ display: "none" }}
        id={random + " btn"}
        multiple={multiple}
      />
      <label htmlFor={random + " btn"}>
        <Button
          fullWidth
          sx={{
            marginTop: "3px",
            color: tokensDark.primary[100],
          }}
          variant="outlined"
          component="span"
          onBlur={() => setFieldTouched(name)}
        >
          {buttonLabel}
        </Button>
      </label>
      {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default MyFileInput
