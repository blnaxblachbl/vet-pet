import { useQuery } from "@apollo/client"
import { useRouter } from "next/router"
import { useMemo } from "react"

import BranchContainer from "../../containers/branch"
import { LoadingView, Pagination, Top } from "../../components"
import { FIND_MANY_BRANCH } from "../../gqls"

const limit = 20

const Organizations = () => {
    const { query: { page = 1, search } } = useRouter()

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
                ] : undefined
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

    const prevOrganizations = useMemo(() => previousData ? previousData.findManyBranch : [], [previousData])
    const organizations = useMemo(() => data ? data.findManyBranch : prevOrganizations, [data])
    const organizationsCount = useMemo(() => data ? data.findManyBranchCount : 0, [data])

    return (
        <>
            <Top label={`Клиники и магазины${search ? ` по запросу "${search}"` : ''}`} />
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