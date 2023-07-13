/**
*основные роли при авторизации
*@SUPERADMIN admin
*@CLIENT client
*@DESIGNER designer
*@BUILDER builder
*@MEASURE meauser
*@PM manager
 */
const enum Roles {
    SUPERADMIN = 'admin',
    CLIENT = 'client',
    DESIGNER = 'designer',
    BUILDER = 'builder',
    MEASURE = 'meauser',
    PM = 'manager'
}
export default Roles
