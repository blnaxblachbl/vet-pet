import styled from "styled-components"

import { Image } from '../components'
import { COLORS, ORG_CATEGORIES } from "../utils/const"

const Container = styled.div`
    width: 100%;
    border: solid 1px ${COLORS.secondary.lightGray};
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
    
    .logo {
        width: 100%;
        aspect-ratio: 3/2;
        object-fit: contain;
        background-color: ${COLORS.secondary.lightGray};
    }
    .info {
        padding: 12px;
        white-space: pre-wrap;
        .name {
            font-size: 18px;
            font-weight: 500;
        }
        .desc {
            font-size: 14px;
            color: ${COLORS.secondary.gray};
        }
    }
    :hover {
        box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.03);
    }
`

export const Organization = ({ item, ...props }) => {
    if (!item) return null

    return (
        <Container {...props}>
            <Image
                src={item.logo}
                className='logo'
            />
            <div className="info">
                <div className="name">{item.name}</div>
                <div className="desc number-of-lines-2">{item.categories.map(item => ORG_CATEGORIES[item]).join(", ")}</div>
            </div>
        </Container>
    )
}