import { useMemo } from "react"
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
import { Link } from "react-router-dom"

import { Top } from '../../components'
import { FIND_MANY_ADMIN, FIND_MANY_ADMIN_COUNT, UPDATE_ONE_ADMIN } from "../../gqls"
import { useRouteQuery, useUser, useNavigateSearch, parseBoolean, adminTypeParser, getPermission } from "../../utils/hooks"
import { ADMIN_TYPES } from "../../utils/const"

const Filters = styled(AntForm)`
    margin-bottom: 20px;

    .item {
        width: 200px;
    }
`

const limit = 20

const AdminList = () => {
    const { user } = useUser()
    const query = useRouteQuery()
    const { page = 1, search = "", block = undefined, deleted = undefined, role = undefined, } = query
    const navigate = useNavigateSearch()
    const isOwner = getPermission(user.type, ["org-owner"])
    const organizationId = useMemo(() => user.organizationId ? user.organizationId : "", [user])
    const isAdmin = getPermission(user.type, ["admin"])

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
                    { phone: { contains: search, mode: 'insensitive' } },
                ] : undefined,
                organization: isOwner ? { id: { equals: organizationId } } : undefined
            }
        }
        return variables
    }, [user, deleted, block, search, role, isOwner, organizationId])

    const [updateAdmin, { loading: updateLoading }] = useMutation(UPDATE_ONE_ADMIN, {
        onCompleted: () => {
            message.success("?????????????????????????? ????????????????")
            refetch()
            countRefetch()
        },
        onError: e => {}
    })

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

    const handleChangeTable = ({ current }) => {
        // setCurrentPage(current)
        navigate(`/admin`, { ...query, page: current })
    }

    const onSubmitSearch = ({ search, role, block, deleted }) => {
        navigate("/admin", { ...query, search, role, block, deleted })
    }

    const admins = useMemo(() => data ? data.findManyAdmin : [], [data])
    const adminCount = useMemo(() => countData ? countData.findManyAdminCount : 0, [countData])

    const columns = useMemo(() => {
        let col = [
            {
                title: '??????',
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
                title: '??????',
                dataIndex: 'type',
                key: 'type',
                render: (type, obj) => (
                    <span>{adminTypeParser(type)}</span>
                )
            },
            {
                title: '???????? ????????????????',
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: (createdAt, obj) => (
                    <span>{moment(createdAt).format("DD.MM.yyyy HH:mm")}</span>
                )
            },
        ]
        if (isAdmin) {
            col = [
                ...col,
                {
                    title: "??????????????????????",
                    dataIndex: 'organization',
                    key: 'organization',
                    render: (organization, object) => (
                        <span>{organization ? organization.name : "-"}</span>
                    )
                },
                {
                    title: '??????',
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
                    title: '????????????????',
                    dataIndex: 'delete',
                    key: 'delete',
                    width: 150,
                    render: (_delete, object) => (
                        <Popconfirm
                            title={`${object.delete ? "????????????????????????" : "??????????????"} ?????????????????????`}
                            onConfirm={() => {
                                updateAdmin({
                                    variables: {
                                        where: {
                                            id: object.id,
                                        },
                                        data: {
                                            delete: { set: !_delete },
                                            organization: {
                                                disconnect: true
                                            }
                                        }
                                    }
                                })
                            }}
                        >
                            <Button
                                type={_delete ? 'primary' : 'danger'}
                            >
                                {_delete ? "????????????????????????" : "??????????????"}
                            </Button>
                        </Popconfirm>
                    )
                }
            ]
        }
        if (isOwner) {
            col.push({
                title: '????????????????',
                dataIndex: 'delete',
                key: 'delete',
                width: 150,
                render: (_delete, object) => (
                    <Popconfirm
                        title={`?????????????? ?????????????????????`}
                        onConfirm={() => {
                            updateAdmin({
                                variables: {
                                    where: {
                                        id: object.id,
                                    },
                                    data: {
                                        organization: {
                                            disconnect: true
                                        }
                                    }
                                }
                            })
                        }}
                    >
                        <Button
                            type={'danger'}
                        >
                            ??????????????
                        </Button>
                    </Popconfirm>
                )
            })
        }
        return col
    }, [isAdmin, isOwner, updateAdmin])

    return (
        <>
            <Top
                title={`???????????????????????????? (${adminCount})`}
                action={
                    <Link to='add'>
                        <Button>
                            + ????????????????
                        </Button>
                    </Link>
                }
            />
            <Filters
                layout='inline'
                onFinish={onSubmitSearch}
                initialValues={{
                    search,
                    block: parseBoolean(block),
                    deleted: parseBoolean(deleted),
                    role
                }}
            >
                <Filters.Item name={'search'}>
                    <Input
                        placeholder="??????????"
                        allowClear
                        onChange={e => {
                            if (!e.target.value) {
                                navigate("/admin", { ...query, search: '' })
                            }
                        }}
                        className='item'
                    />
                </Filters.Item>
                {
                    isAdmin && (
                        <>
                            <Filters.Item name={'block'}>
                                <Select
                                    placeholder="???????????? ????????????????????"
                                    // onChange={data => setBlock(data)}
                                    className='item'
                                    allowClear
                                    onClear={() => navigate("/admin", { ...query, block: undefined })}
                                >
                                    <Select.Option value={false}>
                                        ???? ??????????????????????????????
                                    </Select.Option>
                                    <Select.Option value={true}>
                                        ??????????????????????????????
                                    </Select.Option>
                                </Select>
                            </Filters.Item>
                            <Filters.Item name={'role'}>
                                <Select
                                    placeholder="????????"
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
                                    placeholder="???????????? ????????????????"
                                    className='item'
                                    allowClear
                                    onClear={() => navigate("/admin", { ...query, deleted: undefined })}
                                >
                                    <Select.Option value={false}>
                                        ???? ??????????????????
                                    </Select.Option>
                                    <Select.Option value={true}>
                                        ??????????????????
                                    </Select.Option>
                                </Select>
                            </Filters.Item>
                        </>
                    )
                }
                <Button
                    htmlType='submit'
                    type='primary'
                >
                    ??????????????????
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
                columns={columns}
            />
        </>
    )
}

export default AdminList