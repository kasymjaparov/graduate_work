/**Получение полного имени юзера
 * @params first_name
 * @params last_name
 * @params second_name
 * @return Example: Иванов Иван Иванович
 */
export const getFullName = (first_name: string, last_name: string, second_name: string) => `${second_name} ${first_name} ${last_name}`