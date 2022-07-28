import { useMemo } from 'react'
import styled from 'styled-components'
import { Spin, Layout as AntLayout } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'

import {
    Header,
    Empty,
    Menu
} from '../components'
import { useUser, getPermission } from '../utils/hooks'

const { Content: AntContent, Footer: AntFooter, Sider: AntSider } = AntLayout

const Layout = ({ children, roles = ['admin'], ...props }) => {
    const navigate = useNavigate()
    const { user, loading, error } = useUser()

    const permission = useMemo(() => user ? getPermission(user.type, roles) : false, [user, roles])

    if (loading) {
        return (
            <LoadingView>
                <Spin />
            </LoadingView>
        )
    }

    if (error || !user || user.block || user.delete) {
        return <Navigate to={`/login`} />
    }

    return (
        <Provider>
            <Sider breakpoint="lg" collapsedWidth="0">
                <div className="logo">
                    Панель администратора
                </div>
                <Menu />
            </Sider>
            <AntLayout>
                <Header {...props} />
                <Content>
                    {permission ? (
                        <div className="inside">{children}</div>
                    ) : (
                        <Empty
                            description='Упс, тут ничего нет'
                            buttonText='На главную'
                            onButtonClick={() => navigate('/')}
                        />
                    )}
                </Content>
                <Footer>
                    Панель администратора @2022
                </Footer>
            </AntLayout>
        </Provider>
    )
}

const LoadingView = styled.div`
    background: whitesmoke;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Content = styled(AntContent)`
    margin: 20px 20px 0;
    position: relative;

    @media only screen and (max-width: 480px) {
        margin: 10px 0;
    }

    .inside {
        padding: 18px 22px;
        background: #fff;
        min-height: 100%;

        @media only screen and (max-width: 480px) {
            padding: 20px 14px;
        }
    }
`

const Footer = styled(AntFooter)`
    text-align: center;
`

const Provider = styled(AntLayout)`
    min-height: 100vh;

    .logo {
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        background: whitesmoke;
        cursor: pointer;
        transition: 0.3s background;
        padding: 7px;
        
        img {
            width: 60%;
        }
    }

    .ant-layout-sider-zero-width-trigger {
        top: 11px;
    }
`

const Sider = styled(AntSider)`
    z-index: 3;

    @media only screen and (max-width: 992px) {
        position: absolute;
        height: 100%;
    }
`

export default Layout
