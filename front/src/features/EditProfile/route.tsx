import AuthGuard from "@/app/providers/PermissionProvider"
import { Roles } from "@/shared/enums"
import { Outlet } from "react-router"
import Index from "./pages/Index"

const Route = {
  path: "edit_account",
  element: (
    <AuthGuard
      roles={[
        Roles.CLIENT,
        Roles.BUILDER,
        Roles.DESIGNER,
        Roles.PM,
        Roles.MEASURE,
      ]}
    >
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      path: "",
      element: <Index />,
    },
  ],
}

export default Route
