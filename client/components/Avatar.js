import styled from "styled-components"

import { Image } from "."
import { COLORS } from "../utils/const"
import { host } from "../utils/apollo"

const Container = styled(Image)`
    width: ${({ size }) => size + "px"};
    height: ${({ size }) => size + "px"};
    border-radius: 50%;
    border: solid 1px ${COLORS.secondary.gray};
    object-fit: cover;
`

export const Avatar = ({ user, size = 36, ...props }) => {
    if (!user) return null

    return <Container size={size} src={user.avatar} {...props} />
}