import { gql } from "@apollo/client"

export const FIND_UNIQUE_ORDER = gql`
	query(
		$where: OrderWhereUniqueInput!
	){
		findUniqueOrder(
			where: $where
		){
			id
			createdAt
			updatedAt
			status
			goods
			date
			comment
			type
			user{
				id
				createdAt
				updatedAt
				name
				phone
				email
				avatar
			}
			userId
			anotherUser
			organization{
				id
				name
				logo
			}
			organizationId
		}
	}
`
export const FIND_FIRST_ORDER = gql`
	query(
		$where: OrderWhereInput
		$orderBy: [OrderOrderByWithRelationInput]
		$cursor: OrderWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrderScalarFieldEnum]
	){
		findFirstOrder(
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
			status
			goods
			date
			comment
			type
			user{
				id
				createdAt
				updatedAt
				name
				phone
				email
				avatar
			}
			userId
			anotherUser
			organization{
				id
				name
				logo
			}
			organizationId
		}
	}
`
export const FIND_MANY_ORDER = gql`
	query(
		$where: OrderWhereInput
		$orderBy: [OrderOrderByWithRelationInput]
		$cursor: OrderWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [OrderScalarFieldEnum]
	){
		findManyOrder(
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
			status
			goods
			date
			comment
			type
			user{
				id
				createdAt
				updatedAt
				name
				phone
				email
				avatar
			}
			userId
			anotherUser
			organization{
				id
				name
				logo
			}
			organizationId
		}
	}
`
export const CREATE_ONE_ORDER = gql`
	mutation(
		$data: OrderCreateInput!
	){
		createOneOrder(
			data: $data
		){
			id
			createdAt
			updatedAt
			status
			goods
			date
			comment
			type
			user{
				id
				createdAt
				updatedAt
				name
				phone
				email
				avatar
			}
			userId
			anotherUser
			organization{
				id
				name
				logo
			}
			organizationId
		}
	}
`
export const UPDATE_ONE_ORDER = gql`
	mutation(
		$data: OrderUpdateInput!
		$where: OrderWhereUniqueInput!
	){
		updateOneOrder(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			status
			goods
			date
			comment
			type
			user{
				id
				createdAt
				updatedAt
				name
				phone
				email
				avatar
			}
			userId
			anotherUser
			organization{
				id
				name
				logo
			}
			organizationId
		}
	}
`
export const DELETE_ONE_ORDER = gql`
	mutation(
		$where: OrderWhereUniqueInput!
	){
		deleteOneOrder(
			where: $where
		){
			id
			createdAt
			updatedAt
			status
			goods
			date
			comment
			type
			user{
				id
				createdAt
				updatedAt
				name
				phone
				email
				avatar
			}
			userId
			anotherUser
			organization{
				id
				name
				logo
			}
			organizationId
		}
	}
`
export const UPSERT_ONE_ORDER = gql`
	mutation(
		$where: OrderWhereUniqueInput!
		$create: OrderCreateInput!
		$update: OrderUpdateInput!
	){
		upsertOneOrder(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			status
			goods
			date
			comment
			type
			user{
				id
				createdAt
				updatedAt
				name
				phone
				email
				avatar
			}
			userId
			anotherUser
			organization{
				id
				name
				logo
			}
			organizationId
		}
	}
`