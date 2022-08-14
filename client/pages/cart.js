import styled from "styled-components"
import { useMutation } from "@apollo/client"

import { Button, Top } from "../components"
import { useContext } from "../context"
import { DELETE_MANY_CART } from "../gqls"

import { COLORS } from "../utils/const"
import CartContainer from "../containers/cart"

const ClearButton = styled(Button)`
    padding: 0;
    height: auto;
    background-color: transparent !important;
    color: ${COLORS.primary.purple};
`

const CartPage = () => {
    const { state: { cart }, dispatch } = useContext()

    const [deleteManyCart] = useMutation(DELETE_MANY_CART)

    const clearCart = () => {
        if (window.confirm("Очистить корзину?")) {
            deleteManyCart({
                variables: { where: { id: { in: cart.map(item => item.id) } } }
            })
            dispatch({
                type: 'setCart',
                data: []
            })
        }
    }

    return (
        <>
            <Top
                label={`Корзина (${cart.length})`}
                value={
                    <ClearButton
                        onClick={clearCart}
                    >
                        Очистить
                    </ClearButton>
                }
            />
            <CartContainer 
                cart={cart}
            />
        </>
    )
}

export default CartPage