import { useMemo, useState } from "react"
import styled from "styled-components"
import IMask from 'imask'
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"

import {
    Input,
    Button,
} from "../components"
import { COLORS } from "../utils/const"
import { SEND_USER_PHONE } from "../gqls"

const Form = styled.form`
    max-width: 600px;
    width: 100%;

    .phone-input {
        background-color: ${COLORS.primary.white};
        box-shadow: none;
    }
    .submit-button {
        width: 100%;
        margin-top: 24px;
    }
`

const maskedPhone = IMask.createMask({
    mask: '+7 (000) 000-00-00'
})

const LoginForm = ({
    onComplate = () => { },
    onError = () => { },
}) => {
    const [phone, setPhone] = useState("")
    const phoneString = useMemo(() => phone.replace(/[()+ -]/g, ''), [phone])
    const phoneWrited = useMemo(() => phoneString.length === 11, [phoneString])

    const [logIn, { loading }] = useMutation(SEND_USER_PHONE, {
        onCompleted: data => {
            toast.success("Сообщение отправлено")
            onComplate({ phone })
        },
        onError: e => {  }
        // errorPolicy: 'ignore'
    })

    const submit = (e) => {
        e.preventDefault()
        logIn({
            variables: { data: { phone: phoneString } }
        })
    }

    return (
        <Form onSubmit={submit}>
            <Input
                name='phone'
                placeholder='Номер телефона'
                label='Номер телефона'
                containerClassName='phone-input'
                type='tel'
                pattern='\+7 \([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}'
                required
                value={phone}
                onChange={e => setPhone(maskedPhone.resolve(e.target.value))}
            />
            <Button
                type='submit'
                className={'submit-button'}
                disabled={!phoneWrited}
                loading={loading}
            >
                Получить код
            </Button>
        </Form>
    )
}

export default LoginForm