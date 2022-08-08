import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { Top, LoadingView } from '../../components'
import { FIND_UNIQUE_AD } from '../../gqls'
import SingleAdContainer from '../../containers/ad/single'

const SingleAd = () => {
    const { query: { id } } = useRouter()

    const { data, loading } = useQuery(FIND_UNIQUE_AD, {
        variables: {
            where: { id }
        },
        ssr: typeof window === 'undefined',
        skip: false
    })

    const ad = useMemo(() => data ? data.findUniqueAd : null, [data])

    return (
        <>
            <LoadingView loading={loading} />
            {
                !loading && <SingleAdContainer ad={ad} />
            }
        </>
    )
}

export default SingleAd