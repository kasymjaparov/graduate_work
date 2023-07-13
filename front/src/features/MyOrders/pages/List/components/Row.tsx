import { Chip, TableCell, TableRow } from "@mui/material"
import { NavLink } from "react-router-dom"
import { Order } from "@/features/MyOrders/type"
import { getFormatedDate } from "@/shared/libs"
import { getStatusBtn } from "@/shared/libs/utils/getStatusBtn"
import { TableButton } from "@/shared/ui"

interface IRow {
  row: Order
}
const Row: React.FC<IRow> = ({ row }) => {
  return (
    <TableRow
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
      }}
    >
      <TableCell>{row.address}</TableCell>
      <TableCell>{row.room_amount}</TableCell>
      <TableCell>
        {getStatusBtn(row.status) ? (
          <Chip
            variant="outlined"
            sx={{
              border: `1px solid ${getStatusBtn(row.status)?.color}`,
              color: `${getStatusBtn(row.status)?.color}`,
              fontSize: "13px",
            }}
            label={getStatusBtn(row.status)?.text}
          />
        ) : null}
      </TableCell>

      <TableCell>{getFormatedDate(row.created_at)}</TableCell>
      <TableCell>
        {row.square ? (
          <div>
            {row.square}м<sup>2</sup>
          </div>
        ) : (
          "-"
        )}
      </TableCell>
      <TableCell>{row?.client?.email}</TableCell>
      <TableCell align="left">
        <NavLink to={`${row.id}`}>
          <TableButton
            styles={{
              marginRight: "10px",
              border: "1px solid #64ffda",
              color: "#64ffda",
              padding: "0.75rem 1rem",
              "&:hover": {
                background: "rgb(100 255 218 / 10%)",
              },
            }}
            iconClassName="fa-sharp fa-solid fa-circle-info"
          />
        </NavLink>
      </TableCell>
    </TableRow>
  )
}

export default Row
