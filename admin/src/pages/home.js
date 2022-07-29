import styled from "styled-components"
import {
    Input,
    Form,
    Button as AntButton,
    message,
} from 'antd'
import { useMutation } from "@apollo/client"

import { Top } from '../components'
import { CHANGE_PASSWORD_ADMIN } from '../gqls'

const Button = styled(AntButton)`

`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 400px;
    
    .change-pass-lable {
        font-size: 14px;
        color: gray;
        margin-bottom: 15px;
    }
`

const requiredRule = {
    required: true,
    message: 'Обязательное поле'
}

const Home = () => {

    const [form] = Form.useForm()

    const [chnagePasss, { loading }] = useMutation(CHANGE_PASSWORD_ADMIN, {
        onCompleted: () => {
            message.success("Пароль успешно изменен")
            form.resetFields()
        },
        onError: e => { }
    })

    const handleSubmitForm = ({ password, confirmPassword }) => {
        if (password !== confirmPassword) {
            return message.error("Подтвердите пароль")
        }
        chnagePasss({
            variables: {
                data: {
                    password,
                    confirmPassword
                }
            }
        })
    }

    return (
        <>
            <Top title="Главная" helpText="Панель администратора" />
            <Container>
                <span className="change-pass-lable">Изменение пароля для входа</span>
                <Form form={form} onFinish={handleSubmitForm} layout="vertical" name="change_password">
                    <Form.Item
                        name="password"
                        rules={[requiredRule]}
                    >
                        <Input.Password
                            placeholder="Введите новый пароль"
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirmPassword"
                        rules={[requiredRule]}
                    >
                        <Input.Password
                            placeholder="Введите новый пароль еще раз"
                        />
                    </Form.Item>
                    <Button loading={loading} type="primary" htmlType="submit">
                        Измененить
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Home