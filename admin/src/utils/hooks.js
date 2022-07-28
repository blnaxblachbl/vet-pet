import { useQuery } from '@apollo/client'
import { FIND_ME_ADMIN } from '../gqls'

export const useUser = (params = {}) => {
    const { data, loading, error } = useQuery(FIND_ME_ADMIN, {
        ...params,
        fetchPolicy: 'cache-and-network'
    })

    const user = data ? data.findMeAdmin : null //do some query to get current user

    return {
        loading,
        error,
        user
    }
}

export const getPermission = (userType = '', permissionTypes = []) => {
    return permissionTypes.includes('all') || permissionTypes.includes(userType)
}