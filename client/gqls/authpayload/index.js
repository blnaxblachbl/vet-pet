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
				carts {
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
							publish
							delete
							name
							logo
							description
						}
						organizationId
						type
						branchs {
							id
							address
						}
					}
					goodId
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