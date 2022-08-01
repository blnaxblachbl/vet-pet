import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, Select } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import {
    LoadingView,
    Top,
    UploadFile,
    Empty
} from '../../components'
import { UPDATE_ONE_GOOD, FIND_MANY_BRANCH, FIND_UNIQUE_GOOD, FIND_UNIQUE_GOOD_CATEGORIES } from '../../gqls'
import { useUser } from '../../utils/hooks'
import { GOOD_TYPES } from '../../utils/const'

const Form = styled(AntForm)`
    max-width: 600px;
`
const rules = {
    required: {
        required: true,
        message: 'Обязательное поле'
    }
}

const EditGood = () => {
    const { id } = useParams()
    const { user } = useUser()
    const [form] = Form.useForm()
    const refs = useRef(new Map()).current
    const navigate = useNavigate()


    const { data, loading } = useQuery(FIND_UNIQUE_GOOD, {
        variables: {
            where: { id }
        },
        onCompleted: ({
            findUniqueGood: {
                name,
                description,
                images,
                price,
                branchs,
                type,
                categories
            }
        }) => {
            form.setFieldsValue({
                name,
                description,
                price,
                branchs: branchs.map(item => item.id),
                type,
                images,
                categories
            })
            setTimeout(() => {
                refs.get("images").setFileList(images.map(name => ({
                    uid: name,
                    url: `/uploads/${name}`,
                    name: name
                })))
            }, 200)
        }
    })

    const { data: branchData, loading: branchsLoadnig } = useQuery(FIND_MANY_BRANCH, {
        variables: {
            where: {
                delete: { equals: false },
                publish: { equals: true }
            }
        },
        fetchPolicy: 'network-only'
    })

    const { data: categoriesData, loading: categoriesLoading } = useQuery(FIND_UNIQUE_GOOD_CATEGORIES, {
        variables: {
            where: { id: user.organizationId ? user.organizationId : "" }
        },
        fetchPolicy: 'network-only'
    })

    const branchs = useMemo(() => branchData ? branchData.findManyBranch : [], [branchData])
    const good = useMemo(() => data ? data.findUniqueGood : [], [data])
    const categories = useMemo(() => categoriesData ? categoriesData.findUniqueGoodCategories : [], [categoriesData])

    // console.log(categoriesData, categories)

    const [updateGood, { loading: updateLoading }] = useMutation(UPDATE_ONE_GOOD, {
        onCompleted: () => {
            message.success("Товар обновлен")
            navigate("/good")
        },
        onError: e => { }
    })

    const handleSubmit = ({
        branchs,
        price,
        name,
        description,
        type,
        categories
    }) => {
        if (!user.organization) {
            message.warning("Сначала нужно добавить организацию")
            return
        }
        const images = refs.get("images").getFileList()
        const data = {
            images: images.map(img => img.name),
            branchs: {
                set: branchs.map(b => ({ id: b }))
            },
            price: { set: parseInt(price) },
            name: { set: name },
            description: { set: description },
            type: { set: type },
            categories
        }
        updateGood({
            variables: {
                where: { id },
                data
            }
        })
    }

    if (!loading && !good) {
        return (
            <Empty
                description='Товар не найден'
                buttonText='к товарам'
                onButtonClick={() => navigate("/good")}
            />
        )
    }

    return (
        <>
            <Top title={'Добавление товара или услуги'} />
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    name={"images"}
                    rules={[rules.required]}
                    label="Фотографии товара или услуги"
                >
                    <UploadFile
                        ref={ref => refs.set("images", ref)}
                        listType="picture-card"
                        maxCount={5}
                    >
                        Загрузите изображение
                    </UploadFile>
                </Form.Item>
                <Form.Item
                    name={"name"}
                    rules={[rules.required]}
                    label="Наменование товара или услуги"
                >
                    <Input placeholder='Введите адрес' />
                </Form.Item>
                <Form.Item
                    name={"description"}
                    rules={[rules.required]}
                    label="Описание товара или услуги"
                >
                    <Input.TextArea
                        placeholder='Введите описание'
                        style={{
                            minHeight: 200
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name={"type"}
                    rules={[rules.required]}
                    label="Тип"
                >
                    <Select
                        placeholder="Выберите тип"
                        allowClear
                    >
                        {
                            Object.keys(GOOD_TYPES).map(key => (
                                <Select.Option
                                    key={key}
                                >
                                    {GOOD_TYPES[key]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"branchs"}
                    rules={[rules.required]}
                    label="Филиалы в которых предоставляются товары или услуги"
                >
                    <Select
                        placeholder="Выберите филиалы"
                        allowClear
                        showSearch
                        mode='multiple'
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        loading={branchsLoadnig}
                    >
                        {
                            branchs.map(item => (
                                <Select.Option key={item.id}>
                                    {item.address}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"categories"}
                    rules={[rules.required]}
                    label="Категории товара"
                >
                    <Select
                        placeholder="Выберите категории"
                        allowClear
                        showSearch
                        mode='tags'
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        loading={categoriesLoading}
                    >
                        {
                            categories.map(item => (
                                <Select.Option key={item}>
                                    {item}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name={"price"}
                    rules={[rules.required]}
                    label="Стоимость товара или услуги"
                >
                    <Input
                        placeholder='Введите цену'
                        type='number'
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

export default EditGood