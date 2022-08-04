import styled from "styled-components"
import Link from "next/link"
import { useRouter } from "next/router"

import { COLORS } from "../utils/const"

import HomeIcon from '../public/icons/home.svg'
import MedicalIcon from '../public/icons/medical.svg'
import GoodsIcon from '../public/icons/shopping-bags.svg'
// import CameraIcon from '../public/icons/broadcast.svg'
import ProfileIcon from '../public/icons/profile.svg'

const Container = styled.div`
    position: fixed;
    bottom: 0;
    display: none;
    justify-content: space-between;
    background-color: ${COLORS.secondary.white};
    height: 65px;
    width: 100%;
    box-sizing: border-box;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    padding: 0 12px;
    border-top: solid 2px ${COLORS.secondary.lightGray};

    /* -webkit-box-shadow: 0px -5px 8px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px -5px 8px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px -5px 8px 0px rgba(34, 60, 80, 0.2); */

    @media only screen and (max-width: 600px) {
        display: grid;
    }
`
const TabBarButton = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: center;
    justify-content: center;
    color: ${({ selected }) => selected ? COLORS.primary.purple : COLORS.primary.gray};
    font-size: 12px;
    width: 100%;
    box-sizing: border-box;
    text-align: center;

    svg {
        path {
            fill: ${({ selected }) => selected ? COLORS.primary.purple : COLORS.primary.gray};
        }
        margin-bottom: 5px;
    }
`

export const TabBar = () => {
    const router = useRouter()
    const { pathname } = router

    return (
        <Container>
            <Link href={'/'}>
                <TabBarButton
                    selected={pathname === '/'}
                >
                    <HomeIcon />
                    <div>Главная</div>
                </TabBarButton>
            </Link>
            <Link href={'/organization'}>
                <TabBarButton
                    selected={pathname === '/organization'}
                >
                    <MedicalIcon />
                    <div>Клиники</div>
                </TabBarButton>
            </Link>
            <Link href={'/good'}>
                <TabBarButton
                    selected={pathname === '/good'}
                >
                    <GoodsIcon />
                    <div>Товары</div>
                </TabBarButton>
            </Link>
            <Link href="/profile">
                <TabBarButton
                    selected={pathname === '/profile'}
                >
                    <ProfileIcon />
                    <div>Профиль</div>
                </TabBarButton>
            </Link>
        </Container>
    )
}