const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { PrismaClient } = require('@prisma/client')
// const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.mjs')
const { graphqlUploadExpress } = require('graphql-upload')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { applyMiddleware } = require('graphql-middleware')
const { PrismaSelect } = require('@paljs/plugins')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { typeDefs } = require('./graphql/typeDefs')
const { resolvers } = require('./graphql/resolvers')
const { permissions } = require('./utils/permissions')
const { ApolloServerPluginLandingPageGraphQLPlayground, ApolloServerPluginLandingPageDisabled } = require('apollo-server-core')

dotenv.config()

const prisma = new PrismaClient()

const selects = async (resolve, root, args, context, info) => {
    const result = new PrismaSelect(info).value
    if (Object.keys(result.select).length > 0) {
        args = {
            ...args,
            ...result
        }
    }
    return resolve(root, args, context, info)
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

const startServer = async () => {
    const server = new ApolloServer({
        schema: applyMiddleware(schema, selects, permissions),
        context: async (ctx) => {
            const { authorization } = ctx.req.headers
            const token = authorization ? authorization.replace('Bearer ', '') : ''
            const verify = await jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    return null
                }
                return decoded
            })
            return {
                prisma,
                verify,
            }
        },
        plugins: [
            process.env.NODE_ENV === 'production'
                ? ApolloServerPluginLandingPageDisabled()
                : ApolloServerPluginLandingPageGraphQLPlayground(),
        ]
    })

    await server.start()
    const app = express()
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json({ limit: '500mb' }))
    app.use(graphqlUploadExpress())

    app.use('/uploads', express.static(process.env.UPLOADS_DIR || __dirname + '/../../uploads'))

    server.applyMiddleware({
        app,
        cors: {
            credentials: true,
            origin: "*"
        }
    })

    await new Promise(promises => app.listen({ port: 4000 }, promises))
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)

    try {
        // startCronJob(prisma)
    } catch (e) {
        console.error(e)
    }

    const adminCount = await prisma.admin.count()
    const testUser = await prisma.user.findUnique({ where: { phone: "79991234567" } })

    if (adminCount === 0) {
        const password = await bcrypt.hash('123123', 10)
        await prisma.admin.create({
            data: {
                email: 'info@itkitchen.su',
                type: 'admin',
                password,
                type: 'admin',
                name: 'Администратор сервиса'
            }
        })
    }

    if (!testUser) {
        await prisma.user.create({
            data: {
                phone: "79991234567",
                name: "Тестовый Пользователь",
                email: 'info@itkitchen.su'
            }
        })
    }
}

startServer()
