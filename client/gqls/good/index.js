import { gql } from "@apollo/client"

export const FIND_UNIQUE_GOOD_CATEGORIES = gql`
	query($where: OrganizationWhereUniqueInput!){
		findUniqueGoodCategories(where: $where)
	}
`
export const FIND_UNIQUE_GOOD = gql`
	query(
		$where: GoodWhereUniqueInput!
	){
		findUniqueGood(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		}
	}
`
export const FIND_FIRST_GOOD = gql`
	query(
		$where: GoodWhereInput
		$orderBy: [GoodOrderByWithRelationInput]
		$cursor: GoodWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [GoodScalarFieldEnum]
	){
		findFirstGood(
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
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		}
	}
`
export const FIND_MANY_GOOD = gql`
	query(
		$where: GoodWhereInput
		$orderBy: [GoodOrderByWithRelationInput]
		$cursor: GoodWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [GoodScalarFieldEnum]
	){
		findManyGood(
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
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		}
		findManyGoodCount(
			where: $where
		)
	}
`
export const CREATE_ONE_GOOD = gql`
	mutation(
		$data: GoodCreateInput!
	){
		createOneGood(
			data: $data
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		}
	}
`
export const UPDATE_ONE_GOOD = gql`
	mutation(
		$data: GoodUpdateInput!
		$where: GoodWhereUniqueInput!
	){
		updateOneGood(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		}
	}
`
export const DELETE_ONE_GOOD = gql`
	mutation(
		$where: GoodWhereUniqueInput!
	){
		deleteOneGood(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		}
	}
`
export const UPSERT_ONE_GOOD = gql`
	mutation(
		$where: GoodWhereUniqueInput!
		$create: GoodCreateInput!
		$update: GoodUpdateInput!
	){
		upsertOneGood(
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
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		}
	}
`