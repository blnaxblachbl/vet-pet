import styled from 'styled-components'

const View = styled.div`
    margin: 0 auto;
    padding: 24px 0;
    overflow: visible;
    min-height: calc(100vh - 96px);
    max-width: 1200px;
    box-sizing: border-box;

    @media only screen and (max-width: 1200px) {
        padding: 15px 15px;
    }
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