import { Box, Skeleton } from "@mui/material"

const OrderSkeleton = () => {
  return (
    <Box>
      <Skeleton sx={{ mb: "9px" }} variant="text" height={38} width={200} />
      <table className="info_table">
        <tbody>
          {Array(5)
            .fill(5)
            .map((_, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Skeleton variant="text" width={100} height={38} />
                  </td>
                  <td>
                    <Skeleton variant="text" width={150} height={38} />
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </Box>
  )
}

export default OrderSkeleton
