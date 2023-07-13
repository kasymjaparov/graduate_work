import { Roles } from "@/shared/enums"
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CreateIcon from '@mui/icons-material/Create';
import HomeIcon from '@mui/icons-material/Home'

const shared = [{ text: "Главная", href: "/", roles: [Roles.CLIENT, Roles.PM, Roles.BUILDER, Roles.MEASURE, Roles.BUILDER, Roles.DESIGNER], icon: HomeIcon }]
const client = [
    { text: "Сделать заказ", href: `create_order`, roles: [Roles.CLIENT], icon: CreateIcon },
    { text: "Мои заказы", href: `orders`, roles: [Roles.CLIENT, Roles.PM, Roles.BUILDER, Roles.MEASURE, Roles.BUILDER, Roles.DESIGNER], icon: FormatListBulletedIcon },
]
const pm = [
    { text: "Добавить сотрудника", href: `add_employees`, roles: [Roles.PM], icon: CreateIcon },
]
const Links = [
    ...shared,
    ...client,
    ...pm,

]
export default Links