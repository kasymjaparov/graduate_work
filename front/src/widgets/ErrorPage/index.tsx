import { Button, Stack, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { NavLink } from "react-router-dom"

const ErrorPage = ({ type }: { type: 404 | 403 }) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          width: "40%",
          margin: "20px auto 0 auto",
          "@media(max-width:968px)": {
            width: "60%",
          },
        }}
      >
        <Stack alignItems="center">
          <Typography
            component="h1"
            sx={{
              color: "#64ffda",
              fontSize: "clamp(100px, 25vw, 200px)",
            }}
          >
            {type}
          </Typography>
          <Typography
            sx={{
              color: "#ccd6f6",
              fontSize: "clamp(20px, 4vw, 40px)",
              textAlign: "center",
              mt: "-30px",
            }}
          >
            {type === 404 ? "Страница не найдена" : "Доступ закрыт"}
          </Typography>
        </Stack>
      </Box>
      <NavLink to="/">
        <Button
          sx={{
            border: "1px solid #64ffda",
            color: "#64ffda",
            padding: "0.75rem 1rem",
            "&:hover": {
              background: "rgb(100 255 218 / 10%)",
            },
            marginTop: "20px",
          }}
        >
          На главную
        </Button>
      </NavLink>
    </Box>
  )
}

export default ErrorPage
