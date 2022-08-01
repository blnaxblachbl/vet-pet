import { useMemo } from "react"
import styled from "styled-components"
import { useQuery } from "@apollo/client"
import { Link, useNavigate } from "react-router-dom"
import { Button, Spin, Image } from "antd"

import { FIND_UNIQUE_ORGANIZATION } from "../gqls"
import { Empty } from "."

const Container = styled.div`
    display: flex;
    max-width: 400px;
    
    .logo {
        min-width: 120px;
        max-width: 120px;
        min-height: 120px;
        max-height: 120px;
        padding: 0 !important;
        object-fit: cover;
        border-radius: 50%;
    }

    .info {
        margin-left: 15px;
    }

    .name {
        font-size: 21px;
        font-weight: 500;
    }
    .desc {
        font-size: 14px;
        color: gray;
        margin-bottom: 15px;
    }
`

export const OrgInfo = ({ organizationId, isOwner = false }) => {
    const navigate = useNavigate()

    const { data, loading } = useQuery(FIND_UNIQUE_ORGANIZATION, {
        variables: {
            where: {
                id: organizationId ? organizationId : ""
            }
        }
    })

    const organization = useMemo(() => data ? data.findUniqueOrganization : null, [data])

    if (loading) {
        return <Spin />
    }

    if (!organization) {
        return (
            <Empty
                description='Организация не добавлена'
                buttonText={isOwner ? "Добавить" : null}
                onButtonClick={() => navigate("/organization/add")}
            />
        )
    }
    if (organization) {
        return (
            <>
                <Container>
                    <Image
                        src={`/uploads/${organization.logo}`}
                        className='logo'
                    />
                    <div className="info">
                        <div className="name">{organization.name}</div>
                        <div className="desc number-of-lines-2">{organization.description}</div>
                        <Link to={`/organization/${organizationId}`}>
                            <Button>
                                Подробнее
                            </Button>
                        </Link>
                    </div>
                </Container>
            </>
        )
    }
    return null
}