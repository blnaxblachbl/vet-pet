import styled from "styled-components"

import { Empty } from "../../../components"

const Container = styled.div``

const PetContainer = ({ user }) => {
    if (!user) {
        return (
            <Empty
                text="Требуется авторизация"
                button={
                    <Button onClick={() => authRef.current.openAuth()}>
                        Войти
                    </Button>
                }
            />
        )
    }
    return (
        <Container>

        </Container>
    )
}

export default PetContainer