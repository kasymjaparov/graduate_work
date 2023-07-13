import { ICommonForm } from "@/shared/types"
import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material"
import React from "react"
interface IMenuItem {
  value: string | number
  text: string
}
interface ISelect extends ICommonForm {
  defaultValue: string | number
  items: IMenuItem[]
  disabled?: boolean
  showNothing?: boolean
}
const MySelect: React.FC<ISelect> = ({
  labelName,
  value,
  items,
  defaultValue,
  name,
  onChange,
  disabled = false,
  onBlur,
  error = false,
  errorMessage = "",
  showNothing = true,
}) => {
  return (
    <FormControl sx={{ width: "100%", marginTop: "16px" }}>
      <Typography sx={{ mb: "7px" }}>{labelName}</Typography>

      <Select
        error={error}
        value={value}
        disabled={disabled}
        name={name}
        displayEmpty
        onChange={onChange}
        onBlur={onBlur}
        defaultValue={defaultValue}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 48 * 4.5 + 8,
              width: 250,
              backgroundColor: "#0a192f",
            },
          },
        }}
        size="small"
      >
        {showNothing ? (
          <MenuItem value={0} disabled>
            ---
          </MenuItem>
        ) : null}

        {items.map((selectObj, index) => (
          <MenuItem key={index} value={selectObj.value}>
            {selectObj.text}
          </MenuItem>
        ))}
      </Select>
      {error && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  )
}

export default MySelect
