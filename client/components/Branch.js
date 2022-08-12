import styled from "styled-components"
import Link from "next/link"

import Star from '../public/icons/star.svg'

import { Image } from '.'
import { COLORS } from "../utils/const"

const Container = styled.div`
    width: 100%;
    border: solid 1px ${COLORS.secondary.lightGray};
    background-color: ${COLORS.primary.white};
    border-radius: 6px;
    padding: 6px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    /* box-shadow: 0px 6px 30px rgba(77, 77, 77, 0.06), 0px 12px 30px rgba(77, 77, 77, 0.06); */
    
    .logo {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
        background-color: ${COLORS.secondary.lightGray};
        border-radius: 6px;
    }
    .info {
        .name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 6px;
        }
        .desc {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            color: ${COLORS.primary.black};
            margin: 0;
            .rating {
                font-size: 18px;
                font-weight: 600;
                margin-right: 6px;
            }
            .address {
                font-size: 14px;
            }
            svg {
                margin-top: -5px;
                margin-right: 6px;
                path {
                    fill: #FFD600;
                }
            }
        }
    }
    :hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    }
`

export const Branch = ({ item, ...props }) => {
    if (!item) return null

    return (
        <Link href={`/branch/${item.id}`}>
            <Container {...props}>
                <Image
                    src={item.images[0]}
                    className='logo'
                />
                <div className="info">
                    <div className="name">{item.organization.name}</div>
                    <div className="desc">
                        <Star />
                        <span className="rating">
                            {item.rating},
                        </span>
                        <span className="address">
                            {item.address}
                        </span>
                    </div>
                    {/* <div className="desc number-of-lines-2">{item.organization.categories.map(item => ORG_CATEGORIES[item]).join(", ")}</div> */}
                </div>
            </Container>
        </Link>
    )
}