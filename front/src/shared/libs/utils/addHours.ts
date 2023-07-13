export const addHours = (date: Date, hours: number) => {
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    return date;
}