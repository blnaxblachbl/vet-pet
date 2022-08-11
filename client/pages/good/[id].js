import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { LoadingView } from '../../components'
import { FIND_UNIQUE_GOOD } from '../../gqls'
import SingleGoodContainer from '../../containers/good/single'

const SingleGood = () => {
    const { query: { id } } = useRouter()

    const { data, loading } = useQuery(FIND_UNIQUE_GOOD, {
        variables: {
            where: { id }
        },
        ssr: typeof window === 'undefined',
        skip: false
    })

    const good = useMemo(() => data ? data.findUniqueGood : null, [data])

    return (
        <>
            <LoadingView loading={loading} />
            {
                !loading && <SingleGoodContainer good={good} />
            }
        </>
    )
}

export default SingleGood