import styled from 'styled-components'
import { COLORS } from '../utils/const';

export const Spinner = ({ size = 25, color = COLORS.primary.black }) => (
    <StyledSpinner
        size={`${size}px`}
        viewBox="0 0 50 50"
        color={color}
    >
        <circle
            className="path"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="4"
        />
    </StyledSpinner>
);

const StyledSpinner = styled.svg`
    animation: rotate 2s linear infinite;
    width: ${props => props.size};
    height: ${props => props.size};
    
    & .path {
        stroke: ${props => props.color};
        stroke-linecap: round;
        animation: dash 1.5s ease-in-out infinite;
    }
    
    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
        }
        100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
        }
    }
`