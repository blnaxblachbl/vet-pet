import { gql } from "@apollo/client"

export const FIND_ME_ADMIN = gql`
	{
		findMeAdmin{
			id
			createdAt
			updatedAt
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const FIND_UNIQUE_ADMIN = gql`
	query(
		$where: AdminWhereUniqueInput!
	){
		findUniqueAdmin(
			where: $where
		){
			id
			createdAt
			updatedAt
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const FIND_FIRST_ADMIN = gql`
	query(
		$where: AdminWhereInput
		$orderBy: [AdminOrderByWithRelationInput]
		$cursor: AdminWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdminScalarFieldEnum]
	){
		findFirstAdmin(
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
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const FIND_MANY_ADMIN = gql`
	query(
		$where: AdminWhereInput
		$orderBy: [AdminOrderByWithRelationInput]
		$cursor: AdminWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdminScalarFieldEnum]
	){
		findManyAdmin(
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
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const CREATE_ONE_ADMIN = gql`
	mutation(
		$data: AdminCreateInput!
	){
		createOneAdmin(
			data: $data
		){
			id
			createdAt
			updatedAt
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const UPDATE_ONE_ADMIN = gql`
	mutation(
		$data: AdminUpdateInput!
		$where: AdminWhereUniqueInput!
	){
		updateOneAdmin(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const DELETE_ONE_ADMIN = gql`
	mutation(
		$where: AdminWhereUniqueInput!
	){
		deleteOneAdmin(
			where: $where
		){
			id
			createdAt
			updatedAt
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const UPSERT_ONE_ADMIN = gql`
	mutation(
		$where: AdminWhereUniqueInput!
		$create: AdminCreateInput!
		$update: AdminUpdateInput!
	){
		upsertOneAdmin(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`
export const CHANGE_PASSWORD_ADMIN = gql`
	mutation(
		$data: ChangePasswordInput!
	){
		changePasswordAdmin(
			data: $data
		){
			id
			createdAt
			updatedAt
			email
			type
			name
			password
			repassword
			phone
			block
			images
			delete
			organization {
				id
				name
			}
			organizationId
		}
	}
`