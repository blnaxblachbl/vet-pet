import Link from "next/link"
import styled from "styled-components"

import {
    Ad,
    Button,
    Empty
} from "../../components"

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 12px;

    .advert-item {
        display: block;
        height: fit-content;
    }

    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media only screen and (max-width: 800px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const AdsContainer = ({ ads = [], ...props }) => {
    if (ads.length === 0) {
        return (
            <Empty
                text="Нет объявлений"
                button={
                    <Link href='/ad/create'>
                        <Button>
                            Добавить своё
                        </Button>
                    </Link>
                }
            />
        )
    }
    return (
        <Container {...props}>
            {
                ads.map(item => (
                    <div key={item.id} className="advert-item">
                        <Ad item={item} />
                    </div>
                ))
            }
        </Container>
    )
}

export default AdsContainer