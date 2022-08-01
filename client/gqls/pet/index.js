import { gql } from "@apollo/client"

export const FIND_UNIQUE_PET = gql`
	query(
		$where: PetWhereUniqueInput!
	){
		findUniquePet(
			where: $where
		){
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
			parents{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			childrens{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			images
			_count{
				parents
				childrens
			}
		}
	}
`
export const FIND_FIRST_PET = gql`
	query(
		$where: PetWhereInput
		$orderBy: [PetOrderByWithRelationInput]
		$cursor: PetWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [PetScalarFieldEnum]
	){
		findFirstPet(
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
			parents{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			childrens{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			images
			_count{
				parents
				childrens
			}
		}
	}
`
export const FIND_MANY_PET = gql`
	query(
		$where: PetWhereInput
		$orderBy: [PetOrderByWithRelationInput]
		$cursor: PetWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [PetScalarFieldEnum]
	){
		findManyPet(
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
			parents{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			childrens{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			images
			_count{
				parents
				childrens
			}
		}
	}
`
export const CREATE_ONE_PET = gql`
	mutation(
		$data: PetCreateInput!
	){
		createOnePet(
			data: $data
		){
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
			parents{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			childrens{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			images
			_count{
				parents
				childrens
			}
		}
	}
`
export const UPDATE_ONE_PET = gql`
	mutation(
		$data: PetUpdateInput!
		$where: PetWhereUniqueInput!
	){
		updateOnePet(
			data: $data
			where: $where
		){
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
			parents{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			childrens{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			images
			_count{
				parents
				childrens
			}
		}
	}
`
export const DELETE_ONE_PET = gql`
	mutation(
		$where: PetWhereUniqueInput!
	){
		deleteOnePet(
			where: $where
		){
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
			parents{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			childrens{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			images
			_count{
				parents
				childrens
			}
		}
	}
`
export const UPSERT_ONE_PET = gql`
	mutation(
		$where: PetWhereUniqueInput!
		$create: PetCreateInput!
		$update: PetUpdateInput!
	){
		upsertOnePet(
			where: $where
			create: $create
			update: $update
		){
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
			parents{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			childrens{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				images
			}
			images
			_count{
				parents
				childrens
			}
		}
	}
`