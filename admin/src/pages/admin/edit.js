import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'

import {
    Top
} from '../../components'
import { UPDATE_ONE_ADMIN, FIND_UNIQUE_ADMIN } from '../../gqls'
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

const EditAdmin = () => {

    const [form] = Form.useForm()
    const { id } = useParams()
    const navigate = useNavigate()

    useQuery(FIND_UNIQUE_ADMIN, {
        variables: {
            where: { id }
        },
        onCompleted: ({ findUniqueAdmin }) => {
            form.setFieldsValue({
                ...findUniqueAdmin
            })
        }
    })

    const [updateAdmin, { loading }] = useMutation(UPDATE_ONE_ADMIN, {
        onCompleted: () => {
            navigate("/admin")
            message.success("Пользователь изменен")
        },
        onError: e => {
            message.error("Что то пошло не так, повторите попытку позже")
        }
    })

    const handleSubmit = ({ name, email, type, phone }) => {
        updateAdmin({
            variables: {
                where: { id },
                data: {
                    name: { set: name },
                    email: { set: email },
                    type: { set: type },
                    phone: phone ? { set: phone } : undefined
                }
            }
        })
    }

    return (
        <>
            <Top title={"Редактирование пользователя"} />
            <Form form={form} onFinish={handleSubmit} layout="vertical">
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
                    Сохранить
                </Button>
            </Form>
        </>
    )
}

export default EditAdmin