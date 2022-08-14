import { useMemo } from 'react'
import styled from 'styled-components'
// import Link from 'next/link'

// import CloseIcon from '../../public/icons/close.svg'

import { Button, CartItem } from '../../components'
import { COLORS } from '../../utils/const'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    .list {
        width: calc(70% - 6px);
        display: grid;
        grid-gap: 12px;
    }
    .to-order {
        width: calc(30% - 6px);
        position: relative;
        .info-container {
            position: sticky;
            top: 24px;
            padding: 12px;
            background-color: ${COLORS.primary.white};
            border-radius: 12px;
            color: ${COLORS.primary.black};
            box-sizing: border-box;
            .title {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 6px;
            }
            .order-button {
                width: 100%;
            }
        }
    }
    @media only screen and (max-width: 800px) {
        flex-direction: column-reverse;
        .to-order {
            margin-bottom: 12px;
            width: 100%;
        }
        .list {
            grid-template-columns: 1fr 1fr;
            width: 100%;
        }
    }
    @media only screen and (max-width: 700px) {
        .list {
            grid-template-columns: 1fr;
        }
    }
`
const LabledValue = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: solid 1px ${COLORS.secondary.lightGray};
    margin-bottom: 12px;
    padding: 6px 0;
    :last-child {
        margin-bottom: 0;
    }

    .label {
        color: ${COLORS.secondary.gray};
        font-size: 14px;
        margin-right: 6px;
    }
    .value {
        color: ${COLORS.primary.black};
        font-size: 16px;
        text-align: right;
        white-space: pre-wrap;
    }
    .bold {
        font-weight: bold;
    }
    .hard {
        font-size: 18px;
        color: ${COLORS.primary.black};
    }
    a {
        color: ${COLORS.primary.purple};
    }
    .link {
        color: ${COLORS.primary.purple};
        cursor: pointer;
        ::after {
            content: ", "
        }
        :last-child {
            ::after {
                content: ""
            }
        }
    }
`

const CartContainer = ({ cart = [] }) => {

    const organization = useMemo(() => cart.length > 0 ? cart[0].good.organization : {}, [cart])
    const branch = useMemo(() => cart.length ? cart[0].good.branchs[0] : {}, [cart])

    const total = useMemo(() => {
        return cart.reduce((acc, item) => {
            if (item.good.publish && !item.good.delete) {
                acc = acc + item.good.price * item.count
            }
            return acc
        }, 0)
    }, [cart])

    return (
        <Container>
            <div className='list'>
                {
                    cart.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            className='cart-item'
                        />
                    ))
                }
            </div>
            <div className='to-order'>
                <div className='info-container'>
                    <div className='title'>Оформление</div>
                    <LabledValue>
                        <div className='label'>Организаци</div>
                        <div className='value'>{organization.name}</div>
                    </LabledValue>
                    <LabledValue>
                        <div className='label'>Филиал</div>
                        <div className='value'>{branch.address}</div>
                    </LabledValue>
                    <LabledValue>
                        <div className='label hard'>Итого</div>
                        <div className='value hard bold'>{total} ₽</div>
                    </LabledValue>
                    <Button className={'order-button'}>
                        Оформить
                    </Button>
                </div>
            </div>
        </Container>
    )
}

export default CartContainer