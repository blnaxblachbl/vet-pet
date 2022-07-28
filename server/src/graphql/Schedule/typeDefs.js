const { default: gql } = require('graphql-tag')

const Schedule = gql`
  type Schedule {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    organization: Organization!
    organizationId: String!
    day: String!
    startTime: Int!
    endTine: Int!
    allTime: Boolean!
  }

  type Query {
    findUniqueSchedule(where: ScheduleWhereUniqueInput!): Schedule
    findFirstSchedule(
      where: ScheduleWhereInput
      orderBy: [ScheduleOrderByWithRelationInput]
      cursor: ScheduleWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ScheduleScalarFieldEnum]
    ): Schedule
    findManySchedule(
      where: ScheduleWhereInput
      orderBy: [ScheduleOrderByWithRelationInput]
      cursor: ScheduleWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ScheduleScalarFieldEnum]
    ): [Schedule!]
    findManyScheduleCount(
      where: ScheduleWhereInput
      orderBy: [ScheduleOrderByWithRelationInput]
      cursor: ScheduleWhereUniqueInput
      take: Int
      skip: Int
      distinct: [ScheduleScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneSchedule(data: ScheduleCreateInput!): Schedule!
    updateOneSchedule(
      data: ScheduleUpdateInput!
      where: ScheduleWhereUniqueInput!
    ): Schedule!
    deleteOneSchedule(where: ScheduleWhereUniqueInput!): Schedule
    upsertOneSchedule(
      where: ScheduleWhereUniqueInput!
      create: ScheduleCreateInput!
      update: ScheduleUpdateInput!
    ): Schedule
    deleteManySchedule(where: ScheduleWhereInput): BatchPayload
    updateManySchedule(
      data: ScheduleUpdateManyMutationInput!
      where: ScheduleWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Schedule,
}
