import Link from "next/link"
import styled from "styled-components"

import {
    Organization,
    Button,
    Empty
} from "../../components"

const Container = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 12px;

    .org-item {
        display: block;
        height: fit-content;
    }

    @media only screen and (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (max-width: 800px) {
        grid-template-columns: repeat(2, 1fr);
    }
    @media only screen and (max-width: 700px) {
        grid-template-columns: repeat(1, 1fr);
    }
    /* @media only screen and (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
    } */
`

const OrgContainer = ({ orgs = [] }) => {
    if (orgs.length === 0) {
        return (
            <Empty
                text="Нет организаций"
                button={
                    <Link href='/'>
                        <Button>
                            На главную
                        </Button>
                    </Link>
                }
            />
        )
    }
    return (
        <>
            <Container>
                {
                    orgs.map(item => (
                        <div key={item.id} className="org-item">
                            <Organization item={item} />
                        </div>
                    ))
                }
            </Container>
        </>
    )
}

export default OrgContainer