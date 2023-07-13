import { tokensDark } from "@/app/providers/ThemeProvider"
import { getFormatedDate, getStatusBtn } from "@/shared/libs"
import { Header, HOCList, SelectFilter } from "@/widgets"
import CustomPagination from "@/widgets/Pagination"
import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { NavLink } from "react-router-dom"
import Row from "./components/Row"
import useMyOrders from "./useMyOrders"

const MyOrders = () => {
  const {
    list,
    isLoading,
    isSuccess,
    isError,
    tableHeaders,
    page,
    handleChangePage,
    filter,
    handleChangeFilter,
    statuses,
  } = useMyOrders()

  return (
    <div>
      <Header title="Список заказов" subtitle=""></Header>
      <Box
        sx={{
          maxWidth: "400px",
          "@media(max-width:640px)": {
            maxWidth: "100%",
          },
        }}
      >
        <Typography>Статус</Typography>
        <SelectFilter
          isAllExist={true}
          width="100%"
          name="status"
          value={filter.status}
          handleChangeValue={handleChangeFilter}
          menuItems={statuses}
          isTransparent
        />
      </Box>
      <HOCList
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        length={list.items.length}
        noLengthMessage={"У вас нет заказов"}
        createLink={``}
        createText=""
      >
        <Box
          sx={{
            paddingBottom: list.pages <= 1 ? "50px" : "10px",
          }}
        >
          <TableContainer
            sx={{
              background: tokensDark.primary[500],
              display: "block",
              "@media(max-width:640px)": {
                display: "none",
              },
            }}
            component={Paper}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeaders.map((tableHeader: string) => (
                    <TableCell
                      key={tableHeader}
                      sx={{
                        textTransform: "uppercase",
                      }}
                    >
                      {tableHeader}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {list.items.map((row, index) => (
                  <Row key={index} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {list.items.map((row, index) => {
            return (
              <Paper
                key={index}
                sx={{
                  p: "20px",
                  mb: "16px",
                  display: "none",
                  background: tokensDark.primary[500],
                  "@media(max-width:640px)": {
                    display: "block",
                  },
                }}
              >
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>ID</Typography>
                  <Typography>{row.id}</Typography>
                </Stack>
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Адрес</Typography>
                  <Typography>{row.address}</Typography>
                </Stack>
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Количество комнат</Typography>
                  <Typography>{row.room_amount}</Typography>
                </Stack>
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Площадь</Typography>
                  <Box>
                    {row.square ? (
                      <Typography>
                        {row.square}м<sup>2</sup>
                      </Typography>
                    ) : (
                      "-"
                    )}
                  </Box>
                </Stack>
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Статус</Typography>
                  <Box>
                    {getStatusBtn(row.status) ? (
                      <Chip
                        variant="outlined"
                        sx={{
                          border: `1px solid ${
                            getStatusBtn(row.status)?.color
                          }`,
                          color: `${getStatusBtn(row.status)?.color}`,
                          fontSize: "13px",
                        }}
                        label={getStatusBtn(row.status)?.text}
                      />
                    ) : null}
                  </Box>
                </Stack>
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Дата создания</Typography>
                  <Typography>{getFormatedDate(row.created_at)}</Typography>
                </Stack>
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography>Клиент</Typography>
                  <Typography>{row?.client?.email}</Typography>
                </Stack>
                <NavLink to={`${row.id}`}>
                  <Button
                    sx={{
                      border: "1px solid #64ffda",
                      color: "#64ffda",
                      "&:hover": {
                        background: "rgb(100 255 218 / 10%)",
                      },
                    }}
                    fullWidth
                  >
                    Посмотреть
                  </Button>
                </NavLink>
              </Paper>
            )
          })}
        </Box>
        <CustomPagination
          handleChangePage={handleChangePage}
          defaultPage={page}
          totalCount={list.total}
          currentPage={page}
          limit={list.size}
          pagesCount={list.pages}
        />
      </HOCList>
    </div>
  )
}

export default MyOrders
