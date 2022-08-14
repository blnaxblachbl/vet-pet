import cookie from 'cookie'

const cookieOptions = {
    maxAge: 60 * 60 * 24 * 30,
    // httpOnly: process.env.NODE_ENV === 'production' ? false : true,
    // path: '/'
}

export const contextReducer = (state, action) => {
    switch (action.type) {
        case 'addToCart': {
            return {
                ...state,
                cart: [action.data, ...state.cart]
            }
        }
        case 'removeFromCart': {
            const newCart = state.cart.filter(cart => cart.id !== action.data.id)
            return {
                ...state,
                cart: newCart
            }
        }
        case 'setCart': {
            if (Array.isArray(action.data)) {
                const newCart = [...action.data]
                document.cookie = cookie.serialize("cart", JSON.stringify(newCart.map(c => c.id)), cookieOptions)
                return {
                    ...state,
                    cart: newCart
                }
            } else {
                throw new Error("Data is not array")
            }
        }
        case 'setCartByProductId': {
            const newCart = state.cart.map(item => item.good.id === action.data.good.id ? action.data : item)
            document.cookie = cookie.serialize("cart", JSON.stringify(newCart.map(c => c.id)), cookieOptions)
            return {
                ...state,
                cart: newCart
            }
        }
        case 'increaseCount': {
            const cartItem = state.cart.map(item => item.id === action.data.id ? { ...item, count: item.count + 1 } : item)
            return {
                ...state,
                cart: cartItem
            }
        }
        case 'decreaseCount': {
            const cartItem = state.cart.map(item => item.id === action.data.id ? { ...item, count: item.count - 1 } : item)
            return {
                ...state,
                cart: cartItem
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}