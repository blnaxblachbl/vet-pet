import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .left {
        .title {
            font-size: 18px;
        }

        .help-text {
            color: gray;
            font-size: 14px;
            margin-top: 2px;
        }
    }
`

export const Top = ({ title, helpText, action, style }) => {
    return (
        <Wrapper hasAction={action ? true : false} style={style}>
            <div className="left">
                <div className="title">{title}</div>
                {helpText && <div className="help-text">{helpText}</div>}
            </div>
            {action && action}
        </Wrapper>
    )
}