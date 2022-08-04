import styled from 'styled-components'
import { useRouter } from 'next/router'

import { Button } from '.'
import Link from 'next/link'

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

export const Menu = () => {
    const { pathname } = useRouter()

    return (
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
    )
}