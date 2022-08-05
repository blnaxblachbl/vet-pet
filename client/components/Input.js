import { forwardRef, useEffect, useMemo, useState } from "react"
import styled from "styled-components"

import { COLORS } from '../utils/const'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid #f1f1f1;
    height: 36px;
    background: ${COLORS.primary.white};
    border-radius: 18px;
    padding: 0 12px;
    box-sizing: border-box;

    &:focus-within {
        input {
            outline: none;  
            caret-color: ${COLORS.primary.camel};
        }
        textarea {
            outline: none;  
            caret-color: ${COLORS.primary.camel};
        }
        .label {
            color: ${COLORS.primary.yellow};
        }
    }

    .middle {
        margin: 0 5px;
        width: 100%;
    }

    .row {
        display: flex;
        width: 100%;
        align-items: center;
    }

    input {
        font-size: 16px;
        display: flex;
        width: 100%;
        background-color: transparent;
        border: none;
        font-size: 16px;
        color: ${COLORS.primary.black};
        box-sizing: border-box;
        caret-color: auto;
        ::placeholder {
            color: ${COLORS.secondary.gray};
        }
    }
    textarea {
        font-size: 16px;
        display: flex;
        width: 100%;
        background-color: transparent;
        border: none;
        font-size: 16px;
        color: ${COLORS.primary.black};
        box-sizing: border-box;
        caret-color: auto;
        ::placeholder {
            color: ${COLORS.secondary.gray};
        }
    }

    @media only screen and (max-width: 700px) {
        input {
            font-size: 14px;
        }
    }
`

const Components = {
    input: `input`,
    textarea: `textarea`
}

export const Input = forwardRef(({
    value,
    containerClassName,
    inputClassName,
    containerStyle,
    style,
    LeftComponent = null,
    RightComponent = null,
    disabled = false,
    error = false,
    labelClassName = null,
    onFocus = () => { },
    onBlur = () => { },
    placeholder = undefined,
    onChange,
    defaultValue = undefined,
    element = 'input',
    ...props
}, ref) => {
    const [focused, setFocused] = useState(false)
    const [innerValue, setInnerValue] = useState(defaultValue ? defaultValue : '')
    const Element = Components[element]

    useEffect(() => {
        setInnerValue(defaultValue)
    }, [defaultValue])

    const _value = useMemo(() => value ? value : innerValue, [value, innerValue])

    return (
        <Container
            className={containerClassName}
            style={containerStyle}
        >
            <div className="row">
                {LeftComponent}
                <Element
                    ref={ref}
                    value={_value}
                    className={inputClassName}
                    style={style}
                    placeholder={focused ? undefined : placeholder}
                    onFocus={(e) => {
                        setFocused(true)
                        onFocus(e)
                    }}
                    onBlur={(e) => {
                        setFocused(false)
                        onBlur(e)
                    }}
                    onChange={(e) => {
                        if (onChange) {
                            onChange(e)
                        }
                        setInnerValue(e.target.value)
                    }}
                    disabled={disabled}
                    {...props}
                />
                {RightComponent}
            </div>
        </Container>
    )
})