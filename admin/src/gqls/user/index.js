import { gql } from "@apollo/client"

export const FIND_UNIQUE_USER = gql`
	query(
		$where: UserWhereUniqueInput!
	){
		findUniqueUser(
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			phone
			code
			email
			block
			delete
			avatar
		}
	}
`
export const FIND_FIRST_USER = gql`
	query(
		$where: UserWhereInput
		$orderBy: [UserOrderByWithRelationInput]
		$cursor: UserWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [UserScalarFieldEnum]
	){
		findFirstUser(
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
			name
			phone
			code
			email
			block
			delete
			avatar
		}
	}
`
export const FIND_MANY_USER = gql`
	query(
		$where: UserWhereInput
		$orderBy: [UserOrderByWithRelationInput]
		$cursor: UserWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [UserScalarFieldEnum]
	){
		findManyUser(
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
			name
			phone
			code
			email
			block
			delete
			avatar
		}
	}
`
export const CREATE_ONE_USER = gql`
	mutation(
		$data: UserCreateInput!
	){
		createOneUser(
			data: $data
		){
			id
			createdAt
			updatedAt
			name
			phone
			code
			email
			block
			delete
			avatar
		}
	}
`
export const UPDATE_ONE_USER = gql`
	mutation(
		$data: UserUpdateInput!
		$where: UserWhereUniqueInput!
	){
		updateOneUser(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			phone
			code
			email
			block
			delete
			avatar
		}
	}
`
export const DELETE_ONE_USER = gql`
	mutation(
		$where: UserWhereUniqueInput!
	){
		deleteOneUser(
			where: $where
		){
			id
			createdAt
			updatedAt
			name
			phone
			code
			email
			block
			delete
			avatar
		}
	}
`
export const UPSERT_ONE_USER = gql`
	mutation(
		$where: UserWhereUniqueInput!
		$create: UserCreateInput!
		$update: UserUpdateInput!
	){
		upsertOneUser(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			name
			phone
			code
			email
			block
			delete
			avatar
		}
	}
`