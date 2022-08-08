import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import Close from '../public/icons/close.svg'
import ArrowLeft from '../public/icons/arrow-left.svg'
import ArrowRight from '../public/icons/arrow-right.svg'

import { Carousel, Modal, Image } from '.'
import { COLORS } from '../utils/const'

const Container = styled(Carousel)`
    width: 100%;
    margin: 0 auto;
    padding: 15px;
    box-sizing: border-box;
    .viewer-item {
        width: 100%;
        height: 60vh;
        object-fit: contain;
        object-position: center;
        background-color: transparent;
    }
`
const CloseButton = styled(Close)`
    cursor: pointer;
    position: absolute;
    top: 15px;
    right: 15px;
    path {
        fill: ${COLORS.primary.white};
    }
`
const Right = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
    right: 0;
    top: 20vh;
    height: 60vh;
    background-color: rgba(255,255,255,0.1);
    z-index: 3;
    cursor: pointer;
    box-sizing: border-box;
    svg {   
        width: 24px;
        height: 24px;
        path {
            fill: ${COLORS.primary.white};
        }
    }

    @media only screen and (max-width: 700px) {
        svg {
            width: 24px;
            height: 24px;
        }
    }
`
const Left = styled(Right)`
    left: 0;
    right: auto;
`

const ImageViewerComponent = forwardRef(({ }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    const [initIndex, setInitIndex] = useState(0)
    const [images, setImages] = useState([])
    const carousel = useRef()

    useImperativeHandle(ref, () => ({
        openModal,
        closeModal
    }), [])

    const openModal = (images = [], index = 0) => {
        setIsOpen(true)
        setInitIndex(index)
        setImages(images)
    }

    const closeModal = () => {
        setIsOpen(false)
        setInitIndex(0)
        setImages([])
    }

    const onKeyPress = (event) => {
        if (event.code === 'ArrowRight') {
            carousel.current.slickNext()
        }
        if (event.code === 'ArrowLeft') {
            carousel.current.slickPrev()
        }
    }

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', onKeyPress, true)
            document.addEventListener('keydown', onKeyPress, false)
        } else {
            document.removeEventListener('keydown', onKeyPress, true)
            document.removeEventListener('keydown', onKeyPress, false)
        }
    }, [isOpen])

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            showHeader={false}
            contentStyle={{
                maxWidth: "100%",
                overflow: 'visible',
                backgroundColor: 'transparent',
                border: "none",
                borderRadius: 0,
                position: 'unset'
            }}
            overlayStyle={{
                padding: 0
            }}
        >
            <CloseButton onClick={closeModal} />
            <Right onClick={() => carousel.current.slickNext()}>
                <ArrowRight />
            </Right>
            <Left onClick={() => carousel.current.slickPrev()}>
                <ArrowLeft />
            </Left>
            <Container
                ref={carousel}
                arrows={false}
                slidesToScroll={1}
                slidesToShow={1}
                initialSlide={initIndex}
            >

                {
                    images.map((item, index) => (
                        <Image
                            key={item}
                            src={item}
                            className='viewer-item'
                        />
                    ))
                }
            </Container>
        </Modal>
    )
})

export let viewerRef = null

export const ImageViewer = (props) => {
    viewerRef = useRef()
    return <ImageViewerComponent ref={viewerRef} {...props} />
}