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
    message,
    Popover
} from 'antd'
import { useMutation, useQuery } from "@apollo/client"
import moment from "moment"
import { Link } from "react-router-dom"

import { Top, PublishStatus } from "../../components"
import { FIND_MANY_GOOD, FIND_MANY_GOOD_COUNT, FIND_MANY_ORGANIZATION, UPDATE_ONE_GOOD, FIND_MANY_BRANCH } from "../../gqls"
import { useRouteQuery, useUser, useNavigateSearch, parseBoolean, getPermission } from "../../utils/hooks"
import { GOOD_TYPES } from "../../utils/const"

const Filters = styled(AntForm)`
    margin-bottom: 20px;

    .item {
        width: 200px;
    }
`
const PopoverMenu = styled.div`
    .menu-item {
        width: 100%;
        margin-bottom: 5px;
        :last-child {
            margin-bottom: 0;
        }
    }
`

const limit = 20

const Goods = () => {
    const { user } = useUser()
    const query = useRouteQuery()
    const navigate = useNavigateSearch()
    const { page = 1, search = "", publish = undefined, deleted = undefined, organization = null, branch = null } = query
    const isAdminOrModer = getPermission(user.type, ['admin', 'moder'])

    const [updateGood, { loading: updateLoading }] = useMutation(UPDATE_ONE_GOOD, {
        onCompleted: () => {
            message.success("Товар обновлен")
            refetch()
            countRefetch()
        },
        onError: e => { }
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
                publish: typeof parseBoolean(publish) === 'boolean' ? { equals: parseBoolean(publish) } : undefined,
                delete: typeof parseBoolean(deleted) === 'boolean' ? { equals: parseBoolean(deleted) } : undefined,
                organizationId,
                OR: search ? [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ] : undefined,
                branchs: branch ? { some: { id: { equals: branch } } } : undefined
            }
        }
    }, [publish, user, deleted, organization, isAdminOrModer, branch])

    const { data: orgData, loading: orgLoading } = useQuery(FIND_MANY_ORGANIZATION, {
        variables: {
            where: {
                delete: { equals: false }
            }
        }
    })

    const { data, loading, refetch } = useQuery(FIND_MANY_GOOD, {
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

    const { data: countData, loading: countLoading, refetch: countRefetch } = useQuery(FIND_MANY_GOOD_COUNT, {
        variables,
        fetchPolicy: 'network-only'
    })

    const handleChangeTable = ({ current }) => {
        // setCurrentPage(current)
        navigate(`/good`, { ...query, page: current })
    }

    const onSubmitSearch = ({ search, deleted, publish, branch, organization }) => {
        navigate("/good", { ...query, search, deleted, publish, branch, organization })
    }

    const branchs = useMemo(() => branchData ? branchData.findManyBranch : [], [branchData])
    const organizations = useMemo(() => orgData ? orgData.findManyOrganization : [], [orgData])
    const goods = useMemo(() => data ? data.findManyGood : [], [data])
    const goodsCount = useMemo(() => countData ? countData.findManyGoodCount : 0, [countData])

    return (
        <>
            <Top
                title={`Товары и услуги (${goodsCount})`}
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
                    organization,
                    branch
                }}
            >
                <Filters.Item name={'search'}>
                    <Input
                        placeholder="Поиск"
                        allowClear
                        onChange={e => {
                            if (!e.target.value) {
                                navigate("/good", { ...query, search: '' })
                            }
                        }}
                        className='item'
                    />
                </Filters.Item>
                {
                    isAdminOrModer ? (
                        <Filters.Item name={'organization'}>
                            <Select
                                placeholder="Организация"
                                // onChange={data => setDeleted(data)}
                                className='item'
                                allowClear
                                onClear={() => navigate("/good", { ...query, organization: undefined })}
                                loading={orgLoading}
                            >
                                {
                                    organizations.map(item => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.name}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Filters.Item>
                    ) : (
                        <Filters.Item name={'branch'}>
                            <Select
                                placeholder="Филиал"
                                // onChange={data => setDeleted(data)}
                                className='item'
                                allowClear
                                showSearch
                                onClear={() => navigate("/good", { ...query, branch: undefined })}
                                loading={branchsLoadnig}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    branchs.map(item => (
                                        <Select.Option key={item.id} value={item.id}>
                                            {item.address}
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
                        onClear={() => navigate("/good", { ...query, publish: undefined })}
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
                        className='item'
                        allowClear
                        onClear={() => navigate("/good", { ...query, deleted: undefined })}
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
                dataSource={goods}
                scroll={{ x: 600 }}
                size={window.innerWidth < 500 ? 'small' : 'large'}
                pagination={{
                    current: page,
                    total: goodsCount,
                    pageSize: limit
                }}
                onChange={handleChangeTable}
                columns={[
                    {
                        title: 'Название',
                        dataIndex: 'name',
                        key: 'name',
                        render: (name, obj) => (
                            <Link to={obj.id}>
                                {name}
                            </Link>
                        )
                    },
                    {
                        title: 'Филиалы',
                        dataIndex: 'branchs',
                        key: 'branchs',
                        render: (branchs, obj) => branchs.map(item => item.address).join(", ")
                    },
                    {
                        title: 'Тип',
                        dataIndex: 'type',
                        key: 'type',
                        render: (type, obj) => GOOD_TYPES[type]
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
                        render: (_delete, object) => _delete ? (
                            <Popconfirm
                                title={`${object.delete ? "Восстановить" : "Удалить"} филиал?`}
                                onConfirm={() => {
                                    updateGood({
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
                                disabled={updateLoading}
                            >
                                <Button
                                    type={_delete ? 'primary' : 'danger'}
                                    className="menu-item"
                                    loading={updateLoading}
                                >
                                    {_delete ? "Восстановить" : "Удалить"}
                                </Button>
                            </Popconfirm>
                        ) : (
                            <Popover
                                title='Действия'
                                content={
                                    <PopoverMenu>
                                        <Popconfirm
                                            title={`${!object.publish ? "Опубликовать" : "Снять с публткации"} филиал?`}
                                            onConfirm={() => {
                                                updateGood({
                                                    variables: {
                                                        where: {
                                                            id: object.id,
                                                        },
                                                        data: {
                                                            publish: { set: !object.publish }
                                                        }
                                                    }
                                                })
                                            }}
                                            disabled={updateLoading}
                                        >
                                            <Button danger className="menu-item" loading={updateLoading}>
                                                {!object.publish ? "Опубликовать" : "Снять с публткации"}
                                            </Button>
                                        </Popconfirm>
                                        <Popconfirm
                                            title={`${object.delete ? "Восстановить" : "Удалить"} филиал?`}
                                            onConfirm={() => {
                                                updateGood({
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
                                            disabled={updateLoading}
                                        >
                                            <Button
                                                type={_delete ? 'primary' : 'danger'}
                                                className="menu-item"
                                                loading={updateLoading}
                                            >
                                                {_delete ? "Восстановить" : "Удалить"}
                                            </Button>
                                        </Popconfirm>
                                    </PopoverMenu>
                                }
                            >
                                <Button>
                                    Действия
                                </Button>
                            </Popover >

                        )
                    }
                ]}
            />
        </>
    )
}

export default Goods