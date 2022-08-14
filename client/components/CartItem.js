import styled from "styled-components"
import Link from "next/link"
import { useMutation } from '@apollo/client'
import { toast } from 'react-toastify'

import CloseIcon from '../public/icons/close.svg'

import { DELETE_ONE_CART } from "../gqls"
import { CartButton, Image } from "."
import { COLORS } from "../utils/const"
import { useContext } from "../context"

const Container = styled.div`
    display: flex;
    padding: 6px 0;
    border-bottom: solid 1px ${COLORS.secondary.lightGray};

    .image {
        width: 100px;
        height: 100px;
        border-radius: 12px;
        object-fit: cover;
        margin-right: 12px;
    }
    .good {
        .name {
            font-size: 18px;
            font-weight: bold;
        }
        .organization {
            font-size: 14px;
        }
        .branch {
            font-size: 14px;
        }
        .price {
            font-size: 18px;
            font-weight: normal;
        }
    }
    .controls {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: space-between;
        margin-left: auto;
        .remove {
            cursor: pointer;
            width: 18px;
            height: 18px;
        }
        .counter {
            width: 120px;
        }
    }
    @media only screen and (max-width: 800px) {
        flex-direction: column;
        align-items: center;
        .image {
            width: 100%;
            height: auto;
            aspect-ratio: 1/1;
            margin-bottom: 12px;
            margin-right: 0;
        }
        .good {
            width: 100%;
            margin-bottom: 12px;
            .name {
                line-height: 24px;
                height: 48px;
            }
        }
        .controls {
            width: 100%;
            align-items: center;
            .remove {
                display: none;
            }
            .counter {
                width: 80%;
                margin: 0;
            }
        }
    }
`

export const CartItem = ({ item, ...props }) => {
    const { dispatch } = useContext()

    const [deleteCart] = useMutation(DELETE_ONE_CART)

    const removeCart = (cart) => {
        deleteCart({
            variables: {
                where: { id: cart.id }
            }
        })
        dispatch({
            type: "removeFromCart",
            data: cart
        })
        toast.warning("Товар удален из корзины")
    }

    if (!item) return null

    return (
        <Container {...props}>
            <Link href={`/good/${item.good.id}`}>
                <Image
                    src={item.good.images[0]}
                    className='image'
                />
            </Link>
            <div className='good'>
                <Link href={`/good/${item.good.id}`}>
                    <div className='name number-of-lines-2'>{item.good.name}</div>
                </Link>
                <div className='price'>{item.good.price} ₽</div>
                <div className='organization number-of-lines-1'>{item.good.organization.name}</div>
                <div className='branch number-of-lines-1'>{item.good.branchs.map(item => item.address).join(", ")}</div>
            </div>
            <div className='controls'>
                <CloseIcon onClick={() => removeCart(item)} className='remove' />
                <CartButton
                    good={item.good}
                    controllsContainerClassName='counter'
                />
            </div>
        </Container>
    )
}