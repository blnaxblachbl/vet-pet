const Ad = {
  Query: {
    findUniqueAd: async (_parent, { where, select }, { prisma }) => {
      const ad = await prisma.ad.findUnique({ where, select })
      if (!ad.delete && ad.publish) {
        return prisma.ad.update({
          where,
          data: {
            viewCount: {
              increment: 1
            }
          },
          select
        })
      }
      return ad
    },
    findFirstAd: (_parent, args, { prisma }) => {
      return prisma.ad.findFirst(args)
    },
    findManyAd: (_parent, args, { prisma }) => {
      return prisma.ad.findMany(args)
    },
    findManyAdCount: (_parent, args, { prisma }) => {
      return prisma.ad.count(args)
    },
  },
  Mutation: {
    createOneAd: (_parent, args, { prisma }) => {
      return prisma.ad.create(args)
    },
    updateOneAd: (_parent, args, { prisma }) => {
      return prisma.ad.update(args)
    },
    deleteOneAd: async (_parent, args, { prisma }) => {
      return prisma.ad.delete(args)
    },
    upsertOneAd: async (_parent, args, { prisma }) => {
      return prisma.ad.upsert(args)
    },
    deleteManyAd: async (_parent, args, { prisma }) => {
      return prisma.ad.deleteMany(args)
    },
    updateManyAd: (_parent, args, { prisma }) => {
      return prisma.ad.updateMany(args)
    },
  },
}

module.exports = {
  Ad,
}
