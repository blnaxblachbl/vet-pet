import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation } from '@apollo/client'
import { useForm } from 'rc-field-form'

import {
    Top,
    UploadFile
} from '../../components'
import { CREATE_ONE_ADMIN, CREATE_ONE_ORGANIZATION } from '../../gqls'
import { ORG_CATEGORIES } from '../../utils/const'
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

const AddOrg = () => {
    const { user } = useUser()
    const [form] = Form.useForm()
    const refs = useRef(new Map()).current

    const [createOrg, { loading }] = useMutation(CREATE_ONE_ORGANIZATION, {
        onCompleted: () => {
            message.success("Организация создана")
            form.resetFields()
            refs.get("logo").setFileList([])
            refs.get("images").setFileList([])
        },
        onError: e => { }
    })

    const handleSubmit = ({ ...value }) => {
        const logo = refs.get("logo").getFileList()
        const images = refs.get("images").getFileList()
        const data = {
            ...value,
            logo: logo[0].name,
            images: images.map(item => item.name),
            admins: {
                connect: { id: user.id }
            }
        }
        // console.log(data)
        createOrg({
            variables: { data }
        })
    }

    return (
        <>
            <Top title={'Добавление организации'} />
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
            // initialValues={{
            //     payerStatus: 'default'
            // }}
            >
                <Form.Item
                    name={"logo"}
                    rules={[rules.required]}
                    label="Название организации"
                >
                    <UploadFile
                        ref={ref => refs.set("logo", ref)}
                        listType="picture-card"
                        maxCount={1}
                    >
                        Загрузите логотип
                    </UploadFile>
                </Form.Item>
                <Form.Item
                    name={"name"}
                    rules={[rules.required]}
                    label="Название организации"
                >
                    <Input placeholder='Введите название' />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    rules={[rules.required]}
                    label="Описание организации"
                >
                    <Input.TextArea
                        placeholder='Введите описание'
                        style={{
                            minHeight: 200
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={"email"}
                    // rules={[rules.required]}
                    label="Адрес электронной почты"
                >
                    <Input placeholder='Введите Email' />
                </Form.Item>
                <Form.Item
                    name={"phone"}
                    rules={[rules.required]}
                    label="Номер телефона"
                >
                    <Input placeholder='Введите номер' />
                </Form.Item>
                <Form.Item
                    name={"address"}
                    rules={[rules.required]}
                    label="Адрес организации"
                >
                    <Input placeholder='Введите адрес' />
                </Form.Item>
                <Form.Item
                    name={"categories"}
                    rules={[rules.required]}
                    label="Категории организации"
                >
                    <Select
                        mode='multiple'
                        placeholder='Выбирите категории'
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            Object.keys(ORG_CATEGORIES).map(key => (
                                <Select.Option key={key}>
                                    {ORG_CATEGORIES[key]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"links"}
                    // rules={[rules.required]}
                    label="Ссылки на сторонние ресурсы и соцсети"
                >
                    <Select
                        mode="tags"
                        placeholder='Введите ссылки'
                        allowClear
                    />
                </Form.Item>
                <Form.Item
                    name={"images"}
                    // rules={[rules.required]}
                    label="Фотогалерея организации"
                >
                    <UploadFile
                        ref={ref => refs.set("images", ref)}
                        listType="picture-card"
                        maxCount={10}
                    >
                        Загрузите изображение
                    </UploadFile>
                </Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                    Добавить организацию
                </Button>
            </Form>
        </>
    )
}

export default AddOrg