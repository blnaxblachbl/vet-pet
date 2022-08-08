import styled from "styled-components"
import IMask from "imask"
import { toast } from 'react-toastify'
import { useMutation } from "@apollo/client"

import {
    authRef,
    Button,
    Empty,
    Input,
    Select,
} from "../../components"
import { COLORS } from "../../utils/const"
import { UPDATE_ONE_USER } from "../../gqls"

const maskedPhone = IMask.createMask({
    mask: '+7 (000) 000-00-00'
})

const Container = styled.form`
    width: 100%;
    max-width: 600px;
    padding: 12px;
    border-radius: 18px;
    background-color: ${COLORS.primary.white};
    border: solid 1px ${COLORS.secondary.lightGray};
    box-sizing: border-box;
    margin: 0;
    /* box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03); */
    .form-item {
        margin-bottom: 12px;
        :last-child {
            margin-bottom: 0;
        }
    }
    button {
        min-width: 200px;
    }
    @media only screen and (max-width: 700px) {
        button {
            width: 100%;
        }
    }
`

const ProfileContainer = ({ user }) => {
    const [updateUser, { loading }] = useMutation(UPDATE_ONE_USER, {
        onCompleted: () => { },
        onError: e => { }
    })

    const onSubmit = async e => {
        e.preventDefault()
        const {
            name,
            phone,
            status
        } = e.target
        const data = {
            name: { set: name.value },
            phone: { set: phone.value.replace(/[()+ -]/g, '') },
            status: { set: status.value }
        }
        if (!loading) {
            if (user.phone !== data.phone.set) {
                if (window.confirm("Чтобы изменить номер телефона нужно его подтвердить. На новый номер поступит звонок, введите последние 4 цифры в качестве кода подтверждения. ")) {
                    const { data: updateData } = await updateUser({
                        variables: {
                            where: { id: user.id },
                            data
                        }
                    })
                    if (updateData) {
                        toast.success("Сообщение отправлено")
                        authRef.current.openAuth("confirm", data.phone.set)
                    }
                }
                return
            }
        }
        const { data: updateData } = await updateUser({
            variables: {
                where: { id: user.id },
                data
            }
        })
        if (updateData) {
            toast.success("Данные обновлены")
        }
    }

    if (!user) {
        return (
            <Empty
                text="Требуется авторизация"
                button={
                    <Button onClick={() => authRef.current.openAuth()}>
                        Войти
                    </Button>
                }
            />
        )
    }

    return (
        <Container onSubmit={onSubmit}>
            <div className="form-item">
                <Input
                    name='name'
                    placeholder='Введите ваше имя'
                    defaultValue={user && user.name ? user.name : ""}
                    required
                    label='Имя'
                />
            </div>
            <div className="form-item">
                <Input
                    name='phone'
                    label='Номер телефона'
                    placeholder='Введите номер телефона'
                    defaultValue={user && maskedPhone.resolve(user.phone)}
                    onChange={e => e.target.value = maskedPhone.resolve(e.target.value)}
                    required
                />
            </div>
            <div className="form-item">
                <Select
                    name='status'
                    label='Статус пользователя'
                    placeholder={'Укажието кем вы являетесь'}
                    required
                >
                    <option value={'Пользователь'} selected={user.status === 'Пользователь'}>Пользователь</option>
                    <option value={'Заводчик'} selected={user.status === 'Заводчик'}>Заводчик</option>
                </Select>
            </div>
            <div className="form-item">
                <Button type='submit' loading={loading}>
                    Сохранить
                </Button>
            </div>
        </Container>
    )
}

export default ProfileContainer