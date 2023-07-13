import { addHours } from "./addHours"
import { getTimeZone } from "./getTimezone"

/**
 * Форматирование даты для таблиц
 * @param initDate string
 * @returns отформатированная дата. Н-р: 22.02.2022, 22:22
 */
const getFormatedDate = (initDate: string): string => {
    const formatedDate = addHours(
        new Date(initDate),
        getTimeZone()
    ).toLocaleString()
    return formatedDate
}
export default getFormatedDate
