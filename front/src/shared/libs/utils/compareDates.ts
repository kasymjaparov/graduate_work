
/**
 * Сравниватель двух дат
 * @param dateFirst - Date
 * @param dateSecond - Date
 * @returns 1(Первая дата больше) | 2(Вторая дата больше) | 0(Равны)
 */
export const compareDates = (dateFirst: Date, dateSecond: Date): number => {
    if (dateFirst.getTime() < dateSecond.getTime()) return 2
    else if (dateFirst.getTime() > dateSecond.getTime()) return 1
    else return 0
}


