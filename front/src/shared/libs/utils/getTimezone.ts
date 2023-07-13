export const getTimeZone = (date: Date = new Date()) => {
    return date.getTimezoneOffset() / -60
}