const Adopt = {
  Query: {
    findUniqueAdopt: (_parent, args, { prisma }) => {
      return prisma.adopt.findUnique(args)
    },
    findFirstAdopt: (_parent, args, { prisma }) => {
      return prisma.adopt.findFirst(args)
    },
    findManyAdopt: (_parent, args, { prisma }) => {
      return prisma.adopt.findMany(args)
    },
    findManyAdoptCount: (_parent, args, { prisma }) => {
      return prisma.adopt.count(args)
    },
  },
  Mutation: {
    createOneAdopt: (_parent, args, { prisma }) => {
      return prisma.adopt.create(args)
    },
    updateOneAdopt: (_parent, args, { prisma }) => {
      return prisma.adopt.update(args)
    },
    deleteOneAdopt: async (_parent, args, { prisma }) => {
      return prisma.adopt.delete(args)
    },
    upsertOneAdopt: async (_parent, args, { prisma }) => {
      return prisma.adopt.upsert(args)
    },
    deleteManyAdopt: async (_parent, args, { prisma }) => {
      return prisma.adopt.deleteMany(args)
    },
    updateManyAdopt: (_parent, args, { prisma }) => {
      return prisma.adopt.updateMany(args)
    },
  },
}

module.exports = {
  Adopt,
}
