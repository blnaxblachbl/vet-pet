import { useMemo } from "react"
import styled from "styled-components"
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"

import PlusIcon from '../public/icons/plus.svg'
import MinusIcon from '../public/icons/minus.svg'

import { Button } from "."
import { useContext } from "../context"
import { COLORS } from "../utils/const"

import { CREATE_ONE_CART, UPDATE_ONE_CART, DELETE_ONE_CART } from "../gqls"
import { useUser } from "../utils/hooks"

const MainButton = styled(props => <Button {...props} />)`
    white-space: nowrap;
    padding-left: 0;
    padding-right: 0;
`
const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 400;
    font-size: 16px;
    height: 36px;
`
const CountControl = styled(props => <Button {...props} />)`
    width: auto;
    height: auto;
    padding: 6px;
    background-color: ${COLORS.secondary.lightGray};
    border-radius: 12px;
    box-sizing: border-box;
    svg {
        width: 18px;
        height: 18px;
        path {
            fill: ${COLORS.primary.camel};
        }
    }
`

export const CartButton = ({
    good = null,
    buttonClassName = '',
    controllsClassName = '',
    controllsContainerClassName = '',
    children = null,
    onAdd = () => { }
}) => {
    const { state, dispatch } = useContext()
    const { user } = useUser()

    const [createCart] = useMutation(CREATE_ONE_CART, {
        onCompleted: ({ createOneCart }) => {
            if (createOneCart) {
                dispatch({
                    type: "setCartByProductId",
                    data: createOneCart
                })
                // document.cookie = cookie.serialize("cart", state.cart, { maxAge: 60 * 60 * 24 * 30 })
            }
        },
        onError: e => { }
    })
    const [updateCart] = useMutation(UPDATE_ONE_CART)
    const [deleteCart] = useMutation(DELETE_ONE_CART)

    const inCart = useMemo(() => good && state.cart.find(item => item.good.id == good.id), [state.cart, good])

    const addToCart = () => {
        dispatch({
            type: "addToCart",
            data: {
                id: new Date().getTime(),
                count: 1,
                good
            }
        })
        createCart({
            variables: {
                data: {
                    good: {
                        connect: { id: good.id }
                    },
                    user: user ? { connect: { id: user.id } } : undefined
                }
            }
        })
        onAdd(good)
        toast.success("Товар доьавлен в корзину")
    }

    const increaseCount = () => {
        if (!good.delete && good.publish) {
            if (inCart.count < 51) {
                updateCart({
                    variables: {
                        where: { id: inCart.id },
                        data: {
                            count: {
                                increment: 1
                            }
                        }
                    }
                })
                dispatch({
                    type: 'increaseCount',
                    data: {
                        id: inCart.id
                    }
                })
            } else {
                toast.warning("Нельзя добавить больше")
            }
        }
    }

    const decreaseCount = () => {
        if (!good.delete && good.publish) {
            if (inCart.count === 1) {
                deleteCart({
                    variables: {
                        where: { id: inCart.id }
                    }
                })
                dispatch({
                    type: 'removeFromCart',
                    data: {
                        id: inCart.id
                    }
                })
                toast.warning("Товар удален из корзины")
            } else {
                updateCart({
                    variables: {
                        where: { id: inCart.id },
                        data: {
                            count: {
                                decrement: 1
                            }
                        }
                    }
                })
                dispatch({
                    type: 'decreaseCount',
                    data: {
                        id: inCart.id
                    }
                })
            }
        }
    }

    if (!good) {
        return null
    }

    if (inCart) {
        return (
            <Container className={controllsContainerClassName}>
                <CountControl onClick={decreaseCount} className={controllsClassName}>
                    <MinusIcon />
                </CountControl>
                <div>
                    {inCart.count > 99 ? "99+" : inCart.count}
                </div>
                <CountControl onClick={increaseCount} className={controllsClassName}>
                    <PlusIcon />
                </CountControl>
            </Container>
        )
    }

    return (
        <MainButton
            className={buttonClassName}
            onClick={addToCart}
        >
            {children ? children : "В корзину"}
        </MainButton>
    )
}