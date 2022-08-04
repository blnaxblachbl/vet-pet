import { forwardRef } from "react"
import styled from "styled-components"
import Slider from "react-slick"

const Container = styled.div`
    width: 100%;
    box-sizing: border-box;
    
    .slider {
        box-sizing: border-box;
        .slick-dots {
            position: relative;
            margin-bottom: 20px;
        }
    }
`

export const Carousel = forwardRef((
    {
        children,
        containerClassName,
        ...props
    },
    ref
) => {
    return (
        <Container className={containerClassName}>
            <Slider
                ref={ref}
                className="slider"
                {...props}
            >
                {children}
            </Slider>
        </Container >
    )
})