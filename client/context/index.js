import { createContext, useReducer, useContext as useReactContext, useEffect } from 'react'
import { contextReducer } from './reducer'
import cookie from 'cookie'
import { useApolloClient } from '@apollo/client'
import { FIND_MANY_CART } from '../gqls'
import { useUser } from '../utils/hooks'

const Context = createContext()

const ContextProvider = ({ children }) => {
    const client = useApolloClient()
    const [state, dispatch] = useReducer(contextReducer, { cart: [] })
    const { user } = useUser()

    const value = { state, dispatch }

    useEffect(() => {
        checkCart()
    }, [])

    const checkCart = async () => {
        const userCart = user ? user.carts.map(c => c.id) : []
        const { cart } = cookie.parse(document.cookie)
        const _cart = cart ? [...new Set([...JSON.parse(cart), ...userCart])] : userCart
        if (_cart && _cart.length > 0) {
            const { data } = await client.query({
                query: FIND_MANY_CART,
                variables: {
                    distinct: ['goodId'],
                    where: { id: { in: _cart } }
                },
            })
            if (data && data.findManyCart) {
                dispatch({
                    type: "setCart",
                    data: data.findManyCart
                })
            }
        }
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

export const useContext = () => {
    const context = useReactContext(Context)
    if (context === undefined) {
        throw new Error('useCount must be used within a CountProvider')
    }
    return context
}

export default ContextProvider