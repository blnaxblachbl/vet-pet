import styled from "styled-components"
import Link from "next/link"
import { useMemo } from "react"

import { Empty, Button, Image, Top, Branch, LoadingView, viewerRef } from "../../components"
import { COLORS, ORG_CATEGORIES } from "../../utils/const"
import { useQuery } from "@apollo/client"
import { FIND_MANY_BRANCH } from "../../gqls"

const Container = styled.div`
    .org-info {
        display: flex;
        font-size: 16px;
        a {
            color: ${COLORS.primary.purple};
        }
        .logo {
            width: 150px;
            height: 150px;
            border-radius: 6px;
            object-fit: cover;
            margin-right: 24px;
        }
        .name {
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 6px;
        }
        .phone {
            margin-bottom: 6px;
            color: ${COLORS.secondary.gray};
        }
        .email {
            margin-bottom: 6px;
            color: ${COLORS.secondary.gray};
        }
        .address {
            margin-bottom: 6px;
            color: ${COLORS.secondary.gray};
        }
        .categories {
            .category {
                display: inline-block;
                padding: 3px 12px;
                font-size: 14px;
                background-color: ${COLORS.primary.camel};
                color: ${COLORS.primary.white};
                border-radius: 18px;
                /* border: solid 1px ${COLORS.secondary.lightGray}; */
                width: fit-content;
                margin-right: 12px;
                :last-child {
                    margin-right: 0;
                }
            }
        }
        margin-bottom: 24px;
    }
    .desc {
        line-height: 1.7em;
        font-size: 16px;
        text-align: justify;
        margin-bottom: 24px;
    }
    @media only screen and (max-width: 700px) {
        .info {
            flex-direction: column;
            .logo {
                margin-bottom: 12px;
                width: 100%;
                height: auto;
                aspect-ratio: 1/1;
            }
        }
        .desc {
            margin-bottom: 12px;
        }
    }
`
const Images = styled.div`
    display: flex;
    overflow-x: scroll;
    width: 100;
    margin-bottom: 24px;
    :last-child {
        margin-bottom: 0;
    }
    
    .image {
        width: 200px;
        aspect-ratio: 1/1;
        object-fit: cover;
        border-radius: 6px;
        border: solid 1px ${COLORS.secondary.lightGray};
        margin-right: 12px;
        :last-child {
            margin-right: 0;
        }
    }
`
const OtherBranchs = styled.div`
    display: flex;
    overflow-x: scroll;
    width: 100;
    margin-bottom: 24px;
    :last-child {
        margin-bottom: 0;
    }
    
    .branch {
        width: 300px;
        margin-right: 12px;
        :last-child {
            margin-right: 0;
        }
    }
`

const SingleBranchContainer = ({ branch }) => {
    const organization = branch ? branch.organization : null

    const { data, loading } = useQuery(FIND_MANY_BRANCH, {
        variables: {
            where: {
                id: { not: { equals: branch ? branch.id : "" } },
                delete: { equals: false },
                publish: { equals: true },
                organizationId: { equals: organization ? organization.id : "" }
            }
        },
        ssr: false,
        skip: false
    })

    const otherBranchs = useMemo(() => data ? data.findManyBranch : [], [data])

    if (!branch || branch.delete || !branch.publish || !organization || organization.delete || !organization.publish) {
        return (
            <Empty
                text="Организация не найдена"
                button={
                    <Link href='/branch'>
                        <Button>
                            К организациям
                        </Button>
                    </Link>
                }
            />
        )
    }

    return (
        <Container>
            {/* <Top label={organization.name} /> */}
            <div className="org-info">
                <Image src={organization.logo} className='logo' />
                <div>
                    <div className="name">{organization.name}</div>
                    <div className="email">
                        Почта -{' '}
                        <a href={`mailto:${organization.email}`}>
                            {organization.email}
                        </a>
                    </div>
                    <div className="phone">
                        Кол центр -{' '}
                        <a href={`tel:${organization.phone}`}>
                            {organization.phone}
                        </a>
                    </div>
                    <div className="phone">
                        Номер филиала -{' '}
                        <a href={`tel:${branch.phone}`}>
                            {branch.phone}
                        </a>
                    </div>
                    <div className="address">
                        Адрес филиала -{' '}
                        <a href={`https://2gis.ru/yakutsk/search/${branch.address}`} target='_blank' rel="noreferrer">
                            {branch.address}
                        </a>
                    </div>
                    <div className="categories">
                        {
                            organization.categories.map(item => (
                                <div className="category">{ORG_CATEGORIES[item]}</div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className="desc">{organization.description}</div>
            <Top label="Фото" />
            <Images>
                {
                    branch.images.map((item, index) => (
                        <Image
                            src={item}
                            alt={item}
                            key={item}
                            className='image'
                            onClick={() => viewerRef.current.openModal(branch.images, index)}
                        />
                    ))
                }
            </Images>
            <Top label="Другие филиалы" />
            <LoadingView loading={loading} />
            <OtherBranchs>
                {
                    otherBranchs.map(item => (
                        <div key={item.id} className="branch">
                            <Branch item={item} />
                        </div>
                    ))
                }
            </OtherBranchs>
        </Container>
    )
}

export default SingleBranchContainer