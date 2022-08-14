import Link from "next/link"
import styled from "styled-components"

import CartIcon from '../public/icons/cart.svg'

import { Button, CartButton } from "."
import { host } from "../utils/apollo"
import { COLORS } from "../utils/const"

const Container = styled.div`
    width: 100%;
    border: solid 1px ${COLORS.secondary.lightGray};
    background-color: ${COLORS.primary.white};
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
    /* box-shadow: 0px 6px 30px rgba(77, 77, 77, 0.06), 0px 12px 30px rgba(77, 77, 77, 0.06); */
    
    .image {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: cover;
        cursor: pointer;
    }
    .info {
        padding: 6px;
        white-space: pre-wrap;
        line-height: 24px;
        height: 72px;
        .name {
            font-weight: 600;
            font-size: 18px;
            cursor: pointer;
        }
        .org-name {
            font-weight: 400;
            font-size: 14px;
        }
        .desc {
            font-size: 14px;
            margin-bottom: 12px;
            line-height: 24px;
            height: 48px;
            color: ${COLORS.secondary.gray};
        }
    }
    .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .price {
        font-size: 18px;
        font-weight: 600;
        color: ${COLORS.primary.camel};
        margin-left: 6px;
    }
    .to-cart {
        white-space: nowrap;
        height: 35px;
        border-radius: 0;
        border-top-left-radius: 12px;
        border-bottom-right-radius: 12px;
        padding: 0 24px;
        svg {
            path {
                fill: ${COLORS.primary.white};
            }
        }
    }
    .cart-controls {
        width: 50%;
        margin-right: 6px;
    }
    .book {
        background-color: ${COLORS.secondary.green};
    }
    :hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    }
`
const ImageBackground = styled.div`
    width: 100%;
    aspect-ratio: 24/27;
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
    border-radius: 6px;

    .tag {
        padding: 3px 12px;
        border-radius: 18px;
        background-color: ${COLORS.primary.camel};
        width: fit-content;
        /* opacity: 0.8; */
        display: inline;
        margin-right: 6px;
        color: ${COLORS.primary.white};
    }
    .tags-container {
        display: block;
        font-size: 12px;
        font-weight: 600;
        white-space: nowrap;
        overflow-x: scroll;
    }
    @media only screen and (max-width: 700px) {
        /* aspect-ratio: 1/1; */
    }
`

export const Good = ({ item, ...props }) => {
    if (!item) return null

    return (
        <Container {...props}>
            <Link href={`/good/${item.id}`}>
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
                <div className="org-name">{item.organization.name}</div>
                {/* <div className="desc number-of-lines-2">{item.description}</div> */}
            </div>
            <div className="row">
                <div className="price">{item.price} ₽</div>
                {
                    item.type === 'service' && (
                        <Button className={'book to-cart'}>
                            Записаться
                        </Button>
                    )
                }
                {
                    item.type === 'product' && (
                        <CartButton
                            good={item}
                            buttonClassName={'to-cart'}
                            controllsContainerClassName='cart-controls'
                        >
                            <CartIcon />
                        </CartButton>
                    )
                }
            </div>
        </Container>
    )
}