import styled from 'styled-components'
import { useRouter } from 'next/router'
import Link from 'next/link'

import Logo from '../public/full-logo.svg'
import Paw from '../public/icons/paw.svg'

import {
    authRef,
    Padding,
    Button,
    Avatar
} from '.'
import { useUser } from '../utils/hooks'
import { COLORS } from '../utils/const'

const Container = styled.div`
    background-color: ${COLORS.primary.white};
`
const Inner = styled(props => <Padding {...props} />)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: auto;
    height: 76px;
    padding-top: 0;
    padding-bottom: 0;

    .buttons-container {
        display: flex;
        align-items: center;        
        .item {
            margin-right: 24px;
            :last-child {
                margin-right: 0;
            }
        }
        .header-create-ad {
            
        }
        .avatar {
            cursor: pointer;
        }
    }
    .logo-container {
        cursor: pointer;
        svg {
            width: 127px;
            height: 32px;
        }
    }
    .mobile-logo-container {
        display: none;
        cursor: pointer;
        svg {
            width: 32px;
            height: 32px;
        }
    }

    @media only screen and (max-width: 700px) {
        .header-create-ad {
            display: none;
        }
        .mobile-logo-container {
            display: block;
        }
        .logo-container {
            display: none;
        }
        .profile-button {            
            display: none;
        }
        .search-container {
            margin-right: 0;
        }
    }
`

export const Header = ({ isMobile }) => {
    const { user } = useUser()
    const router = useRouter()

    return (
        <Container>
            <Inner>
                <Link href='/'>
                    <div>
                        <div className='logo-container'>
                            <Logo />
                        </div>
                        <div className='mobile-logo-container'>
                            <Paw />
                        </div>
                    </div>
                </Link>
                <div className='buttons-container'>
                    <Link href='/ad/create'>
                        <Button
                            className={'item header-create-ad'}
                            ouline
                        >
                            Разместить объявления
                        </Button>
                    </Link>
                    {
                        !user && (
                            <Button
                                className={'item'}
                                onClick={() => authRef.current.openAuth()}
                                ouline
                            >
                                Вход
                            </Button>
                        )
                    }
                    <Avatar
                        onClick={() => router.push('/profile')}
                        user={user}
                        className='avatar'
                    />
                </div>
            </Inner>
        </Container>
    )
}