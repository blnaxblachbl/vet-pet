import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"

import { COLORS } from "../utils/const"

const Menu = styled.div`
    border-radius: 18px;
    border: solid 1px ${COLORS.secondary.lightGray};
    padding: 12px; 
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 24px;
    width: calc(30% - 6px);
    height: fit-content;
    
    .link {
        cursor: pointer;
        color: ${COLORS.primary.black};
        font-size: 14px;
        margin-bottom: 12px;
        :last-child {
            margin-bottom: 0;
        }
    }
    .selected {
        color: ${COLORS.primary.camel};
        font-weight: 600;
    }

    @media only screen and (max-width: 700px) {
        display: none;
    }
`
const Container = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    .content {
        width: calc(70% - 6px);
    }
    @media only screen and (max-width: 700px) {
        .content {
            width: 100%;
        }
    }
`

export const ProfileWithMenu = ({ children }) => {
    const { pathname } = useRouter()

    return (
        <Container>
            <Menu>
                <Link href='/profile'>
                    <div className={`link ${pathname === '/profile' && 'selected'}`}>Редактирование</div>
                </Link>
                <Link href='/profile/pet'>
                    <div className={`link ${pathname === '/profile/pet' && 'selected'}`}>Мои Питомцы</div>
                </Link>
                <Link href='/profile/ad'>
                    <div className={`link ${pathname === '/profile/ad' && 'selected'}`}>Мои Объявления</div>
                </Link>
                <Link href='/profile/order'>
                    <div className={`link ${pathname === '/profile/order' && 'selected'}`}>Мои Заказы</div>
                </Link>
            </Menu>
            <div className="content">
                {children}
            </div>
        </Container>
    )
}