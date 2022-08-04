import { useMemo } from 'react'
import styled from 'styled-components'

import { Spinner } from '.'
import { COLORS } from '../utils/const'

const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: fit-content;
    padding: 0 20px;
    border-radius: 12px;
    background-color: ${COLORS.primary.purple};
    border: none;
    color: ${COLORS.primary.white};
    font-weight: 600;
    cursor: pointer;
    box-sizing: border-box;

    svg {
        path: {
            fill: ${COLORS.secondary.white};
        }
    }

    /* :hover {
        background-color: ${({ disabled }) => disabled ? 'gray' : '#FF6666e6'};
    } */
`

export const Button = ({
    children = "Кнопка",
    loading = false,
    onClick = () => { },
    disabled = false,
    ouline = false,
    loadingColor = "#fff",
    className = null,
    type="button",
    ...props
}) => {

    const _className = useMemo(() => {
        const classes = []
        if (className) {
            classes.push(className)
        }
        if (ouline) {
            classes.push("button-ouline")
        }
        if (disabled) {
            classes.push("button-disabled")
        }
        return classes.join(" ")
    }, [className, disabled, ouline])

    return (
        <Container
            {...props}
            onClick={!disabled ? onClick : undefined}
            className={_className}
            type={type}
        >
            {loading ? <Spinner color={loadingColor} /> : children}
        </Container>
    )
}