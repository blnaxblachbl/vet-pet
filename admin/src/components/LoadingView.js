import styled from "styled-components"
import { Spin } from "antd"

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    background-color: rgba(255,255,255, 0.5);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 3;
`

export const LoadingView = ({ loading }) => {

    if (!loading) {
        return null
    }

    return (
        <Container>
            <Spin />
        </Container>
    )
}