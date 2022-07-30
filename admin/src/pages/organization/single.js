import { useMemo } from "react"
import styled from "styled-components"
import { Button, Descriptions as Desc, message, Popconfirm, Spin, Image } from "antd"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"

import {
    LoadingView,
    Top,
    PublishStatus,
} from "../../components"
import { FIND_UNIQUE_ORGANIZATION, UPDATE_ONE_ORGANIZATION } from "../../gqls"
import { ORG_CATEGORIES } from "../../utils/const"

const Descriptions = styled(Desc)`
    max-width: 600px;
    font-size: 14px;

    .logo {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        object-fit: cover;
    }
    .image-list {
        display: flex;
    }
    .image-container {
        width: 30%;
        height: 30%;
        margin-right: 15px;
        margin-bottom: 15px;
        border-radius: 12px;
        box-sizing: border-box;
    }
    .image {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
    }
`
const Controls = styled.div`
    margin-top: 15px;
    margin-bottom: 24px;
`

const SingleOrganization = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const { data, loading } = useQuery(FIND_UNIQUE_ORGANIZATION, {
        variables: {
            where: { id }
        }
    })

    const [updateOrg, { loading: updateLoading }] = useMutation(UPDATE_ONE_ORGANIZATION, {
        onCompleted: ({ updateOneOrganization }) => {
            if (updateOneOrganization.delete) {
                message.success("Организация удалена")
                window.history.back()
                return
            }
            message.success("Организация обновлена")
        },
        onError: e => {
            message.error("Что то пошло не так, повторите попытку позже")
        }
    })

    const organization = useMemo(() => data ? data.findUniqueOrganization : null, [data])

    const togglePublish = () => {
        updateOrg({
            variables: {
                where: { id },
                data: {
                    publish: { set: !organization.publish }
                }
            }
        })
    }

    const deleteOrg = () => {
        updateOrg({
            variables: {
                where: { id },
                data: {
                    delete: { set: true }
                }
            }
        })
    }

    return (
        <>
            <Top title={'Информация об ресторане'} />
            {
                organization && (
                    <>
                        <Descriptions
                            title="Информация"
                            bordered
                            column={1}
                            layout='vertical'
                            labelStyle={{
                                fontWeight: 600
                            }}
                        >
                            <Descriptions.Item label='Логотип'>
                                <Image
                                    src={`/uploads/${organization.logo}`}
                                    className='logo'
                                    alt={organization.logo}
                                />
                            </Descriptions.Item>
                            <Descriptions.Item
                                label='Статус:'
                            >
                                <PublishStatus publish={organization.publish} />
                            </Descriptions.Item>
                            <Descriptions.Item label='Название'>
                                {organization.name}
                            </Descriptions.Item>
                            <Descriptions.Item label='Описание'>
                                {organization.description}
                            </Descriptions.Item>
                            <Descriptions.Item label='Контактный номер телефона'>
                                <a href={`tel:${organization.phone}`}>{organization.phone}</a>
                            </Descriptions.Item>
                            <Descriptions.Item label='Адрес электронной почты'>
                                <a href={`mailto:${organization.email}`}>{organization.email}</a>
                            </Descriptions.Item>
                            {/* <Descriptions.Item label='Город'>
                                {organization.city}
                            </Descriptions.Item> */}
                            <Descriptions.Item label='Адрес'>
                                {organization.address}
                            </Descriptions.Item>
                            <Descriptions.Item label='Категории'>
                                {organization.categories.map(c => ORG_CATEGORIES[c]).join(", ")}
                            </Descriptions.Item>
                            <Descriptions.Item label='Ссылки'>
                                {organization.links.map(link => (
                                    <a href={link} target='_blank'>{link}</a>
                                ))}
                            </Descriptions.Item>
                            <Descriptions.Item label='Количество администраторов'>
                                {organization._count.admins} шт.
                            </Descriptions.Item>
                            <Descriptions.Item label='Изображения'>
                                <div className="image-list">
                                    {
                                        organization.images.map(item => (
                                            <div className="image-container">
                                                <Image
                                                    key={item}
                                                    src={`/uploads/${item}`}
                                                    alt={item}
                                                    className='image'
                                                />
                                            </div>
                                        ))
                                    }
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                        <Controls>
                            <Link to={`/organization/edit/${id}`}>
                                <Button style={{ marginRight: 15 }}>
                                    Редактировать
                                </Button>
                            </Link>
                            <Popconfirm
                                title={organization.publish ? "Снять с публикации?" : "Опубликовать?"}
                                onConfirm={togglePublish}
                                disabled={updateLoading}
                            >
                                <Button
                                    type={!organization.publish && 'primary'}
                                    loading={updateLoading}
                                    style={{ marginRight: 15 }}
                                >
                                    {organization.publish ? "Снять с публикации" : "Опубликовать"}
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                title={"Удалить?"}
                                onConfirm={deleteOrg}
                                disabled={updateLoading}
                            >
                                <Button
                                    loading={updateLoading}
                                    type='danger'
                                    style={{ marginRight: 15 }}
                                >
                                    Удалить
                                </Button>
                            </Popconfirm>
                        </Controls>
                    </>
                )
            }
            <LoadingView loading={loading} />
        </>
    )
}

export default SingleOrganization