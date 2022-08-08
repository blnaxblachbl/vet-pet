import styled from "styled-components"
import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"

import { Button, LoadingView, Top, Pagination, ProfileWithMenu } from "../../components"
import AdsContainer from "../../containers/ad"
import { FIND_MANY_AD } from "../../gqls"
import { useUser } from "../../utils/hooks"

const AddButton = styled(Button)`
    display: none;
    @media only screen and (max-width: 700px) {
        display: flex;
    }
`

const limit = 20

const Container = styled(AdsContainer)`
    grid-template-columns: repeat(4, 1fr);
    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 700px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const ProfileAds = () => {
    const { user, loading: userLoading } = useUser()
    const { query: { page = 1 } } = useRouter()

    const { data, previousData, loading } = useQuery(FIND_MANY_AD, {
        variables: {
            where: {
                delete: { equals: false },
                userId: { equals: user ? user.id : "" }
                // publish: { equals: true }
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

    const prevAds = useMemo(() => previousData ? previousData.findManyAd : [], [previousData])
    const ads = useMemo(() => data ? data.findManyAd : prevAds, [data])
    const adsCount = useMemo(() => data ? data.findManyAdCount : 0, [data])

    return (
        <>
            <Top
                label="Мои объявления"
                value={
                    ads.length > 0 && (
                        <Link href='/ad/create'>
                            <AddButton
                                ouline
                            >
                                Добавить
                            </AddButton>
                        </Link>
                    )
                }
            />
            <LoadingView loading={loading || userLoading} />

            {
                ((!loading && !userLoading) || prevAds.length > 0) && (
                    <ProfileWithMenu>
                        <Container
                            ads={ads}
                        />
                        <Pagination
                            maxCount={adsCount}
                            limit={limit}
                        />
                    </ProfileWithMenu>
                )
            }
        </>
    )
}

export default ProfileAds