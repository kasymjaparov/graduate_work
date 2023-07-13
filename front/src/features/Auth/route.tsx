import { Outlet } from "react-router"
import { Login, Registration } from "./ui/pages"

const Route = {
  path: "auth",
  element: <Outlet />,
  children: [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "registration",
      element: <Registration />,
    },
  ],
}

export default Route
