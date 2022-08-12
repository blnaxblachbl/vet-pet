import { useMemo } from "react"
import styled from "styled-components"
import Link from "next/link"
import { DateTime } from 'luxon'
import { useQuery } from "@apollo/client"

import Location from '../../public/icons/location.svg'
import Clock from '../../public/icons/clock.svg'
import Phone from '../../public/icons/phone.svg'

import { Empty, Button, Image, Top, Branch, LoadingView, viewerRef } from "../../components"
import { COLORS, ORG_CATEGORIES } from "../../utils/const"
import { FIND_MANY_BRANCH } from "../../gqls"
import { timeFromDuration } from "../../utils/hooks"

const Container = styled.div`
    .org-info {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        margin-bottom: 24px;
        .content {
            display: flex;
        }
        .logo {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 24px;
        }
        .name {
            font-size: 21px;
            font-weight: 600;
        }
        .categories {
            color: ${COLORS.secondary.gray};
            font-size: 14px;
            margin-bottom: 18px;
        }
        .org-row {
            display: flex;
            .org-row-item {
                color: ${COLORS.primary.black};
                cursor: pointer;
                margin-right: 12px; 
                white-space: nowrap;
                :last-child {
                    margin-right: 0;
                }
                svg {
                    display: inline-block;
                    vertical-align: middle;
                    margin-right: 6px;
                    path {
                        fill: ${COLORS.primary.black};
                    }
                }
                a {
                    display: inline-block;
                    vertical-align: middle;
                    margin-top: 3px;
                    color: ${COLORS.primary.purple};
                    margin-right: 6px;
                    :last-child {
                        margin-right: 0;
                    }
                }
                span {
                    margin-top: 3px;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
        .bay-button {
            background-color: ${COLORS.primary.camel};
        }
    }
    .desc {
        line-height: 1.7em;
        font-size: 16px;
        text-align: justify;
        margin-bottom: 24px;
    }
    @media only screen and (max-width: 800px) {
        .org-info {
            flex-direction: column;
            .content {
                flex-direction: column;
                margin-bottom: 24px;
            }
            .org-row {
                flex-direction: column;
                .org-row-item {
                    margin-right: 0;
                    margin-bottom: 6px;
                    :last-child {
                        margin-bottom: 0;
                    }
                }
            }
            .logo {
                margin-bottom: 12px;
                width: 50%;
                align-self: center;
                height: auto;
                aspect-ratio: 1/1;
                margin-right: 0;
            }
            .bay-button {
                width: 100%;
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
    const organization = useMemo(() => branch ? branch.organization : null, [branch])
    const time = useMemo(() => {
        if (branch) {
            const dayOfWeek = DateTime.now().setLocale("en").weekdayLong.toLowerCase()
            const {
                allTime,
                dayOff,
                startTime,
                endTime
            } = branch.schedule.find(item => item.day === dayOfWeek)

            if (allTime) {
                return 'Круглосуточно'
            }
            if (dayOff) {
                return 'Выходной'
            }
            return `${timeFromDuration(startTime)} - ${timeFromDuration(endTime)}`
        }
        return '-'
    }, [branch])

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
                <div className="content">
                    <Image src={organization.logo} className='logo' />
                    <div>
                        <div className="name">{organization.name}</div>
                        <div className="categories">
                            {organization.categories.map(item => ORG_CATEGORIES[item]).join(", ")}
                        </div>
                        <div className="org-row">
                            <div className="org-row-item">
                                <Location />
                                <a
                                    href={`https://2gis.ru/yakutsk/search/${branch.address}`}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {branch.address}
                                </a>
                            </div>
                            <div className="org-row-item">
                                <Clock />
                                <span>
                                    {time}
                                </span>
                            </div>
                            <div className="org-row-item">
                                <Phone />
                                <a href={`tel:${branch.phone}`}>
                                    {branch.phone}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <Link
                    href={{
                        pathname: '/good',
                        query: {
                            branch: branch.id
                        }
                    }}
                >
                    <Button className={'bay-button'}>
                        Товары и услуги
                    </Button>
                </Link>
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