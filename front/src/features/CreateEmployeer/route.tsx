import AuthGuard from "@/app/providers/PermissionProvider"
import { Roles } from "@/shared/enums"
import { Outlet } from "react-router"
import Index from "./pages/Index"

const Route = {
  path: "add_employees",
  element: (
    <AuthGuard roles={[Roles.PM]}>
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
