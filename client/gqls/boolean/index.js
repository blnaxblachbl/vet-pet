import { gql } from "@apollo/client"

export const SEND_USER_PHONE = gql`
	mutation(
		$data: UserSendPhoneInput!
	){
		sendUserPhone(
			data: $data
		)
	}
`
export const RESET_PASSWORD = gql`
	mutation(
		$where: AdminWhereUniqueInput!
	){
		resetPassword(
			where: $where
		)
	}
`