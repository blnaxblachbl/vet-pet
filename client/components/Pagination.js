import { useCallback, useMemo } from "react"
import styled from "styled-components"
import { useRouter } from "next/router"
import Link from "next/link"

import ArrowRight from '../public/icons/arrow-right.svg'
import ArrowLeft from '../public/icons/arrow-left.svg'

import { COLORS } from "../utils/const"

const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    margin-top: 24px;
    font-size: 16px;
    width: fit-content;
    white-space: nowrap;
`
const Counter = styled.div`
    display: inline-block;
    border-radius: 6px;
    border: solid 1px ${({ selected }) => selected ? COLORS.primary.camel : COLORS.primary.black};
    color: ${({ selected }) => selected ? COLORS.primary.white : COLORS.primary.black};
    background-color: ${({ selected }) => selected ? COLORS.primary.camel : COLORS.primary.white};
    width: 30px;
    height: 30px;
    text-align: center;
    padding-top: 2px;
    box-sizing: border-box;
    cursor: pointer;
    margin-right: 6px;
    :last-child {
        margin-right: 0;
    }
    vertical-align: bottom;
`
const Space = styled.div`
    display: inline-block;
    /* margin: 0 6px; */
    margin-left: 6px;
    letter-spacing: 12px;

    svg {
        path {
            fill: ${COLORS.primary.camel};
        }
    }

    @media only screen and (max-width: 700px) {
        margin-left: 3px;
        letter-spacing: 6px;
    }
`

export const Pagination = ({ limit = 20, maxCount = 0, pathname }) => {
    const router = useRouter()
    const { query: { page = 1 } } = router
    const _pathname = useMemo(() => pathname ? pathname : router.pathname, [router, pathname])
    const pagesCount = Math.ceil(maxCount / limit)

    const RenderCounters = useMemo(() => {
        // const pagesCount = 11
        const Counters = []
        const _page = parseInt(page)
        if (pagesCount <= 5) {
            for (let i = 1; i <= pagesCount; i++) {
                Counters.push(
                    <Link
                        href={{
                            pathname: _pathname,
                            query: {
                                ...router.query,
                                page: i
                            }
                        }}
                    >
                        <Counter
                            selected={_page === i}
                        >
                            {i}
                        </Counter>
                    </Link>
                )
            }
        } else {
            if (_page > 2) {
                Counters.push(
                    <Link
                        href={{
                            pathname: _pathname,
                            query: {
                                ...router.query,
                                page: 1
                            }
                        }}
                    >
                        <Counter
                            selected={_page === 1}
                        >
                            {1}
                        </Counter>
                    </Link>
                )
                Counters.push(
                    <Space>
                        ...
                    </Space>
                )
            }
            for (let i = _page - 1; i <= _page + 1; i++) {
                if (i > 0 && i <= pagesCount) {
                    Counters.push(
                        <Link
                            href={{
                                pathname: _pathname,
                                query: {
                                    ...router.query,
                                    page: i
                                }
                            }}
                        >
                            <Counter
                                selected={_page === i}
                            >
                                {i}
                            </Counter>
                        </Link>
                    )
                }
            }
            if (_page < maxCount - 1) {
                Counters.push(
                    <Space>
                        ...
                    </Space>
                )
                Counters.push(
                    <Link
                        href={{
                            pathname: _pathname,
                            query: {
                                ...router.query,
                                page: maxCount
                            }
                        }}
                    >
                        <Counter
                            selected={_page === maxCount}
                        >
                            {maxCount}
                        </Counter>
                    </Link>
                )
            }
        }
        return Counters
    }, [maxCount, limit, page])

    if (maxCount === 0 || pagesCount === 1) return null

    return (
        <Container>
            {
                parseInt(page) > 1 && (
                    <Link
                        href={{
                            pathname: _pathname,
                            query: {
                                ...router.query,
                                page: parseInt(page) - 1
                            }
                        }}
                    >
                        <Counter>
                            <ArrowLeft />
                        </Counter>
                    </Link>
                )
            }
            {RenderCounters}
            {
                parseInt(page) < maxCount && (
                    <Link
                        href={{
                            pathname: _pathname,
                            query: {
                                ...router.query,
                                page: parseInt(page) + 1
                            }
                        }}
                    >
                        <Counter>
                            <ArrowRight />
                        </Counter>
                    </Link>
                )
            }
        </Container>
    )
}