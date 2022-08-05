const { default: gql } = require('graphql-tag')

const Adopt = gql`
  type Adopt {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    pet: Pet!
    petId: String!
    user: User!
    userId: String!
    status: String!
  }

  type Query {
    findUniqueAdopt(where: AdoptWhereUniqueInput!): Adopt
    findFirstAdopt(
      where: AdoptWhereInput
      orderBy: [AdoptOrderByWithRelationInput]
      cursor: AdoptWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdoptScalarFieldEnum]
    ): Adopt
    findManyAdopt(
      where: AdoptWhereInput
      orderBy: [AdoptOrderByWithRelationInput]
      cursor: AdoptWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdoptScalarFieldEnum]
    ): [Adopt!]
    findManyAdoptCount(
      where: AdoptWhereInput
      orderBy: [AdoptOrderByWithRelationInput]
      cursor: AdoptWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdoptScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneAdopt(data: AdoptCreateInput!): Adopt!
    updateOneAdopt(
      data: AdoptUpdateInput!
      where: AdoptWhereUniqueInput!
    ): Adopt!
    deleteOneAdopt(where: AdoptWhereUniqueInput!): Adopt
    upsertOneAdopt(
      where: AdoptWhereUniqueInput!
      create: AdoptCreateInput!
      update: AdoptUpdateInput!
    ): Adopt
    deleteManyAdopt(where: AdoptWhereInput): BatchPayload
    updateManyAdopt(
      data: AdoptUpdateManyMutationInput!
      where: AdoptWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Adopt,
}
