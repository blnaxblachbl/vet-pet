import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useMemo } from "react"

import OrgContainer from "../../containers/organization"
import { LoadingView, Pagination, Top } from "../../components"
import { FIND_MANY_ORGANIZATION } from "../../gqls"

const limit = 20

const Organizations = () => {
    const { query: { page = 1 } } = useRouter()

    const { previousData, data, loading } = useQuery(FIND_MANY_ORGANIZATION, {
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

    const prevOrganizations = useMemo(() => previousData ? previousData.findManyOrganization : [], [previousData])
    const organizations = useMemo(() => data ? data.findManyOrganization : prevOrganizations, [data])
    const organizationsCount = useMemo(() => data ? data.findManyOrganizationCount : 0, [data])

    return (
        <>
            <Top label="Клиники и магазины" />
            <LoadingView loading={loading} />
            {
                (!loading || prevOrganizations.length > 0) && (
                    <>
                        <OrgContainer
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