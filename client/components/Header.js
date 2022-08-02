import styled from 'styled-components'

import { authRef } from './Auth'
import { useUser } from '../utils/hooks'

const Container = styled.div`
    height: 96px;
    background-color: #f1f1f1;
`
export const Header = ({ isMobile }) => {
    const { user } = useUser()

    return (
        <Container>
            <div onClick={() => authRef.current.openAuth()}>Войти</div>
        </Container>
    )
}