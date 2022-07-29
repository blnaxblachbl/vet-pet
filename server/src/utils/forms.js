const htmlLoginPassword = (login, password, role = 'администратора') => `
    <h1>Здравствуйте, ваш пароль для входа на панель ${role} VetPet</h1>
    <p>Логин - ${login}</p>
    <p>Пароль - ${password}</p>
    <a href="${process.env.ADMIN_DOMAIN}">Ссылка на панель</a>
`

module.exports = {
    htmlLoginPassword
}