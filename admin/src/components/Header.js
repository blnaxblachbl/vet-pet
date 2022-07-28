import { forwardRef, useRef } from 'react'
import styled from 'styled-components'
import { Layout, Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons'
import { useApolloClient } from '@apollo/client'

const { Header: AntHeader } = Layout

const HeaderContainer = styled(AntHeader)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 16px;
    padding-left: 0;
    background: #fff;

    .balance {
        font-size: 14px;
        margin-right: 15px;
        cursor: pointer;
    }
    .reserve{
        text-decoration: line-through;
    }
`

export let headerRef

const HeaderComponent = forwardRef((props, ref) => {
    const client = useApolloClient()

    const handleLogout = () => {
        localStorage.clear()
        client.resetStore()
        window.location.href = '/'
    }

    return (
        <HeaderContainer>
            <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                Выйти
            </Button>
        </HeaderContainer>
    )
})

export const Header = (props) => {
    headerRef = useRef()

    return <HeaderComponent ref={headerRef} {...props} />
}