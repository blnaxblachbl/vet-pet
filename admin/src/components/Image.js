import styled from "styled-components"

const Img = styled.img`
    object-fit: contain;
`

export const Image = (props) => {
    return (
        <Img
            {...props}
            onError={event => {
                event.target.src = "/images/noimage.png"
                event.onerror = null
            }}
        />
    )
}