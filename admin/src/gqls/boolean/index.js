import { gql } from "@apollo/client"

export const RESET_PASSWORD = gql`
	mutation(
		$where: AdminWhereUniqueInput!
	){
		resetPassword(
			where: $where
		)
	}
`