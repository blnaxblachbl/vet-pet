import { createGlobalStyle } from 'styled-components'
import 'antd/dist/antd.min.css'

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        background-color: whitesmoke;
    }
    #se-custom div {
        max-width: 1200px;
        margin: 0 auto;

        .se-component {
            margin-bottom: 10px;
        }
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
`