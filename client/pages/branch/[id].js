import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { LoadingView, Top } from '../../components'
import { FIND_UNIQUE_BRANCH } from '../../gqls'
import SingleBranchContainer from '../../containers/branch/single'

const SingleOrganization = () => {
    const { query: { id } } = useRouter()

    const { data, loading } = useQuery(FIND_UNIQUE_BRANCH, {
        variables: {
            where: { id }
        },
        ssr: typeof window === 'undefined',
        skip: false
    })

    const organization = useMemo(() => data ? data.findUniqueBranch : null, [data])

    return (
        <>
            {/* <Top label={"Информация"} /> */}
            <LoadingView loading={loading} />
            {
                !loading && <SingleBranchContainer branch={organization} />
            }
        </>
    )
}

export default SingleOrganization