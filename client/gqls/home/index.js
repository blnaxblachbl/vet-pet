import { gql } from "@apollo/client"

export const HOME = gql`
    query{
        findManyBranch(
			where: {
                delete: { equals: false }
                publish: { equals: true }
				organization: {
					delete: { equals: false }
					publish: { equals: true }
				}
            }
            orderBy: {
                createdAt: desc
            }
            skip: 0
            take: 10
			distinct: [organizationId]
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
			_count{
				orders
				schedule
				goods
			}
		} 
        findManyGood(
			where: {
                delete: { equals: false }
                publish: { equals: true }
                organization: {
                    delete: { equals: false }
                    publish: { equals: true }
					branchs: {
						some: {
							delete: { equals: false }
							publish: { equals: true }
						}
					}
                }
            }
            orderBy: {
                createdAt: desc
            }
            skip: 0
            take: 10
		){
			id
			createdAt
			updatedAt
			publish
			delete
			name
			description
			price
			images
			type
			categories
			branchs {
				id
				address
			}
			organization {
				id
				name
				logo
				categories
			}
		} 
        findManyAd(
			where: {
                delete: { equals: false }
                publish: { equals: true }
            }
            orderBy: {
                createdAt: desc
            }
            skip: 0
            take: 20
		){
			id
			createdAt
			updatedAt
			publish
			delete
			title
			description
			viewCount
			images
			pet{
				id
				createdAt
				updatedAt
				birthday
				name
				kind
				breed
				gender
				owner{
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
				}
				userId
				images
				_count{
					parents
					childrens
					ads
				}
			}
			petId
			user {
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
			}
			userId
			price
		}
		findManyAdCount(
			where: {
                delete: { equals: false }
                publish: { equals: true }
            }
		)
    }
`