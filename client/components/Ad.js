import styled from "styled-components"
import Link from "next/link"
import { DateTime } from "luxon"

import Eye from '../public/icons/eye.svg'

import { Image } from "."
import { COLORS } from "../utils/const"
import { useRealetiveDate } from "../utils/hooks"

const Container = styled.div`
    width: 100%;
    border: solid 1px ${COLORS.secondary.lightGray};
    background-color: ${COLORS.primary.white};
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    padding: 6px;
    position: relative;
    
    .image {
        width: 100%;
        aspect-ratio: 3/2.5;
        object-fit: cover;
        background-color: ${COLORS.secondary.lightGray};
        border-radius: 6px;
    }
    .info {
        /* padding: 6px; */
        white-space: pre-wrap;
        .price {
            font-size: 18px;
            font-weight: 600;
        }
        .title {
            font-size: 14px;
            font-weight: 500;
            line-height: 24px;
            height: 48px;
        }
        .date {
            font-size: 14px;
            color: ${COLORS.secondary.gray};
        }
    }
    .unpublish {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255,255,255,0.5);
        padding: 12px;
        font-size: 18px;
        font-weight: 600;
        display: flex;

        .text {
            text-align: center;
            color: ${COLORS.secondary.red};
            margin: auto;
        }
    }
    :hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    }
    .view-count {
        display: flex;
        position: absolute;
        align-items: center;
        top: 15px;
        right: 15px;
        vertical-align: middle;
        font-size: 16px;
        padding: 0 6px;
        box-sizing: border-box;
        background-color: ${COLORS.primary.white};
        border-radius: 12px;
        height: fit-content;
        svg {
            margin-right: 3px;
        }
    }
`

export const Ad = ({ item }) => {
    if (!item) return null

    return (
        <Link href={`/ad/${item.id}`}>
            <Container>
                <Image src={item.images[0]} className='image' />
                <div className="info">
                    <div className="price">{item.price ? item.price + ' ₽' : 'Бесплатно'}</div>
                    <div className="title number-of-lines-2">{item.title}</div>
                    <div className="date">Добавлено {useRealetiveDate(DateTime.fromISO(item.createdAt))}</div>
                </div>
                {
                    !item.publish && (
                        <div className="unpublish">
                            <div className="text">
                                Снято с публикации
                            </div>
                        </div>
                    )
                }
                <div className="view-count">
                    <Eye />
                    {item.viewCount}
                </div>
            </Container>
        </Link>
    )
}