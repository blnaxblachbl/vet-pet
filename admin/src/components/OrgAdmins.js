import { forwardRef, useImperativeHandle, useMemo, useState, useRef } from "react"
import styled from "styled-components"
import {
    Button,
    Table,
    Switch,
    Popconfirm,
    Form as AntForm,
    Select,
    Input,
    Popover,
    Modal,
    message
} from 'antd'
import { useMutation, useQuery } from "@apollo/client"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"

import { Top } from '../components'
import { FIND_MANY_ADMIN, FIND_MANY_ADMIN_COUNT, UPDATE_ONE_ADMIN, CREATE_ONE_ADMIN } from "../gqls"
import { useRouteQuery, useUser, useNavigateSearch, parseBoolean, adminTypeParser, getPermission } from "../utils/hooks"
import { ADMIN_TYPES, ORG_ADMIN_TYPES } from "../utils/const"

const Filters = styled(AntForm)`
    /* display: flex;
    flex-direction: row;
    align-items: center; */
    margin-bottom: 20px;

    .item {
        width: 200px;
        /* margin-right: 15px; */
    }
`
const PopoverMenu = styled.div`
    width: fit-content;
    .menu-item {
        margin-bottom: 5px;
        display: block;
        width: 100%;
        :last-child {
            margin-bottom: 0;
        }
    }
`
const Form = styled(AntForm)`
    max-width: 600px;
`
const rules = {
    required: {
        required: true,
        message: 'Обязательное поле'
    }
}

const limit = 20

