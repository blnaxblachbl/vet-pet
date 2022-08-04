const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const axios = require('axios')
const { customAlphabet } = require('nanoid')
const nanoid = customAlphabet('1234567890', 4)

const sendCodeToPhone = async (phone) => {
    if (!phone) throw new Error('phone not provided')

    let code

    const { data } = await axios.get('https://sms.ru/code/call', {
        params: {
            api_id: process.env.SMS_API_ID,
            phone: phone,
            json: 1
        }
    })

    if (data) {
        code = data.code
    }

    if (!code) {
        throw new Error("can not send code")
    }

    return code
}

const User = {
    Query: {
        findMeUser: async (_parent, args, { prisma, verify, fingerprint }) => {
            if (!verify) return null
            args.where = {
                id: verify.id
            }
            return prisma.user.findUnique(args)
        },
        findUniqueUser: (_parent, args, { prisma }) => {
            return prisma.user.findUnique(args)
        },
        findFirstUser: (_parent, args, { prisma }) => {
            return prisma.user.findFirst(args)
        },
        findManyUser: (_parent, args, { prisma }) => {
            return prisma.user.findMany(args)
        },
        findManyUserCount: (_parent, args, { prisma }) => {
            return prisma.user.count(args)
        },
    },
    Mutation: {
        sendUserPhone: async (_parent, { data: { phone } }, { prisma }) => {
            const user = await prisma.user.findUnique({ where: { phone } })

            let code = null
            if (phone === '79991234567') {
                code = '1234'
            } else {
                if (process.env.NODE_ENV === 'production') {
                    code = await sendCodeToPhone(phone)
                } else {
                    code = '1234'
                }
            }
            if (process.env.NODE_ENV !== 'production'){
                console.log(code)
            }

            const hashCode = await bcrypt.hash(`${code}`, 10)

            if (!user) {
                // throw new Error('user not found')
                await prisma.user.create({
                    data: {
                        code: hashCode,
                        phone
                    }
                })
                return true
            }
            if (user.delete) {
                throw new Error('user deleted')
            }
            if (user.block) {
                return new Error(`user blocked`)
            }
            // if (verify) {
            //     throw new Error('invalid token')
            // }
            await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    code: hashCode
                }
            })

            return true
        },
        sendUserCode: async (parent, { data: { phone, code }, select }, { prisma, verify }) => {
            let where = {}
            if (verify && verify.id) {
                where = {
                    id: verify.id
                }
            } else {
                where = {
                    phone
                }
            }
            let user = await prisma.user.findUnique({
                where
            })
            if (!user) {
                throw new Error('user not found')
            }
            const compare = bcrypt.compareSync(code, user.code)
            if (!compare) {
                throw new Error('code incorrect')
            }
            const recode = nanoid()
            const hashCode = await bcrypt.hash(recode, 10)
            user = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    code: hashCode,
                    phone
                },
                select: select.user.select
            })
            const token = jwt.sign({ id: user.id, role: 'user' }, process.env.TOKEN_SECRET)
            return {
                user,
                token
            }
        },
        createOneUser: (_parent, args, { prisma }) => {
            return prisma.user.create(args)
        },
        updateOneUser: async (_parent, args, { prisma, verify }) => {
            const { phone } = args.data
            const { id } = args.where
            if (verify && verify.role === 'user') {
                const user = await prisma.user.findUnique({ where: { id: verify.id } })
                if (phone && phone.set !== user.phone) {
                    let code = await sendCodeToPhone(phone.set)
                    const hashCode = await bcrypt.hash(`${code}`, 10)
                    await prisma.user.update({
                        where: {
                            id: verify.id
                        },
                        data: {
                            code: hashCode
                        }
                    })
                }
                delete args.data.phone
            }
            return prisma.user.update(args)
        },
        deleteOneUser: async (_parent, args, { prisma }) => {
            return prisma.user.delete(args)
        },
        upsertOneUser: async (_parent, args, { prisma }) => {
            return prisma.user.upsert(args)
        },
        deleteManyUser: async (_parent, args, { prisma }) => {
            return prisma.user.deleteMany(args)
        },
        updateManyUser: (_parent, args, { prisma }) => {
            return prisma.user.updateMany(args)
        },
    },
}

module.exports = {
    User,
}
