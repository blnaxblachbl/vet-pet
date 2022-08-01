import styled from 'styled-components'

const View = styled.div`
    margin: 0 auto;
    padding: 24px 15px;
    overflow: visible;
    min-height: calc(100vh - 96px);
    max-width: 1200px;
    box-sizing: border-box;
`

export const Padding = ({
    children = null,
    className = "",
    enable = true,
    ...props
}) => {
    if (!enable) return children
    return (
        <View className={className} {...props}>
            {children}
        </View>
    )
}