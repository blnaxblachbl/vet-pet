import { useRef, useState } from "react"
import Link from "next/link"
import styled from "styled-components"
import { DateTime } from "luxon"

import {
    Button,
    Empty,
    Top,
    Carousel,
    Image
} from "../../components"

import { COLORS } from "../../utils/const"
import { useRealetiveDate, useUser } from "../../utils/hooks"

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
    .user {
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
        .user {
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
    padding: 24px;
    box-sizing: border-box;

    .price {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 6px;
    }
    .desc {
        line-height: 1.7em;
        font-size: 14px;
        text-align: justify;
        margin-bottom: 6px;
    }
    .date {
        font-size: 14px;
        color: ${COLORS.secondary.gray};
    }
    @media only screen and (max-width: 800px) {
        padding: 12px;
        .price {
            font-size: 18px;
        }
    }
`
const User = styled.div`
    background-color: ${COLORS.primary.white};
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
    position: sticky;
    top: 24px;
    .row {
        display: flex;
        margin-bottom: 24px;
    }
    .name {
        font-size: 16px;
        font-weight: 600;
    }
    .call-button {
        width: 100%;
    }
    .message-button {
        width: 100%;
        margin-bottom: 12px;
    }
    .avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 12px;
    }
    .user-date {
        font-size: 14px;
        color: ${COLORS.secondary.gray};
    }
    .edit-button {
        width: 100%;
    }
    @media only screen and (max-width: 800px) {
        padding: 12px;
    }
`
const CreatedAt = styled.div`
    font-size: 14px;
    color: ${COLORS.secondary.gray};
    text-align: right;
`

const SingleAdContainer = ({ ad }) => {
    const imagesRef = useRef()
    const { user } = useUser()
    const [selectedIndex, setSelectedIndex] = useState(0)

    if (!ad || ad.deleted || !ad.publish) {
        return (
            <Empty
                text="Объявление не найдено"
                button={
                    <Link href='/ad'>
                        <Button>
                            К объявлениям
                        </Button>
                    </Link>
                }
            />
        )
    }
    return (
        <>
            <Top
                label={ad.title}
                value={<CreatedAt>{useRealetiveDate(DateTime.fromISO(ad.createdAt))}</CreatedAt>}
            />
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
                            ad.images.map(item => (
                                <Image
                                    key={item}
                                    src={item}
                                    className='image-item'
                                />
                            ))
                        }
                    </Images>
                    <Paginatioin>
                        {
                            ad.images.map((item, index) => (
                                <Image
                                    key={item}
                                    src={item}
                                    className={`pagination-item ${index === selectedIndex ? 'selected' : ""}`}
                                    onClick={() => {
                                        setSelectedIndex(index)
                                        imagesRef.current.slickGoTo(index)
                                    }}
                                />
                            ))
                        }
                    </Paginatioin>
                </div>
                <div className="info">
                    <Info>
                        <div className="price">{ad.price ? ad.price + ' ₽' : 'Бесплатно'}</div>
                        <div className="desc">{ad.description}</div>
                    </Info>
                </div>
                <div className="user">
                    <User>
                        <div className="row">
                            <Image src={ad.user.avatar} className='avatar' />
                            <div>
                                <div className="name">{ad.user.name}</div>
                                <div className="user-date">Зарегистрирован {useRealetiveDate(DateTime.fromISO(ad.user.createdAt))}</div>
                            </div>
                        </div>
                        {
                            user && user.id === ad.user.id ? (
                                <Link href={`/ad/edit/${ad.id}`}>
                                    <Button className={'edit-button'} ouline>
                                        Редактировать
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <a href={`https://api.whatsapp.com/send?phone=${ad.user.phone}`} target='_blank' rel="noreferrer">
                                        <Button className={'message-button'} ouline>
                                            Написать в WhatsApp
                                        </Button>
                                    </a>
                                    <a href={`tel:${ad.user.phone}`}>
                                        <Button className={'call-button'}>
                                            Позвонить
                                        </Button>
                                    </a>
                                </>
                            )
                        }
                    </User>
                </div>
            </Container>
        </>
    )
}

export default SingleAdContainer