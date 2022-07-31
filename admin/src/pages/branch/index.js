import { useMemo, useState } from "react"
import styled from "styled-components"
import {
    Button,
    Table,
    Switch,
    Popconfirm,
    Form as AntForm,
    Select,
    Input,
    message
} from 'antd'
import { useMutation, useQuery } from "@apollo/client"
import moment from "moment"
import { Link, useNavigate } from "react-router-dom"

import { Top, PublishStatus } from "../../components"
import { FIND_MANY_BRANCH, FIND_MANY_BRANCH_COUNT, FIND_MANY_ORGANIZATION, UPDATE_ONE_BRANCH } from "../../gqls"
import { useRouteQuery, useUser, useNavigateSearch, parseBoolean, getPermission } from "../../utils/hooks"
import { ORG_CATEGORIES } from "../../utils/const"

const Filters = styled(AntForm)`
    margin-bottom: 20px;

    .item {
        width: 200px;
    }
`

const limit = 20

const Branchs = () => {
    const { user } = useUser()
    const query = useRouteQuery()
    const navigate = useNavigateSearch()
    const { page = 1, search = "", publish = undefined, deleted = false, organization = null } = query
    const isAdminOrModer = getPermission(user.type, ['admin', 'moder'])

    const [updateBranch, { loading: updateLoading }] = useMutation(UPDATE_ONE_BRANCH, {
        onCompleted: () => {
            message.success("Филиал удален")
        },
        onError: e => { }
    })

    const variables = useMemo(() => {
        let organizationId = undefined
        if (isAdminOrModer) {
            if (organization) {
                organizationId = { equals: organization }
            }
        } else if (user && user.organizationId) {
            organizationId = { equals: user.organizationId }
        }
        return {
            where: {
                delete: { equals: false },
                publish: typeof parseBoolean(publish) === 'boolean' ? { equals: parseBoolean(publish) } : undefined,
                delete: typeof parseBoolean(deleted) === 'boolean' ? { equals: parseBoolean(deleted) } : undefined,
                organizationId
            }
        }
    }, [publish, user, deleted, organization, isAdminOrModer])

    const { data: orgData, loading: orgLoading } = useQuery(FIND_MANY_ORGANIZATION, {
        variables: {
            where: {
                delete: { equals: false }
            }
        }
    })

    const { data, loading } = useQuery(FIND_MANY_BRANCH, {
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

    const { data: countData, loading: countLoading } = useQuery(FIND_MANY_BRANCH_COUNT, {
        variables,
        fetchPolicy: 'network-only'
    })

    const handleChangeTable = ({ current }) => {
        // setCurrentPage(current)
        navigate(`/branch`, { ...query, page: current })
    }

    const onSubmitSearch = ({ search, deleted, publish }) => {
        navigate("/branch", { ...query, search, deleted, publish })
    }

    const organizations = useMemo(() => orgData ? orgData.findManyOrganization : [], [orgData])
    const branchs = useMemo(() => data ? data.findManyBranch : [], [data])
    const branchsCount = useMemo(() => countData ? countData.findManyBranchCount : 0, [countData])

    return (
        <>
            <Top
                title={`Организации (${branchsCount})`}
                action={
                    !isAdminOrModer && (
                        <Link to='add'>
                            <Button>
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
                    publish: parseBoolean(publish),
                    deleted: parseBoolean(deleted),
                    organization
                }}
            >
                <Filters.Item name={'search'}>
                    <Input
                        placeholder="Поиск"
                        allowClear
                        onChange={e => {
                            if (!e.target.value) {
                                navigate("/branch", { ...query, search: '' })
                            }
                        }}
                        className='item'
                    />
                </Filters.Item>
                {
                    isAdminOrModer && (
                        <Filters.Item name={'organization'}>
                            <Select
                                placeholder="Организация"
                                // onChange={data => setDeleted(data)}
                                className='item'
                                allowClear
                                onClear={() => navigate("/branch", { ...query, publish: undefined })}
                                loading={orgLoading}
                            >
                                {
                                    organizations.map(item => (
                                        <Select.Option value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Filters.Item>
                    )
                }
                <Filters.Item name={'publish'}>
                    <Select
                        placeholder="Статус"
                        // onChange={data => setDeleted(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate("/branch", { ...query, publish: undefined })}
                    >
                        <Select.Option value={false}>
                            Не опубликованый
                        </Select.Option>
                        <Select.Option value={true}>
                            Опубликованый
                        </Select.Option>
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
                dataSource={branchs}
                scroll={{ x: 600 }}
                size={window.innerWidth < 500 ? 'small' : 'large'}
                pagination={{
                    current: page,
                    total: branchsCount,
                    pageSize: limit
                }}
                onChange={handleChangeTable}
                columns={[
                    {
                        title: 'Адрес',
                        dataIndex: 'address',
                        key: 'address',
                        render: (address, obj) => (
                            <Link to={obj.id}>
                                {address}
                            </Link>
                        )
                    },
                    {
                        title: 'Номер телфона',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'Статус',
                        dataIndex: 'publish',
                        key: 'publish',
                        render: (publish, obj) => (
                            <PublishStatus publish={publish} />
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
                        title: 'Действие',
                        dataIndex: 'delete',
                        key: 'delete',
                        width: 150,
                        render: (_delete, object) => (
                            <Popconfirm
                                title={`${object.delete ? "Восстановить" : "Удалить"} модератора?`}
                                onConfirm={() => {
                                    updateBranch({
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
                    }
                ]}
            />
        </>
    )
}

export default Branchs