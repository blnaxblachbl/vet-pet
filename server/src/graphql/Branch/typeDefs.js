const { default: gql } = require('graphql-tag')

const Branch = gql`
  type Branch {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publish: Boolean!
    delete: Boolean!
    organization: Organization!
    organizationId: String!
    orders(
      where: OrderWhereInput
      orderBy: OrderOrderByWithRelationInput
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: OrderScalarFieldEnum
    ): [Order!]!
    schedule(
      where: ScheduleWhereInput
      orderBy: ScheduleOrderByWithRelationInput
      cursor: ScheduleWhereUniqueInput
      take: Int
      skip: Int
      distinct: ScheduleScalarFieldEnum
    ): [Schedule!]!
    goods(
      where: GoodWhereInput
      orderBy: GoodOrderByWithRelationInput
      cursor: GoodWhereUniqueInput
      take: Int
      skip: Int
      distinct: GoodScalarFieldEnum
    ): [Good!]!
    address: String!
    phone: String!
    images: [String!]!
    _count: BranchCountOutputType!
  }

  type Query {
    findUniqueBranch(where: BranchWhereUniqueInput!): Branch
    findFirstBranch(
      where: BranchWhereInput
      orderBy: [BranchOrderByWithRelationInput]
      cursor: BranchWhereUniqueInput
      take: Int
      skip: Int
      distinct: [BranchScalarFieldEnum]
    ): Branch
    findManyBranch(
      where: BranchWhereInput
      orderBy: [BranchOrderByWithRelationInput]
      cursor: BranchWhereUniqueInput
      take: Int
      skip: Int
      distinct: [BranchScalarFieldEnum]
    ): [Branch!]
    findManyBranchCount(
      where: BranchWhereInput
      orderBy: [BranchOrderByWithRelationInput]
      cursor: BranchWhereUniqueInput
      take: Int
      skip: Int
      distinct: [BranchScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneBranch(data: BranchCreateInput!): Branch!
    updateOneBranch(
      data: BranchUpdateInput!
      where: BranchWhereUniqueInput!
    ): Branch!
    deleteOneBranch(where: BranchWhereUniqueInput!): Branch
    upsertOneBranch(
      where: BranchWhereUniqueInput!
      create: BranchCreateInput!
      update: BranchUpdateInput!
    ): Branch
    deleteManyBranch(where: BranchWhereInput): BatchPayload
    updateManyBranch(
      data: BranchUpdateManyMutationInput!
      where: BranchWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Branch,
}
