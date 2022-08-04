import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import { Top, LoadingView } from '../../../components'
import { FIND_UNIQUE_AD } from '../../../gqls'
import EditAdForm from '../../../containers/ad/edit'

const SingleAd = () => {
    const { query: { id } } = useRouter()

    const { data, loading } = useQuery(FIND_UNIQUE_AD, {
        variables: {
            where: { id }
        }
    })

    const ad = useMemo(() => data ? data.findUniqueAd : null, [data])

    return (
        <>
            <Top label='Редактирование объявления' />
            <LoadingView loading={loading} />
            {
                !loading && <EditAdForm ad={ad} />
            }
        </>
    )
}

export default SingleAd