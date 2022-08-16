import { useRouter } from "next/router"
import { useQuery } from "@apollo/client"

import { Top, LoadingView } from "../../components"
import CreateOrderContainer from "../../containers/order/create"
import { FIND_UNIQUE_BRANCH } from "../../gqls"
import { useMemo } from "react"

const CreateOrder = () => {
    const router = useRouter()
    const { query: { branch } } = router

    const { data, loading } = useQuery(FIND_UNIQUE_BRANCH, {
        variables: {
            where: { id: branch }
        },
        ssr: typeof window === 'undefined',
        skip: false
    })

    const selectedBranch = useMemo(() => data ? data.findUniqueBranch : null, [data])

    return (
        <>
            <Top label="Оформление заказа" />
            <LoadingView loading={loading} />
            {
                !loading && <CreateOrderContainer branch={selectedBranch} />
            }
        </>
    )
}

export default CreateOrder