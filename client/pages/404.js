import styled from "styled-components"
import { COLORS } from "../utils/const"


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 15%;
    color: ${COLORS.primary.camel};

    img {
        height: 180px;
        margin: 0 12px;
    }
    .title {
        font-size: 60px;
        text-align: center;
    }
    .row {
        display: flex;
        align-items: center;
        /* width: 100%; */
        .four {
            font-size: 180px;
        }
    }

    @media only screen and (max-width: 700px) {
        padding-top: 50%;
        .title {
            font-size: 32px;
        }
        img {
            height: 60px;
        }
        .row {
            .four {
                font-size: 60px;
            }
        }
    }
`

const NotFound = () => {
    return (
        <Container>
            <div className="title">Страница не найдена</div>
            <div className="row">
                <div className="four">4</div>
                <img src="/images/404.png" />
                <div className="four">4</div>
            </div>
        </Container>
    )
}

export default NotFound