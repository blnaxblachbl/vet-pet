import { gql } from "@apollo/client"

export const FIND_UNIQUE_ORGANIZATION = gql`
	query(
		$where: OrganizationWhereUniqueInput!
	){
		findUniqueOrganization(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			logo
			description
			city
			phone
			email
			links
			categories
			_count{
				admins
				goods
				orders
				branchs
			}
		}
	}
`
export const FIND_FIRST_ORGANIZATION = gql`
	query(
		$where: OrganizationWhereInput
		$orderBy: [OrganizationOrderByWithRelationInput]
		$cursor: OrganizationWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrganizationScalarFieldEnum]
	){
		findFirstOrganization(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			logo
			description
			city
			phone
			email
			links
			categories
			_count{
				admins
				goods
				orders
			}
		}
	}
`
export const FIND_MANY_ORGANIZATION = gql`
	query(
		$where: OrganizationWhereInput
		$orderBy: [OrganizationOrderByWithRelationInput]
		$cursor: OrganizationWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrganizationScalarFieldEnum]
	){
		findManyOrganization(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			logo
			description
			city
			phone
			email
			links
			categories
			_count{
				admins
				goods
				orders
			}
		}
	}
`
export const CREATE_ONE_ORGANIZATION = gql`
	mutation(
		$data: OrganizationCreateInput!
	){
		createOneOrganization(
			data: $data
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			logo
			description
			city
			phone
			email
			links
			categories
			_count{
				admins
				goods
				orders
			}
		}
	}
`
export const UPDATE_ONE_ORGANIZATION = gql`
	mutation(
		$data: OrganizationUpdateInput!
		$where: OrganizationWhereUniqueInput!
	){
		updateOneOrganization(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			logo
			description
			city
			phone
			email
			links
			categories
			_count{
				admins
				goods
				orders
			}
		}
	}
`
export const DELETE_ONE_ORGANIZATION = gql`
	mutation(
		$where: OrganizationWhereUniqueInput!
	){
		deleteOneOrganization(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			logo
			description
			city
			phone
			email
			links
			categories
			_count{
				admins
				goods
				orders
			}
		}
	}
`
export const UPSERT_ONE_ORGANIZATION = gql`
	mutation(
		$where: OrganizationWhereUniqueInput!
		$create: OrganizationCreateInput!
		$update: OrganizationUpdateInput!
	){
		upsertOneOrganization(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			logo
			description
			city
			phone
			email
			links
			categories
			_count{
				admins
				goods
				orders
			}
		}
	}
`