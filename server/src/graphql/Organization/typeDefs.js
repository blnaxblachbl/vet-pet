const { default: gql } = require('graphql-tag')

const Organization = gql`
  type Organization {
    id: String!
    createdAt: DateTime!
    updatedAt: DateTime!
    publish: Boolean!
    delete: Boolean!
    name: String!
    logo: String!
    description: String!
    city: String
    email: String
    phone: String
    links: [String!]!
    categories: [String!]!
    admins(
      where: AdminWhereInput
      orderBy: AdminOrderByWithRelationInput
      cursor: AdminWhereUniqueInput
      take: Int
      skip: Int
      distinct: AdminScalarFieldEnum
    ): [Admin!]!
    goods(
      where: GoodWhereInput
      orderBy: GoodOrderByWithRelationInput
      cursor: GoodWhereUniqueInput
      take: Int
      skip: Int
      distinct: GoodScalarFieldEnum
    ): [Good!]!
    branchs(
      where: BranchWhereInput
      orderBy: BranchOrderByWithRelationInput
      cursor: BranchWhereUniqueInput
      take: Int
      skip: Int
      distinct: BranchScalarFieldEnum
    ): [Branch!]!
    orders(
      where: OrderWhereInput
      orderBy: OrderOrderByWithRelationInput
      cursor: OrderWhereUniqueInput
      take: Int
      skip: Int
      distinct: OrderScalarFieldEnum
    ): [Order!]!
    _count: OrganizationCountOutputType!
  }

  type Query {
    findUniqueOrganization(where: OrganizationWhereUniqueInput!): Organization
    findFirstOrganization(
      where: OrganizationWhereInput
      orderBy: [OrganizationOrderByWithRelationInput]
      cursor: OrganizationWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrganizationScalarFieldEnum]
    ): Organization
    findManyOrganization(
      where: OrganizationWhereInput
      orderBy: [OrganizationOrderByWithRelationInput]
      cursor: OrganizationWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrganizationScalarFieldEnum]
    ): [Organization!]
    findManyOrganizationCount(
      where: OrganizationWhereInput
      orderBy: [OrganizationOrderByWithRelationInput]
      cursor: OrganizationWhereUniqueInput
      take: Int
      skip: Int
      distinct: [OrganizationScalarFieldEnum]
    ): Int!
  }

  type Mutation {
    createOneOrganization(data: OrganizationCreateInput!): Organization!
    updateOneOrganization(
      data: OrganizationUpdateInput!
      where: OrganizationWhereUniqueInput!
    ): Organization!
    deleteOneOrganization(where: OrganizationWhereUniqueInput!): Organization
    upsertOneOrganization(
      where: OrganizationWhereUniqueInput!
      create: OrganizationCreateInput!
      update: OrganizationUpdateInput!
    ): Organization
    deleteManyOrganization(where: OrganizationWhereInput): BatchPayload
    updateManyOrganization(
      data: OrganizationUpdateManyMutationInput!
      where: OrganizationWhereInput
    ): BatchPayload
  }
`

module.exports = {
  Organization,
}
