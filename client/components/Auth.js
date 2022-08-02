import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState } from "react"
import styled from "styled-components"

import { Modal } from "."
import { COLORS } from "../utils/const"
import LoginForm from '../containers/login'
import LoginConfirmForm from "../containers/loginConfirm"
import RegistrationForm from "../containers/registration"

const Subtitle = styled.div`
    font-weight: 400;
    font-size: 16px;
    color: ${COLORS.primary.black};
    margin-top: 16px;
    margin-bottom: 24px;
    text-align: center;
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
`

const Auth = forwardRef((props, ref) => {
    const [modalIsOpen, setIsOpen] = useState(false)
    const [page, setPage] = useState('login')
    const [phone, setPhone] = useState("")

    const openModal = useCallback((_page = 'login', _phone) => {
        setIsOpen(true)
        setPage(_page)
        if (_phone) {
            setPhone(_phone)
        }
    }, [setIsOpen, setPage])

    const closeModal = useCallback(() => {
        setIsOpen(false)
        setPage('login')
    }, [setIsOpen, setPage])

    useImperativeHandle(ref, () => ({
        openAuth: openModal,
        closeAuth: closeModal
    }), [openModal, closeModal])

    const subtitle = useMemo(() => {
        if (page === 'confirm') {
            return `На номер ${phone} отправлено СМС с кодом`
        }
        if (page === 'registration') {
            return 'Введите имя, чтобы зарегистрироваться'
        }
        return 'Введите номер телефона, чтобы войти или зарегистрироваться'
    }, [page])

    const title = useMemo(() => {
        if (page === 'confirm') {
            return 'Введите код'
        }
        if (page === 'registration') {
            return 'Регистрация'
        }
        return 'Добро пожаловать'
    }, [page])

    return (
        <Modal
            title={title}
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            {...props}
        >
            <Subtitle>{subtitle}</Subtitle>
            {
                page === 'login' && (
                    <LoginForm
                        onComplate={({ phone }) => {
                            setPhone(phone)
                            setPage("confirm")
                        }}
                    />
                )
            }
            {
                page === 'confirm' && (
                    <LoginConfirmForm
                        phone={phone}
                        onComplate={(user) => {
                            if (user && !user.name) {
                                setPage("registration")
                            } else {
                                closeModal()
                            }
                        }}
                        onChanhePhone={() => setPage("login")}
                    />
                )
            }
            {
                page === 'registration' && (
                    <RegistrationForm 
                        onComplate={closeModal}
                    />
                )
            }
        </Modal>
    )
})

export let authRef = null

export const AuthComponent = (props) => {

    authRef = useRef()

    return (
        <Auth
            ref={authRef}
            {...props}
        />
    )
}