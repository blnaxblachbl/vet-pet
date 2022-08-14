import styled from 'styled-components'

import { COLORS } from '../utils/const'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: ${COLORS.secondary.red};
    border-radius: 50%;
    color: ${COLORS.primary.white};
    font-weight: 400;
    font-size: 12px;
    border: solid 2px ${COLORS.primary.white};
    box-sizing: border-box;
`

export const Badge = ({ count = 0, forseShow = false, ...props }) => {

    if (count > 0 || forseShow === true) {
        return (
            <Container {...props}>
                {count > 99 ? "99+" : count}
            </Container>
        )
    }
    return null
}