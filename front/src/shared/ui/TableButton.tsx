import { Button, SxProps } from "@mui/material"

const TableButton = ({
  iconClassName,
  styles,
}: {
  iconClassName: string
  styles?: SxProps
}) => (
  <Button
    sx={{
      width: "40px",
      height: "40px",
      p: 0,
      "& i": {
        fontSize: 20,
      },
      ...styles,
    }}
  >
    <i className={iconClassName} aria-hidden="true" />
  </Button>
)
export default TableButton
