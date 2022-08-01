import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useNavigate } from 'react-router-dom'

import {
    Empty,
    LoadingView,
    Top,
    UploadFile,
    // OrgAdmins
} from '../../components'
import { FIND_UNIQUE_ORGANIZATION, UPDATE_ONE_ORGANIZATION } from '../../gqls'
import { ORG_CATEGORIES } from '../../utils/const'

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
                name,
                description,
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
                email,
                phone,
                categories,
                links
            })
            setTimeout(() => {
                refs.get("logo").setFileList([{
                    uid: logo,
                    url: `/uploads/${logo}`,
                    name: logo
                }])
            }, 200)
        }
    })

    const [updateOrg, { loading: updateLoading }] = useMutation(UPDATE_ONE_ORGANIZATION, {
        onCompleted: () => {
            message.success("Организация обновлена")
            // window.history.back()
            navigate(`/organization/${id}`)
        },
        onError: e => { }
    })

    const handleSubmit = ({
        name,
        description,
        email,
        phone,
        categories,
        links
    }) => {
        const logo = refs.get("logo").getFileList()
        const data = {
            logo: { set: logo[0].name },
            name: { set: name },
            description: { set: description },
            email: { set: email },
            phone: { set: phone },
            categories,
            links
        }
        updateOrg({
            variables: {
                where: { id },
                data
            }
        })
    }

    const organization = useMemo(() => data ? data.findUniqueOrganization : null, [data])

    if (!loading && !organization) {
        return (
            <Empty 
                description='Организация не найдена'
                buttonText='к организациям'
                onButtonClick={() => navigate("/organization")}
            />
        )
    }

    return (
        <>
            <Top title={'Редактирование организации'} />
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
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
                    label="Адрес электронной почты"
                >
                    <Input placeholder='Введите Email' />
                </Form.Item>
                <Form.Item
                    name={"phone"}
                    label="Номер телефона"
                >
                    <Input placeholder='Введите номер' />
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
                    label="Ссылки на сторонние ресурсы и соцсети"
                >
                    <Select
                        mode="tags"
                        placeholder='Введите ссылки'
                        allowClear
                    />
                </Form.Item>
                <Button loading={updateLoading} type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form>
            <LoadingView loading={loading} />
        </>
    )
}

export default EditOrg