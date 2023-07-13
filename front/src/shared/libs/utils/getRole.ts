import { Roles } from "@/shared/enums";

export function getRole(role: Roles) {
    let result = ""
    switch (role) {
        case Roles.BUILDER:
            result = "Строитель"
            break;
        case Roles.DESIGNER:
            result = "Дизайнер"
            break;
        case Roles.MEASURE:
            result = "Замерщик"
            break;
        case Roles.SUPERADMIN:
            result = "Суперадмин"
            break;
        case Roles.PM:
            result = "Менеджер"
            break;
        case Roles.CLIENT:
            result = "Клиент"
            break;
        default:
            result = ""
            break;
    }
    return result
}