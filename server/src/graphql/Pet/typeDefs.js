const { default: gql } = require('graphql-tag')

const Pet = gql`
  type Pet {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    birthday: DateTime!
    name: String
    kind: String!
    breed: String!
    gender: String!
    owner: User!
    userId: String!
    parents(
      where: PetWhereInput
      orderBy: PetOrderByWithRelationInput
      cursor: PetWhereUniqueInput
      take: Int
      skip: Int
      distinct: PetScalarFieldEnum
    ): [Pet!]!
    childrens(
      where: PetWhereInput
      orderBy: PetOrderByWithRelationInput
      cursor: PetWhereUniqueInput
      take: Int
      skip: Int
      distinct: PetScalarFieldEnum
    ): [Pet!]!
    images: [String!]!
    ads(
      where: AdWhereInput
      orderBy: AdOrderByWithRelationInput
      cursor: AdWhereUniqueInput
      take: Int
      skip: Int
      distinct: AdScalarFieldEnum
    ): [Ad!]!
    _count: PetCountOutputType!
  }

  type Query {
    findUniquePet(where: PetWhereUniqueInput!): Pet
    findFirstPet(
      where: PetWhereInput
      orderBy: [PetOrderByWithRelationInput]
      cursor: PetWhereUniqueInput
      take: Int
      skip: Int
      distinct: [PetScalarFieldEnum]
    ): Pet
    findManyPet(
      where: PetWhereInput
      orderBy: [PetOrderByWithRelationInput]
      cursor: PetWhereUniqueInput
      take: Int
      skip: Int
      distinct: [PetScalarFieldEnum]
    ): [Pet!]
    findManyPetCount(
      where: PetWhereInput
      orderBy: [PetOrderByWithRelationInput]
      cursor: PetWhereUniqueInput
      take: Int
      skip: Int
      distinct: [PetScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOnePet(data: PetCreateInput!): Pet!
    updateOnePet(data: PetUpdateInput!, where: PetWhereUniqueInput!): Pet!
    deleteOnePet(where: PetWhereUniqueInput!): Pet
    upsertOnePet(
      where: PetWhereUniqueInput!
      create: PetCreateInput!
      update: PetUpdateInput!
    ): Pet
    deleteManyPet(where: PetWhereInput): BatchPayload
    updateManyPet(
      data: PetUpdateManyMutationInput!
      where: PetWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Pet,
}
