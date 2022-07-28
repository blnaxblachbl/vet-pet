const { default: gql } = require('graphql-tag')

const Good = gql`
  type Good {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publish: Boolean!
    delete: Boolean!
    name: String!
    description: String!
    price: Int!
    images: [String!]!
    organization: Organization!
    organizationId: String!
    type: String!
    carts(
      where: CartWhereInput
      orderBy: CartOrderByWithRelationInput
      cursor: CartWhereUniqueInput
      take: Int
      skip: Int
      distinct: CartScalarFieldEnum
    ): [Cart!]!
    _count: GoodCountOutputType!
  }

  type Query {
    findUniqueGood(where: GoodWhereUniqueInput!): Good
    findFirstGood(
      where: GoodWhereInput
      orderBy: [GoodOrderByWithRelationInput]
      cursor: GoodWhereUniqueInput
      take: Int
      skip: Int
      distinct: [GoodScalarFieldEnum]
    ): Good
    findManyGood(
      where: GoodWhereInput
      orderBy: [GoodOrderByWithRelationInput]
      cursor: GoodWhereUniqueInput
      take: Int
      skip: Int
      distinct: [GoodScalarFieldEnum]
    ): [Good!]
    findManyGoodCount(
      where: GoodWhereInput
      orderBy: [GoodOrderByWithRelationInput]
      cursor: GoodWhereUniqueInput
      take: Int
      skip: Int
      distinct: [GoodScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneGood(data: GoodCreateInput!): Good!
    updateOneGood(data: GoodUpdateInput!, where: GoodWhereUniqueInput!): Good!
    deleteOneGood(where: GoodWhereUniqueInput!): Good
    upsertOneGood(
      where: GoodWhereUniqueInput!
      create: GoodCreateInput!
      update: GoodUpdateInput!
    ): Good
    deleteManyGood(where: GoodWhereInput): BatchPayload
    updateManyGood(
      data: GoodUpdateManyMutationInput!
      where: GoodWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Good,
}
