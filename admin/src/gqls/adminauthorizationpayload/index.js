import { gql } from "@apollo/client"

export const SIGN_IN_ADMIN = gql`
	mutation(
		$data: AdminSignInInput!
	){
		signInAdmin(
			data: $data
		){
			admin{
				id
				createdAt
				updatedAt
				email
				type
				name
				password
				repassword
				phone
				block
				delete
				organization {
					id
					name
				}
				organizationId
			}
			token
		}
	}
`