import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"

import { Top, Pagination, LoadingView } from "../../components"
import { FIND_MANY_GOOD } from "../../gqls"
import GoodsContainer from "../../containers/good"

const limit = 20

const Goods = () => {
    const { query: { page = 1 } } = useRouter()

    const { previousData, data, loading } = useQuery(FIND_MANY_GOOD, {
        variables: {
            where: {
                delete: { equals: false },
                publish: { equals: true }
            },
            // take: limit * parseInt(page),
            // skip: 0,
            take: limit,
            skip: (parseInt(page) - 1) * limit,
            orderBy: {
                createdAt: 'desc'
            }
        },
        ssr: typeof window === 'undefined',
        skip: false
    })
    const prevGoods = useMemo(() => previousData ? previousData.findManyGood : [], [previousData])
    const goods = useMemo(() => data ? data.findManyGood : prevGoods, [data])
    const goodsCount = useMemo(() => data ? data.findManyGoodCount : 0, [data])

    return (
        <>
            <Top label="Товары и услуги" />
            <LoadingView loading={loading} />
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