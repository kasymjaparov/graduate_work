import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Stack,
  Skeleton,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { styled } from "@mui/material/styles"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { useAppSelector } from "@/app/store"
import { selectUserProfile } from "@/features/Auth/store/selectors"
import { sidebarLinks } from "@/shared/data"

const BottomNav = ({ loading }: { loading: boolean }) => {
  const [activeBar, setActiveBar] = useState("")
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user: getProfileInfo } = useAppSelector(selectUserProfile)
  const userRole = getProfileInfo.type
  const BottomNavigationActionStyled = styled(BottomNavigationAction)(`
  color: #ccd6f6;
  &.Mui-selected {
    color: ${tokensDark.greenAccent[500]};
  };
   & .MuiBottomNavigationAction-label.Mui-selected {
    font-size: 10.3px;
    color: ${tokensDark.greenAccent[500]};
  };
`)
  useEffect(() => {
    if (pathname.length === 1) {
      setActiveBar(pathname)
    } else {
      setActiveBar(pathname.substring(1))
    }
  }, [pathname])
  return (
    <Paper
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9,
        background: tokensDark.primary[500],
        borderTop: "10x solid #242831",
      }}
      elevation={3}
    >
      <BottomNavigation
        showLabels={true}
        sx={{
          background: tokensDark.primary[500],
        }}
        value={activeBar}
        onChange={(_, newValue) => {
          navigate(newValue)
        }}
      >
        {loading
          ? Array(3)
              .fill(3)
              .map((_, index) => {
                return (
                  <Stack
                    alignItems="center"
                    key={index}
                    sx={{ pl: "12px", width: "100%", pt: "10px" }}
                  >
                    <Skeleton variant="circular" width={25} height={25} />
                    <Skeleton variant="text" width={41} height={13} />
                  </Stack>
                )
              })
          : sidebarLinks
              .filter(links => links.roles.includes(userRole))
              .map(link => {
                return (
                  <BottomNavigationActionStyled
                    value={link.href}
                    key={link.href}
                    label={link.text}
                    icon={<link.icon />}
                    disableRipple
                  />
                )
              })}
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
