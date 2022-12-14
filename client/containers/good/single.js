import { useRef, useState } from "react"
import Link from "next/link"
import styled from "styled-components"

import {
    Button,
    Empty,
    Top,
    Image,
    Carousel,
    viewerRef,
    CartButton
} from "../../components"
import { COLORS, ORG_CATEGORIES, GOOD_TYPES } from "../../utils/const"

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: space-between;
    grid-gap: 24px;
    .images {
        grid-column: 1/3;
        overflow: hidden;
    }
    .info {
        grid-column: 1/3;
        overflow: hidden;
    }
    .organization {
        position: relative;
        grid-column: 3/4;
        grid-row: 1/3;
    }
    @media only screen and (max-width: 800px) {
        grid-template-columns: repeat(1, 1fr);
        .images {
            grid-column: 1/1;
        }
        .info {
            grid-column: 1/1;
        }
        .organization {
            grid-column: 1/1;
            grid-row: 2/3;
        }
    }
`
const Images = styled(Carousel)`
    /* width: 100%; */
    margin-bottom: 15px;
    .image-item {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: contain;
        object-position: center;
        /* border-radius: 12px; */
        background-color: ${COLORS.primary.white};
    }
`
const Paginatioin = styled.div`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 12px;
    cursor: pointer;

    .pagination-item {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
    }
    .selected {
        border: solid 1px ${COLORS.primary.purple};
    }
`
const Info = styled.div`
    background-color: ${COLORS.primary.white};
    border-radius: 12px;
    padding: 12px;
    box-sizing: border-box;

    .info-title {
        margin-bottom: 12px;
    }
    .desc {
        line-height: 1.7em;
        font-size: 14px;
        text-align: justify;
    }
    .date {
        font-size: 14px;
        color: ${COLORS.secondary.gray};
    }
    @media only screen and (max-width: 800px) {
        .price {
            font-size: 18px;
        }
    }
`
const OrgInfo = styled.div`
    background-color: ${COLORS.primary.white};
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
    position: sticky;
    top: 24px;
    .row {
        display: flex;
        margin-bottom: 12px;
    }
    .price-container {
        align-items: flex-end;
        justify-content: space-between;
        color: ${COLORS.secondary.gray};
        font-size: 16px;
    }
    .name {
        font-size: 16px;
        font-weight: 600;
    }
    .logo {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 12px;
    }
    .branchs {
        font-size: 14px;
        color: ${COLORS.secondary.gray};
    }
    .service-button {
        width: 100%;
        background-color: ${COLORS.secondary.green};
    }
    .product-button {
        width: 100%;
    }
    .cart-controls {
        margin: 0 auto;
        max-width: 70%;
    }
    .price {
        font-size: 24px;
        font-weight: 600;
        /* margin-bottom: 6px; */
        color: ${COLORS.primary.black};
        /* line-height: 24px; */
    }
    @media only screen and (max-width: 800px) {
        padding: 12px;
    }
`
const LabledValue = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    border-bottom: solid 1px ${COLORS.secondary.lightGray};
    margin-bottom: 12px;
    padding: 6px 0;
    :last-child {
        margin-bottom: 0;
    }

    .label {
        color: ${COLORS.secondary.gray};
        font-size: 14px;
        margin-right: 6px;
    }
    .value {
        color: ${COLORS.primary.black};
        font-size: 16px;
        text-align: right;
        white-space: pre-wrap;
    }
    .bold {
        font-weight: bold;
    }
    a {
        color: ${COLORS.primary.purple};
    }
    .link {
        color: ${COLORS.primary.purple};
        cursor: pointer;
        ::after {
            content: ", "
        }
        :last-child {
            ::after {
                content: ""
            }
        }
    }
`

const SingleGoodContainer = ({ good }) => {
    const imagesRef = useRef()
    const [selectedIndex, setSelectedIndex] = useState(0)

    if (!good) {
        return (
            <Empty
                text="?????????? ???? ????????????"
                button={
                    <Link href='/good'>
                        <Button>
                            ?? ??????????????
                        </Button>
                    </Link>
                }
            />
        )
    }
    return (
        <>
            <Top id='top' label={good.name} />
            <Container>
                <div className="images">
                    <Images
                        ref={imagesRef}
                        arrows={false}
                        slidesToScroll={1}
                        slidesToShow={1}
                        afterChange={index => {
                            setSelectedIndex(index)
                        }}
                    >
                        {
                            good.images.map((item, index) => (
                                <Image
                                    key={item}
                                    src={item}
                                    className='image-item'
                                    onClick={() => viewerRef.current.openModal(good.images, index)}
                                />
                            ))
                        }
                    </Images>
                    <Paginatioin>
                        {
                            good.images.map((item, index) => (
                                <Image
                                    key={item}
                                    src={item}
                                    className={`pagination-item ${index === selectedIndex ? 'selected' : ""}`}
                                    onClick={() => {
                                        setSelectedIndex(index)
                                        imagesRef.current.slickGoTo(index)
                                        const top = document.getElementById("top")
                                        top.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                />
                            ))
                        }
                    </Paginatioin>
                </div>
                <div className="info">
                    <Info>
                        {/* <div className="info-title">{good.price ? good.price + ' ???' : '??????????????????'}</div> */}
                        <Top label="????????????????" containerClassName={'info-title'} />
                        <div className="desc">{good.description}</div>
                    </Info>
                </div>
                <div className="organization">
                    <OrgInfo>
                        <div className="row">
                            <Image src={good.organization.logo} className='logo' />
                            <div>
                                <div className="name">{good.organization.name}</div>
                                <div className="branchs">{good.organization.categories.map(item => ORG_CATEGORIES[item]).join(", ")}</div>
                            </div>
                        </div>
                        <LabledValue>
                            <div className="label">??????????????????</div>
                            <div className="value">
                                {good.categories.map(item => (
                                    <Link href={`/good?category=${item}`}>
                                        <span className="link">{item}</span>
                                    </Link>
                                ))}
                            </div>
                        </LabledValue>
                        <LabledValue>
                            <div className="label">??????</div>
                            <div className="value">
                                {GOOD_TYPES[good.type]}
                            </div>
                        </LabledValue>
                        <div className="row price-container">
                            <div>????????</div>
                            <div className='price'>{good.price ? good.price + ' ???' : '??????????????????'}</div>
                        </div>
                        {
                            good.type === 'product' ? (
                                <CartButton
                                    good={good}
                                    buttonClassName={'product-button'}
                                    controllsContainerClassName='cart-controls'
                                />
                            ) : (
                                <Link href={`/order/service/${good.id}`}>
                                    <Button className={'service-button'}>
                                        ????????????????????
                                    </Button>
                                </Link>
                            )
                        }
                    </OrgInfo>
                </div>
            </Container>
        </>
    )
}

export default SingleGoodContainer