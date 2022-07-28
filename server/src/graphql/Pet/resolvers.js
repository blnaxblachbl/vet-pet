const Pet = {
  Query: {
    findUniquePet: (_parent, args, { prisma }) => {
      return prisma.pet.findUnique(args)
    },
    findFirstPet: (_parent, args, { prisma }) => {
      return prisma.pet.findFirst(args)
    },
    findManyPet: (_parent, args, { prisma }) => {
      return prisma.pet.findMany(args)
    },
    findManyPetCount: (_parent, args, { prisma }) => {
      return prisma.pet.count(args)
    },
  },
  Mutation: {
    createOnePet: (_parent, args, { prisma }) => {
      return prisma.pet.create(args)
    },
    updateOnePet: (_parent, args, { prisma }) => {
      return prisma.pet.update(args)
    },
    deleteOnePet: async (_parent, args, { prisma }) => {
      return prisma.pet.delete(args)
    },
    upsertOnePet: async (_parent, args, { prisma }) => {
      return prisma.pet.upsert(args)
    },
    deleteManyPet: async (_parent, args, { prisma }) => {
      return prisma.pet.deleteMany(args)
    },
    updateManyPet: (_parent, args, { prisma }) => {
      return prisma.pet.updateMany(args)
    },
  },
}

module.exports = {
  Pet,
}
