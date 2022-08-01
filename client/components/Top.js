import styled from "styled-components"

const Container = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 24px;
    color: #212121;

    .title {
        font-size: 32px;
        font-weight: 600;
    }

    .value {
        display: flex;
        align-items: center;
        font-size: 17px;
        cursor: pointer;

        svg {
            transform: scale(0.7);
        }
    }


    @media only screen and (max-width: 1200px) {
        .title {
            font-size: 24px;
        }
    }
    @media only screen and (max-width: 900px) {
        .title {
            font-size: 18px;
        }
        .value {
            font-size: 16px;
        }
    }
    @media only screen and (max-width: 500px) {
        .title {
            font-size: 16px;
        }
        .value {
            font-size: 14px;
        }
    }
`

export const Top = ({
    label = '',
    value = '',
    containerClassName,
    valueClassName,
    labelClassName,
    onValueClick = () => { }
}) => {
    return (
        <Container className={containerClassName}>
            <div className={`title ${labelClassName}`}>{label}</div>
            {
                value && (
                    <div
                        onClick={onValueClick}
                        className={`value ${valueClassName}`}
                    >
                        {value}
                    </div>
                )
            }
        </Container>
    )
}