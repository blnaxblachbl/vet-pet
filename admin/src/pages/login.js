import styled from 'styled-components'
import { Form, Card as AntCard, Input, Button as AntButton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'

import { SIGN_IN_ADMIN } from '../gqls'

const requiredRule = {
    required: true,
    message: 'Обязательное поле'
}

const emailRule = {
    type: 'email',
    message: 'Введите правильный электронный адрес'
}

const Card = styled(AntCard)`
    width: 400px;

    @media only screen and (max-width: 420px) {
        width: 95%;
    }
`

const Button = styled(AntButton)``

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    @media only screen and (max-width: 420px) {
        justify-content: flex-start;
        padding-top: 30px;
    }
`

const Actions = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    margin-top: 5px;
`

const Login = () => {
    const navigate = useNavigate()

    const [signIn, { loading }] = useMutation(SIGN_IN_ADMIN, {
        onCompleted: ({ signInAdmin: { token, ...admin } }) => {
            localStorage.setItem('token', token)
            navigate('/')
        },
        onError: e => { }
    })

    const handleSubmitForm = ({ email, password }) => {
        signIn({
            variables: {
                data: { 
                    email, 
                    password 
                }
            }
        })
    }

    return (
        <Wrapper>
            <Card title="Вход в панель администратора">
                <Form onFinish={handleSubmitForm} layout="vertical" name="login-from">
                    <Form.Item
                        colon={false}
                        label="Эл. почта"
                        name="email"
                        rules={[requiredRule, emailRule]}
                    >
                        <Input placeholder="Введите электронную почту..." />
                    </Form.Item>
                    <Form.Item label="Пароль" name="password" rules={[requiredRule]}>
                        <Input.Password placeholder="Введите пароль..." />
                    </Form.Item>
                    <Actions>
                        <Button loading={loading} type="primary" htmlType="submit">
                            Войти
                        </Button>
                        {/* <Link to={`/forgot`}>Забыли пароль?</Link> */}
                        {/* <Link to={`/moderator/login`}>Войти как модератор</Link> */}
                    </Actions>
                    {/* <Link to={`/admin/forgot`}>Забыли пароль?</Link> */}
                </Form>
            </Card>
        </Wrapper>
    )
}

export default Login