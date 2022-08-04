import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        font-size: 21px;
        font-weight: 400;
        text-align: center;
        width: 100%;
        padding: 0 15px;
        margin-bottom: 24px;
    }
`

export const Empty = ({
    text = 'Тут ничего нет',
    button = null
}) => {
    return (
        <Container>
            <span className="title">{text}</span>
            {
                button && button
            }
        </Container>
    )
}