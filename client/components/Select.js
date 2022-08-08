import styled from "styled-components"

import { COLORS } from "../utils/const"

const Container = styled.select`
    width: 100%;
    height: 36px;
    padding: 0 20px;
    padding-right: 45px;
    box-sizing: border-box;
    border: none;
    border-radius: 18px;
    background-color: ${COLORS.primary.white};
    border: 1px solid ${COLORS.secondary.lightGray};
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url('/icons/arrow-down.svg');
    background-position-x: calc(100% - 10px);
    background-position-y: 50%;
    background-repeat: no-repeat;
    background-size: 24px;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    color: ${COLORS.primary.black};
    position: relative;
    svg {
        path {
            fill: ${COLORS.primary.black};
        }
    }
    &:invalid {
        color: ${COLORS.secondary.gray};
    }
`
const Label = styled.label`
    display: block;
    font-size: 14px;
    padding-left: 12px;
    color: ${COLORS.secondary.darkGray};
`

export const Select = ({
    placeholder,
    children,
    label,
    ...props
}) => {
    return (
        <>
            {label && <Label>{label}</Label>}
            <Container
                required
                {...props}
            >
                {placeholder && <option value={''} disabled selected>{placeholder}</option>}
                {children}
            </Container>
        </>
    )
}