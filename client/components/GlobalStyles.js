import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { COLORS } from '../utils/const'

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: 'Hind', sans-serif;
        font-weight: 400;
        background-color: #fafafa;

        svg {
            width: 24px;
            height: 24px;
        }
    }

    input {
        appearance: none;
        -webkit-appearance: none;
        font-family: 'Rubik', sans-serif;
    }
    textarea {
        font-family: 'Rubik', sans-serif;
    }

    a {
        text-decoration: none;
    }
    .toast{
        margin: 15px;
        min-width: 200px;
        box-sizing: border-box;
    }
    .hide-scroll-indicator {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
        ::-webkit-scrollbar { 
            display: none;  /* Safari and Chrome */
        }
    }
    .number-of-lines-1 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
                line-clamp: 1; 
        -webkit-box-orient: vertical;
    }
    .number-of-lines-2 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
                line-clamp: 2; 
        -webkit-box-orient: vertical;
    }
    .number-of-lines-3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
                line-clamp: 3; 
        -webkit-box-orient: vertical;
    }
    .disable-scroll {
        overflow: hidden;
    }
    .enable-scroll {
        overflow: auto;
    }
`
