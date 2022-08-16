import { useMemo } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

import { Button, Empty, Input } from '../../components'
import { useContext } from '../../context'
import { COLORS } from '../../utils/const'

const Container = styled.form`
    background-color: ${COLORS.primary.white};
    max-width: 600px;
    margin: 0 auto;
    padding: 12px;
    border-radius: 12px;
    box-shadow: 4px 4px 16px 4px rgba(32, 29, 27, 0.02);
    .form-item {
        margin-bottom: 12px;
        :last-child {
            margin-bottom: 0;
        }
    }
    .text-area {
        height: auto;
        justify-content: flex-start;
        padding: 12px;
        textarea {
            min-height: 150px;
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
`

const CreateOrder = ({ branch }) => {
    const { state: { cart } } = useContext()

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

    if (!branch || branch.delete || !branch.publish) {
        return (
            <Empty
                text='Не удалось найти филиал.'
                button={
                    <Link href={'/cart'}>
                        <Button>
                            В корзину
                        </Button>
                    </Link>
                }
            />
        )
    }

    return (
        <Container>
            <LabledValue>
                <div className='label'>Организация</div>
                <div className='value'>{branch.organization.name}</div>
            </LabledValue>
            <LabledValue>
                <div className='label'>Филиал</div>
                <div className='value'>{branch.address}</div>
            </LabledValue>
            <LabledValue>
                <div className='label'>Товаров</div>
                <div className='value'>{goodCount} шт.</div>
            </LabledValue>
            <LabledValue>
                <div className='label'>Итого</div>
                <div className='value'>{total} ₽</div>
            </LabledValue>
            <div className='form-item'>
                <Input
                    label='Комментарий к заказу'
                    placeholder='Введите комментарий'
                    containerClassName='text-area'
                    element='textarea'
                />
            </div>
            <div className='form-item'>
                <Button>
                    Оформить
                </Button>
            </div>
        </Container>
    )
}

export default CreateOrder