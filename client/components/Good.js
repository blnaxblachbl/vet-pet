import Link from "next/link"
import styled from "styled-components"

import { Image, Button } from "."
import { host } from "../utils/apollo"
import { COLORS } from "../utils/const"

const Container = styled.div`
    width: 100%;
    border: solid 1px ${COLORS.secondary.lightGray};
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
    
    .image {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
        cursor: pointer;
    }
    .info {
        padding: 12px;
        white-space: pre-wrap;
        .name {
            font-size: 18px;
            font-weight: 500;
            cursor: pointer;
        }
        .desc {
            font-size: 14px;
            margin-bottom: 12px;
            line-height: 24px;
            height: 48px;
            color: ${COLORS.secondary.gray};
        }
        .to-cart {
            width: 100%;
            white-space: nowrap;
            height: 35px;
            padding: 0;
        }
        .book {
            background-color: ${COLORS.secondary.green};
        }
    }
    :hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    }
`
const ImageBackground = styled.div`
    width: 100%;
    aspect-ratio: 3/2;
    background-image: ${({ src }) => `url(${src})`};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    padding: 6px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
    cursor: pointer;

    .tag {
        padding: 2px 12px;
        border-radius: 6px;
        background-color: ${COLORS.primary.white};
        width: fit-content;
        opacity: 0.8;
        display: inline;
        margin-right: 6px;
    }
    .tags-container {
        display: block;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        overflow-x: scroll;
    }
`

export const Good = ({ item, ...props }) => {
    if (!item) return null

    return (
        <Container {...props}>
            <Link href={`/product/${item.id}`}>
                <ImageBackground src={`${host}/uploads/${item.images[0]}`}>
                    <div className="tags-container hide-scroll-indicator">
                        {
                            item.categories.map(c => (
                                <div key={`${item.id}-${c}`} className='tag'>{c}</div>
                            ))
                        }
                    </div>
                </ImageBackground>
            </Link>
            <div className="info">
                <Link href={`/product/${item.id}`}>
                    <div className="name">{item.name}</div>
                </Link>
                <div className="desc number-of-lines-2">{item.description}</div>
                {
                    item.type === 'service' && (
                        <Button className={'book to-cart'}>
                            Записаться
                        </Button>
                    )
                }
                {
                    item.type === 'product' && (
                        <Button className={'to-cart'}>
                            В корзину
                        </Button>
                    )
                }
            </div>
        </Container>
    )
}