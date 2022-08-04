import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

import ProfileIcon from '../public/icons/profile.svg'
import SearchIcon from '../public/icons/search.svg'
import Logo from '../public/full-logo.svg'

import {
    authRef,
    Input,
    Padding
} from '.'
import { useUser } from '../utils/hooks'
import { COLORS } from '../utils/const'
import { useMemo } from 'react'

const Container = styled.div`
    /* background-color: ${COLORS.secondary.lightGray}; */
    background-color: ${COLORS.primary.white};
`
const Inner = styled(props => <Padding {...props} />)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: auto;
    height: 96px;
    padding-top: 0;
    padding-bottom: 0;

    .profile-button {
        cursor: pointer;
        svg {
            margin: 0 auto;
            display: block;
            margin-bottom: 2px;
            path {
                fill: ${COLORS.primary.camel};
                stroke: ${COLORS.primary.camel};
            }
            border: solid 2px ${COLORS.primary.camel};
            border-radius: 12px;
            padding: 3px;
        }
        .name {
            text-align: center;
            font-weight: 600;
            color: ${COLORS.primary.black};
        }
    }
    .logo-container {
        svg {
            width: 127px;
            height: 32px;
        }
    }
    .search-container {
        width: 100%;
        /* margin: 0 30px; */
        margin-right: 24px;
        max-width: 600px;
        svg {
            margin-right: 12px;
        }
    }
`
// const Login = styled(Button)``

export const Header = ({ isMobile }) => {
    const { user } = useUser()
    const router = useRouter()

    const onProfileCLick = () => {
        if (user) {
            router.push('/profile')
        } else {
            authRef.current.openAuth()
        }
    }

    const profileText = useMemo(() => {
        if (user) {
            if (user.name) {
                return user.name.split(" ")[0]
            }
            return 'Гость'
        }
        return 'Войти'
    }, [user])

    const onSearch = e => {
        e.preventDefault()
        console.log(e.target.search.value)
        router.push(`/search?query=${e.target.search.value}`)
    }

    return (
        <Container>
            <Inner>
                <Link href='/'>
                    <div className='logo-container'>
                        <Logo />
                    </div>
                </Link>
                <form onSubmit={onSearch} className='search-container'>
                    <Input
                        name='search'
                        placeholder='Поиск'
                        LeftComponent={
                            <SearchIcon />
                        }
                        required
                    />
                </form>
                <div
                    className='profile-button'
                    onClick={onProfileCLick}
                >
                    <ProfileIcon />
                    <div className='name'>
                        {profileText}
                    </div>
                </div>
            </Inner>
        </Container>
    )
}