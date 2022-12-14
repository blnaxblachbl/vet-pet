import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'

import {
    Top
} from '../../components'
import { UPDATE_ONE_ADMIN, FIND_UNIQUE_ADMIN } from '../../gqls'
import { ADMIN_TYPES } from '../../utils/const'
import { useUser, getPermission } from '../../utils/hooks'

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
    const { user } = useUser()
    const [form] = Form.useForm()
    const { id } = useParams()
    const navigate = useNavigate()
    // const isOwner = getPermission(user.type, ['org-owner', 'org-admin'])
    const isAdmin = getPermission(user.type, ['admin'])

    useQuery(FIND_UNIQUE_ADMIN, {
        variables: {
            where: { id }
        },
        onCompleted: ({
            findUniqueAdmin: {
                name,
                email,
                phone,
                type
            }
        }) => {
            form.setFieldsValue({
                name,
                email,
                phone,
                type
            })
        }
    })

    const [updateAdmin, { loading }] = useMutation(UPDATE_ONE_ADMIN, {
        onCompleted: () => {
            navigate("/admin")
            message.success("Администратор изменен")
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
                    phone: { set: phone }
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
                    style={{
                        display: isAdmin ? "block" : "none"
                    }}
                >
                    <Select
                        placeholder="Выберите тип пользователя"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
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