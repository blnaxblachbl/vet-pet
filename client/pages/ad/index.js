import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"

import { Button, LoadingView, Top } from "../../components"
import AdsContainer from "../../containers/ad"
import { FIND_MANY_AD } from "../../gqls"

const limit = 20

const Ads = () => {
    const { query: { page = 1 } } = useRouter()

    const { data, previousData, loading } = useQuery(FIND_MANY_AD, {
        variables: {
            where: {
                delete: { equals: false },
                publish: { equals: true }
            },
            take: limit * parseInt(page),
            skip: 0,
            orderBy: {
                createdAt: 'desc'
            }
        },
        fetchPolicy: 'network-only'
    })

    const prevAds = useMemo(() => previousData ? previousData.findManyAd : [], [previousData])
    const ads = useMemo(() => data ? data.findManyAd : prevAds, [data])

    return (
        <>
            <Top
                label="Объявления"
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
                    <AdsContainer ads={ads} />
                )
            }
        </>
    )
}

export default Ads