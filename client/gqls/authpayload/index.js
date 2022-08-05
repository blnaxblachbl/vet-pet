import { gql } from "@apollo/client"

export const SEND_USER_CODE = gql`
	mutation(
		$data: UserSendPhoneAndCodeInput!
	){
		sendUserCode(
			data: $data
		){
			user{
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
				status
				adopts {
					id
					createdAt
					status
					pet {
						id
						createdAt
						updatedAt
						birthday
						name
						kind
						breed
						gender
					}
				}
				_count{
					orders
					adopts
				}
			}
			token
		}
	}
`