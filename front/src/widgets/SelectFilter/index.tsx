import {
  FormControl,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  FormHelperText,
  InputLabel,
  ListItemText,
} from "@mui/material"

interface Props {
  value: any
  handleChangeValue: (event: SelectChangeEvent<string>) => void
  menuItems: { value: string | number; text: string }[]
  multiple?: boolean
  isAllExist?: boolean
  width?: string | number
  name?: string
  displayEmpty?: boolean
  isTransparent?: boolean
  inputLabel?: string
  error?: boolean
  elevation?: number
  errorMessage?: string
}
const SelectFilter = ({
  value,
  handleChangeValue,
  menuItems,
  multiple = false,
  isTransparent = false,
  inputLabel = "",
  displayEmpty = true,
  isAllExist = true,
  width = "100%",
  name = "",
  elevation = 1,
  error = false,
  errorMessage = "",
}: Props) => {
  return (
    <Paper
      elevation={elevation}
      sx={{
        border: "none",
        display: "flex",
        alignItems: "center",
        width: width,
        marginY: "10px",
        background: isTransparent ? "none" : "",
        p: 0,
      }}
    >
      <FormControl size="small" sx={{ width: "100%" }}>
        <InputLabel id="select">{inputLabel}</InputLabel>
        <Select
          id="select"
          name={name}
          label={inputLabel}
          displayEmpty={displayEmpty}
          sx={{ border: 0 }}
          value={value}
          multiple={multiple}
          error={error}
          onChange={handleChangeValue}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
                backgroundColor: "#0a192f",
              },
            },
          }}
        >
          {isAllExist && <MenuItem value="">Все</MenuItem>}
          {menuItems.map(item => (
            <MenuItem key={item.value} value={item.value}>
              <ListItemText primary={item.text} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText error={true}>{errorMessage}</FormHelperText>}
      </FormControl>
    </Paper>
  )
}

export default SelectFilter
