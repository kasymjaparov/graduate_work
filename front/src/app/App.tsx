import { BrowserRouter } from "react-router-dom"
import {
  createTheme,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
} from "@mui/material"
import { useEffect, useMemo } from "react"
import { themeSettings } from "./providers/ThemeProvider"
import MyRoutes from "./router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useAppDispatch } from "./store"
import { getProfileInfo } from "@/features/Auth/store/actions"
import { ScrollToTop } from "@/shared/libs"

export const App = () => {
  const dispatch = useAppDispatch()
  const theme = useMemo(
    () => createTheme(themeSettings("dark") as ThemeOptions),
    ["dark"]
  )
  useEffect(() => {
    dispatch(getProfileInfo()) // получаем информацию о юзере
  }, [])
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MyRoutes />
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}
