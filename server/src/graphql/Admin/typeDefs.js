const { default: gql } = require('graphql-tag')

const Admin = gql`
  input AdminSignInInput {
    email: String!
    password: String!
  }
  
  input ChangePasswordInput {
    password: String!
    confirmPassword: String!
  }

  type AdminAuthorizationPayload {
    admin: Admin!
    token: String!
  }
  type Admin {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    email: String!
    type: String!
    name: String
    password: String
    repassword: String
    phone: String
    block: Boolean!
    delete: Boolean!
    organization: Organization
    organizationId: String
  }

  type Query {
    findMeAdmin: Admin
    findUniqueAdmin(where: AdminWhereUniqueInput!): Admin
    findFirstAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByWithRelationInput]
      cursor: AdminWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdminScalarFieldEnum]
    ): Admin
    findManyAdmin(
      where: AdminWhereInput
      orderBy: [AdminOrderByWithRelationInput]
      cursor: AdminWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdminScalarFieldEnum]
    ): [Admin!]
    findManyAdminCount(
      where: AdminWhereInput
      orderBy: [AdminOrderByWithRelationInput]
      cursor: AdminWhereUniqueInput
      take: Int
      skip: Int
      distinct: [AdminScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneAdmin(data: AdminCreateInput!): Admin!
    updateOneAdmin(
      data: AdminUpdateInput!
      where: AdminWhereUniqueInput!
    ): Admin!
    deleteOneAdmin(where: AdminWhereUniqueInput!): Admin
    upsertOneAdmin(
      where: AdminWhereUniqueInput!
      create: AdminCreateInput!
      update: AdminUpdateInput!
    ): Admin
    deleteManyAdmin(where: AdminWhereInput): BatchPayload
    updateManyAdmin(
      data: AdminUpdateManyMutationInput!
      where: AdminWhereInput
    ): BatchPayload
    resetPassword(where: AdminWhereUniqueInput!): Boolean
    signInAdmin(data: AdminSignInInput!): AdminAuthorizationPayload!
    changePasswordAdmin(data: ChangePasswordInput!): Admin!
  }
`

module.exports = {
  Admin,
}
