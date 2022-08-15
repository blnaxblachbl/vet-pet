import { useMemo } from "react"
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
    position: relative;

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
        z-index: 1;
        .remove {
            cursor: pointer;
            width: 18px;
            height: 18px;
        }
        .counter {
            width: 120px;
        }
    }
    .mask {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255,255,255,0.5);
        padding: 12px;
        font-size: 18px;
        font-weight: 600;
        display: flex;

        .text {
            text-align: center;
            color: ${COLORS.secondary.red};
            margin: auto;
        }
    }
    @media only screen and (max-width: 800px) {
        flex-wrap: wrap;
        .controls {
            width: 100%;
            align-items: flex-end;
            margin-top: 12px;
            .remove {
                display: none;
            }
            .counter {
                max-width: 200px;
                width: 50%;
                margin: 0;
            }
        }
    }
`

export const CartItem = ({ item, branch, ...props }) => {
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

    const inBrach = useMemo(() => {
        if (branch && item) {
            return !item.good.branchs.find(b => b.id === branch.id)
        }
        return false
    }, [item, branch])

    const deleted = useMemo(() => item.good.delete || !item.good.publish, [item])

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
                {/* <div className='organization number-of-lines-1'>{item.good.organization.name}</div> */}
                <div className='branch number-of-lines-1'>{item.good.branchs.map(item => item.address).join(", ")}</div>
            </div>
            <div className='controls'>
                <CloseIcon onClick={() => removeCart(item)} className='remove' />
                <CartButton
                    good={item.good}
                    controllsContainerClassName='counter'
                />
            </div>
            {
                deleted && (
                    <div className="mask">
                        <div className="text">Товар больше не продается</div>
                    </div>
                )
            }
            {
                !deleted && inBrach && (
                    <div className="mask">
                        <div className="text">Нет в выбраном филиале</div>
                    </div>
                )
            }
        </Container>
    )
}