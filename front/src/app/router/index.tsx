import { AuthRouter } from "@/features/Auth"
import { CreateEmployerRoute } from "@/features/CreateEmployeer"
import { CreateOrderRoute } from "@/features/CreateOrder"
import { EditProfileRoute } from "@/features/EditProfile"
import { MyOrdersRoute } from "@/features/MyOrders"
import { Dashboard, ErrorPage, Layout } from "@/widgets"
import { useRoutes } from "react-router"

const MyRoutes = () => {
  const myRouter = useRoutes([
    AuthRouter,
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <Dashboard /> },
        CreateOrderRoute,
        EditProfileRoute,
        MyOrdersRoute,
        CreateEmployerRoute,
      ],
    },
    { path: "*", element: <ErrorPage type={404} /> },
  ])
  return myRouter
}
export default MyRoutes
