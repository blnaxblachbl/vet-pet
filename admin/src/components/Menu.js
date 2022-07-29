import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Menu as AntMenu } from 'antd'
import { useUser, getPermission } from '../utils/hooks'

export const Menu = () => {
    const { pathname } = window.location
    const { user: { type } } = useUser()

    return (
        <AntMenu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
            <AntMenu.Item key={`/`}>
                <MenuLink to={`/`}>
                    Главная
                </MenuLink>
            </AntMenu.Item>
            {
                getPermission(type, ['admin', 'org-owner']) && (
                    <AntMenu.Item key={`/admin`}>
                        <MenuLink to={`/admin`}>
                            Администраторы
                        </MenuLink>
                    </AntMenu.Item>
                )
            }
            {
                getPermission(type, ['admin', 'org-owner', 'moder']) && (
                    <AntMenu.Item key={`/organization`}>
                        <MenuLink to={`/organization`}>
                            Организации
                        </MenuLink>
                    </AntMenu.Item>
                )
            }
        </AntMenu>
    )
}

const MenuLink = styled(Link)`
    display: flex;
    flex-direction: row;
    align-items: center;

    a {
        color: white;
    }
`
