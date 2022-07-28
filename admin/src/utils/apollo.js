import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'
import { message as toast } from 'antd'

const uri = '/graphql'
export const host = 'http://localhost:4000'

const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token')
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
        graphQLErrors.map(async ({ message, locations, path }) => {
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )

            switch (message) {
                case "phone not provided": {
                    toast.error("Номер не отправлен")
                    break
                }
                case "can not send code": {
                    toast.error("Не удалось отправить код")
                    break
                }
                case "invalid token": {
                    // toast.error("Не удалось отправить код")
                    localStorage.removeItem("token")
                    break
                }
                case "user deleted": {
                    toast.error("Пользователь уделан")
                    break
                }
                case "user blocked": {
                    toast.error("Пользователь заблокирован")
                    break
                }
                case "user exist": {
                    toast.error("Такой пользователь уже существует")
                    break
                }
                case "user not found": {
                    toast.error("Пользователь не найден")
                    break
                }
                case "admin not exist": {
                    toast.error("Администратор не найден")
                    break
                }
                case "error signin": {
                    toast.error("Ошибка авторизации")
                    break
                }
                case "password incorrect": {
                    toast.error("Не верный логин или пароль")
                    break
                }
                case "password not confirmed": {
                    toast.error("Не верное подтверждение пароля")
                    break
                }
                case "admin exist": {
                    toast.error("Такой администратор уже существует")
                    break
                }
                default: {
                    toast.error("Что то пошло не так, повторите попытку позже")
                    break
                }
            }
        })
    }
    if (networkError) console.error(`[Network error]: ${networkError}`)
})

const uploadLink = createUploadLink({
    uri,
    credentials: 'include'
})

const link = ApolloLink.from([errorLink, authLink, uploadLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client
