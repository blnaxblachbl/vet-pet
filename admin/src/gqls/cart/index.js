import { gql } from "@apollo/client"

export const FIND_UNIQUE_CART = gql`
	query(
		$where: CartWhereUniqueInput!
	){
		findUniqueCart(
			where: $where
		){
			id
			createdAt
			updatedAt
			count
			good{
				id
				createdAt
				updatedAt
				publish
				delete
				name
				description
				price
				images
				organization{
					id
					createdAt
					updatedAt
					publish
					delete
					name
					logo
					description
					city
					address
					phone
					email
					links
					images
					categories
					admins
					schedule
					stocks
					orders
					_count
				}
				organizationId
				type
				_count{
					carts
				}
			}
			goodId
		}
	}
`
export const FIND_FIRST_CART = gql`
	query(
		$where: CartWhereInput
		$orderBy: [CartOrderByWithRelationInput]
		$cursor: CartWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [CartScalarFieldEnum]
	){
		findFirstCart(
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
			count
			good{
				id
				createdAt
				updatedAt
				publish
				delete
				name
				description
				price
				images
				organization{
					id
					createdAt
					updatedAt
					publish
					delete
					name
					logo
					description
					city
					address
					phone
					email
					links
					images
					categories
					admins
					schedule
					stocks
					orders
					_count
				}
				organizationId
				type
				_count{
					carts
				}
			}
			goodId
		}
	}
`
export const FIND_MANY_CART = gql`
	query(
		$where: CartWhereInput
		$orderBy: [CartOrderByWithRelationInput]
		$cursor: CartWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [CartScalarFieldEnum]
	){
		findManyCart(
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
			count
			good{
				id
				createdAt
				updatedAt
				publish
				delete
				name
				description
				price
				images
				organization{
					id
					createdAt
					updatedAt
					publish
					delete
					name
					logo
					description
					city
					address
					phone
					email
					links
					images
					categories
					admins
					schedule
					stocks
					orders
					_count
				}
				organizationId
				type
				_count{
					carts
				}
			}
			goodId
		}
	}
`
export const CREATE_ONE_CART = gql`
	mutation(
		$data: CartCreateInput!
	){
		createOneCart(
			data: $data
		){
			id
			createdAt
			updatedAt
			count
			good{
				id
				createdAt
				updatedAt
				publish
				delete
				name
				description
				price
				images
				organization{
					id
					createdAt
					updatedAt
					publish
					delete
					name
					logo
					description
					city
					address
					phone
					email
					links
					images
					categories
					admins
					schedule
					stocks
					orders
					_count
				}
				organizationId
				type
				_count{
					carts
				}
			}
			goodId
		}
	}
`
export const UPDATE_ONE_CART = gql`
	mutation(
		$data: CartUpdateInput!
		$where: CartWhereUniqueInput!
	){
		updateOneCart(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			count
			good{
				id
				createdAt
				updatedAt
				publish
				delete
				name
				description
				price
				images
				organization{
					id
					createdAt
					updatedAt
					publish
					delete
					name
					logo
					description
					city
					address
					phone
					email
					links
					images
					categories
					admins
					schedule
					stocks
					orders
					_count
				}
				organizationId
				type
				_count{
					carts
				}
			}
			goodId
		}
	}
`
export const DELETE_ONE_CART = gql`
	mutation(
		$where: CartWhereUniqueInput!
	){
		deleteOneCart(
			where: $where
		){
			id
			createdAt
			updatedAt
			count
			good{
				id
				createdAt
				updatedAt
				publish
				delete
				name
				description
				price
				images
				organization{
					id
					createdAt
					updatedAt
					publish
					delete
					name
					logo
					description
					city
					address
					phone
					email
					links
					images
					categories
					admins
					schedule
					stocks
					orders
					_count
				}
				organizationId
				type
				_count{
					carts
				}
			}
			goodId
		}
	}
`
export const UPSERT_ONE_CART = gql`
	mutation(
		$where: CartWhereUniqueInput!
		$create: CartCreateInput!
		$update: CartUpdateInput!
	){
		upsertOneCart(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			count
			good{
				id
				createdAt
				updatedAt
				publish
				delete
				name
				description
				price
				images
				organization{
					id
					createdAt
					updatedAt
					publish
					delete
					name
					logo
					description
					city
					address
					phone
					email
					links
					images
					categories
					admins
					schedule
					stocks
					orders
					_count
				}
				organizationId
				type
				_count{
					carts
				}
			}
			goodId
		}
	}
`