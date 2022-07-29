import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation } from '@apollo/client'

import {
    Top
} from '../../components'
import { CREATE_ONE_ADMIN } from '../../gqls'
import { ADMIN_TYPES, ORG_ADMIN_TYPES } from '../../utils/const'
import { getPermission, useUser } from '../../utils/hooks'
import { useMemo } from 'react'

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
    const { user } = useUser()
    const [form] = Form.useForm()
    const isOwner = getPermission(user.type, ['org-owner'])
    const isAdmin = getPermission(user.type, ['admin'])

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

    const organizations = useMemo(() => user ? user.organizations : [], [user])
    const adminTypes = useMemo(() => isAdmin ? ADMIN_TYPES : ORG_ADMIN_TYPES, [isAdmin])

    const handleSubmit = ({ organization, ...value }) => {
        const data = {
            ...value,
            organizations: organization ? {
                connect: {
                    id: organization,
                }
            } : undefined
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
                {
                    isOwner && (
                        <Form.Item
                            name='organization'
                            rules={[rules.required]}
                            label="Организация в которой работат администратор"

                        >
                            <Select
                                placeholder="Организацию"
                                allowClear
                                showSearch
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    organizations.map(item => (
                                        <Select.Option
                                            key={item.id}
                                        >
                                            {item.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    )
                }
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
                            Object.keys(adminTypes).map(key => (
                                <Select.Option
                                    key={key}
                                >
                                    {adminTypes[key]}
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