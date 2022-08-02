import { useMemo, useState } from "react"
import styled from "styled-components"
import { useMutation } from "@apollo/client"

import {
    Input,
    Button,
} from "../components"
import { COLORS } from "../utils/const"
import { UPDATE_ONE_USER } from "../gqls"
import { toast } from "react-toastify"
import { useUser } from "../utils/hooks"

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

const RegistrationForm = ({
    onComplate = () => { },
    onError = () => { },
}) => {
    const { user } = useUser()
    const [name, setName] = useState("")
    const nameWrited = useMemo(() => name.replace(/ /, "").length > 0, [name])

    const [updateUser, { loading }] = useMutation(UPDATE_ONE_USER, {
        onCompleted: data => {
            toast.success("Вы зарегистрированы")
            onComplate()
        },
        onError
    })

    const submit = (e) => {
        e.preventDefault()
        updateUser({
            variables: {
                where: { id: user.id },
                data: {
                    name: { set: name }
                }
            }
        })
    }

    return (
        <Form onSubmit={submit}>
            <Input
                name='name'
                placeholder='Ваше имя'
                value={name}
                onChange={e => setName(e.target.value)}
                containerClassName='phone-input'
            />
            <Button
                type='submit'
                className={'submit-button'}
                disabled={!nameWrited}
                loading={loading}
            >
                Зарегистрироваться
            </Button>
        </Form>
    )
}

export default RegistrationForm