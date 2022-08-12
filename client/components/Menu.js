import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ArrowLeft from '../public/icons/arrow-left.svg'
import SearchIcon from '../public/icons/search.svg'

import { Button, Input } from '.'
import { COLORS } from '../utils/const'
import { useMemo } from 'react'

const Container = styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    
    .input-container {
        margin-left: auto;
    }
    .button {
        margin-right: 12px;
        :last-child {
            margin-right: 0;
        }
    }
    @media only screen and (max-width: 700px) {
        .button {
            display: none;
        }
    }
`
const MobileContainer = styled.div`
    display: none;
    .back-button {
        padding-right: 15px;
        padding-left: 6px;
    }
    svg {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        path {
            fill: ${COLORS.primary.camel};
        }
    }
    @media only screen and (max-width: 700px) {
        display: ${({ display }) => display ? "block" : "none"};
    }
`

export const Menu = () => {
    const router = useRouter()
    const { pathname, query } = router
    const { search } = query

    const onSubmit = e => {
        e.preventDefault()
        const { search } = e.target
        if (pathname === '/branch' || pathname === '/good' || pathname === '/ad') {
            router.push({
                pathname,
                query: {
                    ...query,
                    search: search.value
                }
            })
        } else {
            router.push({
                pathname: '/search',
                query: {
                    ...query,
                    search: search.value
                }
            })
        }
    }

    return (
        <>
            <Container onSubmit={onSubmit}>
                <MobileContainer display={pathname.split('/').length > 2}>
                    <Button onClick={() => window.history.back()} ouline className={'back-button'}>
                        <ArrowLeft />
                        Назад
                    </Button>
                </MobileContainer>
                <Link href='/branch'>
                    <Button ouline={!(pathname === '/branch')} className={'button'}>
                        Клиники и магазины
                    </Button>
                </Link>
                <Link href='/good'>
                    <Button ouline={!(pathname === '/good')} className={'button'}>
                        Товары и услули
                    </Button>
                </Link>
                <Link href='/ad'>
                    <Button ouline={!(pathname === '/ad')} className={'button'}>
                        Объявления
                    </Button>
                </Link>
                <Input
                    name='search'
                    placeholder="Поиск"
                    RightComponent={<SearchIcon />}
                    containerClassName='input-container'
                    required
                    onChange={e => {
                        if (!e.target.value){
                            const newQuery = structuredClone(query)
                            delete newQuery['search']
                            router.push({
                                pathname,
                                query: newQuery
                            })
                        }
                    }}
                    defaultValue={search ? search : ""}
                />
            </Container>
        </>
    )
}