import { useMemo } from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import Link from 'next/link'

import {
    LoadingView,
    Top,
    Branch,
    Button,
    Good,
    Pagination
} from '../components'
import AdsContainer from '../containers/ad'
import { HOME } from '../gqls'
import { COLORS } from '../utils/const'

const Organizations = styled.div`
    display: block;
    width: 100%;
    padding-bottom: 24px;
    overflow-x: scroll;
    white-space: nowrap;
    :last-child {
        margin-bottom: 0;
    }
    .organizatioin {
        vertical-align: top;
        display: inline-block;
        margin-right: 12px;
        margin-bottom: auto;
        width: 28%;
        :last-child {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 1000px) {
        .organizatioin {
            width: 35%;
        }
    }
    @media only screen and (max-width: 700px) {
        .organizatioin {
            margin-right: 24px;
            width: 70%;
        }
    }
`
const Goods = styled(Organizations)`
    .good {
        vertical-align: top;
        display: inline-block;
        margin-right: 24px;
        width: 20%;
        :last-child {
            margin-right: 0;
        }
    }

    @media only screen and (max-width: 1000px) {
        .good {
            width: 25%;
        }
    }
    @media only screen and (max-width: 800px) {
        margin-right: 12px;
        .good {
            width: 35%;
        }
    }
    @media only screen and (max-width: 700px) {
        .good {
            width: 60%;
        }
    }
`
const AllButton = styled(Button)`
    background-color: transparent;
    color: ${COLORS.primary.purple};
    padding: 0;
`

const Home = () => {
    const { data, loading } = useQuery(HOME, {
        ssr: typeof window === 'undefined',
        skip: false
    })

    const {
        findManyAd,
        findManyBranch,
        findManyGood,
        findManyAdCount
    } = useMemo(() => data ? data : { findManyAd: [], findManyBranch: [], findManyGood: [], findManyAdCount: 0 }, [data])

    if (loading) {
        return <LoadingView loading />
    }

    return (
        <>
            {
                findManyBranch.length > 0 && (
                    <>
                        <Top
                            label='?????????????? ?? ????????????????'
                            value={
                                <Link href='/branch'>
                                    <AllButton>
                                        ??????
                                    </AllButton>
                                </Link>
                            }
                        />
                        <Organizations className='hide-scroll-indicator'>
                            {
                                findManyBranch.map(item => (
                                    <div key={item.id} className='organizatioin'>
                                        <Branch item={item} />
                                    </div>
                                ))
                            }
                        </Organizations>
                    </>
                )
            }
            {
                findManyGood.length > 0 && (
                    <>
                        <Top
                            label='???????????? ?? ????????????'
                            value={
                                <Link href='/good'>
                                    <AllButton>
                                        ??????
                                    </AllButton>
                                </Link>
                            }
                        />
                        <Goods className='hide-scroll-indicator'>
                            {
                                findManyGood.map(item => (
                                    <div key={item.id} className='good'>
                                        <Good item={item} />
                                    </div>
                                ))
                            }
                        </Goods>
                    </>
                )
            }
            {
                findManyAd.length > 0 && (
                    <>
                        <Top
                            label='????????????????????'
                            value={
                                <Link href='/ad'>
                                    <AllButton>
                                        ??????
                                    </AllButton>
                                </Link>
                            }
                        />
                        <AdsContainer ads={findManyAd} />
                        <Pagination 
                            limit={20}
                            maxCount={findManyAdCount}
                            pathname='/ad'
                        />
                    </>
                )
            }
        </>
    )
}

export default Home