import styled from "styled-components"
import ReactModal from 'react-modal'

import CloseIcon from '../public/icons/close.svg'

const Top = styled.div`
    /* display: flex; */
    margin-bottom: 15px;
    width: 100%;
    position: relative;

    .modal-title {
        width: 100%;
        font-size: 21px;
        font-weight: bold;
        text-align: center;
        padding: 0 15px;
        box-sizing: border-box;
    }

    svg {
        margin-left: auto;
        height: 24px;
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        path {
            fill: ${({ closeColor }) => closeColor};
        }
    }
`

ReactModal.setAppElement('#__next')

export const Modal = ({
    children,
    onRequestClose = () => { },
    overlayStyle = {},
    contentStyle = {},
    title = "",
    closeColor = '#000',
    isOpen = false,
    headerStyle = {},
    headerTitleStyle = {},
    showHeader = true,
    headerClassName = '',
    ...props
}) => {
    return (
        <ReactModal
            style={{
                overlay: {
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 15,
                    zIndex: 5,
                    boxSizing: 'border-box',
                    ...overlayStyle
                },
                content: {
                    width: '100%',
                    maxWidth: 400,
                    height: 'auto',
                    maxHeight: '95%',
                    position: 'relative',
                    top: 'auto',
                    left: "auto",
                    right: 'auto',
                    bottom: 'auto',
                    borderRadius: 20,
                    padding: 12,
                    ...contentStyle
                }
            }}
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            {...props}
        >
            {
                showHeader && (
                    <Top closeColor={closeColor} style={headerStyle} className={headerClassName}>
                        <div className={`modal-title`} style={headerTitleStyle}>{title}</div>
                        <CloseIcon onClick={onRequestClose} />
                    </Top>
                )
            }
            {children}
        </ReactModal>
    )
}