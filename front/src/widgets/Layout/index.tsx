import { useState } from "react"
import { Box, useMediaQuery } from "@mui/material"
import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"
import Navbar from "../Navbar"
import { useAppSelector } from "@/app/store"
import { selectUserProfile } from "@/features/Auth/store/selectors"
import { StatusResponse } from "@/shared/enums"
import BottomNav from "../BottomNav"

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 640px)")
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    !isNonMobile ? false : true
  )
  const { status: getProfileStatus } = useAppSelector(selectUserProfile)
  const isLoading = getProfileStatus === StatusResponse.LOADING
  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      {isNonMobile ? (
        <Sidebar
          isNonMobile={isNonMobile}
          drawerWidth={250}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          loading={isLoading}
        />
      ) : (
        <BottomNav loading={isLoading} />
      )}

      <Box flexGrow={1} sx={{ overflowX: "auto" }}>
        <Navbar
          isNonMobile={isNonMobile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          loading={isLoading}
        />
        <Box m="2rem 1rem">
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default Layout
