import { gql } from "@apollo/client"

export const FIND_UNIQUE_AD = gql`
	query(
		$where: AdWhereUniqueInput!
	){
		findUniqueAd(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			tite
			description
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			price
		}
	}
`
export const FIND_FIRST_AD = gql`
	query(
		$where: AdWhereInput
		$orderBy: [AdOrderByWithRelationInput]
		$cursor: AdWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdScalarFieldEnum]
	){
		findFirstAd(
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
			tite
			description
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			price
		}
	}
`
export const FIND_MANY_AD = gql`
	query(
		$where: AdWhereInput
		$orderBy: [AdOrderByWithRelationInput]
		$cursor: AdWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdScalarFieldEnum]
	){
		findManyAd(
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
			tite
			description
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			price
		}
	}
`
export const CREATE_ONE_AD = gql`
	mutation(
		$data: AdCreateInput!
	){
		createOneAd(
			data: $data
		){
			id
			createdAt
			updatedAt
			publish
			delete
			tite
			description
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			price
		}
	}
`
export const UPDATE_ONE_AD = gql`
	mutation(
		$data: AdUpdateInput!
		$where: AdWhereUniqueInput!
	){
		updateOneAd(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			tite
			description
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			price
		}
	}
`
export const DELETE_ONE_AD = gql`
	mutation(
		$where: AdWhereUniqueInput!
	){
		deleteOneAd(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
			tite
			description
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			price
		}
	}
`
export const UPSERT_ONE_AD = gql`
	mutation(
		$where: AdWhereUniqueInput!
		$create: AdCreateInput!
		$update: AdUpdateInput!
	){
		upsertOneAd(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			publish
			delete
			tite
			description
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			price
		}
	}
`