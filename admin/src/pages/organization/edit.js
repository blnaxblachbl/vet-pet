import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'

import {
    Top,
    UploadFile,
    OrgAdmins
} from '../../components'
import { FIND_UNIQUE_ORGANIZATION, UPDATE_ONE_ORGANIZATION } from '../../gqls'
import { ORG_CATEGORIES } from '../../utils/const'
import { getPermission, useUser } from '../../utils/hooks'

const Form = styled(AntForm)`
    max-width: 600px;
    margin-bottom: 24px;
`
const rules = {
    required: {
        required: true,
        message: 'Обязательное поле'
    }
}

const EditOrg = () => {
    const { user } = useUser()
    const [form] = Form.useForm()
    const refs = useRef(new Map()).current
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, loading } = useQuery(FIND_UNIQUE_ORGANIZATION, {
        variables: {
            where: { id }
        },
        onCompleted: ({
            findUniqueOrganization: {
                logo,
                images,
                // admins
                name,
                description,
                address,
                email,
                phone,
                categories,
                links
            }
        }) => {
            form.setFieldsValue({
                logo,
                images,
                name,
                description,
                address,
                email,
                phone,
                categories,
                links
            })
            // refs.get("logo").setFileList([logo])
            // refs.get("images").setFileList([images])
            setTimeout(() => {
                refs.get("logo").setFileList([{
                    uid: logo,
                    url: `/uploads/${logo}`,
                    name: logo
                }])
                refs.get("images").setFileList(images.map(item => ({
                    uid: item,
                    url: `/uploads/${item}`,
                    name: item
                })))
            }, 200)
        }
    })

    const [updateOrg, { loading: updateLoading }] = useMutation(UPDATE_ONE_ORGANIZATION, {
        onCompleted: () => {
            message.success("Организация обновлена")
            // form.resetFields()
            // refs.get("logo").setFileList([])
            // refs.get("images").setFileList([])
            window.history.back()
        },
        onError: e => { }
    })

    const handleSubmit = ({
        name,
        description,
        email,
        phone,
        address,
        categories,
        links
    }) => {
        const logo = refs.get("logo").getFileList()
        const images = refs.get("images").getFileList()
        const data = {
            logo: { set: logo[0].name },
            images: images.map(item => item.name),
            name: { set: name },
            description: { set: description },
            email: { set: email },
            phone: { set: phone },
            address: { set: address },
            categories,
            links
        }
        // console.log(data)
        updateOrg({
            variables: {
                where: { id },
                data
            }
        })
    }

    return (
        <>
            <Top title={'Редактирование организации'} />
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
                    Сохранить
                </Button>
            </Form>
            <OrgAdmins
                organizationId={id}
                isOwner={user && user.organizations.find(o => o.id === id)}
            />
        </>
    )
}

export default EditOrg