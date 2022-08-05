import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ArrowLeft from '../public/icons/arrow-left.svg'

import { Button } from '.'
import { COLORS } from '../utils/const'
import { useMemo } from 'react'

const Container = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;

    .button {
        margin-right: 12px;
        :last-child {
            margin-right: 0;
        }
    }
    @media only screen and (max-width: 700px) {
        display: none;
    }
`
const MobileContainer = styled.div`
    display: none;
    margin-bottom: 24px;
    .back-button {
        padding-right: 15px;
        padding-left: 6px;
    }
    svg {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        path {
            fill: ${COLORS.primary.purple};
        }
    }
    @media only screen and (max-width: 700px) {
        display: ${({ display }) => display ? "block" : "none"};
    }
`

export const Menu = () => {
    const { pathname } = useRouter()

    return (
        <>
            <MobileContainer display={pathname.split('/').length > 2}>
                <Button onClick={() => window.history.back()} ouline className={'back-button'}>
                    <ArrowLeft />
                    Назад
                </Button>
            </MobileContainer>
            <Container>
                <Link href='/organization'>
                    <Button ouline={!(pathname === '/organization')} className={'button'}>
                        Клиники и магазины
                    </Button>
                </Link>
                <Link href='/good'>
                    <Button ouline={!(pathname === '/good')} className={'button'}>
                        Товары и услули
                    </Button>
                </Link>
                <Link href='/ad'>
                    <Button ouline={!(pathname === '/ad')} className={'button'}>
                        Объявления
                    </Button>
                </Link>
            </Container>
        </>
    )
}