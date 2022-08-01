import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation } from '@apollo/client'

import {
    Top
} from '../../components'
import { CREATE_ONE_ADMIN } from '../../gqls'
import { ADMIN_TYPES } from '../../utils/const'
import { getPermission, useUser } from '../../utils/hooks'

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
    const isOwner = getPermission(user.type, ['org-owner', 'org-admin'])
    const isAdmin = getPermission(user.type, ['admin'])

    const [createAdmin, { loading }] = useMutation(CREATE_ONE_ADMIN, {
        onCompleted: () => {
            form.resetFields()
            message.success("Администратор добавлено")
        },
        onError: e => {
            if (e.message === 'exist') {
                return message.error("Администратор с таким адресом электронной почты уже зарегистрирован")
            }
            message.error("Что то пошло не так, повторите попытку позже")
        }
    })

    const handleSubmit = ({ type, ...value }) => {
        let organization = undefined
        let _type = type
        if (isOwner) {
            _type = 'org-admin'
            if (user.organization) {
                organization = {
                    connect: { id: user.organizationId }
                }
            } else {
                message.warning("Сначала нужно добавить организацию")
                return
            }
        }
        const data = {
            ...value,
            type: _type,
            organization
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
                    isAdmin && (
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
                    )
                }
                <Button loading={loading} type="primary" htmlType="submit">
                    Добавить
                </Button>
            </Form>
        </>
    )
}

export default AddAdmin