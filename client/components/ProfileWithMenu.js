import { forwardRef, useImperativeHandle, useState, useRef } from "react"
import { useRouter } from "next/router"
import { useApolloClient } from "@apollo/client"
import styled from "styled-components"
import Link from "next/link"
import cookie from 'cookie'

import { COLORS } from "../utils/const"
import { FIND_ME_USER } from "../gqls"
import { Modal } from "./Modal"

const MenuContainer = styled.div`
    border-radius: 18px;
    border: solid 1px ${COLORS.secondary.lightGray};
    padding: 12px; 
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 24px;
    height: fit-content;
    
    .link {
        cursor: pointer;
        color: ${COLORS.primary.black};
        font-size: 14px;
        margin-bottom: 12px;
        :last-child {
            margin-bottom: 0;
        }
    }
    .logout {
        color: ${COLORS.secondary.gray};
    }
    .selected {
        color: ${COLORS.primary.camel};
        font-weight: 600;
    }
    @media only screen and (max-width: 700px) {
        padding: 0;
        border: none;
    }
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    .content {
        width: calc(70% - 6px);
    }
    .menu {
        width: calc(30% - 6px);
    }
    @media only screen and (max-width: 700px) {
        .content {
            width: 100%;
        }
        .menu {
            display: none;
        }
    }
`

export let profileMenuRef

export const ProfileWithMenu = ({ children }) => {
    profileMenuRef = useRef()
    return (
        <>
            <Container>
                <div className="menu">
                    <ProfileMenu />
                </div>
                <div className="content">
                    {children}
                </div>
            </Container>
            <ProfileModalMenu ref={profileMenuRef} />
        </>
    )
}

const ProfileMenu = (props) => {
    const router = useRouter()
    const { pathname } = router
    const client = useApolloClient()

    const logOut = () => {
        if (window.confirm("Выйти из аккаунта?")) {
            document.cookie = cookie.serialize('token', '', { maxAge: 0 })
            client.writeQuery({
                query: FIND_ME_USER,
                data: { findMeUser: null }
            })
            window.location = '/'
        }
    }

    return (
        <>
            <MenuContainer {...props}>
                <Link href='/profile'>
                    <div className={`link ${pathname === '/profile' && 'selected'}`}>Редактирование</div>
                </Link>
                <Link href='/profile/pet'>
                    <div className={`link ${pathname === '/profile/pet' && 'selected'}`}>Мои Питомцы</div>
                </Link>
                <Link href='/profile/ad'>
                    <div className={`link ${pathname === '/profile/ad' && 'selected'}`}>Мои Объявления</div>
                </Link>
                <Link href='/ad/create'>
                    <div className={`link`}>Разместить объявления</div>
                </Link>
                <Link href='/profile/order'>
                    <div className={`link ${pathname === '/profile/order' && 'selected'}`}>Мои Заказы</div>
                </Link>
                <div onClick={logOut} className={`logout link`}>Выйти</div>
            </MenuContainer>
        </>
    )
}

const ProfileModalMenu = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    useImperativeHandle(ref, () => ({
        closeModal,
        openModal
    }), [openModal, closeModal])

    return (
        <Modal
            title="Меню"
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <ProfileMenu {...props} />
        </Modal>
    )
})