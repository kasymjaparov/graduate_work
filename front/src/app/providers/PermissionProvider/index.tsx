import { useAppSelector } from "@/app/store"
import { selectUserRole } from "@/features/Auth/store/selectors"
import ErrorPage from "@/widgets/ErrorPage"

/**
 *Мидлвейр-роут для защищенных роутов
 *@children элемент, который нужно обвернуть
 *@roles массив, с ролями для определенных юзеров
 */
const AuthGuard = ({
  children,
  roles,
}: {
  children: React.ReactNode
  roles: string[]
}) => {
  const token: string | null = window.localStorage.getItem("token")
  const role = useAppSelector(selectUserRole) // нынешняя роль юзера
  const userHasRequiredRole = roles.includes(role) // проверка юзера на данную роль для доступа
  if (!token && !role) return <ErrorPage type={404} />
  if (token && role && !userHasRequiredRole) return <ErrorPage type={403} />
  else return children as JSX.Element
}
export default AuthGuard
