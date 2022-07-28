const { default: gql } = require('graphql-tag')

const Stock = gql`
  type Stock {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publish: Boolean!
    delete: Boolean!
    deadline: DateTime!
    name: String!
    description: String!
    code: String
    organization: Organization!
    organizationId: String!
  }

  type Query {
    findUniqueStock(where: StockWhereUniqueInput!): Stock
    findFirstStock(
      where: StockWhereInput
      orderBy: [StockOrderByWithRelationInput]
      cursor: StockWhereUniqueInput
      take: Int
      skip: Int
      distinct: [StockScalarFieldEnum]
    ): Stock
    findManyStock(
      where: StockWhereInput
      orderBy: [StockOrderByWithRelationInput]
      cursor: StockWhereUniqueInput
      take: Int
      skip: Int
      distinct: [StockScalarFieldEnum]
    ): [Stock!]
    findManyStockCount(
      where: StockWhereInput
      orderBy: [StockOrderByWithRelationInput]
      cursor: StockWhereUniqueInput
      take: Int
      skip: Int
      distinct: [StockScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneStock(data: StockCreateInput!): Stock!
    updateOneStock(
      data: StockUpdateInput!
      where: StockWhereUniqueInput!
    ): Stock!
    deleteOneStock(where: StockWhereUniqueInput!): Stock
    upsertOneStock(
      where: StockWhereUniqueInput!
      create: StockCreateInput!
      update: StockUpdateInput!
    ): Stock
    deleteManyStock(where: StockWhereInput): BatchPayload
    updateManyStock(
      data: StockUpdateManyMutationInput!
      where: StockWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Stock,
}
