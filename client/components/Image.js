import { host } from "../utils/apollo"

export const Image = ({ src = '', ...props }) => {
    const url = src && src.includes('http') ? src : `${host}/uploads/${src}`
    return (
        <img
            src={url}
            {...props}
            onError={event => {
                event.target.src = "/images/noimage.png"
                event.onerror = null
            }}
            alt={src}
        />
    )
}