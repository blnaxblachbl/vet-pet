import { useMemo } from 'react'
import styled from 'styled-components'

import { Spinner } from '.'
import { COLORS } from '../utils/const'

const Container = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    width: fit-content;
    padding: 0 20px;
    border-radius: 18px;
    font-size: 14px;
    background-color: ${COLORS.primary.camel};
    border: none;
    color: ${COLORS.primary.white};
    font-weight: 600;
    cursor: pointer;
    box-sizing: border-box;

    :disabled {
        background-color: ${COLORS.secondary.lightGray};
        color: ${COLORS.secondary.gray};
    }

    svg {
        path: {
            fill: ${COLORS.secondary.white};
        }
    }
`

export const Button = ({
    children = "Кнопка",
    loading = false,
    ouline = false,
    loadingColor = "#fff",
    className = null,
    type = "button",
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
        return classes.join(" ")
    }, [className, ouline])

    return (
        <Container
            {...props}
            className={_className}
            type={type}
        >
            {loading ? <Spinner color={loadingColor} /> : children}
        </Container>
    )
}