const { default: gql } = require('graphql-tag')

const Cart = gql`
  type Cart {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    count: Int!
    good: Good!
    goodId: String!
  }

  type Query {
    findUniqueCart(where: CartWhereUniqueInput!): Cart
    findFirstCart(
      where: CartWhereInput
      orderBy: [CartOrderByWithRelationInput]
      cursor: CartWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CartScalarFieldEnum]
    ): Cart
    findManyCart(
      where: CartWhereInput
      orderBy: [CartOrderByWithRelationInput]
      cursor: CartWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CartScalarFieldEnum]
    ): [Cart!]
    findManyCartCount(
      where: CartWhereInput
      orderBy: [CartOrderByWithRelationInput]
      cursor: CartWhereUniqueInput
      take: Int
      skip: Int
      distinct: [CartScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneCart(data: CartCreateInput!): Cart!
    updateOneCart(data: CartUpdateInput!, where: CartWhereUniqueInput!): Cart!
    deleteOneCart(where: CartWhereUniqueInput!): Cart
    upsertOneCart(
      where: CartWhereUniqueInput!
      create: CartCreateInput!
      update: CartUpdateInput!
    ): Cart
    deleteManyCart(where: CartWhereInput): BatchPayload
    updateManyCart(
      data: CartUpdateManyMutationInput!
      where: CartWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Cart,
}
