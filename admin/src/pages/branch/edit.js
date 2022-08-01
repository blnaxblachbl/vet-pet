import { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { Form as AntForm, Input, Button, message, TimePicker, Checkbox } from 'antd'
import { useMutation, useQuery } from '@apollo/client'
import { useNavigate, useParams } from 'react-router-dom'

import {
    Empty,
    LoadingView,
    Top,
    UploadFile
} from '../../components'
import { UPDATE_ONE_BRANCH, FIND_UNIQUE_BRANCH } from '../../gqls'
import { durationFromTime, timeFromDuration } from '../../utils/hooks'
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

const EditBranch = () => {
    const { id } = useParams()
    const [form] = Form.useForm()
    const refs = useRef(new Map()).current
    const navigate = useNavigate()

    const { data, loading } = useQuery(FIND_UNIQUE_BRANCH, {
        variables: {
            where: { id }
        },
        onCompleted: ({
            findUniqueBranch: {
                address,
                phone,
                images,
                schedule
            }
        }) => {
            const _schedule = {}
            for (let item of schedule) {
                _schedule[item.day] = {
                    allTime: item.allTime,
                    dayOff: item.dayOff,
                    range: item.startTime ? [timeFromDuration(item.startTime), timeFromDuration(item.endTime)] : [undefined, undefined]
                }
            }
            form.setFieldsValue({
                address,
                phone,
                schedule: _schedule
            })
            setTimeout(() => {
                refs.get("images").setFileList(images.map(name => ({
                    uid: name,
                    url: `/uploads/${name}`,
                    name: name
                })))
            }, 200)
        },
        onError: e => { }
    })

    const branch = useMemo(() => data ? data.findUniqueBranch : null, [data])

    const [updateBranch, { loading: updateLoading }] = useMutation(UPDATE_ONE_BRANCH, {
        onCompleted: () => {
            message.success("Филиал обнровлен")
            navigate("/branch")
        },
        onError: e => { }
    })

    const handleSubmit = ({ schedule, address, phone = null }) => {
        const images = refs.get("images").getFileList()
        const scheduleKeys = Object.keys(schedule)
        const _schedule = scheduleKeys.map(key => ({
            where: { id: { equals: branch.schedule.find(s => s.day === key).id } },
            data: {
                day: { set: key },
                startTime: { set: schedule[key].range ? durationFromTime(schedule[key].range[0]) : 0 },
                endTime: { set: schedule[key].range ? durationFromTime(schedule[key].range[1]) : 0 },
                dayOff: { set: schedule[key].dayOff },
                allTime: { set: schedule[key].allTime }
            }
        }))
        const data = {
            address: { set: address },
            phone: { set: phone },
            images: images.map(img => img.name),
            schedule: {
                updateMany: _schedule
            }
        }
        updateBranch({
            variables: {
                where: { id },
                data
            }
        })
    }

    if (!loading && !branch) {
        return (
            <Empty
                description='Филиал не найден'
                buttonText='к филиалам'
                onButtonClick={() => navigate("/branch")}
            />
        )
    }

    return (
        <>
            <Top title={'Редактипование филиала'} />
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
                <Button loading={updateLoading} type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form>
            <LoadingView loading={loading} />
        </>
    )
}

export default EditBranch