export const OrgAdmins = ({
    isOwner = false,
    organizationId = ""
}) => {
    const { user } = useUser()
    const query = useRouteQuery()
    const { page = 1, search = "", block = undefined, deleted = false, role = undefined, } = query
    const navigate = useNavigateSearch()
    const { pathname } = window.location
    const isAdmin = getPermission(user.type, ['admin'])
    const organization = useMemo(() => user ? user.organizations : [], [user])
    const adminForm = useRef()

    const [visible, setVisible] = useState(false)

    const variables = useMemo(() => {
        const variables = {
            where: {
                id: user ? { not: { equals: user.id } } : undefined,
                type: role ? { equals: role } : undefined,
                block: typeof parseBoolean(block) === 'boolean' ? { equals: parseBoolean(block) } : undefined,
                delete: typeof parseBoolean(deleted) === 'boolean' ? { equals: parseBoolean(deleted) } : undefined,
                OR: search ? [
                    { name: { contains: search, mode: 'insensitive' } },
                    { email: { contains: search, mode: 'insensitive' } },
                ] : undefined,
                organizations: { some: { id: { equals: organizationId } } }
            }
        }
        return variables
    }, [user, deleted, block, search, role])

    const { data, loading, refetch } = useQuery(FIND_MANY_ADMIN, {
        variables: {
            ...variables,
            take: 10,
            skip: (page - 1) * limit,
            orderBy: {
                createdAt: 'desc'
            }
        },
        fetchPolicy: 'network-only'
    })

    const { data: countData, loading: countLoading, refetch: countRefetch } = useQuery(FIND_MANY_ADMIN_COUNT, {
        variables,
        fetchPolicy: 'network-only'
    })

    const [updateAdmin, { loading: updateLoading }] = useMutation(UPDATE_ONE_ADMIN, {
        onCompleted: () => {
            message.success("Администратор обновлен")
            closeModal()
        },
        onError: e => { }
    })

    const [createAdmin, { loading: createLoading }] = useMutation(CREATE_ONE_ADMIN, {
        onCompleted: () => {
            message.success("Администратор добавлен")
            countRefetch()
            refetch()
        },
        onError: e => { }
    })

    const handleChangeTable = ({ current }) => {
        // setCurrentPage(current)
        navigate(`/admin`, { ...query, page: current })
    }

    const onSubmitSearch = ({ search, role, block, deleted }) => {
        navigate(pathname, { ...query, search, role, block, deleted })
    }

    const handleSubmitAdmin = ({
        id,
        name,
        email,
        phone,
        organizations,
        type,
    }) => {
        if (id) {
            const data = {
                name: { set: name },
                email: { set: email },
                phone: { set: phone },
                organizations: {
                    set: organizations.map(o => ({
                        id: o,
                    }))
                },
                type: { set: type },
            }
            console.log(data)
            updateAdmin({
                variables: {
                    where: { id },
                    data
                }
            })
        } else {
            const data = {
                name,
                email,
                phone,
                organizations: {
                    connect: organizations.map(o => ({
                        id: o,
                    }))
                },
                type
            }
            console.log(data)
            createAdmin({
                variables: { data }
            })
        }
        closeModal()
    }

    const closeModal = () => {
        setVisible(false)
        adminForm.current.resetFields()
    }

    const openModal = (admin) => {
        if (admin) {
            adminForm.current.setFieldsValue({
                ...admin,
                organizations: admin.organizations.map(o => o.id),
            })
        } else {
            adminForm.current.setFieldsValue({
                organizations: [organizationId],
            })
        }
        setVisible(true)
    }

    const admins = useMemo(() => data ? data.findManyAdmin : [], [data])
    const adminCount = useMemo(() => countData ? countData.findManyAdminCount : 0, [countData])

    return (
        <>
            <Top
                title={`Администраторы (${adminCount})`}
                action={
                    isOwner && (
                        <Button
                            onClick={() => openModal()}
                        >
                            + Добавить
                        </Button>
                    )
                }
            />
            <Filters
                layout='inline'
                onFinish={onSubmitSearch}
                initialValues={{
                    search,
                    block,
                    deleted: parseBoolean(deleted),
                    role
                }}
            >
                <Filters.Item name={'search'}>
                    <Input
                        placeholder="Поиск"
                        allowClear
                        onChange={e => {
                            if (!e.target.value) {
                                navigate(pathname, { ...query, search: '' })
                            }
                        }}
                        className='item'
                    />
                </Filters.Item>
                <Filters.Item name={'block'}>
                    <Select
                        placeholder="Статус блокировки"
                        // onChange={data => setBlock(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate(pathname, { ...query, block: undefined })}
                    >
                        <Select.Option value={false}>
                            Не заблокированный
                        </Select.Option>
                        <Select.Option value={true}>
                            Заблокированный
                        </Select.Option>
                    </Select>
                </Filters.Item>
                <Filters.Item name={'role'}>
                    <Select
                        placeholder="Роль"
                        // onChange={data => setRole(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate(pathname, { ...query, role: undefined })}
                    >
                        {
                            Object.keys(ORG_ADMIN_TYPES).map(key => (
                                <Select.Option key={key}>
                                    {ORG_ADMIN_TYPES[key]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Filters.Item>
                <Filters.Item name={'deleted'}>
                    <Select
                        placeholder="Статус удаления"
                        // defaultValue={false}
                        // onChange={data => setDeleted(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate(pathname, { ...query, deleted: undefined })}
                    >
                        <Select.Option value={false}>
                            Не удаленный
                        </Select.Option>
                        <Select.Option value={true}>
                            Удалённый
                        </Select.Option>
                    </Select>
                </Filters.Item>
                <Button
                    htmlType='submit'
                    type='primary'
                >
                    Применить
                </Button>
            </Filters>
            <Table
                loading={loading || countLoading}
                rowKey={(obj) => obj.id}
                dataSource={admins}
                scroll={{ x: 600 }}
                size={window.innerWidth < 500 ? 'small' : 'large'}
                pagination={{
                    current: page,
                    total: adminCount,
                    pageSize: limit
                }}
                onChange={handleChangeTable}
                columns={[
                    {
                        title: 'ФИО',
                        dataIndex: 'name',
                        key: 'name',
                        render: (name, obj) => isAdmin ? (
                            <Link to={obj.id}>
                                {name}
                            </Link>
                        ) : name
                    },
                    {
                        title: 'Номер телефона',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Тип',
                        dataIndex: 'type',
                        key: 'type',
                        render: (type, obj) => (
                            <span>{adminTypeParser(type)}</span>
                        )
                    },
                    {
                        title: 'Действие',
                        width: 150,
                        render: (_, object) => (
                            <Popover
                                title='Действия'
                                content={
                                    <PopoverMenu>
                                        <Button danger className="menu-item">
                                            Удалить из организации
                                        </Button>
                                        <Button type='danger' className="menu-item">
                                            Удалить из всех организаций
                                        </Button>
                                        <Button
                                            className="menu-item"
                                            onClick={() => openModal(object)}
                                            type='primary'
                                        >
                                            Редактировать
                                        </Button>
                                    </PopoverMenu>
                                }
                                overlayStyle={{
                                    width: 'fit-content'
                                }}
                                visible={isOwner ? undefined : false}
                            >
                                <Button disabled={!isOwner}>
                                    Действия
                                </Button>
                            </Popover>
                        )
                    },
                ]}
            />
            <AdmniModal
                ref={adminForm}
                visible={visible}
                organizations={user.organizations}
                organization={organization}
                organizationId={organizationId}
                closeModal={closeModal}
                handleSubmit={handleSubmitAdmin}
                loading={updateLoading || createLoading}
            />
        </>
    )
}

const AdmniModal = forwardRef(({
    visible = false,
    organizations = [],
    closeModal = () => { },
    handleSubmit = () => { },
    loading = false
}, ref) => {
    const [form] = Form.useForm()

    useImperativeHandle(ref, () => ({
        resetFields: () => form.resetFields(),
        setFieldsValue: (values) => form.setFieldsValue(values)
    }))

    return (
        <Modal
            visible={visible}
            onCancel={closeModal}
            onOk={form.submit}
            okButtonProps={{
                loading
            }}
            closable={false}
        >
            <Top title={"Добавление администратора"} />
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    name={"id"}
                    style={{ display: 'none' }}
                >
                    <Input />
                </Form.Item>
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
                    name='organizations'
                    rules={[rules.required]}
                    label="Организация в которой работат администратор"
                >
                    <Select
                        placeholder="Организацию"
                        allowClear
                        showSearch
                        optionFilterProp="children"
                        mode='multiple'
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
                            Object.keys(ORG_ADMIN_TYPES).map(key => (
                                <Select.Option
                                    key={key}
                                >
                                    {ORG_ADMIN_TYPES[key]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    )
})