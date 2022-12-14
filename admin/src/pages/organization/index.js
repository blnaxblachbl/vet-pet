import { useMemo } from "react"
import styled from "styled-components"
import {
    Button,
    Table,
    Form as AntForm,
    Select,
    Input
} from 'antd'
import { useQuery } from "@apollo/client"
import moment from "moment"
import { Link } from "react-router-dom"

import { Top, PublishStatus } from "../../components"
import { FIND_MANY_ORGANIZATION, FIND_MANY_ORGANIZATION_COUNT } from "../../gqls"
import { useRouteQuery, useNavigateSearch, parseBoolean } from "../../utils/hooks"
import { ORG_CATEGORIES } from "../../utils/const"

const Filters = styled(AntForm)`
    margin-bottom: 20px;

    .item {
        width: 200px;
    }
`

const limit = 20

const Organizations = () => {
    const query = useRouteQuery()
    const navigate = useNavigateSearch()
    const { page = 1, search = "", publish = undefined, category = null } = query

    const variables = useMemo(() => ({
        where: {
            delete: { equals: false },
            publish: typeof parseBoolean(publish) === 'boolean' ? { equals: parseBoolean(publish) } : undefined,
            categories: category ? { has: category } : undefined,
            OR: search ? [
                { name: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { phone: { contains: search, mode: 'insensitive' } },
            ] : undefined,
        }
    }), [publish, category, search])

    const { data, loading } = useQuery(FIND_MANY_ORGANIZATION, {
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

    const { data: countData, loading: countLoading } = useQuery(FIND_MANY_ORGANIZATION_COUNT, {
        variables,
        fetchPolicy: 'network-only'
    })

    const handleChangeTable = ({ current }) => {
        // setCurrentPage(current)
        navigate(`/organization`, { ...query, page: current })
    }

    const onSubmitSearch = ({ search, category, publish }) => {
        navigate("/organization", { ...query, search, category, publish })
    }

    const organizations = useMemo(() => data ? data.findManyOrganization : [], [data])
    const organizationsCount = useMemo(() => countData ? countData.findManyOrganizationCount : 0, [countData])

    return (
        <>
            <Top
                title={`?????????????????????? (${organizationsCount})`}
            />
            <Filters
                layout='inline'
                onFinish={onSubmitSearch}
                initialValues={{
                    search,
                    publish: parseBoolean(publish),
                    category
                }}
            >
                <Filters.Item name={'search'}>
                    <Input
                        placeholder="??????????"
                        allowClear
                        onChange={e => {
                            if (!e.target.value) {
                                navigate("/organization", { ...query, search: '' })
                            }
                        }}
                        className='item'
                    />
                </Filters.Item>
                <Filters.Item name={'category'}>
                    <Select
                        placeholder="??????"
                        // onChange={data => setRole(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate("/organization", { ...query, category: undefined })}
                    >
                        {
                            Object.keys(ORG_CATEGORIES).map(key => (
                                <Select.Option key={key}>
                                    {ORG_CATEGORIES[key]}
                                </Select.Option>
                            ))
                        }
                    </Select>
                </Filters.Item>
                <Filters.Item name={'publish'}>
                    <Select
                        placeholder="????????????"
                        // onChange={data => setDeleted(data)}
                        className='item'
                        allowClear
                        onClear={() => navigate("/organization", { ...query, publish: undefined })}
                    >
                        <Select.Option value={false}>
                            ???? ??????????????????????????
                        </Select.Option>
                        <Select.Option value={true}>
                            ??????????????????????????
                        </Select.Option>
                    </Select>
                </Filters.Item>
                <Button
                    htmlType='submit'
                    type='primary'
                >
                    ??????????????????
                </Button>
            </Filters>
            <Table
                loading={loading || countLoading}
                rowKey={(obj) => obj.id}
                dataSource={organizations}
                scroll={{ x: 600 }}
                size={window.innerWidth < 500 ? 'small' : 'large'}
                pagination={{
                    current: page,
                    total: organizationsCount,
                    pageSize: limit
                }}
                onChange={handleChangeTable}
                columns={[
                    {
                        title: '????????????????',
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
                        title: '?????????? ??????????????',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: '??????',
                        dataIndex: 'categories',
                        key: 'categories',
                        render: (categories, obj) => (
                            <span>{categories.map(c => ORG_CATEGORIES[c]).join(", ")}</span>
                        )
                    },
                    {
                        title: '????????????',
                        dataIndex: 'publish',
                        key: 'publish',
                        render: (publish, obj) => (
                            <PublishStatus publish={publish} />
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
                ]}
            />
        </>
    )
}

export default Organizations