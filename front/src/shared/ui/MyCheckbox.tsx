import { ICommonForm } from "@/shared/types"
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from "@mui/material"
import React from "react"

interface IChekbox extends ICommonForm {
  valueCheckBox: boolean
  widthOfLabel?: string
}
const MyCheckbox: React.FC<IChekbox> = ({
  labelName,
  onBlur,
  onChange,
  error,
  errorMessage,
  name,
  widthOfLabel = "50%",
  valueCheckBox,
}) => {
  return (
    <FormGroup sx={{ width: widthOfLabel }}>
      <FormControlLabel
        control={
          <Checkbox
            checked={valueCheckBox}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
          />
        }
        label={labelName}
      />
      {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
    </FormGroup>
  )
}

export default MyCheckbox
