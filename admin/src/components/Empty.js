import styled from "styled-components"
import { Empty as AntEmpty, Button } from "antd"

const EmptyContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`

export const Empty = ({
    buttonText = '',
    onButtonClick = null,
    description = 'Упс, тут ничего нет'
}) => {
    return (
        <EmptyContainer>
            <AntEmpty description={description}>
                {
                    onButtonClick && buttonText && (
                        <Button
                            type="primary"
                            onClick={onButtonClick}
                        >
                            {buttonText}
                        </Button>
                    )
                }
            </AntEmpty>
        </EmptyContainer>
    )
}