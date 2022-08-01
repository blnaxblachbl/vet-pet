const Good = {
  Query: {
    findUniqueGood: (_parent, args, { prisma }) => {
      return prisma.good.findUnique(args)
    },
    findFirstGood: (_parent, args, { prisma }) => {
      return prisma.good.findFirst(args)
    },
    findManyGood: (_parent, args, { prisma }) => {
      return prisma.good.findMany(args)
    },
    findManyGoodCount: (_parent, args, { prisma }) => {
      return prisma.good.count(args)
    },
    findUniqueGoodCategories: async (_parent, args, { prisma }) => {
      const goods = await prisma.good.findMany({
        where: {
          organizationId: { equals: args.where.id }
        },
        distinct: ['categories'],
        select: {
          categories: true
        }
      })
      const categories = goods.reduce((acc, { categories }) => {
        return [...acc, ...categories]
      }, [])
      return [...new Set(categories)]
    },
  },
  Mutation: {
    createOneGood: (_parent, args, { prisma }) => {
      return prisma.good.create(args)
    },
    updateOneGood: (_parent, args, { prisma }) => {
      return prisma.good.update(args)
    },
    deleteOneGood: async (_parent, args, { prisma }) => {
      return prisma.good.delete(args)
    },
    upsertOneGood: async (_parent, args, { prisma }) => {
      return prisma.good.upsert(args)
    },
    deleteManyGood: async (_parent, args, { prisma }) => {
      return prisma.good.deleteMany(args)
    },
    updateManyGood: (_parent, args, { prisma }) => {
      return prisma.good.updateMany(args)
    },
  },
}

module.exports = {
  Good,
}
