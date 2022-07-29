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

import { Top } from "../../components"
import { FIND_MANY_ORGANIZATION, FIND_MANY_ORGANIZATION_COUNT } from "../../gqls"
import { getPermission, useRouteQuery, useUser, useNavigateSearch } from "../../utils/hooks"
import { ORG_CATEGORIES } from "../../utils/const"

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

const Organizations = () => {
    const { user } = useUser()
    const query = useRouteQuery()
    const navigate = useNavigateSearch()
    const { page = 1, search = "", publish = undefined, deleted = false, } = query

    const isOwner = getPermission(user.type, ['org-owner'])

    const variables = useMemo(() => ({
        where: {
            id: isOwner ? { in: user.organizations.map(o => o.id) } : undefined,
            delete: { equals: false },
            publish: { equals: true }
        }
    }), [])

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
        navigate(`/admin`, { ...query, page: current })
    }

    const organizations = useMemo(() => data ? data.findManyOrganization : [], [data])
    const organizationsCount = useMemo(() => countData ? countData.findManyOrganizationCount : 0, [countData])

    return (
        <>
            <Top
                title={`Организации (${organizationsCount})`}
                action={
                    isOwner && (
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
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Номер телфона',
                        dataIndex: 'phone',
                        key: 'phone',
                    },
                    {
                        title: 'Тип',
                        dataIndex: 'categories',
                        key: 'categories',
                        render: (categories, obj) => (
                            <span>{categories.map(c => ORG_CATEGORIES[c]).join(", ")}</span>
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
                ]}
            />
        </>
    )
}

export default Organizations