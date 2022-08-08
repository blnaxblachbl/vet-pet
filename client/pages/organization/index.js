import { useQuery } from "@apollo/client"

import { Top } from "../../components"
import { FIND_MANY_ORGANIZATION, FIND_MANY_ORGANIZATION_COUNT } from "../../gqls"

const Organizations = () => {
    return (
        <>
            <Top label="Клиники и магазины" />
        </>
    )
}

export default Organizations