import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import styled from "styled-components"

import BranchContainer from "../../containers/branch"
import { LoadingView, Pagination, Top, Select } from "../../components"
import { FIND_MANY_BRANCH } from "../../gqls"

const Filters = styled.div`
    margin-bottom: 24px;
    .filter-item {
        display: inline-block;
        vertical-align: middle;
        /* max-width: 200px; */
        width: fit-content;
        margin-right: 12px;
        margin-bottom: 6px;
        :last-child {
            margin: 0;
        }
    }
`

const limit = 20

const Organizations = () => {
    const router = useRouter()
    const { query, pathname } = router
    const { page = 1, search, type } = query

    const { previousData, data, loading } = useQuery(FIND_MANY_BRANCH, {
        variables: {
            where: {
                delete: { equals: false },
                publish: { equals: true },
                OR: search ? [
                    { organization: { name: { contains: search, mode: 'insensitive' } } },
                    { organization: { description: { contains: search, mode: 'insensitive' } } },
                    { organization: { email: { contains: search, mode: 'insensitive' } } },
                    { address: { contains: search, mode: 'insensitive' } },
                    { phone: { contains: search, mode: 'insensitive' } },
                    // { goods: { some: { name: { contains: search, mode: 'insensitive' } } } },
                    // { goods: { some: { description: { contains: search, mode: 'insensitive' } } } },
                ] : undefined,
                organization: type ? {
                    categories: { has: type }
                } : undefined
            },
            take: limit,
            skip: (parseInt(page) - 1) * limit,
            orderBy: {
                createdAt: 'desc'
            },
        },
        ssr: typeof window === 'undefined',
        skip: false
    })

    const onSlectType = e => {
        const newQuery = structuredClone(query)
        if (e.target.value === 'all') {
            delete newQuery['type']
            e.target.value = ''
        } else {
            newQuery['type'] = e.target.value
        }
        router.push({
            pathname,
            query: newQuery,

        }, undefined, {
            scroll: false
        })
    }

    const prevOrganizations = useMemo(() => previousData ? previousData.findManyBranch : [], [previousData])
    const organizations = useMemo(() => data ? data.findManyBranch : prevOrganizations, [data])
    const organizationsCount = useMemo(() => data ? data.findManyBranchCount : 0, [data])

    return (
        <>
            <Top label={`Клиники и магазины${search ? ` по запросу "${search}"` : ''}`} />
            <Filters>
                <Select
                    placeholder={'Типы'}
                    className='filter-item'
                    onChange={onSlectType}
                >
                    <option value={'all'} selected={false}>Все</option>
                    <option selected={type === 'vet'} value={'vet'}>Клиники</option>
                    <option selected={type === 'shop'} value={'shop'}>Магазины</option>
                </Select>
            </Filters>
            <LoadingView loading={loading} />
            {
                (!loading || prevOrganizations.length > 0) && (
                    <>
                        <BranchContainer
                            orgs={organizations}
                        />
                        <Pagination
                            limit={20}
                            maxCount={organizationsCount}
                        />
                    </>
                )
            }
        </>
    )
}

export default Organizations