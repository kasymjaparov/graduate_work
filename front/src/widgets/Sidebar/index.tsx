import React from "react"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Box,
  Color,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import { ChevronLeft, ChevronRightOutlined } from "@mui/icons-material"
import FlexBetween from "@/shared/ui/FlexBetween"
import { tokensDark } from "@/app/providers/ThemeProvider"
import { sidebarLinks } from "@/shared/data"
import { Roles } from "@/shared/enums"
import { useAppSelector } from "@/app/store"
import { selectUserProfile } from "@/features/Auth/store/selectors"

interface SidebarProp {
  drawerWidth: number
  isSidebarOpen: boolean
  setIsSidebarOpen: any
  isNonMobile: boolean
  loading: boolean
}
const Sidebar: React.FC<SidebarProp> = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  loading,
}) => {
  const { pathname } = useLocation()
  const [active, setActive] = useState("")
  const navigate = useNavigate()
  const theme = useTheme()
  const { user: getProfileInfo } = useAppSelector(selectUserProfile)
  const userRole = getProfileInfo.type
  const isValidRole = (validedRoles: Roles[]): boolean => {
    return validedRoles.includes(userRole)
  }
  useEffect(() => {
    if (pathname.length === 1) {
      setActive(pathname)
    } else {
      setActive(pathname.substring(1))
    }
  }, [pathname])
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: (theme.palette.secondary as unknown as Color)[200],
              backgroundColor: (theme.palette.primary as unknown as Color)[500],
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 1rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography
                    sx={{ color: theme.palette.grey[100], cursor: "pointer" }}
                    variant="h4"
                    fontWeight="bold"
                    onClick={() => navigate("/")}
                  >
                    VKR
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {loading
                ? Array(5)
                    .fill(4)
                    .map((_, index) => {
                      return (
                        <Box key={index}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={2}
                            sx={{
                              height: "48px",
                              pl: "15px",
                            }}
                          >
                            <Skeleton
                              variant="circular"
                              width={28}
                              height={28}
                            />
                            <Skeleton
                              animation="wave"
                              variant="text"
                              width={130}
                            />
                          </Stack>
                          <Divider />
                        </Box>
                      )
                    })
                : sidebarLinks.map(({ text, href, ...link }) => {
                    if (!link.icon) {
                      return (
                        <Typography
                          key={text}
                          sx={{ m: "2.25rem 0 1rem 3rem" }}
                        >
                          {text}
                        </Typography>
                      )
                    } else if (!isValidRole(link.roles)) {
                      return
                    }
                    return (
                      <ListItem key={text} disablePadding>
                        <ListItemButton
                          onClick={() => {
                            navigate(href)
                            setActive(href)
                          }}
                          sx={{
                            paddingX: "10px",
                            color:
                              active === href
                                ? tokensDark.greenAccent[500]
                                : "#ccd6f6",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              ml: "0.1rem",
                              minWidth: "44px",
                              color:
                                active === href
                                  ? tokensDark.greenAccent[500]
                                  : "#ccd6f6",
                            }}
                          >
                            {<link.icon />}
                          </ListItemIcon>
                          <ListItemText primary={text} />
                          {active === href && (
                            <ChevronRightOutlined
                              sx={{
                                ml: "auto",
                                color: tokensDark.greenAccent[500],
                              }}
                            />
                          )}
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
