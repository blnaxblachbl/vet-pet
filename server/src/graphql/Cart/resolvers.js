const Cart = {
  Query: {
    findUniqueCart: (_parent, args, { prisma }) => {
      return prisma.cart.findUnique(args)
    },
    findFirstCart: (_parent, args, { prisma }) => {
      return prisma.cart.findFirst(args)
    },
    findManyCart: (_parent, args, { prisma }) => {
      return prisma.cart.findMany(args)
    },
    findManyCartCount: (_parent, args, { prisma }) => {
      return prisma.cart.count(args)
    },
  },
  Mutation: {
    createOneCart: (_parent, args, { prisma }) => {
      return prisma.cart.create(args)
    },
    updateOneCart: (_parent, args, { prisma }) => {
      return prisma.cart.update(args)
    },
    deleteOneCart: async (_parent, args, { prisma }) => {
      return prisma.cart.delete(args)
    },
    upsertOneCart: async (_parent, args, { prisma }) => {
      return prisma.cart.upsert(args)
    },
    deleteManyCart: async (_parent, args, { prisma }) => {
      return prisma.cart.deleteMany(args)
    },
    updateManyCart: (_parent, args, { prisma }) => {
      return prisma.cart.updateMany(args)
    },
  },
}

module.exports = {
  Cart,
}
