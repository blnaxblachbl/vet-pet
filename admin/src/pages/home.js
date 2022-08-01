import styled from "styled-components"
import {
    Input,
    Form,
    Button as AntButton,
    message,
} from 'antd'
import { useMutation } from "@apollo/client"

import { Top, OrgInfo } from '../components'
import { CHANGE_PASSWORD_ADMIN } from '../gqls'
import { getPermission, useUser } from "../utils/hooks"

const Button = styled(AntButton)`

`
const Container = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    margin-bottom: 24px;
    :last-child {
        margin-bottom: 0;
    }
    
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
    const { user } = useUser()
    const isOwner = getPermission(user.type, ['org-owner'])
    const isOrgAdmin = getPermission(user.type, ['org-admin'])

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
            <Top title="Главная" />
            {
                (isOwner || isOrgAdmin) && (
                    <>
                        <Container>
                            <span className="change-pass-lable">Ваша организация</span>
                            <OrgInfo 
                                isOwner={isOwner}
                                organizationId={user.organizationId}
                            />
                        </Container>
                        <Top title="Настройки" />
                    </>
                )
            }
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