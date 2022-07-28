import { gql } from "@apollo/client"

export const FIND_MANY_ADMIN_COUNT = gql`
	query(
		$where: AdminWhereInput
		$orderBy: [AdminOrderByWithRelationInput]
		$cursor: AdminWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [AdminScalarFieldEnum]
	){
		findManyAdminCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`
export const FIND_MANY_USER_COUNT = gql`
	query(
		$where: UserWhereInput
		$orderBy: [UserOrderByWithRelationInput]
		$cursor: UserWhereUniqueInput
		$take: Int
		$skip: Int
		$distinct: [UserScalarFieldEnum]
	){
		findManyUserCount(
			where: $where
			orderBy: $orderBy
			cursor: $cursor
			take: $take
			skip: $skip
			distinct: $distinct
		)
	}
`