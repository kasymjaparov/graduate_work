import CreateIcon from "@mui/icons-material/Create"
import StraightenIcon from "@mui/icons-material/Straighten"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import HandymanIcon from "@mui/icons-material/Handyman"
import ArticleIcon from "@mui/icons-material/Article"
import PersonIcon from '@mui/icons-material/Person'
import SearchIcon from '@mui/icons-material/Search'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AttachFileIcon from '@mui/icons-material/AttachFile'

export const userTimelines = [
    {
        icon: CreateIcon,
        iconBackgroundColor: "#64ffda",
        title: "Сделать заказ",
        description: "Вы заполните анкету для создания заказа.",
    },
    {
        icon: StraightenIcon,
        iconBackgroundColor: "#63fdff",
        title: "Специалист назначает время замера",
        description: "Замерщик заранее оповещает о том когда будет замер.",
    },
    {
        icon: CheckCircleIcon,
        iconBackgroundColor: "#00cc9b",
        title: "Окончательный дизайн",
        description:
            "Вам будет предоставлен дизайн будущего ремонта, который вы должны подтвердить.",
    },
    {
        icon: HandymanIcon,
        iconBackgroundColor: "#ffda63",
        title: "Отчеты по работе",
        description:
            "Вы будете получать ежедневные фотоотчеты с описаниями по проделанной работе.",
    },
    {
        icon: ArticleIcon,
        iconBackgroundColor: "#34b1db",
        title: "Подписание акта об окончании работ",
        description: "После окончания работ нужно подписать акт.",
    },
]
export const pmTimelines = [
    {
        icon: PersonIcon,
        iconBackgroundColor: "#ffda63",
        title: "Добавить сотрудника",
        description: "Вы можете добавлять сотрудника указав его логин и пароль и должность.",
    },
    {
        icon: CreateIcon,
        iconBackgroundColor: "#1fbff4",
        title: "Обработка заказа",
        description: "Назначьте ответственных или укажите причину отказа заявки.",
    },
    {
        icon: SearchIcon,
        iconBackgroundColor: "#00cc9b",
        title: "Следите за ходом всего проекта",
        description: "У вас есть возможность просматривать все этапы ремонта.",
    }
]
export const meauserTimelines = [
    {
        icon: AccessTimeIcon,
        iconBackgroundColor: "#da63ff",
        title: "Установить время замера",
        description: "Вы должны установить предварительное время замера, когда вы прибудете на объект.",
    },
    {
        icon: AttachFileIcon,
        iconBackgroundColor: "#1fbff4",
        title: "Прикрепить замер",
        description: "Прикрепите файл с замерами и комментарием по ним.",
    }
]
export const designerTimelines = [
    {
        icon: AccessTimeIcon,
        iconBackgroundColor: "#ff8c63",
        title: "Укажите предварительное время готового дизайна",
        description: "Укажите дедлайн готовности дизайна.",
    },
    {
        icon: AttachFileIcon,
        iconBackgroundColor: "#ff6388",
        title: "Прикрепить дизайн",
        description: "Прикрепите дизайн и комментарии по нему.",
    }
]
export const builderTimelines = [
    {
        icon: AttachFileIcon,
        iconBackgroundColor: "#ff6388",
        title: "Прикрепить отчет по проделанной работе",
        description: "Прикрепить отчет по проделанной работе",
    }
]