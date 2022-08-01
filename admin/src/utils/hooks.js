import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
import { useNavigate, createSearchParams } from 'react-router-dom'

import { FIND_ME_ADMIN } from '../gqls'
import { ADMIN_TYPES } from './const'

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

export const useRouteQuery = () => {
    const { search } = useLocation()
    const urlSearchParams = useMemo(() => new URLSearchParams(search), [search])
    return Object.fromEntries(urlSearchParams.entries())
}
export const timeFromDuration = (duration) => {
    return moment.utc(moment.duration(duration, "minutes").as("milliseconds"))
}
export const durationFromTime = (time = moment()) => {
    return (moment(time).hours() * 60) + moment(time).minutes()
}
export const useNavigateSearch = () => {
    const navigate = useNavigate()
    return (pathname, params) => {
        Object.keys(params).forEach(key => {
            if (params[key] === null || params[key] === undefined || params[key] === '' || isNaN(params[key])) {
                delete params[key]
            }
        })
        navigate({ pathname, search: `?${createSearchParams(params)}` })
    }
}
export const parseBoolean = (value) => {
    if (value === 'true' || value === true) {
        return true
    }
    if (value === 'false' || value === false) {
        return false
    }
    return undefined
}

export const adminTypeParser = (adminType) => {
    return ADMIN_TYPES[adminType]
}