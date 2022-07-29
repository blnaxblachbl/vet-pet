const { processUpload, deleteFile } = require('../../utils/uploads')

const Upload = {
    Mutation: {
        uploadFile: async (_parent, { file, originamName }, { prisma }) => {
            let prefix = null
            if (originamName) {
                const name = originamName.split(".").shift().replace(/\s+/gm, "_").replace(/[^а-яА-Яa-zA-Z0-9_]+/gm, '')
                if (name){
                    prefix = name
                }
            }
            const { name } = await processUpload(file, prefix)
            return name
        },
        deleteFile: async (_parent, { fileName }, { prisma }) => {
            await deleteFile(fileName)
            return fileName
        },
    },
}

module.exports = {
    Upload,
}
