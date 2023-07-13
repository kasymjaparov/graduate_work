import { useEffect, ReactNode } from "react"
import EmptyListPaper from "./EmptyListPaper"
import ErrorMessage from "./ErrorMessage"
import { tokensDark } from "@/app/providers/ThemeProvider"
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Skeleton,
  Stack,
  Box,
} from "@mui/material"

const HOCList = ({
  children,
  isLoading,
  isError,
  isSuccess,
  length,
  noLengthMessage,
  createLink,
  createText,
}: {
  children: ReactNode
  isLoading: boolean
  isError: boolean
  isSuccess: boolean
  length: number
  noLengthMessage: string
  createLink?: string
  createText?: string
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])
  if (isLoading) return <TableLoader />
  else if (isError) return <ErrorMessage />
  else if (isSuccess && length < 1)
    return (
      <EmptyListPaper
        createLink={createLink}
        createText={createText}
        title={noLengthMessage}
      />
    )
  return <>{children}</>
}
const TableLoader = () => {
  return (
    <Box
      sx={{
        paddingBottom: "30px",
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
            {...Array(3)
              .fill(5)
              .map((_, index) => (
                <TableRow key={index}>
                  {...Array(3)
                    .fill(5)
                    .map((_, index) => (
                      <TableCell
                        key={index}
                        sx={{
                          textTransform: "uppercase",
                          fontWeight: 700,
                        }}
                      >
                        <Skeleton variant="text" width={100} />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableHead>
        </Table>
      </TableContainer>
      {Array(6)
        .fill(5)
        .map((_, index) => (
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
            {Array(8)
              .fill(8)
              .map((_, index) => (
                <Stack
                  mb="20px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  key={index}
                >
                  <Box>
                    <Skeleton variant="text" width={50} />
                  </Box>
                  <Box>
                    <Skeleton variant="text" width={70} />
                  </Box>
                </Stack>
              ))}
            <Skeleton variant="rounded" height={33} width="100%" />
          </Paper>
        ))}
    </Box>
  )
}
export default HOCList
