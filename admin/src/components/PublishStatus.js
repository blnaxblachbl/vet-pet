import { Tag } from "antd"

export const PublishStatus = ({ publish = false }) => {
    let text = 'Не опубликован'
    let color = 'red'
    if (publish) {
        text = 'Опубликован'
        color = 'green'
    }
    return <Tag color={color}>{text}</Tag>
}