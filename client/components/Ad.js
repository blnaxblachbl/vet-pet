import styled from "styled-components"
import Link from "next/link"
import { DateTime } from "luxon"

import { Button, Image } from "."
import { COLORS } from "../utils/const"
import { useRealetiveDate } from "../utils/hooks"

const Container = styled.div`
    width: 100%;
    border: solid 1px ${COLORS.secondary.lightGray};
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    
    .image {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
        background-color: ${COLORS.secondary.lightGray};
    }
    .info {
        padding: 12px;
        white-space: pre-wrap;
        .price {
            font-size: 18px;
            font-weight: 600;
        }
        .title {
            font-size: 16px;
            font-weight: 500;
        }
        .date {
            font-size: 14px;
            color: ${COLORS.secondary.gray};
        }
    }
    :hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    }
`

export const Ad = ({ item }) => {
    if (!item) return null
    
    return (
        <Container>
            <Link href={`/ad/${item.id}`}>
                <Image src={item.images[0]} className='image' />
            </Link>
            <div className="info">
                <div className="price">{item.price ? item.price : 'Бесплатно'}</div>
                <div className="title number-of-lines-2">{item.title}</div>
                <div className="date">Добавлено {useRealetiveDate(DateTime.fromISO(item.createdAt))}</div>
            </div>
        </Container>
    )
}