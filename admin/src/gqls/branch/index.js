import { gql } from "@apollo/client"

export const FIND_UNIQUE_BRANCH = gql`
	query(
		$where: BranchWhereUniqueInput!
	){
		findUniqueBranch(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
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
				email
				phone
				links
				categories
			}
			organizationId
			schedule{
				id
				createdAt
				updatedAt
				branchId
				day
				startTime
				endTime
				allTime
				dayOff
			}
			address
			phone
			images
			rating
			_count{
				orders
				schedule
				goods
			}
		}
	}
`
export const FIND_FIRST_BRANCH = gql`
	query(
		$where: BranchWhereInput
		$orderBy: [BranchOrderByWithRelationInput]
		$cursor: BranchWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [BranchScalarFieldEnum]
	){
		findFirstBranch(
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
				email
				phone
				links
				categories
			}
			organizationId
			schedule{
				id
				createdAt
				updatedAt
				branchId
				day
				startTime
				endTime
				allTime
				dayOff
			}
			address
			phone
			images
			rating
			_count{
				orders
				schedule
				goods
			}
		}
	}
`
export const FIND_MANY_BRANCH = gql`
	query(
		$where: BranchWhereInput
		$orderBy: [BranchOrderByWithRelationInput]
		$cursor: BranchWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [BranchScalarFieldEnum]
	){
		findManyBranch(
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
				email
				phone
				links
				categories
			}
			organizationId
			schedule{
				id
				createdAt
				updatedAt
				branchId
				day
				startTime
				endTime
				allTime
				dayOff
			}
			address
			phone
			images
			rating
			_count{
				orders
				schedule
				goods
			}
		}
	}
`
export const CREATE_ONE_BRANCH = gql`
	mutation(
		$data: BranchCreateInput!
	){
		createOneBranch(
			data: $data
		){
			id
			createdAt
			updatedAt
			publish
			delete
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
				email
				phone
				links
				categories
			}
			organizationId
			schedule{
				id
				createdAt
				updatedAt
				branchId
				day
				startTime
				endTime
				allTime
				dayOff
			}
			address
			phone
			images
			rating
			_count{
				orders
				schedule
				goods
			}
		}
	}
`
export const UPDATE_ONE_BRANCH = gql`
	mutation(
		$data: BranchUpdateInput!
		$where: BranchWhereUniqueInput!
	){
		updateOneBranch(
			data: $data
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
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
				email
				phone
				links
				categories
			}
			organizationId
			schedule{
				id
				createdAt
				updatedAt
				branchId
				day
				startTime
				endTime
				allTime
				dayOff
			}
			address
			phone
			images
			rating
			_count{
				orders
				schedule
				goods
			}
		}
	}
`
export const DELETE_ONE_BRANCH = gql`
	mutation(
		$where: BranchWhereUniqueInput!
	){
		deleteOneBranch(
			where: $where
		){
			id
			createdAt
			updatedAt
			publish
			delete
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
				email
				phone
				links
				categories
			}
			organizationId
			schedule{
				id
				createdAt
				updatedAt
				branchId
				day
				startTime
				endTime
				allTime
				dayOff
			}
			address
			phone
			images
			rating
			_count{
				orders
				schedule
				goods
			}
		}
	}
`
export const UPSERT_ONE_BRANCH = gql`
	mutation(
		$where: BranchWhereUniqueInput!
		$create: BranchCreateInput!
		$update: BranchUpdateInput!
	){
		upsertOneBranch(
			where: $where
			create: $create
			update: $update
		){
			id
			createdAt
			updatedAt
			publish
			delete
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
				email
				phone
				links
				categories
			}
			organizationId
			schedule{
				id
				createdAt
				updatedAt
				branchId
				day
				startTime
				endTime
				allTime
				dayOff
			}
			address
			phone
			images
			rating
			_count{
				orders
				schedule
				goods
			}
		}
	}
`