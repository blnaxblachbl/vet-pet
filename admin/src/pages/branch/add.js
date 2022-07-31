import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, DatePicker, TimePicker, Checkbox } from 'antd'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

import {
    Top,
    UploadFile
} from '../../components'
import { CREATE_ONE_BRANCH } from '../../gqls'
import { useUser, durationFromTime } from '../../utils/hooks'
import { WEEK_DAYS } from '../../utils/const'

const Form = styled(AntForm)`
    max-width: 600px;
`
const rules = {
    required: {
        required: true,
        message: 'Обязательное поле'
    }
}

const AddBranch = () => {
    const { user } = useUser()
    const [form] = Form.useForm()
    const refs = useRef(new Map()).current
    const navigate = useNavigate()

    const [createBranch, { loading }] = useMutation(CREATE_ONE_BRANCH, {
        onCompleted: () => {
            message.success("Филиал создан")
            navigate("/branch")
        },
        onError: e => { }
    })

    const handleSubmit = ({ schedule, ...value }) => {
        if (!user.organization) {
            message.warning("Сначала нужно добавить организацию")
            return
        }
        const images = refs.get("images").getFileList()
        const scheduleKeys = Object.keys(schedule)
        const _schedule = scheduleKeys.map(key => ({
            // data: {
            day: key,
            startTime: schedule[key].range ? durationFromTime(schedule[key].range[0]) : 0,
            endTime: schedule[key].range ? durationFromTime(schedule[key].range[1]) : 0,
            dayOff: schedule[key].dayOff,
            allTime: schedule[key].allTime
            // }
        }))
        const data = {
            ...value,
            images: images.map(img => img.name),
            schedule: {
                createMany: { data: _schedule }
            },
            organization: {
                connect: { id: user.organization.id }
            }
        }
        console.log(data)
        createBranch({
            variables: { data }
        })
    }

    return (
        <>
            <Top title={'Добавление филиала'} />
            <Form
                form={form}
                onFinish={handleSubmit}
                layout="vertical"
            >
                <Form.Item
                    name={"address"}
                    rules={[rules.required]}
                    label="Адрес филиала"
                >
                    <Input placeholder='Введите адрес' />
                </Form.Item>
                <Form.Item
                    name={"phone"}
                    // rules={[rules.required]}
                    label="Номер телефона"
                >
                    <Input placeholder='Введите номер' />
                </Form.Item>
                <Form.Item
                    name={"images"}
                    // rules={[rules.required]}
                    label="Фотогалерея филиала"
                >
                    <UploadFile
                        ref={ref => refs.set("images", ref)}
                        listType="picture-card"
                        maxCount={10}
                    >
                        Загрузите изображение
                    </UploadFile>
                </Form.Item>
                <Form.Item
                    label='Расписание'
                    rules={[rules.required]}
                    name={'schedule'}
                >
                    {
                        WEEK_DAYS.map((item, index) => (
                            <Form.Item
                                name={['schedule', item.name]}
                                label={item.value}
                                style={{
                                    marginLeft: 15,
                                    border: 'solid 0px #c1c1c1',
                                    borderBottomWidth: 1
                                }}
                            >
                                <Form.Item
                                    name={['schedule', item.name, 'range']}
                                    style={{ marginBottom: 5 }}
                                >
                                    <TimePicker.RangePicker
                                        format={"HH:mm"}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name={['schedule', item.name, 'allTime']}
                                    style={{ marginBottom: 2 }}
                                    valuePropName='checked'
                                    initialValue={false}
                                >
                                    <Checkbox>
                                        Крулосуточно
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item
                                    name={['schedule', item.name, 'dayOff']}
                                    style={{ marginBottom: 2 }}
                                    valuePropName='checked'
                                    initialValue={index > 4}
                                >
                                    <Checkbox>
                                        Выходной
                                    </Checkbox>
                                </Form.Item>
                            </Form.Item>
                        ))
                    }
                </Form.Item>
                <Button loading={loading} type="primary" htmlType="submit">
                    Добавить филиал
                </Button>
            </Form>
        </>
    )
}

export default AddBranch