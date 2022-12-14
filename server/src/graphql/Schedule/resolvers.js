const Schedule = {
  Query: {
    findUniqueSchedule: (_parent, args, { prisma }) => {
      return prisma.schedule.findUnique(args)
    },
    findFirstSchedule: (_parent, args, { prisma }) => {
      return prisma.schedule.findFirst(args)
    },
    findManySchedule: (_parent, args, { prisma }) => {
      return prisma.schedule.findMany(args)
    },
    findManyScheduleCount: (_parent, args, { prisma }) => {
      return prisma.schedule.count(args)
    },
  },
  Mutation: {
    createOneSchedule: (_parent, args, { prisma }) => {
      return prisma.schedule.create(args)
    },
    updateOneSchedule: (_parent, args, { prisma }) => {
      return prisma.schedule.update(args)
    },
    deleteOneSchedule: async (_parent, args, { prisma }) => {
      return prisma.schedule.delete(args)
    },
    upsertOneSchedule: async (_parent, args, { prisma }) => {
      return prisma.schedule.upsert(args)
    },
    deleteManySchedule: async (_parent, args, { prisma }) => {
      return prisma.schedule.deleteMany(args)
    },
    updateManySchedule: (_parent, args, { prisma }) => {
      return prisma.schedule.updateMany(args)
    },
  },
}

module.exports = {
  Schedule,
}
