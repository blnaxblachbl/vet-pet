import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"

import { Button, LoadingView, Top, Pagination } from "../../components"
import AdsContainer from "../../containers/ad"
import { FIND_MANY_AD } from "../../gqls"

const limit = 20

const Ads = () => {
    const { query: { page = 1, search } } = useRouter()

    const { data, previousData, loading } = useQuery(FIND_MANY_AD, {
        variables: {
            where: {
                delete: { equals: false },
                publish: { equals: true },
                OR: search ? [
                    { title: { contains: search, mode: 'insensitive' } },
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

    const prevAds = useMemo(() => previousData ? previousData.findManyAd : [], [previousData])
    const ads = useMemo(() => data ? data.findManyAd : prevAds, [data])
    const adsCount = useMemo(() => data ? data.findManyAdCount : 0, [data])

    return (
        <>
            <Top
                label={`Объявления${search ? ` по запросу "${search}"` : ''}`}
                value={
                    ads.length > 0 && (
                        <Link href='/ad/create'>
                            <Button
                                ouline
                            >
                                Добавить своё
                            </Button>
                        </Link>
                    )
                }
            />
            <LoadingView loading={loading} />
            {
                (!loading || prevAds.length > 0) && (
                    <>
                        <AdsContainer
                            ads={ads}
                        />
                        <Pagination
                            maxCount={adsCount}
                            limit={limit}
                        />
                    </>
                )
            }
        </>
    )
}

export default Ads