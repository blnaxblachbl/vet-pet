import { forwardRef, useImperativeHandle, useState } from 'react'
import {
    Upload
} from 'antd'
import { useMutation } from '@apollo/client'

import { UPLOAD_FILE, DELETE_FILE } from '../gqls'

export const UploadFile = forwardRef(({
    children,
    maxCount = 1,
    ...props
}, ref) => {
    const [fileList, setFileList] = useState([])

    const [uploadFile] = useMutation(UPLOAD_FILE)

    const [deleteFile] = useMutation(DELETE_FILE)

    useImperativeHandle(ref, () => ({
        getFileList: () => {
            return fileList
        },
        setFileList: (files = []) => {
            setFileList(files)
        }
    }), [fileList, setFileList])

    const onRemove = ({ name, uid }) => {
        if (name) {
            deleteFile({
                variables: { fileName: name }
            })
            setFileList(list => list.filter(item => item.uid !== uid))
        }
    }

    const customRequest = async ({ onSuccess, onError, file }) => {
        const newFile = {
            ...file,
            status: 'uploading',
        }
        setFileList(list => [...list, newFile])
        const { data, errors } = await uploadFile({
            variables: { file }
        })
        if (data) {
            const updatedFile = {
                ...file,
                status: 'done',
                url: `/uploads/${data.uploadFile}`,
                name: data.uploadFile
            }
            setFileList(list => list.map(item => item.uid === newFile.uid ? updatedFile : item))
            onSuccess('Ok')
        }
        if (errors) {
            onError(errors)
        }
    }

    return (
        <Upload
            fileList={fileList}
            showUploadList={{
                showPreviewIcon: false,
                showRemoveIcon: true
            }}
            customRequest={customRequest}
            multiple={false}
            maxCount={maxCount}
            onRemove={onRemove}
            accept="image/*"
            {...props}
        >
            {maxCount > fileList.length ? children : null}
        </Upload>
    )
})