const Organization = {
  Query: {
    findUniqueOrganization: (_parent, args, { prisma }) => {
      return prisma.organization.findUnique(args)
    },
    findFirstOrganization: (_parent, args, { prisma }) => {
      return prisma.organization.findFirst(args)
    },
    findManyOrganization: (_parent, args, { prisma }) => {
      return prisma.organization.findMany(args)
    },
    findManyOrganizationCount: (_parent, args, { prisma }) => {
      return prisma.organization.count(args)
    },
  },
  Mutation: {
    createOneOrganization: (_parent, args, { prisma }) => {
      return prisma.organization.create(args)
    },
    updateOneOrganization: (_parent, args, { prisma }) => {
      return prisma.organization.update(args)
    },
    deleteOneOrganization: async (_parent, args, { prisma }) => {
      return prisma.organization.delete(args)
    },
    upsertOneOrganization: async (_parent, args, { prisma }) => {
      return prisma.organization.upsert(args)
    },
    deleteManyOrganization: async (_parent, args, { prisma }) => {
      return prisma.organization.deleteMany(args)
    },
    updateManyOrganization: (_parent, args, { prisma }) => {
      return prisma.organization.updateMany(args)
    },
  },
}

module.exports = {
  Organization,
}
