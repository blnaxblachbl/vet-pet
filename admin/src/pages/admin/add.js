import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation } from '@apollo/client'

import {
    Top
} from '../../components'
import { CREATE_ONE_ADMIN } from '../../gqls'
import { ADMIN_TYPES } from '../../utils/const'

const Form = styled(AntForm)`
    max-width: 600px;
`
const rules = {
    required: {
        required: true,
        message: 'Обязательное поле'
    }
}

const AddAdmin = () => {

    const [form] = Form.useForm()

    const [createAdmin, { loading }] = useMutation(CREATE_ONE_ADMIN, {
        onCompleted: () => {
            form.resetFields()
            message.success("Пользователь добавлено")
        },
        onError: e => {
            if (e.message === 'exist') {
                return message.error("Пользователь с таким адресом электронной почты уже зарегистрирован")
            }
            message.error("Что то пошло не так, повторите попытку позже")
        }
    })

    const handleSubmit = ({ ...value }) => {
        const data = {
            ...value
        }
        createAdmin({
            variables: { data }
        })
    }

    return (
        <>
            <Top title={"Добавление администратора"} />
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
                initialValues={{
                    payerStatus: 'default'
                }}
            >
                <Form.Item
                    name={"name"}
                    rules={[rules.required]}
                    label="ФИО"
                >
                    <Input placeholder='Введите фио' />
                </Form.Item>
                <Form.Item
                    name={"email"}
                    rules={[rules.required]}
                    label="Адрес электронной почты"
                >
                    <Input placeholder='Введите Email' />
                </Form.Item>
                <Form.Item
                    name={"phone"}
                    // rules={[rules.required]}
                    label="Номер телефона администратора"
                >
                    <Input placeholder='Введите номер' />
                </Form.Item>
                <Form.Item
                    name={"type"}
                    rules={[rules.required]}
                    label="Тип"
                >
                    <Select
                        placeholder="Выберите тип пользователя"
                        allowClear
                    >
                        {
                            Object.keys(ADMIN_TYPES).map(key => (
                                <Select.Option
                                    key={key}
                                >
                                    {ADMIN_TYPES[key]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                    Добавить
                </Button>
            </Form>
        </>
    )
}

export default AddAdmin