import { useEffect, useMemo, useRef, useState } from "react"
import styled from "styled-components"
import cookie from 'cookie'
import { useMutation } from "@apollo/client"
import { toast } from "react-toastify"

import {
    Input,
    Button,
    Spinner
} from "../components"
import { COLORS } from "../utils/const"
import { SEND_USER_CODE, FIND_ME_USER } from "../gqls"

const Form = styled.form`
    max-width: 600px;
    width: 100%;

    .phone-input {
        background-color: ${COLORS.primary.white};
        box-shadow: none;
        /* visibility: hidden; */
        opacity: 0;
        position: absolute;
        z-index: -1;
    }
    .send-again-button{
        width: 100%;
        margin-top: 24px;

        .time {
            color: ${COLORS.primary.orange};
        }
    }
    .button {
        width: 100%;
        margin-top: 16px;
    }
`
const CodeContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 80%;
    margin: 0 auto;
    padding: 24px 0;
    cursor: pointer;
`
const Code = styled.div`
    aspect-ratio: 1/1;
    width: 50px;
    border-radius: 12px;
    border: solid 1px;
    border-color: ${({ fill }) => fill ? COLORS.primary.orange : COLORS.secondary.lightGray};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${COLORS.primary.black};
    font-size: 28px;
`
const LoadingContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px 0;
`

const LoginConfirmForm = ({
    phone = '',
    onComplate = () => { },
    onError = () => { },
    onChanhePhone = () => { }
}) => {
    let timerId
    const [code, setCode] = useState("")
    const [focused, setFocused] = useState(false)
    const inputRef = useRef()
    const phoneString = useMemo(() => phone.replace(/[()+ -]/g, ''), [phone])
    const [timer, setTimer] = useState(60)

    useEffect(() => {
        if (!timerId) {
            timerId = setInterval(tick, 1000)
        }
        return () => {
            if (timerId) {
                clearInterval(timerId)
                timerId = null
            }
        }
    }, [])

    const tick = () => {
        setTimer(time => {
            if (time <= 0) {
                clearInterval(timerId)
                timerId = null
            }
            return time - 1
        })
    }

    const [sendCode, { loading }] = useMutation(SEND_USER_CODE, {
        onCompleted: ({ sendUserCode: { user, token } }) => {
            toast.success("Авторизация прошла успешно")
            onComplate(user)
        },
        update: async (client, { data: { sendUserCode } }) => {
            if (sendUserCode) {
                const { user, token } = sendUserCode
                document.cookie = cookie.serialize('token', token, {
                    maxAge: 60 * 60 * 24 * 30
                })
                await client.writeQuery({
                    query: FIND_ME_USER,
                    data: {
                        findMeUser: user
                    }
                })
            }
        },
        onError
    })

    const sendAgain = () => {
        setTimer(60)
        clearInterval(timerId)
        timerId = setInterval(tick, 1000)
    }

    if (loading) {
        return (
            <LoadingContainer>
                <Spinner color={COLORS.primary.black} />
            </LoadingContainer>
        )
    }

    return (
        <Form>
            <Input
                ref={inputRef}
                name='code'
                containerClassName='phone-input'
                onChange={e => {
                    setCode(e.target.value)
                    if (e.target.value && e.target.value.length === 4) {
                        sendCode({
                            variables: {
                                data: {
                                    phone: phoneString,
                                    code: e.target.value
                                }
                            }
                        })
                    }
                }}
                autoFocus
                value={code}
                maxLength={4}
                onFocus={() => {
                    setFocused(true)
                }}
                onBlur={() => {
                    setFocused(false)
                }}
            />
            <CodeContainer
                onClick={() => inputRef.current.focus()}
            >
                {
                    [1, 2, 3, 4].map((_, index) => (
                        <Code
                            key={`code-${index}`}
                            className='code'
                            fill={focused ? code.length === index : false}
                        >
                            {code[index]}
                        </Code>
                    ))
                }
            </CodeContainer>
            <Button
                type='submit'
                className={'send-again-button'}
                disabled={timer > 0}
                onClick={sendAgain}
            >
                {
                    timer > 0 ? (
                        <span>Повторный код через<span className="time"> {timer} сек</span>.</span>
                    ) : 'Отправить повторно'
                }
            </Button>
            <Button
                className={'button'}
                ouline
                onClick={onChanhePhone}
            >
                Изменить номер
            </Button>
        </Form >
    )
}

export default LoginConfirmForm