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

import { Top } from "../../components"
import {
    FIND_MANY_ORDER,
    FIND_MANY_ORDER_COUNT,
    FIND_MANY_ORGANIZATION,
    UPDATE_ONE_ORDER,
    FIND_MANY_BRANCH
} from "../../gqls"
import { useRouteQuery, useUser, useNavigateSearch, parseBoolean, getPermission } from "../../utils/hooks"
import { GOOD_TYPES, ORDER_STATUS } from "../../utils/const"

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

const Orders = () => {
    const { user } = useUser()
    const query = useRouteQuery()
    const navigate = useNavigateSearch()
    const { page = 1, search = "", organization = null, branch = null, status = null } = query
    const isAdminOrModer = getPermission(user.type, ['admin', 'moder'])

    const [updateGood, { loading: updateLoading }] = useMutation(UPDATE_ONE_ORDER, {
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
                organizationId,
                OR: search ? [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } },
                ] : undefined,
                branchs: branch ? { some: { id: { equals: branch } } } : undefined,
                status: status ? { equals: status } : undefined
            }
        }
    }, [user, organization, isAdminOrModer, branch, status])

    const { data: orgData, loading: orgLoading } = useQuery(FIND_MANY_ORGANIZATION, {
        variables: {
            where: {
                delete: { equals: false }
            }
        }
    })

    const { data, loading, refetch } = useQuery(FIND_MANY_ORDER, {
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

    const { data: countData, loading: countLoading, refetch: countRefetch } = useQuery(FIND_MANY_ORDER_COUNT, {
        variables,
        fetchPolicy: 'network-only'
    })

    const handleChangeTable = ({ current }) => {
        // setCurrentPage(current)
        navigate(`/order`, { ...query, page: current })
    }

    const onSubmitSearch = ({ search, branch, organization, status }) => {
        navigate("/order", { ...query, search, branch, organization, status })
    }

    const branchs = useMemo(() => branchData ? branchData.findManyBranch : [], [branchData])
    const organizations = useMemo(() => orgData ? orgData.findManyOrganization : [], [orgData])
    const orders = useMemo(() => data ? data.findManyOrder : [], [data])
    const ordersCount = useMemo(() => countData ? countData.findManyOrderCount : 0, [countData])

    return (
        <>
            <Top
                title={`Заказы (${ordersCount})`}
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
                    organization,
                    branch,
                    status
                }}
            >
                <Filters.Item name={'search'}>
                    <Input
                        placeholder="Поиск"
                        allowClear
                        onChange={e => {
                            if (!e.target.value) {
                                navigate("/order", { ...query, search: '' })
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
                                onClear={() => navigate("/order", { ...query, organization: undefined })}
                                loading={orgLoading}
                            >
                                {
                                    organizations.map(item => (
                                        <Select.Option key={item.id}>
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
                                onClear={() => navigate("/order", { ...query, branch: undefined })}
                                loading={branchsLoadnig}
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {
                                    branchs.map(item => (
                                        <Select.Option key={item.id}>
                                            {item.address}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Filters.Item>
                    )
                }
                <Filters.Item name={'status'}>
                    <Select
                        placeholder="Статус"
                        // onChange={data => setDeleted(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate("/order", { ...query, status: undefined })}
                    >
                        <Select.Option value={'new'}>
                            {ORDER_STATUS.new}
                        </Select.Option>
                        <Select.Option value={'confirmed'}>
                            {ORDER_STATUS.confirmed}
                        </Select.Option>
                        <Select.Option value={'done'}>
                            {ORDER_STATUS.done}
                        </Select.Option>
                        <Select.Option value={'canceled'}>
                            {ORDER_STATUS.canceled}
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
                dataSource={orders}
                scroll={{ x: 600 }}
                size={window.innerWidth < 500 ? 'small' : 'large'}
                pagination={{
                    current: page,
                    total: ordersCount,
                    pageSize: limit
                }}
                onChange={handleChangeTable}
                columns={[
                    {
                        title: 'Номер',
                        dataIndex: 'bumber',
                        key: 'number',
                        // render: (number, obj) => (
                        //     <Link to={obj.id}>
                        //         {number}
                        //     </Link>
                        // )
                    },
                    {
                        title: 'Филиал',
                        dataIndex: 'branchs',
                        key: 'branchs',
                        render: (branchs, obj) => branchs.map(item => item.address).join(", ")
                    },
                    {
                        title: 'Статус',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status, obj) => ORDER_STATUS[status]
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
                        width: 150,
                        dataIndex: 'status',
                        key: 'status',
                        render: (status, object) => (
                            <Popover
                                title='Изменить статус на:'
                                content={
                                    <PopoverMenu>
                                        {
                                            status === 'new' && (
                                                <Button
                                                    type='primary'
                                                    className="menu-item"
                                                    loading={updateLoading}
                                                >
                                                    {"Подтвержден"}
                                                </Button>
                                            )
                                        }
                                        {
                                            status === 'confirmed' && (
                                                <Button
                                                    danger
                                                    className="menu-item"
                                                    loading={updateLoading}
                                                >
                                                    {"Выполнен"}
                                                </Button>
                                            )
                                        }
                                        <Button
                                            danger
                                            className="menu-item"
                                            loading={updateLoading}
                                        >
                                            {"Отменить"}
                                        </Button>
                                    </PopoverMenu>
                                }
                                visible={(status === 'canceled' || status === 'done') ? false : undefined}
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

export default Orders