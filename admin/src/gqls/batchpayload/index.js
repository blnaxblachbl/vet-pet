import { gql } from "@apollo/client"

export const DELETE_MANY_ADMIN = gql`
	mutation(
		$where: AdminWhereInput
	){
		deleteManyAdmin(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_ADMIN = gql`
	mutation(
		$data: AdminUpdateManyMutationInput!
		$where: AdminWhereInput
	){
		updateManyAdmin(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_USER = gql`
	mutation(
		$where: UserWhereInput
	){
		deleteManyUser(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_USER = gql`
	mutation(
		$data: UserUpdateManyMutationInput!
		$where: UserWhereInput
	){
		updateManyUser(
			data: $data
			where: $where
		){
			count
		}
	}
`