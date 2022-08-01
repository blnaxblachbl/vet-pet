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
export const DELETE_MANY_ORGANIZATION = gql`
	mutation(
		$where: OrganizationWhereInput
	){
		deleteManyOrganization(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_ORGANIZATION = gql`
	mutation(
		$data: OrganizationUpdateManyMutationInput!
		$where: OrganizationWhereInput
	){
		updateManyOrganization(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_SCHEDULE = gql`
	mutation(
		$where: ScheduleWhereInput
	){
		deleteManySchedule(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_SCHEDULE = gql`
	mutation(
		$data: ScheduleUpdateManyMutationInput!
		$where: ScheduleWhereInput
	){
		updateManySchedule(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_GOOD = gql`
	mutation(
		$where: GoodWhereInput
	){
		deleteManyGood(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_GOOD = gql`
	mutation(
		$data: GoodUpdateManyMutationInput!
		$where: GoodWhereInput
	){
		updateManyGood(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_STOCK = gql`
	mutation(
		$where: StockWhereInput
	){
		deleteManyStock(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_STOCK = gql`
	mutation(
		$data: StockUpdateManyMutationInput!
		$where: StockWhereInput
	){
		updateManyStock(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_CART = gql`
	mutation(
		$where: CartWhereInput
	){
		deleteManyCart(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_CART = gql`
	mutation(
		$data: CartUpdateManyMutationInput!
		$where: CartWhereInput
	){
		updateManyCart(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_ORDER = gql`
	mutation(
		$where: OrderWhereInput
	){
		deleteManyOrder(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_ORDER = gql`
	mutation(
		$data: OrderUpdateManyMutationInput!
		$where: OrderWhereInput
	){
		updateManyOrder(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_PET = gql`
	mutation(
		$where: PetWhereInput
	){
		deleteManyPet(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_PET = gql`
	mutation(
		$data: PetUpdateManyMutationInput!
		$where: PetWhereInput
	){
		updateManyPet(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_AD = gql`
	mutation(
		$where: AdWhereInput
	){
		deleteManyAd(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_AD = gql`
	mutation(
		$data: AdUpdateManyMutationInput!
		$where: AdWhereInput
	){
		updateManyAd(
			data: $data
			where: $where
		){
			count
		}
	}
`
export const DELETE_MANY_BRANCH = gql`
	mutation(
		$where: BranchWhereInput
	){
		deleteManyBranch(
			where: $where
		){
			count
		}
	}
`
export const UPDATE_MANY_BRANCH = gql`
	mutation(
		$data: BranchUpdateManyMutationInput!
		$where: BranchWhereInput
	){
		updateManyBranch(
			data: $data
			where: $where
		){
			count
		}
	}
`