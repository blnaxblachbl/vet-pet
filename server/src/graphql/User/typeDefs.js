const { default: gql } = require('graphql-tag')

const User = gql`
  input UserSendPhoneInput {
    phone: String!
  }

  input UserSendPhoneAndCodeInput {
    phone: String!
    code: String!
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type User {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    name: String
    phone: String!
    code: String!
    email: String
    block: Boolean!
    delete: Boolean!
    avatar: String
    status: String!
    orders(
      where: OrderWhereInput
      orderBy: OrderOrderByWithRelationInput
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: OrderScalarFieldEnum
    ): [Order!]!
    # pets(
    #   where: PetWhereInput
    #   orderBy: PetOrderByWithRelationInput
    #   cursor: PetWhereUniqueInput
    #   take: Int
    #   skip: Int
    #   distinct: PetScalarFieldEnum
    # ): [Pet!]!
    adopts(
      where: AdoptWhereInput
      orderBy: [AdoptOrderByWithRelationInput]
      cursor: AdoptWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdoptScalarFieldEnum]
    ): [Adopt!]!
    ads(
      where: AdWhereInput
      orderBy: [AdOrderByWithRelationInput]
      cursor: AdWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdScalarFieldEnum]
    ): [Ad!]!
    _count: UserCountOutputType!
  }

  type Query {
    findMeUser: User
    findUniqueUser(where: UserWhereUniqueInput!): User
    findFirstUser(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): User
    findManyUser(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): [User!]
    findManyUserCount(
      where: UserWhereInput
      orderBy: [UserOrderByWithRelationInput]
      cursor: UserWhereUniqueInput
      take: Int
      skip: Int
      distinct: [UserScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneUser(data: UserCreateInput!): User!
    updateOneUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User!
    deleteOneUser(where: UserWhereUniqueInput!): User
    upsertOneUser(
      where: UserWhereUniqueInput!
      create: UserCreateInput!
      update: UserUpdateInput!
    ): User
    deleteManyUser(where: UserWhereInput): BatchPayload
    updateManyUser(
      data: UserUpdateManyMutationInput!
      where: UserWhereInput
    ): BatchPayload
    sendUserPhone(data: UserSendPhoneInput!): Boolean
    sendUserCode(data: UserSendPhoneAndCodeInput!): AuthPayload!
  }
`

module.exports = {
  User,
}
