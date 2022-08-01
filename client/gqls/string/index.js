import { gql } from "@apollo/client"

export const UPLOAD_FILE = gql`
	mutation(
		$file: Upload!
		$originamName: String
	){
		uploadFile(
			file: $file
			originamName: $originamName
		)
	}
`
export const DELETE_FILE = gql`
	mutation(
		$fileName: String!
	){
		deleteFile(
			fileName: $fileName
		)
	}
`