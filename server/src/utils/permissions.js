const { shield, rule, or, allow, deny } = require('graphql-shield')

const models = ['Admin', 'Hall', 'Movie', 'Table', 'Theatre', 'Ticket', 'User']

const rules = {
    isAuthorized: rule({ cache: 'contextual' })((parent, args, { verify }) => {
        return verify && verify.id
    }),
    isAdmin: rule({ cache: 'contextual' })((parent, args, { verify }) => {
        return verify && (verify.role === 'admin' || verify.role === 'god')
    }),
    isModer: rule({ cache: 'contextual' })((parent, args, { verify }) => {
        return verify && (verify.role === 'moderator' || verify.role === 'god')
    }),
    himSelf: rule({ cache: 'contextual' })((parent, args, { verify }) => {
        if (verify) {
            if (verify.id === args.where.id) {
                return true
            }
        }
        return false
    }),
    dev: rule({ cache: 'contextual' })((parent, args, ctx) => {
        return process.env.NODE_ENV === 'production' // изменить на !== перед использованием в проде
    }),
    isAdOwner: rule({ cache: 'contextual' })(async (parent, args, { prisma, verify }) => {
        const exist = await prisma.advertisement.findUnique({ where: args.where })
        return exist && verify && verify.id === exist.ownerId
    }),
}

const modelQueries = (modelNames = [], rule) => {
    const obj = {}
    for (let name of modelNames) {
        obj[`findMany${name}`] = rule
        obj[`findUnique${name}`] = rule
        obj[`findFirst${name}`] = rule
        obj[`findMany${name}Count`] = rule
    }

    return obj
}

const modelMutations = (modelNames = [], rule) => {
    const obj = {}
    for (let name of modelNames) {
        obj[`createOne${name}`] = rule
        obj[`updateOne${name}`] = rule
        obj[`upsertOne${name}`] = rule
        obj[`updateMany${name}`] = rule
    }

    return obj
}

const disableDelete = () => {
    const obj = {}

    for (let modelName of models) {
        obj[`deleteOne${modelName}`] = deny
        obj[`deleteMany${modelName}`] = deny
    }
    return obj
}

const permissions = shield(
    {
        Query: {
            "*": allow,
            // findUniqueAdvertisement: or(rules.isAdmin, rules.isModer, rules.isAdOwner)
            // findMeUser: rules.isAuthorized,
            // findMeAdmin: or(rules.isAdmin, rules.isModer),
            // ...modelQueries(['Admin'], or(rules.isAdmin, rules.isModer, rules.dev)),
            // ...modelQueries(['User'], or(rules.isAdmin, rules.isModer, rules.dev)),
            // findUniqueUser: or(rules.himSelf, rules.isAdmin, rules.isModer, rules.dev),
        },
        Mutation: {
            // "*": or(rules.isAuthorized, rules.dev),
            // ...modelMutations(["User"], or(rules.isAdmin, rules.isModer, rules.dev)),
            // ...modelMutations(["Admin"], or(rules.isAdmin, rules.isModer, rules.dev)),
            // ...modelMutations(['Hall', 'Movie', 'Table', 'Theatre', 'Ticket'], or(rules.isAdmin, rules.isModer, rules.dev)),
            // createOneTicket: or(rules.isAuthorized, rules.dev),
            // ...disableDelete(),
            // signInAdmin: allow,
            // sendUserPhone: allow,
            // sendUserCode: allow,
            // changePasswordAdmin: or(rules.isAdmin, rules.isModer, rules.dev),
            // updateOneUser: or(rules.himSelf, rules.isAdmin, rules.isModer, rules.dev)
        }
    },
    {
        allowExternalErrors: true,
        fallbackError: 'not allowed'
    }
)

module.exports = { permissions }
