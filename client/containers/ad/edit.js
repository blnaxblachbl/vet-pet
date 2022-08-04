import { useRef, useState, useEffect } from "react"
import styled from "styled-components"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import Link from "next/link"

import TrashIcon from '../../public/icons/trash.svg'
import CameraIcon from '../../public/icons/camera.svg'

import { UPLOAD_FILE, DELETE_FILE, UPDATE_ONE_AD } from "../../gqls"
import { Input, Button, Image, Spinner, authRef, Empty } from "../../components"
import { COLORS } from "../../utils/const"
import { useUser } from "../../utils/hooks"
import { toast } from "react-toastify"

const Container = styled.form`
    background-color: ${COLORS.primary.white};
    max-width: 600px;
    margin: 0 auto;
    padding: 24px;
    border-radius: 12px;
    box-shadow: 4px 4px 16px 4px rgba(32, 29, 27, 0.02);

    .form-item {
        margin-bottom: 12px;
        :last-child {
            margin-bottom: 0;
        }
    }
    .text-area {
        height: auto;
        justify-content: flex-start;
        padding: 12px;
        textarea {
            min-height: 150px;
        }
    }
    .images {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .image-item {
            width: 88px;
            height: 88px;
            border-radius: 16px;
            background-color: ${COLORS.secondary.lightGray};
            margin-bottom: 5px;
            margin-right: 5px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            :hover {
                .mask {
                    display: flex;
                }
            }
            .mask {
                display: none;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                background-color: rgba(0,0,0, 0.3);
                svg {
                    width: 30px;
                    height: 30px;
                    path {
                        fill: ${COLORS.primary.white};
                    }
                }
            }
            .loading {
                display: flex; 
            }
            :last-child {
                margin-right: 0;
            }
            img {
                width: 88px;
                height: 88px;
                object-fit: cover;
            }
        }
    }
    .file-input {
        display: none;
    }
    .upload-button {
        width: 88px;
        height: 88px;
        border-radius: 16px;
        padding: 0;
        background-color: ${COLORS.secondary.lightGray};
        svg {
            width: 24px;
            height: 24px;
        }
    }
    .controls {
        display: flex;
        .submit {
            margin-right: 12px;
        }
        .unpublish {

        }
    }
    
    @media only screen and (max-width: 700px) {
        padding: 12px;
        .controls {
            flex-direction: column;
            .submit {
                width: 100%;
                margin-bottom: 12px;
            }
            .unpublish {
                width: 100%;
            }
        }
    }
`

const EditAdForm = ({ ad }) => {
    const [files, setFiles] = useState([])
    const fileInput = useRef()
    const router = useRouter()
    const { user } = useUser()

    useEffect(() => {
        if (ad) {
            setFiles(ad.images)
        }
    }, [ad])

    const [upload, { loading: fileLoading }] = useMutation(UPLOAD_FILE, {
        onCompleted: ({ uploadFile }) => {
            setFiles(files => [...files, uploadFile])
        },
        onError: e => { }
    })
    const [deleteFile, { loading: fileDeleteLoading }] = useMutation(DELETE_FILE, {
        onCompleted: ({ deleteFile }) => {
            setFiles(files => files.filter(f => f !== deleteFile))
        },
        onError: e => { }
    })
    const [updateAd, { loading }] = useMutation(UPDATE_ONE_AD, {
        onCompleted: () => {
            toast.success("Объявление обновлено")
            router.push("/ad")
        },
        onError: e => { }
    })

    const onSubmit = e => {
        e.preventDefault()
        if (!user) {
            authRef.current.openAuth()
            toast.warning("Требуется авторизация")
            return
        }
        if (ad.publish) {
            const {
                title,
                description,
                price
            } = e.target
            const data = {
                title: { set: title.value },
                description: { set: description.value },
                price: { set: price.value ? parseInt(price.value) : 0 },
                images: files
            }
            // console.log(data)
            updateAd({
                variables: {
                    where: { id: ad.id },
                    data
                }
            })
        }
    }

    if (!user) {
        return (
            <Empty
                text="Требуется ваторизация"
                button={
                    <Button onClick={() => authRef.current.openAuth()}>
                        Войти
                    </Button>
                }
            />
        )
    }

    if (!ad || ad.delete || (ad.user.id !== user.id)) {
        return (
            <Empty
                text="Объявление не найдено"
                button={
                    <Link href='/ad'>
                        <Button>
                            К объявлениям
                        </Button>
                    </Link>
                }
            />
        )
    }

    const unpublish = () => {
        if (ad.publish && window.confirm("Снять с публикации?")) {
            updateAd({
                variables: {
                    where: { id: ad.id },
                    data: {
                        publish: { set: false }
                    }
                }
            })
        }
    }

    return (
        <Container onSubmit={onSubmit}>
            <div className="form-item">
                <div className="images">
                    {
                        files.map(item => (
                            <div className="image-item">
                                <Image
                                    key={item}
                                    src={item}
                                />
                                <div
                                    className={`mask ${fileDeleteLoading ? 'loading' : ''}`}
                                    onClick={() => {
                                        if (ad.publish && window.confirm("Удаить фото?")) {
                                            deleteFile({
                                                variables: {
                                                    fileName: item
                                                }
                                            })
                                        }
                                    }}
                                >
                                    {fileDeleteLoading ? <Spinner color={COLORS.primary.black} /> : <TrashIcon />}
                                </div>
                            </div>
                        ))
                    }
                    {
                        files.length < 5 && (
                            <Button
                                type='button'
                                className='upload-button'
                                onClick={() => fileInput.current.click()}
                                loading={fileLoading}
                            >
                                <CameraIcon />
                            </Button>
                        )
                    }
                </div>
                <input
                    ref={fileInput}
                    name='images'
                    type='file'
                    className="file-input"
                    accept="image/*, camera"
                    onChange={e => {
                        const [file] = e.target.files

                        if (ad.publish) {
                            upload({
                                variables: {
                                    file
                                }
                            })
                        }
                    }}
                    disabled={!ad.publish}
                />
            </div>
            <div className="form-item">
                <Input
                    name='title'
                    placeholder='Заголовок'
                    required
                    defaultValue={ad.title}
                    disabled={!ad.publish}
                />
            </div>
            <div className="form-item">
                <Input
                    name='description'
                    placeholder='Описание'
                    element='textarea'
                    containerClassName='text-area'
                    required
                    defaultValue={ad.description}
                    disabled={!ad.publish}
                />
            </div>
            <div className="form-item">
                <Input
                    name='price'
                    placeholder='Цена'
                    type='number'
                    defaultValue={ad.price ? ad.price : ''}
                    disabled={!ad.publish}
                />
            </div>
            <div className="controls">
                <Button
                    type='submit'
                    loading={loading}
                    disabled={!ad.publish}
                    className='submit'
                >
                    Сохранить
                </Button>
                <Button onClick={unpublish} ouline className={'unpublish'}>
                    {ad.publish ? "Снять с публикации" : "Снято с пубоикации"}
                </Button>
            </div>
        </Container>
    )
}

export default EditAdForm