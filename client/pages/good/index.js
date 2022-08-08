import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import styled from "styled-components"

import { Top, Pagination, LoadingView, Select } from "../../components"
import { FIND_MANY_GOOD, FIND_MANY_BRANCH } from "../../gqls"
import GoodsContainer from "../../containers/good"

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

const Goods = () => {
    const router = useRouter()
    const { query, pathname } = router
    const { page = 1, branch, search, type } = query

    const { previousData, data, loading } = useQuery(FIND_MANY_GOOD, {
        variables: {
            where: {
                delete: { equals: false },
                publish: { equals: true },
                branchs: branch ? { some: { id: { equals: branch } } } : undefined,
                type: type ? { equals: type } : undefined,
                OR: search ? [
                    { name: { contains: search, mode: 'insensitive' } },
                    { description: { contains: search, mode: 'insensitive' } }
                ] : undefined
            },
            take: limit,
            skip: (parseInt(page) - 1) * limit,
            orderBy: {
                createdAt: 'desc'
            }
        },
        ssr: typeof window === 'undefined',
        skip: false
    })

    const { data: branchData, loading: branchLoading } = useQuery(FIND_MANY_BRANCH, {
        ssr: typeof window === 'undefined',
        skip: false
    })

    const prevGoods = useMemo(() => previousData ? previousData.findManyGood : [], [previousData])
    const goods = useMemo(() => data ? data.findManyGood : prevGoods, [data])
    const goodsCount = useMemo(() => data ? data.findManyGoodCount : 0, [data])
    const branchs = useMemo(() => branchData ? branchData.findManyBranch : [], [branchData])

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

    const onSlectBranch = e => {
        const newQuery = structuredClone(query)
        if (e.target.value === 'all') {
            delete newQuery['branch']
            e.target.value = ''
        } else {
            newQuery['branch'] = e.target.value
        }
        router.push({
            pathname,
            query: newQuery,

        }, undefined, {
            scroll: false
        })
    }

    return (
        <>
            <Top label={`Товары и услуги${search ? ` по запросу "${search}"` : ''}`} />
            <Filters>
                <Select
                    placeholder={'Типы'}
                    className='filter-item'
                    onChange={onSlectType}
                >
                    <option value={'all'} selected={false}>Все</option>
                    <option selected={type === 'product'} value={'product'}>Товар</option>
                    <option selected={type === 'service'} value={'service'}>Услула</option>
                </Select>
                <Select
                    placeholder={'Организации и филиалы'}
                    className='filter-item'
                    onChange={onSlectBranch}
                >
                    <option value={'all'} selected={false}>Все</option>
                    {
                        branchs.map(item => (
                            <option key={item.id} value={item.id} selected={branch === item.id}>
                                {item.organization.name}, {item.address}
                            </option>
                        ))
                    }
                </Select>
            </Filters>
            <LoadingView loading={loading || branchLoading} />
            {
                (!loading || prevGoods.length > 0) && (
                    <>
                        <GoodsContainer goods={goods} />
                        <Pagination
                            limit={limit}
                            maxCount={goodsCount}
                        />
                    </>
                )
            }
        </>
    )
}

export default Goods