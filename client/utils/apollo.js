import {
    ApolloClient,
    InMemoryCache,
    ApolloLink,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { setContext } from '@apollo/client/link/context'
import cookie from 'cookie'
import createUploadLink from "apollo-upload-client/public/createUploadLink.js"
import { toast } from "react-toastify"

const domain = 'http://192.168.31.22:4000'

export const host = process.env.NODE_ENV === 'production' ? domain : 'http://localhost:4000'
// export const host = domain

export let client

const isServer = typeof window === 'undefined'
const windowApolloState = !isServer && window.__NEXT_DATA__.apolloState

export const initApollo = (token = '', forceNew = false, nextHeaders = null) => {

    if (!client || forceNew) {
        const URL = !isServer ? `${host}/graphql` : 'http://localhost:4000/graphql'

        const uploadLink = createUploadLink({
            uri: URL,
            credentials: 'include'
        })

        const authLink = setContext(() => {
            let _token = ''
            if (!isServer) {
                const { token } = cookie.parse(document.cookie)
                _token = token ? token : ''
            } else {
                _token = token
            }
            return {
                headers: {
                    ...nextHeaders,
                    authorization: 'Bearer ' + _token
                }
            }
        })

        const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
            if (graphQLErrors) {
                graphQLErrors.map(async ({ message, locations, path }) => {
                    console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
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
                            // localStorage.removeItem("token")
                            // console.log(operation)
                            document.cookie = cookie.serialize('token', '', { maxAge: 0 })
                            // operation.setContext(({ headers }) => {
                            //     return {
                            //         headers: {
                            //             ...headers,
                            //             authorization: ""
                            //         }
                            //     }
                            // })
                            // console.log("forward")
                            // return forward(operation)
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
                        case "code incorrect": {
                            toast.error("Не верный код")
                            break
                        }
                        default: {
                            toast.error("Что то пошло не так, повторите попытку позже")
                            break
                        }
                    }
                })
                // return graphQLErrors
            }
            if (networkError) {
                console.error(`[Network error]: ${networkError}`)
                // return networkError
            }
            // return {}
        })

        const link = ApolloLink.from([errorLink, authLink, uploadLink])

        const apollo = new ApolloClient({
            ssrMode: isServer,
            link,
            cache: new InMemoryCache().restore(windowApolloState || {}),
            credentials: 'include'
        })
        client = apollo
    }

    return client
}