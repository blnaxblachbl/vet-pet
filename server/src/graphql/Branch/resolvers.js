const Branch = {
  Query: {
    findUniqueBranch: (_parent, args, { prisma }) => {
      return prisma.branch.findUnique(args)
    },
    findFirstBranch: (_parent, args, { prisma }) => {
      return prisma.branch.findFirst(args)
    },
    findManyBranch: (_parent, args, { prisma }) => {
      return prisma.branch.findMany(args)
    },
    findManyBranchCount: (_parent, args, { prisma }) => {
      return prisma.branch.count(args)
    },
  },
  Mutation: {
    createOneBranch: (_parent, args, { prisma }) => {
      return prisma.branch.create(args)
    },
    updateOneBranch: (_parent, args, { prisma }) => {
      return prisma.branch.update(args)
    },
    deleteOneBranch: async (_parent, args, { prisma }) => {
      return prisma.branch.delete(args)
    },
    upsertOneBranch: async (_parent, args, { prisma }) => {
      return prisma.branch.upsert(args)
    },
    deleteManyBranch: async (_parent, args, { prisma }) => {
      return prisma.branch.deleteMany(args)
    },
    updateManyBranch: (_parent, args, { prisma }) => {
      return prisma.branch.updateMany(args)
    },
  },
}

module.exports = {
  Branch,
}
