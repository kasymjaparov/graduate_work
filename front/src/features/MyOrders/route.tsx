import AuthGuard from "@/app/providers/PermissionProvider"
import { Roles } from "@/shared/enums"
import { Outlet } from "react-router"
import Detail from "./pages/Detail/Detail"
import List from "./pages/List"

const Route = {
  path: "orders",
  element: (
    <AuthGuard
      roles={[
        Roles.CLIENT,
        Roles.PM,
        Roles.BUILDER,
        Roles.DESIGNER,
        Roles.MEASURE,
      ]}
    >
      <Outlet />
    </AuthGuard>
  ),
  children: [
    {
      path: "",
      element: <List />,
    },
    {
      path: ":id",
      element: <Detail />,
    },
  ],
}

export default Route
