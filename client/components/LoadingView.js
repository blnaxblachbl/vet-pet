import styled from "styled-components"

import { Spinner } from "."

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LoadingView = ({ loading = false, size, color, ...props }) => {
    
    if (!loading) return null

    return (
        <Container {...props}>
            <Spinner size={size} color={color} />
        </Container>
    )
}