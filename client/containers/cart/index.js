import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { useRouter } from 'next/router'

import CloseIcon from '../../public/icons/close.svg'

import { Button, CartItem, Empty, Select } from '../../components'
import { COLORS } from '../../utils/const'
import { toast } from 'react-toastify'
import { useUser } from '../../utils/hooks'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    .list {
        width: calc(70% - 6px);
        .branch-name {
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 12px;
        }
        .items {
            grid-template-columns: 1fr;
            display: grid;
            grid-gap: 12px;
            background-color: ${COLORS.primary.white};
            border-radius: 12px;
            padding: 6px 12px;
            margin-bottom: 24px;
            box-sizing: border-box;
            :last-child {
                margin-bottom: 0;
            }
        }
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
            .info-container {
                position: unset;
            }
        }
        .list {
            width: 100%;
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
const Note = styled.div`
    display: ${({ show }) => show ? "block" : "none"};
    color: ${COLORS.secondary.red};
    font-size: 16px;
    background-color: ${COLORS.primary.white};
    border-radius: 12px;
    padding: 6px 12px;
    box-sizing: border-box;
    margin-bottom: 24px;
    svg {
        display: block;
        cursor: pointer;
        margin-left: auto;
    }
    @media only screen and (max-width: 800px) {
        margin-bottom: 12px;
    }
`
const Filters = styled.div`
    margin-bottom: 24px;
    .branch-select {
        width: fit-content;
    }
    @media only screen and (max-width: 800px) {
        margin-bottom: 12px;
        .branch-select {
            width: 100%;
        }
    }
`

const CartContainer = ({ cart = [] }) => {
    const [branch, setBranch] = useState(undefined)
    const router = useRouter()
    const { user } = useUser()

    const organization = useMemo(() => cart.length > 0 ? cart[0].good.organization : {}, [cart])
    const branchs = useMemo(() => cart.reduce((acc, { good: { branchs } }) => {
        for (let b of branchs) {
            if (!acc.find(a => a.id === b.id)) {
                acc.push(b)
            }
        }
        return acc
    }, []), [cart])

    const total = useMemo(() => {
        if (branch) {
            return cart.reduce((acc, item) => {
                if (item.good.publish && !item.good.delete && item.good.branchs.find(b => b.id === branch.id)) {
                    acc = acc + item.good.price * item.count
                }
                return acc
            }, 0)
        }
        return 0
    }, [branch, cart])

    const goodCount = useMemo(() => {
        if (branch) {
            return cart.reduce((acc, item) => {
                if (item.good.branchs.find(b => b.id === branch.id)) {
                    acc = acc + 1
                }
                return acc
            }, 0)
        }
        return 0
    }, [cart, branch])

    useEffect(() => {
        if (branchs.length > 0 && !branch) {
            setBranch(branchs[0])
        }
    }, [branchs])

    useEffect(() => {
        if (branch && cart.length !== goodCount) {
            toast.warning("Не все товары есть а выбранном филиале")
        }
    }, [cart, goodCount, branch])

    const createOrder = () => {
        router.push(`/create-order/${branch.id}`)
    }

    const closeNote = () => {
        const elem = document.getElementById("note")
        elem.style.display = 'none'
    }

    if (cart.length === 0) {
        return (
            <Empty
                text='Корзина пуста'
                button={
                    <Link href='/good'>
                        <Button>
                            К покупкам
                        </Button>
                    </Link>
                }
            />
        )
    }

    return (
        <>
            <Note id={'note'} show={!user || user._count.orders === 0}>
                <CloseIcon onClick={closeNote} />
                <div>
                    Уважаемый покупатель, обратите внимание на список товаров при выборе филиала! Так как не все товары из списка могут продаваться в выбранном филиале.
                </div>
            </Note>
            <Filters>
                <Select
                    label={"Филиалы"}
                    placeholder={'Выберите филиал'}
                    value={branch ? branch.id : ''}
                    onChange={e => {
                        const newBranch = branchs.find(item => item.id === e.target.value)
                        setBranch(newBranch)
                    }}
                    className='branch-select'
                >
                    {
                        branchs.map(item => (
                            <option key={item.id} value={item.id} selected={branch && item.id === branch.id}>
                                {item.address}
                            </option>
                        ))
                    }
                </Select>
            </Filters>
            <Container>
                <div className='list'>
                    <div className='items'>
                        {
                            cart.map(item => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    className='cart-item'
                                    branch={branch}
                                />
                            ))
                        }
                    </div>
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
                            {
                                branch ? (
                                    <Link href={`/good?branch=${branch.id}`}>
                                        <div className='value link'>{branch.address}</div>
                                    </Link>
                                ) : (
                                    <div className='value'>Не выбран</div>
                                )
                            }
                        </LabledValue>
                        <LabledValue>
                            <div className='label'>Товаров в филиале</div>
                            <div className='value'>{goodCount} из {cart.length}</div>
                        </LabledValue>
                        <LabledValue>
                            <div className='label hard'>Итого</div>
                            <div className='value hard bold'>{total} ₽</div>
                        </LabledValue>
                        <Button
                            className={'order-button'}
                            disabled={!branch || !total}
                            onClick={createOrder}
                        >
                            Оформить
                        </Button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default CartContainer