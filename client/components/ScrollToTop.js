import { useEffect, useRef } from "react"
import styled from "styled-components"

import ArrowIcon from '../public/icons/arrow-up.svg'

const Container = styled.div`
    position: fixed;
    display: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 50px;
    height: 50px;
    background-color: rgba(0,0,0,0.3);
    border-radius: 50%;
    bottom: 15px;
    right: 15px;
    cursor: pointer;
    z-index: 5;

    svg {
        width: 24px;
        height: 24px;
        path {
            fill: #fff;
        }
    }

    @media only screen and (max-width: 700px) {
        bottom: 80px;
    }
`

export const ScrollToTop = () => {
    const container = useRef()

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    useEffect(() => {
        if (window){
            window.addEventListener('scroll', onScroll);
            return () => window.removeEventListener('scroll', onScroll);
        }
    }, [])

    const onScroll = () => {
        if (window){
            if (window.pageYOffset > window.innerHeight) {
                container.current.style.display = 'flex'
            } else {
                container.current.style.display = 'none'
            }
        }
    }

    return (
        <Container ref={container} onClick={scrollToTop}>
            <ArrowIcon />
        </Container>
    )
}