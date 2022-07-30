const { default: gql } = require('graphql-tag')

const Order = gql`
  scalar Json
  
  type Order {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    status: String!
    goods: [Json!]!
    date: DateTime
    comment: String
    user: User!
    userId: String!
    anotherUser: Json
    branch: Branch!
    branchId: String!
    organization: Organization!
    organizationId: String!
  }

  type Query {
    findUniqueOrder(where: OrderWhereUniqueInput!): Order
    findFirstOrder(
      where: OrderWhereInput
      orderBy: [OrderOrderByWithRelationInput]
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrderScalarFieldEnum]
    ): Order
    findManyOrder(
      where: OrderWhereInput
      orderBy: [OrderOrderByWithRelationInput]
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrderScalarFieldEnum]
    ): [Order!]
    findManyOrderCount(
      where: OrderWhereInput
      orderBy: [OrderOrderByWithRelationInput]
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrderScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneOrder(data: OrderCreateInput!): Order!
    updateOneOrder(
      data: OrderUpdateInput!
      where: OrderWhereUniqueInput!
    ): Order!
    deleteOneOrder(where: OrderWhereUniqueInput!): Order
    upsertOneOrder(
      where: OrderWhereUniqueInput!
      create: OrderCreateInput!
      update: OrderUpdateInput!
    ): Order
    deleteManyOrder(where: OrderWhereInput): BatchPayload
    updateManyOrder(
      data: OrderUpdateManyMutationInput!
      where: OrderWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Order,
}
