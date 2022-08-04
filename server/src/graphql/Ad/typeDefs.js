const { default: gql } = require('graphql-tag')

const Ad = gql`
  type Ad {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publish: Boolean!
    delete: Boolean!
    title: String!
    description: String!
    pet: Pet
    petId: String
    price: Int!
    images: [String!]!
    user: User!
    userId: String!
    viewCount: Int!
  }

  type Query {
    findUniqueAd(where: AdWhereUniqueInput!): Ad
    findFirstAd(
      where: AdWhereInput
      orderBy: [AdOrderByWithRelationInput]
      cursor: AdWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdScalarFieldEnum]
    ): Ad
    findManyAd(
      where: AdWhereInput
      orderBy: [AdOrderByWithRelationInput]
      cursor: AdWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdScalarFieldEnum]
    ): [Ad!]
    findManyAdCount(
      where: AdWhereInput
      orderBy: [AdOrderByWithRelationInput]
      cursor: AdWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneAd(data: AdCreateInput!): Ad!
    updateOneAd(data: AdUpdateInput!, where: AdWhereUniqueInput!): Ad!
    deleteOneAd(where: AdWhereUniqueInput!): Ad
    upsertOneAd(
      where: AdWhereUniqueInput!
      create: AdCreateInput!
      update: AdUpdateInput!
    ): Ad
    deleteManyAd(where: AdWhereInput): BatchPayload
    updateManyAd(
      data: AdUpdateManyMutationInput!
      where: AdWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Ad,
}
