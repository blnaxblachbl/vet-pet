import { useEffect, useMemo, useState } from "react"
import { useQuery } from "@apollo/client"
import { DateTime, Duration } from "luxon"

import { FIND_ME_USER } from "../gqls"

export const useUser = (params = {}) => {
    const { onCompleted = () => { }, onError = () => { }, fetchPolicy = undefined } = params

    const { data, loading, error, refetch } = useQuery(FIND_ME_USER, {
        onCompleted: (data) => {
            onCompleted(data)
        },
        ssr: typeof window === 'undefined',
        skip: false,
        onError,
        fetchPolicy
    })

    const user = data ? data.findMeUser : null // use some query to get user

    return {
        loading,
        error,
        user,
        refetch
    }
}

export const timeFromDuration = (minutes = 0) => {
    const duration = Duration.fromObject({ minutes })
    return duration.toFormat("hh:mm")
}

export const useRealetiveDate = (date = DateTime.now()) => {
    if (!date) {
        return '-'
    }
    return useMemo(() => {
        const now = DateTime.now()
        const diff = date.diffNow()
        let format = 'DD HH:mm'
        if (diff.as("days") > -1 && diff.as("days") < 0) {
            const relativeFormatter = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' })
            let baforeTime = relativeFormatter.format(parseInt(diff.as("hours")), 'hours')
            if (diff.as("minutes") > -1) {
                baforeTime = 'Только что'
            } else if (diff.as("hours") > -1) {
                baforeTime = relativeFormatter.format(parseInt(diff.as('minutes')), 'minutes')
            }
            return baforeTime
        }
        if (diff.as('days') <= -1 && diff.as("days") > -2) {
            format = 'HH:mm'
            return `Вчера в ${date.toFormat(format)}`
        }
        if (date.hasSame(now, 'year')) {
            format = 'dd LLL HH:mm'
            if (date.hasSame(now, 'month') && date.hasSame(now, 'day')) {
                format = 'HH:mm'
            }
        }
        return date.toFormat(format)
    }, [date])
}
export const useMobile = (userAgent = '') => useMemo(() => {
    let isMobile = false
    if (typeof window === 'undefined') {
        isMobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i))
    } else {
        isMobile = window.innerWidth < 700
    }
    return isMobile
}, [])