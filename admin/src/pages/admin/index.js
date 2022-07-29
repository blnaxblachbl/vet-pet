import { useMemo, useState } from "react"
import styled from "styled-components"
import {
    Button,
    Table,
    Switch,
    Popconfirm,
    Form as AntForm,
    Select,
    Input
} from 'antd'
import { useMutation, useQuery } from "@apollo/client"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"

import { Top } from '../../components'
import { FIND_MANY_ADMIN, FIND_MANY_ADMIN_COUNT, UPDATE_ONE_ADMIN } from "../../gqls"
import { useRouteQuery, useUser, useNavigateSearch, parseBoolean, adminTypeParser, getPermission } from "../../utils/hooks"
import { ADMIN_TYPES } from "../../utils/const"

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

const limit = 20

const AdminList = () => {
    const { user } = useUser()
    const query = useRouteQuery()
    const { page = 1, search = "", block = undefined, deleted = false, role = undefined, } = query
    const navigate = useNavigateSearch()
    // const canCreate = getPermission(user.type, ['admin', "org-owner"])
    const canCreate = true

    const variables = useMemo(() => ({
        where: {
            id: user ? { not: { equals: user.id } } : undefined,
            type: role ? { equals: role } : undefined,
            block: typeof parseBoolean(block) === 'boolean' ? { equals: parseBoolean(block) } : undefined,
            delete: typeof parseBoolean(deleted) === 'boolean' ? { equals: parseBoolean(deleted) } : undefined,
            OR: search ? [
                { name: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
            ] : undefined
        }
    }), [user, deleted, block, search, role])

    const [updateAdmin, { loading: updateLoading }] = useMutation(UPDATE_ONE_ADMIN)

    const { data, loading } = useQuery(FIND_MANY_ADMIN, {
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

    const { data: countData, loading: countLoading } = useQuery(FIND_MANY_ADMIN_COUNT, {
        variables,
        fetchPolicy: 'network-only'
    })

    const handleChangeTable = ({ current }) => {
        // setCurrentPage(current)
        navigate(`/admin`, { ...query, page: current })
    }

    const onSubmitSearch = ({ search, role, block, deleted }) => {
        navigate("/admin", { ...query, search, role, block, deleted })
    }

    const admins = useMemo(() => data ? data.findManyAdmin : [], [data])
    const adminCount = useMemo(() => countData ? countData.findManyAdminCount : 0, [countData])

    return (
        <>
            <Top
                title={`Администраторы (${adminCount})`}
                action={
                    canCreate && (
                        <Link to='add'>
                            <Button
                                type='primary'
                            >
                                + Добавить
                            </Button>
                        </Link>
                    )
                }
            />
            <Filters
                layout='inline'
                onFinish={onSubmitSearch}
                initialValues={{
                    search,
                    block,
                    deleted,
                    role
                }}
            >
                <Filters.Item name={'search'}>
                    <Input
                        placeholder="Поиск"
                        allowClear
                        onChange={e => {
                            if (!e.target.value) {
                                navigate("/admin", { ...query, search: '' })
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
                        onClear={() => navigate("/admin", { ...query, block: undefined })}
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
                        onClear={() => navigate("/admin", { ...query, role: undefined })}
                    >
                        {
                            Object.keys(ADMIN_TYPES).map(key => (
                                <Select.Option key={key}>
                                    {ADMIN_TYPES[key]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Filters.Item>
                <Filters.Item name={'deleted'}>
                    <Select
                        placeholder="Статус удаления"
                        defaultValue={false}
                        // onChange={data => setDeleted(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate("/admin", { ...query, deleted: undefined })}
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
                loading={loading || countLoading || updateLoading}
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
                        render: (name, obj) => (
                            <Link to={obj.id}>
                                {name}
                            </Link>
                        )
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
                        title: 'Дата создание',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (createdAt, obj) => (
                            <span>{moment(createdAt).format("DD.MM.yyyy HH:mm")}</span>
                        )
                    },
                    {
                        title: 'Бан',
                        dataIndex: 'block',
                        key: 'block',
                        render: (block, object) => (
                            <Switch
                                size='small'
                                onChange={(value) => {
                                    updateAdmin({
                                        variables: {
                                            where: {
                                                id: object.id,
                                            },
                                            data: {
                                                block: { set: value }
                                            }
                                        }
                                    })
                                }}
                                defaultChecked={block}
                            />
                        )
                    },
                    {
                        title: 'Действие',
                        dataIndex: 'delete',
                        key: 'delete',
                        width: 150,
                        render: (_delete, object) => (
                            <Popconfirm
                                title={`${object.delete ? "Восстановить" : "Удалить"} модератора?`}
                                onConfirm={() => {
                                    updateAdmin({
                                        variables: {
                                            where: {
                                                id: object.id,
                                            },
                                            data: {
                                                delete: { set: !_delete }
                                            }
                                        }
                                    })
                                }}
                            >
                                <Button
                                    type={_delete ? 'primary' : 'danger'}
                                >
                                    {_delete ? "Восстановить" : "Удалить"}
                                </Button>
                            </Popconfirm>
                        )
                    },
                ]}
            />
        </>
    )
}

export default AdminList