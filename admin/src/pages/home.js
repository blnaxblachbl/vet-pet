import styled from "styled-components"
import {
    Input,
    Form,
    Button as AntButton,
    message,
} from 'antd'

import { Top } from '../components'

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

    const handleSubmitForm = ({ password, confirmPassword }) => {
        if (password !== confirmPassword) {
            return message.error("Подтвердите пароль")
        }
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
                    <Button loading={false} type="primary" htmlType="submit">
                        Измененить
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default Home