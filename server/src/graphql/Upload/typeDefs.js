const { default: gql } = require('graphql-tag')

const Upload = gql`
    scalar Upload

    type Mutation {
        uploadFile(file: Upload! originamName: String): String!
        deleteFile(fileName: String!): String!
    } 
`

module.exports = {
    Upload,
}