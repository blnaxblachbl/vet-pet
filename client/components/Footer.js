import styled from "styled-components"
import Link from 'next/link'

import LogoReactangle from '../public/logo-rectangle.svg'

import { Padding } from "./Padding"
import { COLORS } from "../utils/const"

const Container = styled.div`
    background-color: ${COLORS.primary.white};
    @media only screen and (max-width: 700px) {
        display: none;
    }
`
const Inner = styled(Padding)`
    min-height: auto;
    display: flex;
    justify-content: space-between;
    .logo {
        border-radius: 50%;
        width: 70px;
        height: 70px;
        overflow: hidden;
        svg {
            width: 70px;
            height: 70px;
        }
    }
    .left {
        width: calc(50% - 9px);
        margin-right: auto;
        text-align: left;
    }
    .right {
        width: calc(50% - 9px);
        margin-left: auto;
        text-align: right;
        .link {
            margin-bottom: 6px;
            font-size: 16px;
            cursor: pointer;
            :last-child {
                margin-bottom: 0;
            }
        }
    }
`

export const Footer = () => {
    return (
        <Container>
            <Inner>
                <div className="left">
                    <div className="logo">
                        <LogoReactangle />
                    </div>
                </div>
                <div className="right">
                    <Link href={'/branch?type=shop'}>
                        <div className="link">Магазины</div>
                    </Link>
                    <Link href={'/branch?type=vet'}>
                        <div className="link">Клиники</div>
                    </Link>
                    <Link href={'/ad'}>
                        <div className="link">Объявления</div>
                    </Link>
                </div>
            </Inner>
        </Container>
    )
}