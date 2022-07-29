const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { customAlphabet } = require("nanoid")
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6)

const { htmlLoginPassword } = require("../../utils/forms")
const sendMail = require("../../utils/mailer")

const Admin = {
  Query: {
    findMeAdmin: (_parent, args, { prisma, verify }) => {
      args["where"] = { id: verify ? verify.id : '' }
      return prisma.admin.findUnique(args)
    },
    findUniqueAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findUnique(args)
    },
    findFirstAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findFirst(args)
    },
    findManyAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.findMany(args)
    },
    findManyAdminCount: (_parent, args, { prisma }) => {
      return prisma.admin.count(args)
    },
  },
  Mutation: {
    createOneAdmin: async (_parent, args, { prisma }) => {
      const exist = await prisma.admin.findUnique({ where: { email: args.data.email } })
      if (exist) {
        throw new Error('admin-exist')
      }
      const password = nanoid()
      const passwordHash = await bcrypt.hash(password, 10)
      args.data['password'] = passwordHash
      const admin = await prisma.admin.create(args)
      try {
        sendMail({
          to: args.data.email,
          subject: 'Создание учетной записи "VetPet"',
          text: 'Создание учетной записи "VetPet"',
          html: htmlLoginPassword(admin.email, password),
        })
      } catch (e) {
        throw new Error("can send mail")
      }
      return admin
    },
    resetPassword: async (_parent, args, { prisma }) => {
      const password = nanoid()
      const passwordHash = await bcrypt.hash(password, 10)
      const existAdmin = await prisma.admin.findUnique(args)
      if (existAdmin) {
        await prisma.admin.update({
          where: { id: existAdmin.id },
          data: {
            repassword: { set: passwordHash }
          },
        })
        sendMail({
          to: existAdmin.email,
          subject: "Новый пароль",
          text: "Новый пароль для вохда в панель администратора",
          html: htmlLoginPassword(existAdmin.email, password),
        })
      }
      return true
    },
    signInAdmin: async (parent, args, { prisma }) => {
      const exist = await prisma.admin.findUnique({
        where: {
          email: args.data.email,
        },
      })
      if (!exist) throw new Error("not exist")
      const compareRePassword = bcrypt.compareSync(
        args.data.password,
        exist.repassword ? exist.repassword : ""
      )
      const comparePassword = bcrypt.compareSync(
        args.data.password,
        exist.password
      )
      if (compareRePassword) {
        const hashRePassword = await bcrypt.hash(nanoid(), 10)
        const update = await prisma.admin.update({
          where: {
            email: args.data.email,
          },
          data: {
            password: exist.repassword,
            repassword: hashRePassword,
          },
        })
        if (!update) throw new Error("error signin")
      }
      if (!comparePassword && !compareRePassword)
        throw new Error("password incorrect")
      const token = jwt.sign({ id: exist.id, role: exist.type }, process.env.TOKEN_SECRET)
      return {
        token,
        admin: exist,
      }
    },
    changePasswordAdmin: async (parent, { data }, { prisma, verify }) => {
      const { password, confirmPassword } = data
      const admin = await prisma.admin.findUnique({
        where: {
          id: verify ? verify.id : "",
        },
      })
      if (!admin) {
        throw new Error("not exist")
      }
      if (password !== confirmPassword) {
        throw new Error("password not confirmed")
      }
      const hashRePassword = await bcrypt.hash(password, 10)
      return prisma.admin.update({
        where: { id: verify.id },
        data: {
          password: hashRePassword,
        },
      })
    },
    updateOneAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.update(args)
    },
    deleteOneAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.delete(args)
    },
    upsertOneAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.upsert(args)
    },
    deleteManyAdmin: async (_parent, args, { prisma }) => {
      return prisma.admin.deleteMany(args)
    },
    updateManyAdmin: (_parent, args, { prisma }) => {
      return prisma.admin.updateMany(args)
    },
  },
}

module.exports = {
  Admin,
}
