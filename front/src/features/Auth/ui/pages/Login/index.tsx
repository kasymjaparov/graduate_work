import { Box, useMediaQuery, Grid } from "@mui/material"
import { Wave } from "../../components"
import Form from "./Form"

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 968px)")
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      paddingX="5%"
      spacing={5}
      paddingTop={isNonMobileScreens ? "50px" : "20px"}
      sx={{
        height: "100vh",
        overflowX: "hidden",
      }}
    >
      <Grid item md={6} xs={12}>
        <Form />
      </Grid>
      <Box
        sx={{
          position: "fixed",
          bottom: "0",
          left: "0",
          overflowX: "hidden",
          width: "100vw",
          "& img": {
            width: "100%",
            objectFit: "cover",
            "@media(max-width:640px)": {
              width: "200%",
            },
          },
        }}
      >
        <Wave />
      </Box>
    </Grid>
  )
}

export default LoginPage
